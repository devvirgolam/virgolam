const Content = require("../models/mysql/Content");
const CacheService = require("../services/cache");
const { v4: uuidv4 } = require("uuid");

exports.listContent = async (req, res) => {
  const { type } = req.query; // Optional query param to filter by type (csr, event, certification, coverage)
  const cacheKey = type ? `content_list_${type}` : "content_list";
  let contents = await CacheService.get(cacheKey);

  if (!contents) {
    const where = type ? { type } : {};
    contents = await Content.findAll({ where });
    await CacheService.set(cacheKey, contents, 300); // Cache for 5 minutes
  }

  res.json(contents);
};

exports.createContent = async (req, res) => {
  const { type, title, description, image_url, date, location } = req.body;
  if (!["csr", "event", "certification", "coverage"].includes(type)) {
    return res.status(400).json({ message: "Invalid content type" });
  }

  const content = await Content.create({
    id: uuidv4(),
    type,
    title,
    description,
    image_url,
    date: type === "event" ? date : null,
    location: type === "event" ? location : null,
  });

  await CacheService.del("content_list");
  await CacheService.del(`content_list_${type}`);
  res.status(201).json(content);
};
