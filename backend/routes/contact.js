const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController"); // Path to your contact controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.post("/", contactController.submitContact);

// Protected routes (require JWT authentication)
router.get("/", authMiddleware, contactController.listContacts);

module.exports = router;
