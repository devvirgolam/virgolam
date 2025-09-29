const Career = require("../models/mongo/Career");
const CareerSubmission = require("../models/mongo/CareerSubmission");
const CacheService = require("../services/cache");
const { v4: uuidv4 } = require("uuid");

exports.listCareers = async (req, res) => {
  const cacheKey = "careers_list";
  let careers = await CacheService.get(cacheKey);

  if (!careers) {
    careers = await Career.find().lean();
    await CacheService.set(cacheKey, careers, 300);
  }

  res.json(careers);
};

exports.createCareer = async (req, res) => {
  const { title, description, location, type, status } = req.body;
  const career = await Career.create({
    _id: uuidv4(),
    title,
    description,
    location,
    type,
    status,
  });
  await CacheService.del("careers_list");
  res.status(201).json(career);
};

exports.updateCareer = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  updates.updatedAt = new Date();
  const career = await Career.findByIdAndUpdate(id, updates, { new: true });
  if (!career) return res.status(404).json({ message: "Career not found" });
  await CacheService.del(`career_${id}`);
  await CacheService.del("careers_list");
  res.json(career);
};

exports.deleteCareer = async (req, res) => {
  const { id } = req.params;
  const career = await Career.findByIdAndDelete(id);
  if (!career) return res.status(404).json({ message: "Career not found" });
  await CacheService.del(`career_${id}`);
  await CacheService.del("careers_list");
  res.status(204).send();
};

exports.submitApplication = async (req, res) => {
  const { fullName, mobileNumber, age, email, resumeUrl, message, appliedFor } =
    req.body;
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
  res.status(201).json(submission);
};

exports.listCandidates = async (req, res) => {
  const candidates = await CareerSubmission.find().lean();
  res.json(candidates);
};

exports.getCandidateDetails = async (req, res) => {
  const { id } = req.params;
  const candidate = await CareerSubmission.findById(id).lean();
  if (!candidate)
    return res.status(404).json({ message: "Candidate not found" });
  res.json(candidate);
};
