// models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    sku: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    parent_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // 🧠 Dynamic meta values (JSON)
    meta: {
      type: DataTypes.JSON,
      allowNull: true,
      comment:
        "Holds key-value pairs for dynamic metadata fields based on ProductMeta definitions",
      // Example: { design_code: '2926', thickness: '0.8mm', finish: 'Matte' }
    },

    images: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Array of image URLs",
    },

    seo_title: DataTypes.STRING(255),
    seo_description: DataTypes.TEXT,
    seo_keywords: DataTypes.STRING(500),
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Product;
