const flowers = require("../data/flowers");


// ==========================================
// GET ALL FLOWERS
// ==========================================

const getFlowers = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: flowers.length,
      flowers: flowers,
    });
  } catch (error) {
    console.error("Get Flowers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch flowers",
    });
  }
};


// ==========================================
// GET SINGLE FLOWER
// ==========================================

const getFlowerById = (req, res) => {
  try {
    const { flowerId } = req.params;

    const flower = flowers.find(
      (item) => item.id === flowerId
    );

    if (!flower) {
      return res.status(404).json({
        success: false,
        message: "Flower not found",
      });
    }

    return res.status(200).json({
      success: true,
      flower: flower,
    });
  } catch (error) {
    console.error("Get Flower Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch flower",
    });
  }
};


module.exports = {
  getFlowers,
  getFlowerById,
};