const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.mysql");
const Dealer = require("./dealer");
const Address = require("./address");

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    dealer_id: {
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING(200),
    phone: DataTypes.STRING(50),
    address_id: {
      type: DataTypes.UUID,
    },
    parent_category_id: {
      type: DataTypes.UUID, // 👈 newly added
      allowNull: true,
    },
  },
  {
    tableName: "stores",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = Store;
