const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController"); // Path to your blog controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", blogController.listBlogs);
router.get("/:id", blogController.getBlogById);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.get("/categories", blogController.listBlogCategories);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, blogController.createBlog);
router.put("/:id", authMiddleware, blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);
router.post("/categories", authMiddleware, blogController.createBlogCategory);

module.exports = router;
