const express = require("express");
const setupDB = require("./config/setupDb"); // <-- import your setupDB
const connectMongo = require("./config/db.mongo");

// Import routes
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
const leadRoutes = require("./routes/leads");
const parentCategoryRoutes = require("./routes/parentCategory");
const productRoutes = require("./routes/products");
const cors = require("cors");
const app = express();
app.use(express.json());
// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "https://virgolam.vercel.app",
    "https://dashboard-virgolam.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ==============================
// 🔥 Initialize Databases
// ==============================
(async () => {
  try {
    // Setup MySQL (models, associations, sync)
    await setupDB();

    // Connect MongoDB
    await connectMongo();
    console.log("\x1b[32m%s\x1b[0m", "✓ All databases connected!");
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "Database connection error:", error);
    process.exit(1);
  }
})();

// ==============================
// 🔥 API ROUTES
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/catalogue", catalogueRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/dealers", dealerRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/parent-category", parentCategoryRoutes);
app.use("/api/products", productRoutes);
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res
    .status(500)
    .json({ error: "Internal server error", details: err.message });
});
// ==============================
// 🔥 START SERVER
// ==============================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
