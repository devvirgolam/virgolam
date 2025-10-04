const Career = require("../models/career");
const CareerSubmission = require("../models/careerSubmission");
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

exports.listCareers = async (req, res) => {
  try {
    const careers = await Career.find().lean();
    logger.info(`Retrieved ${careers.length} careers`);
    res.json(careers);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve careers", error);
  }
};

exports.createCareer = async (req, res) => {
  try {
    const { title, description, location, type, status } = req.body;

    // Input validation
    if (!title || !description || !location || !type || !status) {
      return handleError(
        res,
        400,
        "Title, description, location, type, and status are required"
      );
    }

    // Validate status and type (assuming they have specific allowed values)
    const validStatuses = ["open", "closed", "draft"];
    const validTypes = ["full-time", "part-time", "contract", "internship"];
    if (!validStatuses.includes(status)) {
      return handleError(res, 400, "Invalid status value");
    }
    if (!validTypes.includes(type)) {
      return handleError(res, 400, "Invalid type value");
    }

    const career = await Career.create({
      _id: uuidv4(),
      title,
      description,
      location,
      type,
      status,
      createdBy: req.user?.id, // Optional: Track creator if authenticated
    });

    logger.info(
      `Career created with ID: ${career._id} by user: ${
        req.user?.id || "unknown"
      }`
    );
    res.status(201).json({
      message: "Career created successfully",
      career: {
        _id: career._id,
        title: career.title,
        location: career.location,
        type: career.type,
        status: career.status,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to create career", error);
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid career ID format");
    }

    // Prevent updating createdBy
    delete updates.createdBy;
    updates.updatedAt = new Date();

    const career = await Career.findByIdAndUpdate(id, updates, { new: true });
    if (!career) {
      return handleError(res, 404, "Career not found");
    }

    logger.info(
      `Career updated with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.json({
      message: "Career updated successfully",
      career,
    });
  } catch (error) {
    handleError(res, 500, "Failed to update career", error);
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid career ID format");
    }

    const career = await Career.findByIdAndDelete(id);
    if (!career) {
      return handleError(res, 404, "Career not found");
    }

    logger.info(
      `Career deleted with ID: ${id} by user: ${req.user?.id || "unknown"}`
    );
    res.status(204).send();
  } catch (error) {
    handleError(res, 500, "Failed to delete career", error);
  }
};

exports.submitApplication = async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      age,
      email,
      resumeUrl,
      message,
      appliedFor,
    } = req.body;

    // Input validation
    if (
      !fullName ||
      !mobileNumber ||
      !age ||
      !email ||
      !resumeUrl ||
      !appliedFor
    ) {
      return handleError(
        res,
        400,
        "Full name, mobile number, age, email, resume URL, and appliedFor are required"
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return handleError(res, 400, "Invalid email format");
    }

    // Validate age
    if (!Number.isInteger(age) || age < 16 || age > 100) {
      return handleError(res, 400, "Invalid age (must be between 16 and 100)");
    }

    // Validate resumeUrl (basic URL check)
    if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(resumeUrl)) {
      return handleError(res, 400, "Invalid resume URL format");
    }

    // Validate appliedFor (career ID)
    const career = await Career.findById(appliedFor).lean();
    if (!career) {
      return handleError(res, 400, "Invalid career ID");
    }

    const submission = await CareerSubmission.create({
      _id: uuidv4(),
      fullName,
      mobileNumber,
      age,
      email,
      resumeUrl,
      message,
      appliedFor,
    });

    logger.info(
      `Career application submitted for career ID: ${appliedFor} by email: ${email}`
    );
    res.status(201).json({
      message: "Application submitted successfully",
      submission: {
        _id: submission._id,
        fullName: submission.fullName,
        email: submission.email,
        appliedFor: submission.appliedFor,
      },
    });
  } catch (error) {
    handleError(res, 500, "Failed to submit application", error);
  }
};

exports.listCandidates = async (req, res) => {
  try {
    const candidates = await CareerSubmission.find().lean();
    logger.info(`Retrieved ${candidates.length} career submissions`);
    res.json(candidates);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve candidates", error);
  }
};

exports.getCandidateDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Basic validation for ID
    if (
      !id ||
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        id
      )
    ) {
      return handleError(res, 400, "Invalid candidate ID format");
    }

    const candidate = await CareerSubmission.findById(id).lean();
    if (!candidate) {
      return handleError(res, 404, "Candidate not found");
    }

    logger.info(`Retrieved candidate details with ID: ${id}`);
    res.json(candidate);
  } catch (error) {
    handleError(res, 500, "Failed to retrieve candidate details", error);
  }
};
