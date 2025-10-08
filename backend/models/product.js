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

    // Relationships
    parent_category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "parent_categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    // Product details
    design_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "e.g., 2926",
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "e.g., German Ash",
    },
    thickness: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "e.g., 0.8mm",
    },
    finish: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "e.g., GH, SF, Matte",
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "e.g., 8x4",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Media
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Array of image URLs",
    },

    // SEO
    seo_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    seo_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    seo_keywords: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Product;
