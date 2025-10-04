const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const winston = require("winston"); // Added Winston for logging
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
    new winston.transports.Console(), // Log to console for development
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

// Placeholder for email service
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return handleError(res, 400, "Email and password are required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      return handleError(res, 401, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      logger.warn(`Invalid password attempt for email: ${email}`);
      return handleError(res, 401, "Invalid credentials");
    }

    const accessToken = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    logger.info(`Successful login for user: ${email}`);
    res.json({ accessToken, refreshToken });
  } catch (error) {
    handleError(res, 500, "Internal server error", error);
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, name, phone, role_id } = req.body;

    // Input validation
    if (!username || !email || !password || !role_id) {
      return handleError(
        res,
        400,
        "Username, email, password, and role_id are required"
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return handleError(res, 409, "Email already exists");
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
    });

    logger.info(`New user registered: ${email}`);
    res
      .status(201)
      .json({
        message: "User created successfully",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    handleError(res, 500, "Internal server error", error);
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return handleError(res, 400, "Refresh token is required");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return handleError(res, 401, "Invalid refresh token");
    }

    const accessToken = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`Access token refreshed for user ID: ${user.id}`);
    res.json({ accessToken });
  } catch (error) {
    handleError(res, 401, "Invalid or expired refresh token", error);
  }
};

exports.logout = async (req, res) => {
  try {
    // Note: In a stateless JWT setup, logout is handled client-side
    logger.info("User logged out");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    handleError(res, 500, "Internal server error", error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return handleError(res, 400, "Email is required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn(`Password reset requested for non-existent email: ${email}`);
      return handleError(res, 404, "User not found");
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Click this link to reset your password: ${resetLink}`
    );

    logger.info(`Password reset link sent to: ${email}`);
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    handleError(res, 500, "Internal server error", error);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return handleError(res, 400, "Token and new password are required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return handleError(res, 404, "User not found");
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await user.update({ password_hash });

    logger.info(`Password reset successful for user: ${user.email}`);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    handleError(res, 401, "Invalid or expired reset token", error);
  }
};
