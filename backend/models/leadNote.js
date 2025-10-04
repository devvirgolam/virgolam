const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");
const Lead = require("./leads");
const User = require("./user");

const LeadNote = sequelize.define(
  "LeadNote",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lead_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    note: DataTypes.TEXT,
  },
  {
    tableName: "lead_notes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = LeadNote;
