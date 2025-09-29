const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db.mysql");

const Content = sequelize.define(
  "Content",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("csr", "event", "certification", "coverage"),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING(1024),
    date: {
      type: DataTypes.DATE,
      allowNull: true, // Only relevant for events
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true, // Only relevant for events
    },
  },
  {
    tableName: "contents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Content;
