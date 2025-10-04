const Blog = require("../models/blog");
const BlogCategory = require("../models/blogCategory");
const { v4: uuidv4 } = require("uuid");
const winston = require("winston");
require("dotenv").config();

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(), // Console output for development
  ],
});

// Centralized error response handler
const handleError = (res, status, message, error = null) => {
  logger.error(`${message}: ${error?.message || "No additional error info"}`, {
    status,
    stack: error?.stack,
  });
  return res.status(status).json({ error: message });
};

exports.listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("category").lean();
    logger.info(`Retrieved ${blogs.length} blogs`);
    res.json(blogs);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve blogs", error);
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid blog ID format");
    }

    const blog = await Blog.findById(id).populate("category").lean();
    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    logger.info(`Retrieved blog with ID: ${id}`);
    res.json(blog);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve blog", error);
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Basic validation for slug
    if (!slug || typeof slug !== "string") {
      return handleError(res, 400, "Invalid or missing slug");
    }

    const blog = await Blog.findOne({ slug }).populate("category").lean();
    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    logger.info(`Retrieved blog with slug: ${slug}`);
    res.json(blog);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve blog", error);
  }
};

exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      content,
      excerpt,
      bannerImage,
      images,
      seo,
      status,
    } = req.body;

    // Input validation
    if (!title || !slug || !category || !content) {
      return handleError(
        res,
        400,
        "Title, slug, category, and content are required"
      );
    }

    // Validate category exists
    const categoryExists = await BlogCategory.findById(category).lean();
    if (!categoryExists) {
      return handleError(res, 400, "Invalid category ID");
    }

    // Check for duplicate slug
    const existingBlog = await Blog.findOne({ slug }).lean();
    if (existingBlog) {
      return handleError(res, 409, "Slug already exists");
    }

    const blog = await Blog.create({
      _id: uuidv4(),
      title,
      slug,
      category,
      content,
      excerpt,
      bannerImage,
      images,
      seo,
      status,
      createdBy: req.user.id,
    });

    logger.info(`Blog created with ID: ${blog._id} by user: ${req.user.id}`);
    res.status(201).json({
      message: "Blog created successfully",
      blog: {
        _id: blog._id,
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create blog", error);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid blog ID format");
    }

    // Prevent updating createdBy
    delete updates.createdBy;
    updates.updatedAt = new Date();

    const blog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("category");
    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    logger.info(`Blog updated with ID: ${id} by user: ${req.user.id}`);
    res.json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    handleError(res, 500, "Failed to update blog", error);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid blog ID format");
    }

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    logger.info(`Blog deleted with ID: ${id} by user: ${req.user.id}`);
    res.status(204).send();
  } catch (error) {
    handleError(res, 500, "Failed to delete blog", error);
  }
};

exports.listBlogCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.find().lean();
    logger.info(`Retrieved ${categories.length} blog categories`);
    res.json(categories);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve blog categories", error);
  }
};

exports.createBlogCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Input validation
    if (!name || typeof name !== "string") {
      return handleError(
        res,
        400,
        "Category name is required and must be a string"
      );
    }

    // Check for duplicate category
    const existingCategory = await BlogCategory.findOne({ name }).lean();
    if (existingCategory) {
      return handleError(res, 409, "Category name already exists");
    }

    const category = await BlogCategory.create({ _id: uuidv4(), name });
    logger.info(`Blog category created: ${name} with ID: ${category._id}`);
    res.status(201).json({
      message: "Blog category created successfully",
      category: { _id: category._id, name: category.name },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create blog category", error);
  }
};
