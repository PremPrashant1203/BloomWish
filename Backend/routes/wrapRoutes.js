const express = require("express");

const {
  getWraps,
  getWrapById,
} = require("../controllers/wrapController");

const router = express.Router();


// ==========================================
// GET ALL WRAPS
// ==========================================
// GET /api/wraps

router.get("/", getWraps);


// ==========================================
// GET SINGLE WRAP
// ==========================================
// GET /api/wraps/WR001

router.get("/:wrapId", getWrapById);


module.exports = router;