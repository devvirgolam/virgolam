const Dealer = require("../models/dealer");
const Address = require("../models/address");
const { v4: uuidv4 } = require("uuid");
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

// Placeholder for email notification service (e.g., Nodemailer or SendGrid)
const sendEmail = async (to, subject, text) => {
  try {
    // Implement email sending logic here
    logger.info(`Sending email to ${to}: ${subject}`);
    // Example: await nodemailer.sendMail({ to, subject, text });
  } catch (error) {
    logger.error("Failed to send email", {
      error: error.message,
      stack: error.stack,
    });
    throw new Error("Email service error");
  }
};

exports.listDealers = async (req, res) => {
  try {
    const dealers = await Dealer.findAll({ include: Address });
    logger.info(`Retrieved ${dealers.length} dealers`);
    res.json(dealers);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve dealers", error);
  }
};

exports.getDealerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid dealer ID format");
    }

    const dealer = await Dealer.findByPk(id, { include: Address });
    if (!dealer) {
      return handleError(res, 404, "Dealer not found");
    }

    logger.info(`Retrieved dealer with ID: ${id}`);
    res.json(dealer);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve dealer", error);
  }
};

exports.getDealerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Validate slug
    if (!slug || typeof slug !== "string") {
      return handleError(res, 400, "Invalid or missing slug");
    }

    const dealer = await Dealer.findOne({ where: { slug }, include: Address });
    if (!dealer) {
      return handleError(res, 404, "Dealer not found");
    }

    logger.info(`Retrieved dealer with slug: ${slug}`);
    res.json(dealer);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve dealer", error);
  }
};

exports.createDealer = async (req, res) => {
  try {
    const { name, slug, company_name, address } = req.body;

    // Input validation
    if (!name || !slug || !company_name) {
      return handleError(res, 400, "Name, slug, and company name are required");
    }

    // Validate slug format (URL-safe)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return handleError(
        res,
        400,
        "Invalid slug format (use lowercase letters, numbers, and hyphens)"
      );
    }

    // Check for duplicate slug
    const existingDealer = await Dealer.findOne({ where: { slug } });
    if (existingDealer) {
      return handleError(res, 409, "Slug already exists");
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

    const dealer = await Dealer.create({
      id: uuidv4(),
      name,
      slug,
      company_name,
      createdBy: req.user?.id, // Optional: Track creator if authenticated
    });

    if (address) {
      await Address.create({
        id: uuidv4(),
        owner_type: "dealer",
        owner_id: dealer.id,
        ...address,
      });
    }

    logger.info(
      `Dealer created with ID: ${dealer.id}, slug: ${slug} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.status(201).json({
      message: "Dealer created successfully",
      dealer: {
        id: dealer.id,
        name: dealer.name,
        slug: dealer.slug,
        company_name: dealer.company_name,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create dealer", error);
  }
};

exports.updateDealer = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, ...updates } = req.body;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid dealer ID format");
    }

    const dealer = await Dealer.findByPk(id);
    if (!dealer) {
      return handleError(res, 404, "Dealer not found");
    }

    // Validate updates
    if (Object.keys(updates).length === 0 && !address) {
      return handleError(
        res,
        400,
        "At least one field must be provided for update"
      );
    }

    // Validate slug format if provided
    if (updates.slug && !/^[a-z0-9-]+$/.test(updates.slug)) {
      return handleError(
        res,
        400,
        "Invalid slug format (use lowercase letters, numbers, and hyphens)"
      );
    }

    // Check for duplicate slug if provided
    if (updates.slug && updates.slug !== dealer.slug) {
      const existingDealer = await Dealer.findOne({
        where: { slug: updates.slug },
      });
      if (existingDealer) {
        return handleError(res, 409, "Slug already exists");
      }
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

    // Prevent updating createdBy
    delete updates.createdBy;
    updates.updatedAt = new Date();

    await dealer.update(updates);

    if (address) {
      const existingAddress = await Address.findOne({
        where: { owner_type: "dealer", owner_id: id },
      });
      if (existingAddress) {
        await existingAddress.update(address);
      } else {
        await Address.create({
          id: uuidv4(),
          owner_type: "dealer",
          owner_id: id,
          ...address,
        });
      }
    }

    logger.info(
      `Dealer updated with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.json({
      message: "Dealer updated successfully",
      dealer: {
        id: dealer.id,
        name: dealer.name,
        slug: dealer.slug,
        company_name: dealer.company_name,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to update dealer", error);
  }
};

exports.contactDealer = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, name, email, phone } = req.body;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid dealer ID format");
    }

    // Input validation
    if (!name || !email || !message) {
      return handleError(res, 400, "Name, email, and message are required");
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleError(res, 400, "Invalid email format");
    }

    // Validate phone format if provided
    if (phone && !/^\+?[\d\s-]{8,15}$/.test(phone)) {
      return handleError(res, 400, "Invalid phone number format");
    }

    const dealer = await Dealer.findByPk(id);
    if (!dealer) {
      return handleError(res, 404, "Dealer not found");
    }

    // Send notification email to dealer or admin
    const subject = `Contact Request from ${name} for Dealer ${dealer.name}`;
    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${
      phone || "Not provided"
    }\nMessage: ${message}`;
    await sendEmail(process.env.ADMIN_EMAIL || dealer.email, subject, text);

    logger.info(`Contact request sent for dealer ID: ${id} by email: ${email}`);
    res.status(200).json({ message: "Contact request sent successfully" });
  } catch (error) {
    handleError(res, 500, "Failed to send contact request", error);
  }
};
