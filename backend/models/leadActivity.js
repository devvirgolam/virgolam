const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");
const Lead = require("./leads");
const User = require("./user");

const LeadActivity = sequelize.define(
  "LeadActivity",
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
    activity_type: {
      type: DataTypes.ENUM("call", "email", "meeting", "followup", "other"),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    scheduled_at: DataTypes.DATE,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "lead_activities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = LeadActivity;
