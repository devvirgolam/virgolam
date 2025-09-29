const Role = require("../models/mysql/Role");

module.exports = async (req, res, next) => {
  const user = await User.findByPk(req.user.id, { include: Role });
  if (user.Role.name !== "Admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
