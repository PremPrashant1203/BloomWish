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

const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://localhost:5180",

  // Deployed frontend
  "https://bloomwish-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an origin
      // (Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BloomWish Backend is running 🌷",
  });
});


// ==========================================
// API ROUTES
// ==========================================

app.use("/api/flowers", flowerRoutes);

app.use("/api/wraps", wrapRoutes);

app.use("/api/bouquets", bouquetRoutes);


// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});


// ==========================================
// ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS policy blocked this request",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
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