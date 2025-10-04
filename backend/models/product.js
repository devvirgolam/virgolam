const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");
const Category = require("./category");

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
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    images: DataTypes.TEXT,
    seo: DataTypes.TEXT,
  },
  {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Product;
