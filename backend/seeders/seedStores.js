const fs = require("fs");
const sequelize = require("../config/db.mysql");
const Dealer = require("../models/dealer");
const Store = require("../models/store");
const Address = require("../models/address");

async function seedAll() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // ---- Read JSON files ----
    const dealersData = JSON.parse(fs.readFileSync("dealers.json", "utf-8"));
    const addressesData = JSON.parse(
      fs.readFileSync("addresses.json", "utf-8")
    );
    const storesData = JSON.parse(fs.readFileSync("stores.json", "utf-8"));

    // ---- Seed Dealers (ignore existing) ----
    await Dealer.bulkCreate(dealersData, { ignoreDuplicates: true });
    console.log(`✅ Dealers seeded or already exist`);

    // ---- Seed Addresses (ignore existing) ----
    await Address.bulkCreate(addressesData, { ignoreDuplicates: true });
    console.log(`✅ Addresses seeded or already exist`);

    // ---- Seed Stores (ignore existing) ----
    await Store.bulkCreate(storesData, { ignoreDuplicates: true });
    console.log(`✅ Stores seeded or already exist`);

    console.log("🎉 All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedAll();
