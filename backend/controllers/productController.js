// controllers/ProductController.js
const { Op } = require("sequelize");
const slugify = require("slugify"); // Optional: for generating slugs
const Product = require("../models/product");
const ProductMeta = require("../models/productMeta");
const Variant = require("../models/variant");
// Product CRUD
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Variant, as: "variants" }],
    });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Variant, as: "variants" }],
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch product", details: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      parent_category_id,
      category_id,
      sku,
      meta,
      images,
      seo_title,
      seo_description,
      seo_keywords,
    } = req.body;

    const product = await Product.create({
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description,
      parent_category_id,
      category_id,
      sku,
      meta,
      images,
      seo_title,
      seo_description,
      seo_keywords,
    });

    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create product", details: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const {
      name,
      description,
      parent_category_id,
      category_id,
      sku,
      meta,
      images,
      seo_title,
      seo_description,
      seo_keywords,
    } = req.body;

    await product.update({
      name,
      slug: name ? slugify(name, { lower: true, strict: true }) : product.slug,
      description,
      parent_category_id,
      category_id,
      sku,
      meta,
      images,
      seo_title,
      seo_description,
      seo_keywords,
    });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update product", details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete product", details: error.message });
  }
};

// ProductMeta CRUD
const getAllProductMeta = async (req, res) => {
  try {
    const metas = await ProductMeta.findAll();
    res.status(200).json(metas);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch product metadata",
      details: error.message,
    });
  }
};

const createProductMeta = async (req, res) => {
  try {
    const { title, fieldType, unit } = req.body;
    const meta = await ProductMeta.create({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      fieldType,
      unit,
    });
    res.status(201).json(meta);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create product metadata",
      details: error.message,
    });
  }
};

const updateProductMeta = async (req, res) => {
  try {
    const meta = await ProductMeta.findByPk(req.params.id);
    if (!meta) {
      return res.status(404).json({ error: "Product metadata not found" });
    }

    const { title, fieldType, unit } = req.body;
    await meta.update({
      title,
      slug: title ? slugify(title, { lower: true, strict: true }) : meta.slug,
      fieldType,
      unit,
    });

    res.status(200).json(meta);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update product metadata",
      details: error.message,
    });
  }
};

const deleteProductMeta = async (req, res) => {
  try {
    const meta = await ProductMeta.findByPk(req.params.id);
    if (!meta) {
      return res.status(404).json({ error: "Product metadata not found" });
    }

    await meta.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete product metadata",
      details: error.message,
    });
  }
};

// Variant CRUD
const getProductVariants = async (req, res) => {
  try {
    const variants = await Variant.findAll({
      where: { parent_product_id: req.params.productId },
      include: [{ model: Product, as: "variant_product" }],
    });
    res.status(200).json(variants);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch variants", details: error.message });
  }
};

const createVariant = async (req, res) => {
  try {
    const { parent_product_id, variant_product_id, group_label, position } =
      req.body;

    // Verify both products exist
    const [parentProduct, variantProduct] = await Promise.all([
      Product.findByPk(parent_product_id),
      Product.findByPk(variant_product_id),
    ]);

    if (!parentProduct || !variantProduct) {
      return res
        .status(404)
        .json({ error: "Parent or variant product not found" });
    }

    const variant = await Variant.create({
      parent_product_id,
      variant_product_id,
      group_label,
      position,
    });

    res.status(201).json(variant);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create variant", details: error.message });
  }
};

const updateVariant = async (req, res) => {
  try {
    const variant = await Variant.findByPk(req.params.id);
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    const { parent_product_id, variant_product_id, group_label, position } =
      req.body;
    await variant.update({
      parent_product_id,
      variant_product_id,
      group_label,
      position,
    });

    res.status(200).json(variant);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update variant", details: error.message });
  }
};

const deleteVariant = async (req, res) => {
  try {
    const variant = await Variant.findByPk(req.params.id);
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    await variant.destroy();
    res.status(204).json();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete variant", details: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductMeta,
  createProductMeta,
  updateProductMeta,
  deleteProductMeta,
  getProductVariants,
  createVariant,
  updateVariant,
  deleteVariant,
};
