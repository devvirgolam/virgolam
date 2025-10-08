const { v4: uuidv4 } = require("uuid");
const BlogCategory = require("../models/blogCategory");
const categories = require("./blogCategory.json");
const connectMongo = require("../config/db.mongo"); // your refactored connection

require("dotenv").config();

(async () => {
  try {
    await connectMongo(); // connect using your module

    // Clear existing categories (optional)
    await BlogCategory.deleteMany({});
    console.log("🗑️ Old categories removed");

    // Insert new categories
    const docs = categories.map((c) => ({
      _id: uuidv4(),
      name: c.name,
      slug: c.slug,
    }));

    await BlogCategory.insertMany(docs);
    console.log("🎉 Categories inserted successfully:", docs.length);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding categories:", err);
    process.exit(1);
  }
})();
