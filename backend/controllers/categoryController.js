const Category = require("../models/mysql/Category");
const { v4: uuidv4 } = require("uuid");

exports.listCategories = async (req, res) => {
  const categories = await Category.findAll({
    include: [{ model: Category, as: "parent" }],
  });
  res.json(categories);
};

exports.getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id, {
    include: [{ model: Category, as: "parent" }],
  });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
};

exports.createCategory = async (req, res) => {
  const { name, slug, parent_id } = req.body;
  const category = await Category.create({
    id: uuidv4(),
    name,
    slug,
    parent_id,
  });
  res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const category = await Category.findByPk(id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  await category.update(updates);
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  await category.destroy();
  res.status(204).send();
};
