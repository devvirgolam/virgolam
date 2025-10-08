const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");
const upload = require("../middleware/multer");

router.get("/", contentController.listContent);
router.post("/", contentController.createContent);
router.post("/upload", upload.single("file"), contentController.uploadFile);
router.delete("/:id", contentController.deleteContent);
router.put("/:id", contentController.updateContent);

module.exports = router;
