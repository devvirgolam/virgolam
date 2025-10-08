"use strict";

const { Op } = require("sequelize");
const Lead = require("../models/leads");
const LeadNote = require("../models/leadNote");
const LeadActivity = require("../models/leadActivity");
const User = require("../models/user");

// =================== LEAD CRUD =================== //

// ✅ GET ALL LEADS
exports.getAllLeads = async (req, res) => {
  try {
    const { status, assigned_to, search } = req.query;

    const where = {};
    if (status) where.status = status;
    if (assigned_to) where.assigned_to = assigned_to;
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }

    const leads = await Lead.findAll({
      where,
      include: [
        { model: User, as: "assignee", attributes: ["id", "name", "email"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(leads);
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

// ✅ GET SINGLE LEAD WITH NOTES & ACTIVITIES
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByPk(id, {
      include: [
        {
          model: LeadNote,
          as: "notes",
          include: [{ model: User, attributes: ["id", "name"] }],
        },
        {
          model: LeadActivity,
          as: "activities",
          include: [{ model: User, attributes: ["id", "name"] }],
        },
        { model: User, as: "assignee", attributes: ["id", "name", "email"] },
      ],
    });

    if (!lead) return res.status(404).json({ error: "Lead not found" });

    res.json(lead);
  } catch (error) {
    console.error("❌ Error fetching lead:", error);
    res.status(500).json({ error: "Failed to fetch lead details" });
  }
};

// ✅ CREATE LEAD
exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, message, source, assigned_to } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      message,
      source,
      assigned_to: assigned_to || null,
    });

    res.status(201).json(lead);
  } catch (error) {
    console.error("❌ Error creating lead:", error);
    res.status(500).json({ error: "Failed to create lead" });
  }
};

// ✅ UPDATE LEAD
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    await lead.update(updates);
    res.json(lead);
  } catch (error) {
    console.error("❌ Error updating lead:", error);
    res.status(500).json({ error: "Failed to update lead" });
  }
};

// ✅ DELETE LEAD
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);

    if (!lead) return res.status(404).json({ error: "Lead not found" });

    await lead.destroy();
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting lead:", error);
    res.status(500).json({ error: "Failed to delete lead" });
  }
};

// =================== NOTES =================== //

// ✅ ADD NOTE
exports.addNote = async (req, res) => {
  try {
    const { lead_id } = req.params;
    const { note } = req.body;
    const user_id = req.user?.id || req.body.user_id;

    const lead = await Lead.findByPk(lead_id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    const leadNote = await LeadNote.create({
      lead_id,
      user_id,
      note,
    });

    res.status(201).json(leadNote);
  } catch (error) {
    console.error("❌ Error adding note:", error);
    res.status(500).json({ error: "Failed to add note" });
  }
};

// ✅ GET NOTES
exports.getNotes = async (req, res) => {
  try {
    const { lead_id } = req.params;

    const notes = await LeadNote.findAll({
      where: { lead_id },
      include: [{ model: User, attributes: ["id", "name"] }],
      order: [["created_at", "DESC"]],
    });

    res.json(notes);
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// =================== ACTIVITIES =================== //

// ✅ ADD ACTIVITY
exports.addActivity = async (req, res) => {
  try {
    const { lead_id } = req.params;
    const { activity_type, description, scheduled_at } = req.body;
    const created_by = req.user?.id || req.body.created_by;

    const lead = await Lead.findByPk(lead_id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    const activity = await LeadActivity.create({
      lead_id,
      activity_type,
      description,
      scheduled_at,
      created_by,
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error("❌ Error adding activity:", error);
    res.status(500).json({ error: "Failed to add activity" });
  }
};

// ✅ MARK ACTIVITY COMPLETED
exports.markActivityCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await LeadActivity.findByPk(id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    await activity.update({ completed: true });
    res.json(activity);
  } catch (error) {
    console.error("❌ Error marking activity complete:", error);
    res.status(500).json({ error: "Failed to mark activity complete" });
  }
};
