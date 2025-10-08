// backupCatalogues.js
const fs = require("fs");
const path = require("path");
const sequelize = require("../config/db.mysql");
const Catalogue = require("../models/catalogues");

(async () => {
  try {
    console.log("🔄 Connecting to database...");
    await sequelize.authenticate();

    console.log("📦 Fetching catalogue data...");
    const catalogues = await Catalogue.findAll({ raw: true });

    if (!catalogues.length) {
      console.log("⚠️ No catalogue records found.");
      process.exit(0);
    }

    // Ensure backups directory exists
    const backupDir = path.join(__dirname, "../backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

    // Generate timestamped filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filePath = path.join(
      backupDir,
      `catalogues-backup-${timestamp}.json`
    );

    // Write to file
    fs.writeFileSync(filePath, JSON.stringify(catalogues, null, 2));

    console.log(`✅ Backup successful! File saved at: ${filePath}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Backup failed:", error);
    process.exit(1);
  }
})();
