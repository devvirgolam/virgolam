const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Path to your user controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
// None in this case, as user data is sensitive

// Protected routes (require JWT authentication)
router.get("/", authMiddleware, userController.listUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.post("/", authMiddleware, userController.createUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/me", authMiddleware, userController.getCurrentUser);
router.put("/me", authMiddleware, userController.updateCurrentUser);

module.exports = router;
