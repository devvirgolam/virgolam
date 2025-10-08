const FTP = require("basic-ftp");
const path = require("path");
const Catalogue = require("../models/catalogues"); // Sequelize model
const { Op } = require("sequelize"); // For Sequelize operators

// FTP Configuration (unchanged)
const FTP_CONFIG = {
  host: "ftp.virgolam.com",
  port: 21,
  user: "103.50.161.16",
  password: "(+p8kW6E)efJ",
  secure: false, // Set to true for explicit FTPS
};

// Helper: Upload file to FTP and return URL (unchanged)
const uploadToFTP = async (fileBuffer, originalName, fileType) => {
  const client = new FTP();
  let remotePath, baseUrl;

  try {
    if (fileType === "pdf") {
      remotePath = `/assets/catalogues_pdf/${originalName}`;
      baseUrl = "https://media.virgolam.com/assets/catalogues_pdf/";
    } else if (fileType === "image") {
      remotePath = `/assets/catalogue/${originalName}`;
      baseUrl = "https://media.virgolam.com/assets/catalogue/";
    } else {
      throw new Error("Unsupported file type");
    }

    await client.access(FTP_CONFIG);
    await client.uploadFrom(fileBuffer, remotePath);
    await client.close();

    return `${baseUrl}${originalName}`;
  } catch (error) {
    if (client) await client.close();
    console.error("FTP Upload Error:", error);
    throw new Error(`FTP upload failed: ${error.message}`);
  }
};

// List catalogues
exports.listCatalogues = async (req, res) => {
  try {
    const catalogues = await Catalogue.findAll({
      order: [["created_at", "DESC"]], // Sort by created_at in descending order
    });
    res.json(catalogues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get catalogue by ID
exports.getCatalogueById = async (req, res) => {
  try {
    const catalogue = await Catalogue.findByPk(req.params.id);
    if (!catalogue) {
      return res.status(404).json({ message: "Catalogue not found" });
    }
    res.json(catalogue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create catalogue
exports.createCatalogue = async (req, res) => {
  try {
    const {
      name,
      pdf_url: bodyPdfUrl,
      banner_image_url: bodyBannerImageUrl,
    } = req.body;
    let pdf_url = "";
    let banner_image_url = "";

    // Handle PDF upload if provided
    if (req.files && req.files["pdf_file"] && req.files["pdf_file"][0]) {
      const pdfFile = req.files["pdf_file"][0];
      pdf_url = await uploadToFTP(pdfFile.buffer, pdfFile.originalname, "pdf");
    }

    // Handle image upload if provided
    if (
      req.files &&
      req.files["banner_image_file"] &&
      req.files["banner_image_file"][0]
    ) {
      const imageFile = req.files["banner_image_file"][0];
      banner_image_url = await uploadToFTP(
        imageFile.buffer,
        imageFile.originalname,
        "image"
      );
    }

    // Validate required fields (if no file uploaded, require URL fallback)
    if (
      !name ||
      (!pdf_url && !bodyPdfUrl) ||
      (!banner_image_url && !bodyBannerImageUrl)
    ) {
      return res
        .status(400)
        .json({ message: "Name, PDF, and banner image are required" });
    }

    // Use uploaded URLs or fallback to provided URLs
    const newCatalogue = await Catalogue.create({
      name,
      pdf_url: pdf_url || bodyPdfUrl,
      banner_image_url: banner_image_url || bodyBannerImageUrl,
      parent_id: req.body.parent_id || null, // Handle parent_id if provided
    });

    res.status(201).json(newCatalogue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update catalogue
exports.updateCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      pdf_url: bodyPdfUrl,
      banner_image_url: bodyBannerImageUrl,
    } = req.body;
    let pdf_url = bodyPdfUrl; // Default to existing/provided
    let banner_image_url = bodyBannerImageUrl;

    // Handle PDF upload if provided (overrides existing)
    if (req.files && req.files["pdf_file"] && req.files["pdf_file"][0]) {
      const pdfFile = req.files["pdf_file"][0];
      pdf_url = await uploadToFTP(pdfFile.buffer, pdfFile.originalname, "pdf");
    }

    // Handle image upload if provided (overrides existing)
    if (
      req.files &&
      req.files["banner_image_file"] &&
      req.files["banner_image_file"][0]
    ) {
      const imageFile = req.files["banner_image_file"][0];
      banner_image_url = await uploadToFTP(
        imageFile.buffer,
        imageFile.originalname,
        "image"
      );
    }

    const [updatedCount, updatedCatalogues] = await Catalogue.update(
      {
        name,
        pdf_url: pdf_url || bodyPdfUrl,
        banner_image_url: banner_image_url || bodyBannerImageUrl,
        parent_id: req.body.parent_id || null, // Handle parent_id if provided
      },
      {
        where: { id },
        returning: true, // Return the updated record(s)
      }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Catalogue not found" });
    }

    res.json(updatedCatalogues[0]); // Return the first (and only) updated record
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete catalogue
exports.deleteCatalogue = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Catalogue.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Catalogue not found" });
    }
    res.json({ message: "Catalogue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: Dedicated upload endpoint (unchanged)
exports.uploadFiles = async (req, res) => {
  try {
    let pdf_url = "";
    let banner_image_url = "";

    if (req.files["pdf_file"]) {
      const pdfFile = req.files["pdf_file"][0];
      pdf_url = await uploadToFTP(pdfFile.buffer, pdfFile.originalname, "pdf");
    }

    if (req.files["banner_image_file"]) {
      const imageFile = req.files["banner_image_file"][0];
      banner_image_url = await uploadToFTP(
        imageFile.buffer,
        imageFile.originalname,
        "image"
      );
    }

    res.json({ pdf_url, banner_image_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
