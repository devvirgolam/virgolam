const mongoose = require("mongoose");
const { Schema } = mongoose;

const CareerSubmissionSchema = new Schema({
  _id: { type: String, default: () => require("uuid").v4() },
  fullName: String,
  mobileNumber: String,
  age: Number,
  email: String,
  resumeUrl: String,
  message: String,
  appliedFor: String, // Reference to Career _id
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CareerSubmission", CareerSubmissionSchema);
