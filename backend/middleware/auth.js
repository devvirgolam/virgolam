const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
const logger = require("./logger"); // adjust the path

require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      include: { model: Role, as: "role", attributes: ["id", "name"] },
    });

    if (!user) {
      logger.error(`User not found for ID: ${decoded.id}`);
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role, // Match association alias
    };

    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`, {
      stack: error.stack,
    });
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};
