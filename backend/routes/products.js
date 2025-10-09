// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

// Product Routes
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

// ProductMeta Routes
router.get("/product-meta", ProductController.getAllProductMeta);
router.post("/product-meta", ProductController.createProductMeta);
router.put("/product-meta/:id", ProductController.updateProductMeta);
router.delete("/product-meta/:id", ProductController.deleteProductMeta);

// Variant Routes
router.get("/:productId/variants", ProductController.getProductVariants);
router.post("/variants", ProductController.createVariant);
router.put("/variants/:id", ProductController.updateVariant);
router.delete("/variants/:id", ProductController.deleteVariant);

module.exports = router;
