const express = require("express");
const connectMongo = require("./config/db.mongo");
const sequelize = require("./config/db.mysql");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const categoryRoutes = require("./routes/category");
const contactRoutes = require("./routes/contact");
const contentRoutes = require("./routes/content");
const dealerRoutes = require("./routes/dealer");
const userRoutes = require("./routes/users");
const catalogueRoutes = require("./routes/catalogue");
const careerRoutes = require("./routes/careers");
const roleRoutes = require("./routes/roles");
const storeRoutes = require("./routes/stores");
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
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("api/careers", careerRoutes);
app.use("/api/catalogue", catalogueRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/dealers", dealerRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/users", userRoutes);

// Use other routes
// Add other routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
