const express = require("express");

const {
  getBouquets,
  getBouquetById,
  matchBouquet,
  createBouquetLink,
  getSharedBouquet,
} = require("../controllers/bouquetController");

const router = express.Router();


// ==========================================
// GET ALL BOUQUETS
// ==========================================

router.get(
  "/",
  getBouquets
);


// ==========================================
// CREATE BOUQUET SHARE LINK
// IMPORTANT: /create MUST come before /:bouquetId
// ==========================================

router.post(
  "/create",
  createBouquetLink
);


// ==========================================
// GET SHARED BOUQUET
// ==========================================

router.get(
  "/shared/:shareId",
  getSharedBouquet
);


// ==========================================
// MATCH BEST BOUQUET
// ==========================================

router.post(
  "/match",
  matchBouquet
);


// ==========================================
// GET SINGLE BOUQUET
// ==========================================

router.get(
  "/:bouquetId",
  getBouquetById
);


module.exports = router;