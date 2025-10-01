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
  },
  {
    tableName: "stores",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Store.belongsTo(Dealer, { foreignKey: "dealer_id" });
Store.belongsTo(Address, { foreignKey: "address_id" });

module.exports = Store;
