const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.mysql");

const Category = sequelize.define(
  "Category",
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
    parent_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Category.belongsTo(Category, { foreignKey: "parent_id", as: "parent" });

module.exports = Category;
