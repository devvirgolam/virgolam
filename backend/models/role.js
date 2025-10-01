const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
