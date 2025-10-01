const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController"); // Path to your role controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", roleController.listRoles);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, roleController.createRole);
router.put("/:id", authMiddleware, roleController.updateRole);
router.delete("/:id", authMiddleware, roleController.deleteRole);

module.exports = router;
