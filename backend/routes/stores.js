const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController"); // Path to your store controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", storeController.listStores);
router.get("/:id", storeController.getStoreById);
router.get("/location", storeController.findStoresByLocation);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, storeController.createStore);

module.exports = router;
