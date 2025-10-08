const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
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
    new winston.transports.Console(),
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

// Helper function to sanitize user data for logging
const sanitizeUserForLogging = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role ? { id: user.role.id, name: user.role.name } : null,
});

exports.listUsers = async (req, res) => {
  try {
    if (!req.user || !["ADMIN", "SUPER_ADMIN"].includes(req.user.role)) {
      return handleError(res, 403, "Only admins can list users");
    }
    const users = await User.findAll({
      include: { model: Role, as: "role", attributes: ["id", "name"] },
    });
    logger.info(`Retrieved ${users.length} users by user: ${req.user.id}`);
    const sanitizedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role ? { id: user.role.id, name: user.role.name } : null,
    }));
    res.json(sanitizedUsers);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve users", error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Restrict to admin or self
    if (
      !req.user ||
      (req.user.role !== "ADMIN" &&
        req.user.id !== id &&
        req.user.role !== "SUPER_ADMIN")
    ) {
      return handleError(res, 403, "Unauthorized access");
    }

    const user = await User.findByPk(id, {
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    });
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    logger.info(`Retrieved user with ID: ${id} by user: ${req.user.id}`);
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role ? { id: user.role.id, name: user.role.name } : null,
    });
  } catch (error) {
    handleError(res, 500, "Failed to retrieve user", error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, name, phone, role_id } = req.body;

    // Input validation
    if (!username || !email || !password || !role_id) {
      return handleError(
        res,
        400,
        "Username, email, password, and role ID are required"
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleError(res, 400, "Invalid email format");
    }

    // Validate phone format if provided
    if (phone && !/^\+?[\d\s-]{8,15}$/.test(phone)) {
      return handleError(res, 400, "Invalid phone number format");
    }

    // Validate role_id
    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        role_id
      )
    ) {
      return handleError(res, 400, "Invalid role ID format");
    }
    const role = await Role.findByPk(role_id);
    if (!role) {
      return handleError(res, 400, "Role not found");
    }

    // Restrict to admin users
    if (
      !req.user ||
      (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN")
    ) {
      return handleError(res, 403, "Unauthorized access");
    }

    // Check for duplicate username or email
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (existingUser) {
      return handleError(res, 409, "Username or email already exists");
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      id: uuidv4(),
      username,
      email,
      password_hash,
      name,
      phone,
      role_id,
      createdBy: req.user.id,
    });

    logger.info(
      `User created with ID: ${user.id}, email: ${email} by user: ${req.user.id}`
    );
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: { id: role.id, name: role.name },
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create user", error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, name, phone, role_id } = req.body;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid user ID format");
    }

    // Restrict to admin or self
    if (
      !req.user ||
      (req.user.role !== "ADMIN" &&
        req.user.id !== id &&
        req.user.role !== "SUPER_ADMIN")
    ) {
      return handleError(res, 403, "Unauthorized access");
    }

    const user = await User.findByPk(id, {
      include: { model: Role, as: "role", attributes: ["id", "name"] },
    });
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    // Validate updates
    if (!username && !email && !password && !name && !phone && !role_id) {
      return handleError(res, 400, "At least one field must be provided");
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleError(res, 400, "Invalid email format");
    }

    // Validate phone format if provided
    if (phone && !/^\+?[\d\s-]{8,15}$/.test(phone)) {
      return handleError(res, 400, "Invalid phone number format");
    }

    // Validate role_id if provided
    let role = user.role;
    if (role_id) {
      if (
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          role_id
        )
      ) {
        return handleError(res, 400, "Invalid role ID format");
      }
      role = await Role.findByPk(role_id);
      if (!role) {
        return handleError(res, 400, "Role not found");
      }
    }

    // Check for duplicate username or email if provided
    if (username || email) {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            username && username !== user.username ? { username } : null,
            email && email !== user.email ? { email } : null,
          ].filter(Boolean),
        },
      });
      if (existingUser) {
        return handleError(res, 409, "Username or email already exists");
      }
    }

    const updates = {
      username,
      email,
      name,
      phone,
      role_id,
      updatedAt: new Date(),
    };
    if (password) {
      updates.password_hash = await bcrypt.hash(password, 10);
    }
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );
    delete updates.createdBy;

    await user.update(updates);
    logger.info(`User updated with ID: ${id} by user: ${req.user.id}`);
    res.json({
      message: "User updated successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: role ? { id: role.id, name: role.name } : null,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to update user", error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate UUID format
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid user ID format");
    }

    if (
      !req.user ||
      (req.user.role !== "ADMIN" &&
        req.user.id !== id &&
        req.user.role !== "SUPER_ADMIN")
    ) {
      return handleError(res, 403, "Unauthorized access");
    }

    // Prevent self-deletion
    if (req.user.id === id) {
      return handleError(res, 400, "Cannot delete your own account");
    }

    const user = await User.findByPk(id, {
      include: { model: Role, as: "role", attributes: ["id", "name"] },
    });
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    // Prevent deletion of SUPER_ADMIN users unless requester is SUPER_ADMIN
    if (user.role?.name === "SUPER_ADMIN" && req.user.role !== "SUPER_ADMIN") {
      return handleError(res, 403, "Cannot delete a SUPER_ADMIN user");
    }

    await user.destroy();
    logger.info(`User deleted with ID: ${id} by user: ${req.user.id}`);
    res.status(204).send();
  } catch (error) {
    handleError(res, 500, "Failed to delete user", error);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // Log the entire req.user object and request headers for debugging
    logger.info(
      `Fetching current user with req.user: ${JSON.stringify(req.user)}`
    );
    logger.info(`Request headers: ${JSON.stringify(req.headers)}`);
    if (!req.user?.id) {
      logger.error("req.user.id is undefined or missing");
      return handleError(res, 401, "Unauthorized: No user ID provided");
    }

    // Log database connection status
    try {
      await sequelize.authenticate();
      logger.info("Database connection successful");
    } catch (dbError) {
      logger.error(`Database connection failed: ${dbError.message}`, {
        stack: dbError.stack,
      });
    }

    // Attempt to fetch user
    logger.info(`Attempting to fetch user with ID: ${req.user.id}`);
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    });

    if (!user) {
      // Fallback query without Role association
      const fallbackUser = await User.findByPk(req.user.id);
      logger.error(
        `User not found for ID: ${
          req.user.id
        }, Fallback query result: ${JSON.stringify(fallbackUser)}`
      );
      return handleError(res, 404, "User not found");
    }

    logger.info(
      `Retrieved current user: ${JSON.stringify(sanitizeUserForLogging(user))}`
    );
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role ? { id: user.role.id, name: user.role.name } : null,
    });
  } catch (error) {
    logger.error(`Failed to retrieve current user: ${error.message}`, {
      stack: error.stack,
    });
    handleError(res, 500, "Internal server error", error);
  }
};

