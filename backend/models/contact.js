const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  _id: { type: String, default: () => require("uuid").v4() },
  name: String,
  email: String,
  phoneNumber: String,
  message: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  createdAt: { type: Date, default: Date.now },
  notified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Contact", ContactSchema);
