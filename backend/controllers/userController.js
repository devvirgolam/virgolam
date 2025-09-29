const User = require("../models/mysql/User");
const Role = require("../models/mysql/Role");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

exports.listUsers = async (req, res) => {
  const users = await User.findAll({ include: Role });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { include: Role });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const { username, email, password, name, phone, role_id } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    id: uuidv4(),
    username,
    email,
    password_hash,
    name,
    phone,
    role_id,
  });
  res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password) {
    updates.password_hash = await bcrypt.hash(updates.password, 10);
    delete updates.password;
  }
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.update(updates);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.destroy();
  res.status(204).send();
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findByPk(req.user.id, { include: Role });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.updateCurrentUser = async (req, res) => {
  const updates = req.body;
  if (updates.password) {
    updates.password_hash = await bcrypt.hash(updates.password, 10);
    delete updates.password;
  }
  const user = await User.findByPk(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.update(updates);
  res.json(user);
};
