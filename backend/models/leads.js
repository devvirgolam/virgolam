const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");
const User = require("./user");

const Lead = sequelize.define(
  "Lead",
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
    email: DataTypes.STRING(150),
    phone: DataTypes.STRING(20),
    message: DataTypes.TEXT,
    source: {
      type: DataTypes.ENUM(
        "website",
        "landing_page",
        "ad",
        "newsletter",
        "referral",
        "other"
      ),
      defaultValue: "website",
    },
    status: {
      type: DataTypes.ENUM(
        "new",
        "contacted",
        "qualified",
        "converted",
        "lost"
      ),
      defaultValue: "new",
    },
    assigned_to: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "leads",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Lead;
