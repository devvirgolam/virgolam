const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController"); // Path to your career controller file
const authMiddleware = require("../middleware/auth"); // Path to your JWT middleware

// Public routes (no authentication required)
router.get("/", careerController.listCareers);
router.post("/apply", careerController.submitApplication);

// Protected routes (require JWT authentication)
router.post("/", authMiddleware, careerController.createCareer);
router.put("/:id", authMiddleware, careerController.updateCareer);
router.delete("/:id", authMiddleware, careerController.deleteCareer);
router.get("/candidates", authMiddleware, careerController.listCandidates);
router.get(
  "/candidates/:id",
  authMiddleware,
  careerController.getCandidateDetails
);

module.exports = router;
