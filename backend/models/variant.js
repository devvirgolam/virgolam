const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.mysql");
const Product = require("./Product");

const Variant = sequelize.define(
  "Variant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
    },
    sku: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    attributes: DataTypes.TEXT,
    images: DataTypes.TEXT,
  },
  {
    tableName: "variants",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Variant.belongsTo(Product, { foreignKey: "product_id" });

module.exports = Variant;
