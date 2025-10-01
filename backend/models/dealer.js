const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");

const Dealer = sequelize.define(
  "Dealer",
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
    company_name: DataTypes.STRING(200),
  },
  {
    tableName: "dealers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Dealer;
