const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({
  _id: { type: String, default: () => require("uuid").v4() },
  title: { type: String, required: true },
  slug: { type: String, index: true, unique: true },
  category: { type: String, ref: "BlogCategory" },
  content: String,
  excerpt: String,
  bannerImage: String,
  images: [String],
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
  publishedAt: Date,
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  createdBy: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model("Blog", BlogSchema);
