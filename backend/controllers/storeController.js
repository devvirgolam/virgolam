const Store = require("../models/store");
const Dealer = require("../models/dealer");
const Address = require("../models/address");
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

exports.listStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      include: [
        { model: Dealer, as: "dealers" },
        { model: Address, as: "address", required: false },
      ],
    });
    logger.info(`Retrieved ${stores.length} stores`);
    res.json(stores);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve stores", error);
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID format
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
        { model: Dealer, as: "dealers" },
        { model: Address, as: "address", required: false },
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

exports.createStore = async (req, res) => {
  try {
    const { dealer_id, name, phone, address } = req.body;

    // Input validation
    if (!dealer_id || !name) {
      return handleError(res, 400, "Dealer ID and name are required");
    }

    // Validate UUID format for dealer_id
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

    // Validate phone format if provided
    if (phone && !/^\+?[\d\s-]{8,15}$/.test(phone)) {
      return handleError(res, 400, "Invalid phone number format");
    }

    // Validate address fields if provided
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

    if (
      !req.user ||
      (req.user.role !== "ADMIN" &&
        req.user.id !== id &&
        req.user.role !== "SUPER_ADMIN")
    ) {
      return handleError(res, 403, "Unauthorized access");
    }
    const store = await Store.create({
      id: uuidv4(),
      dealer_id,
      name,
      phone,
      createdBy: req.user?.id, // Optional: Track creator
    });

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
      `Store created with ID: ${store.id}, name: ${name} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.status(201).json({
      message: "Store created successfully",
      store: {
        id: store.id,
        dealer_id: store.dealer_id,
        name: store.name,
        phone: store.phone,
        address_id: store.address_id,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create store", error);
  }
};

exports.findStoresByLocation = async (req, res) => {
  try {
    const { city, pincode } = req.query;

    // Validate query parameters
    if (!city && !pincode) {
      return handleError(
        res,
        400,
        "At least one of city or pincode must be provided"
      );
    }

    // Validate pincode format if provided
    if (pincode && !/^\d{5,10}$/.test(pincode)) {
      return handleError(res, 400, "Invalid pincode format");
    }

    // Validate city format if provided (basic check for non-empty string)
    if (city && typeof city !== "string") {
      return handleError(res, 400, "Invalid city format");
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
          required: true, // Ensure only stores with matching addresses are returned
        },
        Dealer,
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
