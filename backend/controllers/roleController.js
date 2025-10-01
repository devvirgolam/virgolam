const Role = require("../models/role");

exports.listRoles = async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
};

exports.createRole = async (req, res) => {
  const { name, description } = req.body;
  const role = await Role.create({ name, description });
  res.status(201).json(role);
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const role = await Role.findByPk(id);
  if (!role) return res.status(404).json({ message: "Role not found" });
  await role.update(updates);
  res.json(role);
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findByPk(id);
  if (!role) return res.status(404).json({ message: "Role not found" });
  await role.destroy();
  res.status(204).send();
};
