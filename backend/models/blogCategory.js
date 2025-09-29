const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogCategorySchema = new Schema(
  {
    _id: { type: String, default: () => require("uuid").v4() },
    name: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("BlogCategory", BlogCategorySchema);
