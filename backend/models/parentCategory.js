const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");

const ParentCategory = sequelize.define(
  "ParentCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(200),
      unique: true,
    },
  },
  {
    tableName: "parent_categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = ParentCategory;
