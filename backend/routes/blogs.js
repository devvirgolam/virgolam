const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/auth");

// Public routes (no authentication required)
router.get("/", blogController.listBlogs);
router.get("/categories", blogController.fetchAllBlogCategories); // Moved before /:id
router.get("/categories/:id", blogController.fetchBlogCategoryById);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.get("/:id", blogController.getBlogById); // Now after specific routes

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, blogController.createBlog);
router.put("/:id", authMiddleware, blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);
router.post(
  "/categories/add",
  authMiddleware,
  blogController.createBlogCategory
);
router.put(
  "/categories/:id",
  authMiddleware,
  blogController.updateBlogCategory
);
router.delete(
  "/categories/:id",
  authMiddleware,
  blogController.deleteBlogCategory
);

module.exports = router;
