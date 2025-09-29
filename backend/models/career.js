const mongoose = require("mongoose");
const { Schema } = mongoose;

const CareerSchema = new Schema({
  _id: { type: String, default: () => require("uuid").v4() },
  title: { type: String, required: true },
  description: String,
  location: String,
  type: String, // e.g., full-time, part-time
  status: { type: String, enum: ["open", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model("Career", CareerSchema);
