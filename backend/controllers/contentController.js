const Content = require("../models/content");
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

exports.listContent = async (req, res) => {
  try {
    const { type } = req.query;

    // Validate type if provided
    if (type && !["csr", "event", "certification", "coverage"].includes(type)) {
      return handleError(res, 400, "Invalid content type");
    }

    const where = type ? { type } : {};
    const contents = await Content.findAll({ where });
    logger.info(
      `Retrieved ${contents.length} content items${
        type ? ` of type: ${type}` : ""
      }`
    );
    res.json(contents);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve content", error);
  }
};

exports.createContent = async (req, res) => {
  try {
    const { type, title, description, image_url, date, location } = req.body;

    // Input validation
    if (!type || !title || !description || !image_url) {
      return handleError(
        res,
        400,
        "Type, title, description, and image URL are required"
      );
    }

    // Validate content type
    const validTypes = ["csr", "event", "certification", "coverage"];
    if (!validTypes.includes(type)) {
      return handleError(res, 400, "Invalid content type");
    }

    // Validate image_url format
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(image_url)) {
      return handleError(res, 400, "Invalid image URL format");
    }

    // Validate date and location for events
    if (type === "event") {
      if (!date || isNaN(Date.parse(date))) {
        return handleError(res, 400, "Valid date is required for event type");
      }
      if (!location) {
        return handleError(res, 400, "Location is required for event type");
      }
    }

    // Check for duplicate title (optional, adjust based on requirements)
    const existingContent = await Content.findOne({ where: { title } });
    if (existingContent) {
      return handleError(res, 409, "Content with this title already exists");
    }

    const content = await Content.create({
      id: uuidv4(),
      type,
      title,
      description,
      image_url,
      date: type === "event" ? date : null,
      location: type === "event" ? location : null,
      createdBy: req.user?.id, // Optional: Track creator if authenticated
    });

    logger.info(
      `Content created with ID: ${
        content.id
      }, type: ${type}, title: ${title} by user: ${req.user?.id || "unknown"}`
    );
    res.status(201).json({
      message: "Content created successfully",
      content: {
        id: content.id,
        type: content.type,
        title: content.title,
        image_url: content.image_url,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create content", error);
  }
};
