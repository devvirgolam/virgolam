const { v4: uuidv4 } = require("uuid");
const sequelize = require("../config/db.mysql");
const Content = require("../models/content"); // Sequelize model
const contents = require("../tags.json"); // JSON with featured_image + images arrays

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    // Insert new contents
    const docs = contents.map((c) => ({
      id: uuidv4(),
      type: c.type,
      title: c.title,
      description: c.description || null,
      featured_image: c.featured_image || null, // <-- optional
      images: c.images ? JSON.stringify(c.images) : null, // <-- optional
      date: c.date || null,
      location: c.location || null,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await Content.bulkCreate(docs);
    console.log(`🎉 ${docs.length} contents inserted successfully!`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding contents:", err);
    process.exit(1);
  }
})();
