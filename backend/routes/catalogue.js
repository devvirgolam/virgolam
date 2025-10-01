const express = require("express");
const router = express.Router();
const catalogueController = require("../controllers/catalogueController"); // Path to your catalogue controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", catalogueController.listCatalogues);
router.get("/:id", catalogueController.getCatalogueById);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, catalogueController.createCatalogue);
router.put("/:id", authMiddleware, catalogueController.updateCatalogue);
router.delete("/:id", authMiddleware, catalogueController.deleteCatalogue);

module.exports = router;
