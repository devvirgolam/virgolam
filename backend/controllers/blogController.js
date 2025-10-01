const Blog = require("../models/blog");
const BlogCategory = require("../models/blogCategory");
const CacheService = require("../models/cache");
const { v4: uuidv4 } = require("uuid");

exports.listBlogs = async (req, res) => {
  const cacheKey = "blogs_list";
  let blogs = await CacheService.get(cacheKey);

  if (!blogs) {
    blogs = await Blog.find().populate("category").lean();
    await CacheService.set(cacheKey, blogs, 300); // Cache for 5 minutes
  }

  res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const cacheKey = `blog_${req.params.id}`;
  let blog = await CacheService.get(cacheKey);

  if (!blog) {
    blog = await Blog.findById(req.params.id).populate("category").lean();
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    await CacheService.set(cacheKey, blog, 300);
  }

  res.json(blog);
};

exports.getBlogBySlug = async (req, res) => {
  const cacheKey = `blog_slug_${req.params.slug}`;
  let blog = await CacheService.get(cacheKey);

  if (!blog) {
    blog = await Blog.findOne({ slug: req.params.slug })
      .populate("category")
      .lean();
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    await CacheService.set(cacheKey, blog, 300);
  }

  res.json(blog);
};

exports.createBlog = async (req, res) => {
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
  await CacheService.del("blogs_list"); // Invalidate cache
  res.status(201).json(blog);
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  updates.updatedAt = new Date();
  const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  await CacheService.del(`blog_${id}`);
  await CacheService.del("blogs_list");
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  await CacheService.del(`blog_${id}`);
  await CacheService.del("blogs_list");
  res.status(204).send();
};

exports.listBlogCategories = async (req, res) => {
  const cacheKey = "blog_categories_list";
  let categories = await CacheService.get(cacheKey);

  if (!categories) {
    categories = await BlogCategory.find().lean();
    await CacheService.set(cacheKey, categories, 300);
  }

  res.json(categories);
};

exports.createBlogCategory = async (req, res) => {
  const { name } = req.body;
  const category = await BlogCategory.create({ _id: uuidv4(), name });
  await CacheService.del("blog_categories_list");
  res.status(201).json(category);
};
