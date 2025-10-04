const { v4: uuidv4 } = require("uuid");
const winston = require("winston");
const ParentCategory = require("../models/parentCategory"); // Import the ParentCategory model
require("dotenv").config();

// Configure Winston logger (reused from provided code)
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(),
  ],
});

// Centralized error response handler (reused from provided code)
const handleError = (res, status, message, error = null) => {
  logger.error(`${message}: ${error?.message || "No additional error info"}`, {
    status,
    stack: error?.stack,
  });
  return res.status(status).json({ error: message });
};

// List all parent categories
exports.listParentCategories = async (req, res) => {
  try {
    const parentCategories = await ParentCategory.findAll();
    logger.info(`Retrieved ${parentCategories.length} parent categories`);
    res.json(parentCategories);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve parent categories", error);
  }
};

// Get a single parent category by ID
exports.getParentCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid parent category ID format");
    }

    const parentCategory = await ParentCategory.findByPk(id);
    if (!parentCategory) {
      return handleError(res, 404, "Parent category not found");
    }

    logger.info(`Retrieved parent category with ID: ${id}`);
    res.json(parentCategory);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve parent category", error);
  }
};

// Create a new parent category
exports.createParentCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    // Input validation
    if (!name || !slug) {
      return handleError(res, 400, "Name and slug are required");
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
    const existingCategory = await ParentCategory.findOne({ where: { slug } });
    if (existingCategory) {
      return handleError(res, 409, "Slug already exists");
    }

    const parentCategory = await ParentCategory.create({
      id: uuidv4(),
      name,
      slug,
      createdBy: req.user?.id, // Optional: Track creator if authenticated
    });

    logger.info(
      `Parent category created with ID: ${
        parentCategory.id
      }, slug: ${slug} by user: ${req.user?.id || "unknown"}`
    );
    res.status(201).json({
      message: "Parent category created successfully",
      parentCategory: {
        id: parentCategory.id,
        name: parentCategory.name,
        slug: parentCategory.slug,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create parent category", error);
  }
};

// Update an existing parent category
exports.updateParentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid parent category ID format");
    }

    const parentCategory = await ParentCategory.findByPk(id);
    if (!parentCategory) {
      return handleError(res, 404, "Parent category not found");
    }

    // Input validation for updates
    if (name === undefined && slug === undefined) {
      return handleError(
        res,
        400,
        "At least one field (name or slug) must be provided"
      );
    }

    // Validate slug format if provided
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return handleError(
        res,
        400,
        "Invalid slug format (use lowercase letters, numbers, and hyphens)"
      );
    }

    // Check for duplicate slug if provided
    if (slug && slug !== parentCategory.slug) {
      const existingCategory = await ParentCategory.findOne({
        where: { slug },
      });
      if (existingCategory) {
        return handleError(res, 409, "Slug already exists");
      }
    }

    const updates = { name, slug, updated_at: new Date() };
    // Remove undefined fields
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    await parentCategory.update(updates);
    logger.info(
      `Parent category updated with ID: ${id} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.json({
      message: "Parent category updated successfully",
      parentCategory,
    });
  } catch (error) {
    handleError(res, 500, "Failed to update parent category", error);
  }
};

// Delete a parent category
exports.deleteParentCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid parent category ID format");
    }

    const parentCategory = await ParentCategory.findByPk(id);
    if (!parentCategory) {
      return handleError(res, 404, "Parent category not found");
    }

    // Note: If ParentCategory can have related Categories in another table,
    // you may need to check for dependencies here (e.g., child categories).
    // For simplicity, assuming no such check is needed unless specified.

    await parentCategory.destroy();
    logger.info(
      `Parent category deleted with ID: ${id} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.status(204).send();
  } catch (error) {
    handleError(res, 500, "Failed to delete parent category", error);
  }
};
