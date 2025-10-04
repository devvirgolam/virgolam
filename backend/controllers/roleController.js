const Role = require("../models/role");
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

exports.listRoles = async (req, res) => {
  try {
    // Optional: Restrict to authorized users

    const roles = await Role.findAll();
    logger.info(
      `Retrieved ${roles.length} roles by user: ${req.user?.id || "unknown"}`
    );
    res.json(roles);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve roles", error);
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Input validation
    if (!name) {
      return handleError(res, 400, "Role name is required");
    }

    // Check for duplicate role name
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return handleError(res, 409, "Role name already exists");
    }

    const role = await Role.create({
      name,

      createdBy: req.user?.id, // Optional: Track creator
    });

    logger.info(
      `Role created with ID: ${role.id}, name: ${name} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.status(201).json({
      message: "Role created successfully",
      role: {
        id: role.id,
        name: role.name,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create role", error);
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate ID (assuming integer ID, adjust if UUID)
    if (!id || isNaN(id)) {
      return handleError(res, 400, "Invalid role ID format");
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return handleError(res, 404, "Role not found");
    }

    // Validate updates
    if (!name) {
      return handleError(
        res,
        400,
        "At least one field (name or ) must be provided"
      );
    }

    // Check for duplicate role name if provided
    if (name && name !== role.name) {
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole) {
        return handleError(res, 409, "Role name already exists");
      }
    }

    const updates = { name, updatedAt: new Date() };
    // Remove undefined fields
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );
    // Prevent updating createdBy
    delete updates.createdBy;

    await role.update(updates);
    logger.info(
      `Role updated with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.json({
      message: "Role updated successfully",
      role: {
        id: role.id,
        name: role.name,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to update role", error);
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID (assuming integer ID, adjust if UUID)
    if (!id || isNaN(id)) {
      return handleError(res, 400, "Invalid role ID format");
    }

    const role = await Role.findByPk(id);
    if (!role) {
      return handleError(res, 404, "Role not found");
    }

    // Prevent deletion of critical roles (e.g., 'admin')
    if (role.name === "ADMIN") {
      return handleError(res, 400, "Cannot delete critical role 'admin'");
    }

    // Check if role is assigned to users (assuming a User model with role_id)
    const User = require("../models/user"); // Adjust path as needed
    const usersWithRole = await User.count({ where: { role_id: id } });
    if (usersWithRole > 0) {
      return handleError(res, 400, "Cannot delete role assigned to users");
    }

    await role.destroy();
    logger.info(
      `Role deleted with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.status(204).send();
  } catch (error) {
    handleError(res, 500, "Failed to delete role", error);
  }
};
