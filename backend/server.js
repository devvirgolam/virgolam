const express = require("express");
const connectMongo = require("./config/db.mongo");
const sequelize = require("./config/db.mysql");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
// Import other routes

const app = express();

app.use(express.json());

// Connect to databases
(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");
    await sequelize.sync();
    await connectMongo();
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();

// Routes
app.use("/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
// Add other routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
