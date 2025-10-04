require("dotenv").config();
const sequelize = require("../config/db.mysql");

// Import models
const User = require("../models/user");
const Role = require("../models/role");
const Category = require("../models/category");
const Product = require("../models/product");
const Variant = require("../models/variant");
const Dealer = require("../models/dealer");
const Store = require("../models/store");
const Address = require("../models/address");
const Catalogue = require("../models/catalogues");
const Content = require("../models/content");
const Lead = require("../models/leads");
const LeadActivity = require("../models/leadActivity");
const LeadNote = require("../models/leadNote");
const ParentCategory = require("../models/parentCategory");

const setupDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("\x1b[32m%s\x1b[0m", "✓ MySQL Connected!");

    // ==============================
    // 🔥 USER & ROLE RELATIONSHIPS
    // ==============================
    User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
    Role.hasMany(User, { foreignKey: "role_id", as: "users" });

    // ==============================
    // 🔥 ADDRESS RELATIONSHIPS
    // ==============================
    Address.belongsTo(User, { foreignKey: "owner_id", as: "owner" });
    User.hasMany(Address, { foreignKey: "owner_id", as: "addresses" });

    // ==============================
    // 🔥 CATEGORY RELATIONSHIPS
    // ==============================
    Category.belongsTo(ParentCategory, {
      foreignKey: "parent_id", // match your column name
      as: "parent_categories",
    });
    ParentCategory.hasMany(Category, {
      foreignKey: "parent_id", // match your column name
      as: "categories",
    });

    // ==============================
    // 🔥 CATALOGUE RELATIONSHIPS
    // ==============================
    Catalogue.belongsTo(ParentCategory, {
      foreignKey: "parent_id",
      as: "category",
    });
    ParentCategory.hasMany(Catalogue, {
      foreignKey: "parent_id",
      as: "catalogues",
    });

    // ==============================
    // 🔥 PRODUCT & VARIANT RELATIONSHIPS
    // ==============================
    Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });
    Category.hasMany(Product, { foreignKey: "category_id", as: "products" });

    Variant.belongsTo(Product, { foreignKey: "product_id", as: "product" });
    Product.hasMany(Variant, { foreignKey: "product_id", as: "variants" });

    // ==============================
    // 🔥 DEALER & STORE RELATIONSHIPS
    // ==============================
    Store.belongsTo(Dealer, { foreignKey: "dealer_id", as: "dealer" });
    Dealer.hasMany(Store, { foreignKey: "dealer_id", as: "stores" });

    Store.belongsTo(Address, { foreignKey: "address_id", as: "address" });

    // ==============================
    // 🔥 LEAD RELATIONSHIPS
    // ==============================
    Lead.belongsTo(User, { foreignKey: "assigned_to", as: "assignee" });

    LeadActivity.belongsTo(Lead, { foreignKey: "lead_id", as: "lead" });
    LeadActivity.belongsTo(User, { foreignKey: "created_by", as: "creator" });
    Lead.hasMany(LeadActivity, { foreignKey: "lead_id", as: "activities" });

    LeadNote.belongsTo(Lead, { foreignKey: "lead_id", as: "lead" });
    LeadNote.belongsTo(User, { foreignKey: "user_id", as: "creator" });
    Lead.hasMany(LeadNote, { foreignKey: "lead_id", as: "notes" });

    // ==============================
    // 🔥 DATABASE SYNC
    // ==============================
    await sequelize.sync({ alter: true });
    console.log("\x1b[32m%s\x1b[0m", "✓ Database tables synced!");
  } catch (error) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "✗ Unable to connect to the database:",
      error
    );
  }
};

module.exports = setupDB;
