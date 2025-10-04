const Catalogue = require("../models/catalogues");
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

exports.listCatalogues = async (req, res) => {
  try {
    const catalogues = await Catalogue.findAll();
    logger.info(`Retrieved ${catalogues.length} catalogues`);
    res.json(catalogues);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve catalogues", error);
  }
};

exports.getCatalogueById = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid catalogue ID format");
    }

    const catalogue = await Catalogue.findByPk(id);
    if (!catalogue) {
      return handleError(res, 404, "Catalogue not found");
    }

    logger.info(`Retrieved catalogue with ID: ${id}`);
    res.json(catalogue);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve catalogue", error);
  }
};

exports.createCatalogue = async (req, res) => {
  try {
    const { name, pdf_url, banner_image_url } = req.body;

    // Input validation
    if (!name || !pdf_url || !banner_image_url) {
      return handleError(
        res,
        400,
        "Name, PDF URL, and banner image URL are required"
      );
    }

    // Validate URL formats
    const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/;
    if (!urlRegex.test(pdf_url)) {
      return handleError(res, 400, "Invalid PDF URL format");
    }
    if (!urlRegex.test(banner_image_url)) {
      return handleError(res, 400, "Invalid banner image URL format");
    }

    // Check for duplicate name
    const existingCatalogue = await Catalogue.findOne({ where: { name } });
    if (existingCatalogue) {
      return handleError(res, 409, "Catalogue name already exists");
    }

    const catalogue = await Catalogue.create({
      id: uuidv4(),
      name,
      pdf_url,
      banner_image_url,
      createdBy: req.user?.id, // Optional: Track creator if authenticated
    });

    logger.info(
      `Catalogue created with ID: ${catalogue.id} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.status(201).json({
      message: "Catalogue created successfully",
      catalogue: {
        id: catalogue.id,
        name: catalogue.name,
        pdf_url: catalogue.pdf_url,
        banner_image_url: catalogue.banner_image_url,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create catalogue", error);
  }
};

exports.updateCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid catalogue ID format");
    }

    // Validate URL formats if provided
    if (
      updates.pdf_url &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(updates.pdf_url)
    ) {
      return handleError(res, 400, "Invalid PDF URL format");
    }
    if (
      updates.banner_image_url &&
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(updates.banner_image_url)
    ) {
      return handleError(res, 400, "Invalid banner image URL format");
    }

    // Prevent updating createdBy
    delete updates.createdBy;
    updates.updatedAt = new Date();

    const catalogue = await Catalogue.findByPk(id);
    if (!catalogue) {
      return handleError(res, 404, "Catalogue not found");
    }

    await catalogue.update(updates);
    logger.info(
      `Catalogue updated with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.json({
      message: "Catalogue updated successfully",
      catalogue,
    });
  } catch (error) {
    handleError(res, 500, "Failed to update catalogue", error);
  }
};

exports.deleteCatalogue = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid catalogue ID format");
    }

    const catalogue = await Catalogue.findByPk(id);
    if (!catalogue) {
      return handleError(res, 404, "Catalogue not found");
    }

    await catalogue.destroy();
    logger.info(
      `Catalogue deleted with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.status(204).send();
  } catch (error) {
    handleError(res, 500, "Failed to delete catalogue", error);
  }
};
