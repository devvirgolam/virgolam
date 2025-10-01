const express = require("express");
const router = express.Router();
const dealerController = require("../controllers/dealerController"); // Path to your dealer controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", dealerController.listDealers);
router.get("/:id", dealerController.getDealerById);
router.get("/slug/:slug", dealerController.getDealerBySlug);
router.post("/:id/contact", dealerController.contactDealer);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, dealerController.createDealer);
router.put("/:id", authMiddleware, dealerController.updateDealer);

module.exports = router;
