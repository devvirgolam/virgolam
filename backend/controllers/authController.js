const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/mysql/User");
require("dotenv").config();

// Placeholder for email service (e.g., Nodemailer or third-party service like SendGrid)
const sendEmail = async (to, subject, text) => {
  // Implement email sending logic here (e.g., using Nodemailer)
  console.log(`Sending email to ${to}: ${subject} - ${text}`);
  // Example: await nodemailer.sendMail({ to, subject, text });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: "Invalid credentials" });
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

  res.json({ accessToken, refreshToken });
};

exports.register = async (req, res) => {
  const { username, email, password, name, phone, role_id } = req.body;

  // Basic validation
  if (!username || !email || !password || !role_id) {
    return res
      .status(400)
      .json({ message: "Username, email, password, and role_id are required" });
  }

  // Check for existing user
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
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

  res.status(201).json(user);
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};

exports.logout = async (req, res) => {
  // In a stateless JWT setup, logout is typically handled client-side by discarding tokens
  // Optionally, you can implement server-side token invalidation by storing refresh tokens
  // For simplicity, we'll assume client-side token removal
  res.status(200).json({ message: "Logged out successfully" });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a reset token (valid for 1 hour)
  const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Store the reset token in the database (optional, for additional security)
  // For simplicity, we'll assume the token is sent directly
  const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

  // Send email with reset link
  await sendEmail(
    user.email,
    "Password Reset Request",
    `Click this link to reset your password: ${resetLink}`
  );

  res.status(200).json({ message: "Password reset link sent to email" });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await user.update({ password_hash });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired reset token" });
  }
};
