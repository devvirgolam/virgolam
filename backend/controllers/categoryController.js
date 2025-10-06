const Category = require("../models/category");
const ParentCategory = require("../models/parentCategory");
const parentCategory = require("../models/parentCategory");
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

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: ParentCategory, as: "parent_categories" }],
    });
    logger.info(`Retrieved ${categories.length} categories`);
    res.json(categories);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve categories", error);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid category ID format");
    }

    const category = await Category.findByPk(id, {
      include: [{ model: ParentCategory, as: "parent_categories" }],
    });
    if (!category) {
      return handleError(res, 404, "Category not found");
    }

    logger.info(`Retrieved category with ID: ${id}`);
    res.json(category);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve category", error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, slug, parent_id } = req.body;

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
    const existingCategory = await Category.findOne({ where: { slug } });
    if (existingCategory) {
      return handleError(res, 409, "Slug already exists");
    }

    // Validate parent_id if provided
    if (parent_id) {
      if (
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          parent_id
        )
      ) {
        return handleError(res, 400, "Invalid parent category ID format");
      }
      const parentCategory = await Category.findByPk(parent_id);
      if (!parentCategory) {
        return handleError(res, 400, "Parent category not found");
      }
    }

    const category = await Category.create({
      id: uuidv4(),
      name,
      slug,
      parent_id,
      createdBy: req.user?.id, // Optional: Track creator if authenticated
    });

    logger.info(
      `Category created with ID: ${category.id}, slug: ${slug} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.status(201).json({
      message: "Category created successfully",
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        parent_id: category.parent_id,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create category", error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, parent_id } = req.body;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid category ID format");
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return handleError(res, 404, "Category not found");
    }

    // Input validation for updates
    if (name === undefined && slug === undefined && parent_id === undefined) {
      return handleError(
        res,
        400,
        "At least one field (name, slug, or parent_id) must be provided"
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
    if (slug && slug !== category.slug) {
      const existingCategory = await Category.findOne({ where: { slug } });
      if (existingCategory) {
        return handleError(res, 409, "Slug already exists");
      }
    }

    // Validate parent_id if provided
    if (parent_id) {
      if (
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          parent_id
        )
      ) {
        return handleError(res, 400, "Invalid parent category ID format");
      }
      const parentCategory = await Category.findByPk(parent_id);
      if (!parentCategory) {
        return handleError(res, 400, "Parent category not found");
      }
      // Prevent self-referencing
      if (parent_id === id) {
        return handleError(res, 400, "Category cannot be its own parent");
      }
      // Check for cyclic relationships (basic check)
      if (parentCategory.parent_id === id) {
        return handleError(
          res,
          400,
          "Cyclic parent-child relationship detected"
        );
      }
    }

    const updates = { name, slug, parent_id, updatedAt: new Date() };
    // Remove undefined fields
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );
    // Prevent updating createdBy
    delete updates.createdBy;

    await category.update(updates);
    logger.info(
      `Category updated with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    handleError(res, 500, "Failed to update category", error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid category ID format");
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return handleError(res, 404, "Category not found");
    }

    // Check for child categories
    const childCategories = await Category.findAll({
      where: { parent_id: id },
    });
    if (childCategories.length > 0) {
      return handleError(
        res,
        400,
        "Cannot delete category with child categories"
      );
    }

    await category.destroy();
    logger.info(
      `Category deleted with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.status(204).send();
  } catch (error) {
    handleError(res, 500, "Failed to delete category", error);
  }
};
