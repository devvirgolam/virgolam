// models/Variant.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");
const Product = require("./product");

const Variant = sequelize.define(
  "Variant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Parent product (the main one shown to user)
    parent_product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    // The child product (the variant)
    variant_product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    // Optional metadata for mapping clarity
    group_label: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Optional label or grouping name, e.g. 'color', 'finish', etc.",
    },

    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Order of variant display within group",
    },
  },
  {
    tableName: "variants",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Variant;