exports.updateCurrentUser = async (req, res) => {
  try {
    const { username, email, password, name, phone } = req.body;

    // Validate updates
    if (!username && !email && !password && !name && !phone) {
      return handleError(res, 400, "At least one field must be provided");
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleError(res, 400, "Invalid email format");
    }

    // Validate phone format if provided
    if (phone && !/^\+?[\d\s-]{8,15}$/.test(phone)) {
      return handleError(res, 400, "Invalid phone number format");
    }

    const user = await User.findByPk(req.user.id, {
      include: { model: Role, as: "role", attributes: ["id", "name"] },
    });
    if (!user) {
      return handleError(res, 404, "User not found");
    }

    // Check for duplicate username or email if provided
    if (username || email) {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            username && username !== user.username ? { username } : null,
            email && email !== user.email ? { email } : null,
          ].filter(Boolean),
        },
      });
      if (existingUser) {
        return handleError(res, 409, "Username or email already exists");
      }
    }

    const updates = { username, email, name, phone, updatedAt: new Date() };
    if (password) {
      updates.password_hash = await bcrypt.hash(password, 10);
    }
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );
    delete updates.role_id;
    delete updates.createdBy;

    await user.update(updates);
    logger.info(`Current user updated with ID: ${req.user.id}`);
    res.json({
      message: "User updated successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role ? { id: user.role.id, name: user.role.name } : null,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to update current user", error);
  }
};
