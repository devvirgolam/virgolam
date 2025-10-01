const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Path to your controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
