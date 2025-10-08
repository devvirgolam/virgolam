const multer = require("multer");

const storage = multer.memoryStorage(); // Use memory storage for FTP
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/",
      "video/",
      "audio/",
      "application/pdf",
      "text/",
    ];
    const isValid = allowedTypes.some((type) => file.mimetype.startsWith(type));
    if (isValid) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

module.exports = upload;
