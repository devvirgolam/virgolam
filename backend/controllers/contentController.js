const Content = require("../models/content");
const { v4: uuidv4 } = require("uuid");
const winston = require("winston");
require("dotenv").config();
const { uploadFileToFTP, deleteFileFromFTP } = require("../config/ftpConfig");

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

exports.listContent = async (req, res) => {
  try {
    const { type } = req.query;

    // Validate type if provided
    if (type && !["csr", "event", "certification", "coverage"].includes(type)) {
      return handleError(res, 400, "Invalid content type");
    }

    const where = type ? { type } : {};
    const contents = await Content.findAll({ where });
    logger.info(
      `Retrieved ${contents.length} content items${
        type ? ` of type: ${type}` : ""
      }`
    );
    res.json(contents);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve content", error);
  }
};

exports.createContent = async (req, res) => {
  try {
    const { type, title, description, image_url, date, location } = req.body;

    // Input validation
    if (!type || !title || !description || !image_url) {
      return handleError(
        res,
        400,
        "Type, title, description, and image URL are required"
      );
    }

    // Validate content type
    const validTypes = ["csr", "event", "certification", "coverage"];
    if (!validTypes.includes(type)) {
      return handleError(res, 400, "Invalid content type");
    }

    // Validate image_url format
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(image_url)) {
      return handleError(res, 400, "Invalid image URL format");
    }

    // Validate date and location for events
    if (type === "event") {
      if (!date || isNaN(Date.parse(date))) {
        return handleError(res, 400, "Valid date is required for event type");
      }
      if (!location) {
        return handleError(res, 400, "Location is required for event type");
      }
    }

    // Check for duplicate title (optional, adjust based on requirements)
    const existingContent = await Content.findOne({ where: { title } });
    if (existingContent) {
      return handleError(res, 409, "Content with this title already exists");
    }

    const content = await Content.create({
      id: uuidv4(),
      type,
      title,
      description,
      image_url,
      date: type === "event" ? date : null,
      location: type === "event" ? location : null,
      createdBy: req.user?.id, // Optional: Track creator if authenticated
    });

    logger.info(
      `Content created with ID: ${
        content.id
      }, type: ${type}, title: ${title} by user: ${req.user?.id || "unknown"}`
    );
    res.status(201).json({
      message: "Content created successfully",
      content: {
        id: content.id,
        type: content.type,
        title: content.title,
        image_url: content.image_url,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create content", error);
  }
};

// Upload File Route
exports.uploadFile = async (req, res) => {
  try {
    // Check if file is provided
    if (!req.file) {
      return handleError(res, 400, "No file uploaded");
    }

    // Upload file to FTP server
    const fileUrl = await uploadFileToFTP(req.file);
    logger.info(`File uploaded successfully: ${fileUrl}`);

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (error) {
    handleError(res, 500, "Failed to upload file", error);
  }
};

// Update Content Route
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, description, image_url, date, location } = req.body;

    // Find existing content
    const content = await Content.findByPk(id);
    if (!content) {
      return handleError(res, 404, "Content not found");
    }

    // Input validation
    if (type && !["csr", "event", "certification", "coverage"].includes(type)) {
      return handleError(res, 400, "Invalid content type");
    }

    if (image_url && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(image_url)) {
      return handleError(res, 400, "Invalid image URL format");
    }

    if (type === "event" || content.type === "event") {
      if (date && isNaN(Date.parse(date))) {
        return handleError(res, 400, "Valid date is required for event type");
      }
      if (location === "" || (type === "event" && !location)) {
        return handleError(res, 400, "Location is required for event type");
      }
    }

    // Check for duplicate title (excluding current content)
    if (title && title !== content.title) {
      const existingContent = await Content.findOne({ where: { title } });
      if (existingContent) {
        return handleError(res, 409, "Content with this title already exists");
      }
    }

    // Prepare update data
    const updateData = {
      type: type || content.type,
      title: title || content.title,
      description: description || content.description,
      image_url: image_url || content.image_url,
    };

    // Only update date and location for events
    if (content.type === "event" || type === "event") {
      updateData.date = date || content.date;
      updateData.location = location || content.location;
    }

    // Update content
    await content.update(updateData);

    logger.info(
      `Content updated with ID: ${id}, title: ${
        title || content.title
      } by user: ${req.user?.id || "unknown"}`
    );
    res.status(200).json({
      message: "Content updated successfully",
      content: {
        id: content.id,
        type: content.type,
        title: content.title,
        image_url: content.image_url,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to update content", error);
  }
};

// Delete Content Route
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    // Find content
    const content = await Content.findByPk(id);
    if (!content) {
      return handleError(res, 404, "Content not found");
    }

    // Delete associated file from FTP if it exists
    if (content.image_url) {
      try {
        await deleteFileFromFTP(content.image_url);
        logger.info(`File deleted from FTP: ${content.image_url}`);
      } catch (ftpError) {
        logger.warn(`Failed to delete file from FTP: ${ftpError.message}`);
        // Continue with content deletion even if FTP deletion fails
      }
    }

    // Delete content from database
    await content.destroy();
    logger.info(
      `Content deleted with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );

    res.status(200).json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    handleError(res, 500, "Failed to delete content", error);
  }
};
