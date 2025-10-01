const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    owner_type: {
      type: DataTypes.ENUM("user", "store", "dealer"),
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    street: DataTypes.STRING(255),
    city: DataTypes.STRING(100),
    state: DataTypes.STRING(100),
    country: DataTypes.STRING(100),
    pincode: DataTypes.STRING(20),
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
  },
  {
    tableName: "addresses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Address;
