const Store = require("../models/store");
const Dealer = require("../models/dealer");
const Address = require("../models/address");
const ParentCategory = require("../models/parentCategory");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const winston = require("winston");
require("dotenv").config();

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(), // Console output for development
  ],
});

// Centralized error response handler
const handleError = (res, status, message, error = null) => {
  logger.error(`${message}: ${error?.message || "No additional error info"}`, {
    status,
    stack: error?.stack,
  });
  return res.status(status).json({ error: message });
};

// ==============================
// 🔥 LIST ALL STORES
// ==============================
exports.listStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        { model: Dealer, as: "dealer" },
        { model: Address, as: "address", required: false },
        { model: ParentCategory, as: "parent_category", required: false },
      ],
    });
    logger.info(`Retrieved ${stores.length} stores`);
    res.json(stores);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve stores", error);
  }
};

// ==============================
// 🔥 GET STORE BY ID
// ==============================
exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid store ID format");
    }

    const store = await Store.findByPk(id, {
      include: [
        { model: Dealer, as: "dealer" },
        { model: Address, as: "address", required: false },
        { model: ParentCategory, as: "parent_category", required: false },
      ],
    });

    if (!store) {
      return handleError(res, 404, "Store not found");
    }

    logger.info(`Retrieved store with ID: ${id}`);
    res.json(store);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve store", error);
  }
};

// ==============================
// 🔥 CREATE STORE
// ==============================
exports.createStore = async (req, res) => {
  try {
    const { dealer_id, name, phone, address, parent_category_id } = req.body;

    // Input validation
    if (!dealer_id || !name) {
      return handleError(res, 400, "Dealer ID and name are required");
    }

    // Validate dealer UUID
    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        dealer_id
      )
    ) {
      return handleError(res, 400, "Invalid dealer ID format");
    }

    // Validate dealer existence
    const dealer = await Dealer.findByPk(dealer_id);
    if (!dealer) {
      return handleError(res, 400, "Dealer not found");
    }

    // Validate phone
    if (phone && !/^\+?[\d\s-]{8,15}$/.test(phone)) {
      return handleError(res, 400, "Invalid phone number format");
    }

    // Validate address
    if (address) {
      const { street, city, state, country, pincode } = address;
      if (!street || !city || !state || !country || !pincode) {
        return handleError(
          res,
          400,
          "All address fields (street, city, state, country, pincode) are required"
        );
      }
      if (!/^\d{5,10}$/.test(pincode)) {
        return handleError(res, 400, "Invalid pincode format");
      }
    }

    // Validate and handle parent category
    let categoryId = parent_category_id;
    if (categoryId) {
      if (
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          categoryId
        )
      ) {
        return handleError(res, 400, "Invalid parent category ID format");
      }

      const categoryExists = await ParentCategory.findByPk(categoryId);
      if (!categoryExists) {
        return handleError(res, 400, "Parent category not found");
      }
    } else {
      // Default category if none provided
      categoryId = "5ecc600d-a03c-11f0-b1b4-f875a42d8cde";
    }

    // Permission check (optional, adjust to your auth logic)
    if (
      !req.user ||
      (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN")
    ) {
      return handleError(res, 403, "Unauthorized access");
    }

    // Create store
    const store = await Store.create({
      id: uuidv4(),
      dealer_id,
      name,
      phone,
      parent_category_id: categoryId,
      createdBy: req.user?.id || null,
    });

    // Create address if provided
    if (address) {
      const addressData = await Address.create({
        id: uuidv4(),
        owner_type: "store",
        owner_id: store.id,
        ...address,
      });
      store.address_id = addressData.id;
      await store.save();
    }

    logger.info(
      `Store created with ID: ${store.id}, name: ${name}, category: ${categoryId}`
    );

    res.status(201).json({
      message: "Store created successfully",
      store: {
        id: store.id,
        dealer_id: store.dealer_id,
        name: store.name,
        phone: store.phone,
        address_id: store.address_id,
        parent_category_id: store.parent_category_id,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create store", error);
  }
};

// ==============================
// 🔥 FIND STORES BY LOCATION
// ==============================
exports.findStoresByLocation = async (req, res) => {
  try {
    const { city, pincode } = req.query;

    if (!city && !pincode) {
      return handleError(
        res,
        400,
        "At least one of city or pincode must be provided"
      );
    }

    if (pincode && !/^\d{5,10}$/.test(pincode)) {
      return handleError(res, 400, "Invalid pincode format");
    }

    const whereClause = {
      [Op.or]: [city ? { city } : null, pincode ? { pincode } : null].filter(
        Boolean
      ),
    };

    const stores = await Store.findAll({
      include: [
        {
          model: Address,
          where: whereClause,
          required: true,
        },
        { model: Dealer, as: "dealer" },
        { model: ParentCategory, as: "parent_category" },
      ],
    });

    logger.info(
      `Retrieved ${stores.length} stores by location (city: ${
        city || "N/A"
      }, pincode: ${pincode || "N/A"})`
    );
    res.json(stores);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve stores by location", error);
  }
};
