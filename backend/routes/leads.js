const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

// Lead CRUD
router.get("/", leadController.getAllLeads);
router.get("/:id", leadController.getLeadById);
router.post("/", leadController.createLead);
router.put("/:id", leadController.updateLead);
router.delete("/:id", leadController.deleteLead);

// Notes
router.post("/:lead_id/notes", leadController.addNote);
router.get("/:lead_id/notes", leadController.getNotes);

// Activities
router.post("/:lead_id/activities", leadController.addActivity);
router.put("/activities/:id/complete", leadController.markActivityCompleted);

module.exports = router;
