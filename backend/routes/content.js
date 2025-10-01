const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController"); // Path to your content controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", contentController.listContent);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, contentController.createContent);

module.exports = router;
