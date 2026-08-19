const express = require("express");
const cors = require("cors");
require("dotenv").config();

const flowerRoutes = require("./routes/flowerRoutes");
const wrapRoutes = require("./routes/wrapRoutes");
const bouquetRoutes = require("./routes/bouquetRoutes");

const app = express();


// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:5177",
      "http://localhost:5178",
      "http://localhost:5179",
      "http://localhost:5180",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());


// ==========================================
// ROUTES
// ==========================================

app.use("/api/flowers", flowerRoutes);

app.use("/api/wraps", wrapRoutes);

app.use("/api/bouquets", bouquetRoutes);


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BloomWish Backend is running 🌷",
  });
});


// ==========================================
// 404
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🌷 BloomWish Backend Started");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌸 Flowers: /api/flowers`);
  console.log(`🌿 Wraps: /api/wraps`);
  console.log(`💐 Bouquets: /api/bouquets`);
});