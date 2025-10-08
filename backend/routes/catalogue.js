const express = require("express");
const router = express.Router();
const catalogueController = require("../controllers/catalogueController");
const authMiddleware = require("../middleware/auth");
const multer = require("multer"); // For file parsing

// Configure multer for multipart/form-data (no disk storage needed; process in memory)
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory for FTP upload
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.fieldname === "pdf_file" &&
      !file.mimetype.startsWith("application/pdf")
    ) {
      return cb(new Error("Only PDF files allowed"));
    }
    if (
      file.fieldname === "banner_image_file" &&
      !file.mimetype.startsWith("image/")
    ) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

// Public routes (no authentication required)
router.get("/", catalogueController.listCatalogues);
router.get("/:id", catalogueController.getCatalogueById);

// Protected routes (require JWT authentication)
router.post(
  "/",
  authMiddleware,
  upload.fields([
    { name: "pdf_file", maxCount: 1 },
    { name: "banner_image_file", maxCount: 1 },
  ]),
  catalogueController.createCatalogue
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "pdf_file", maxCount: 1 },
    { name: "banner_image_file", maxCount: 1 },
  ]),
  catalogueController.updateCatalogue
);

router.delete("/:id", authMiddleware, catalogueController.deleteCatalogue);

// Optional: Dedicated upload endpoint (if needed separately)
router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    { name: "pdf_file", maxCount: 1 },
    { name: "banner_image_file", maxCount: 1 },
  ]),
  catalogueController.uploadFiles
);

module.exports = router;
