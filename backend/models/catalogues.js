const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");
const ParentCategory = require("./parentCategory");

const Catalogue = sequelize.define(
  "Catalogue",
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
    pdf_url: DataTypes.STRING(1024),
    banner_image_url: DataTypes.STRING(1024),
    parent_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: ParentCategory,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // or "CASCADE" depending on your use case
    },
  },
  {
    tableName: "catalogues",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Catalogue;
