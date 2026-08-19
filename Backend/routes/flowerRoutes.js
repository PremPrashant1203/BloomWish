const express = require("express");

const {
  getFlowers,
  getFlowerById,
} = require("../controllers/flowersController");

const router = express.Router();


// GET ALL FLOWERS
// GET /api/flowers

router.get("/", getFlowers);


// GET SINGLE FLOWER
// GET /api/flowers/FL-001

router.get("/:flowerId", getFlowerById);


module.exports = router;