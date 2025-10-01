const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController"); // Path to your category controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", categoryController.listCategories);
router.get("/:id", categoryController.getCategory);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, categoryController.createCategory);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;
