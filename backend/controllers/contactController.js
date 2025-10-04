const Contact = require("../models/contact");
const { v4: uuidv4 } = require("uuid");
const winston = require("winston");
require("dotenv").config();

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console(), // Console output for development
  ],
});

// Centralized error response handler
const handleError = (res, status, message, error = null) => {
  logger.error(`${message}: ${error?.message || "No additional error info"}`, {
    status,
    stack: error?.stack,
  });
  return res.status(status).json({ error: message });
};

// Placeholder for email notification service (e.g., Nodemailer or SendGrid)
const sendNotificationEmail = async (contact) => {
  try {
    // Implement email sending logic here
    logger.info(
      `Sending notification email for contact submission: ${contact.email}`
    );
    // Example: await nodemailer.sendMail({ to: adminEmail, subject: "New Contact Submission", text: JSON.stringify(contact) });
  } catch (error) {
    logger.error("Failed to send notification email", {
      error: error.message,
      stack: error.stack,
    });
    throw new Error("Email notification error");
  }
};

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, message, city, state, country, pincode } =
      req.body;

    // Input validation
    if (!name || !email || !message) {
      return handleError(res, 400, "Name, email, and message are required");
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleError(res, 400, "Invalid email format");
    }

    // Validate phoneNumber format if provided
    if (phoneNumber && !/^\+?[\d\s-]{8,15}$/.test(phoneNumber)) {
      return handleError(res, 400, "Invalid phone number format");
    }

    // Validate pincode format if provided (e.g., 5-10 digits)
    if (pincode && !/^\d{5,10}$/.test(pincode)) {
      return handleError(res, 400, "Invalid pincode format");
    }

    // Check for recent submissions to prevent spam (e.g., same email within 1 hour)
    const recentSubmission = await Contact.findOne({
      email,
      createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }, // 1 hour
    }).lean();
    if (recentSubmission) {
      return handleError(
        res,
        429,
        "Please wait before submitting another contact form"
      );
    }

    const contact = await Contact.create({
      _id: uuidv4(),
      name,
      email,
      phoneNumber,
      message,
      city,
      state,
      country,
      pincode,
      notified: false,
    });

    // Send notification email to admins (optional)
    await sendNotificationEmail({
      name: contact.name,
      email: contact.email,
      message: contact.message,
    });

    logger.info(`Contact form submitted by: ${email}`);
    res.status(201).json({
      message: "Contact form submitted successfully",
      contact: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to submit contact form", error);
  }
};

exports.listContacts = async (req, res) => {
  try {
    // Optional: Restrict to authorized users
    if (!req.user) {
      return handleError(res, 403, "Unauthorized access");
    }

    const contacts = await Contact.find().lean();
    logger.info(
      `Retrieved ${contacts.length} contact submissions by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.json(contacts);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve contact submissions", error);
  }
};
