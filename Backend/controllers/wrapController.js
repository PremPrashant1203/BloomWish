const wraps = require("../data/Wrap");


// ==========================================
// GET ALL WRAPS
// ==========================================

const getWraps = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: wraps.length,
      wraps: wraps,
    });
  } catch (error) {
    console.error("Get Wraps Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch wraps",
    });
  }
};


// ==========================================
// GET SINGLE WRAP
// ==========================================

const getWrapById = (req, res) => {
  try {
    const { wrapId } = req.params;

    const wrap = wraps.find(
      (item) => item.id === wrapId
    );

    if (!wrap) {
      return res.status(404).json({
        success: false,
        message: "Wrap not found",
      });
    }

    res.status(200).json({
      success: true,
      wrap: wrap,
    });
  } catch (error) {
    console.error("Get Wrap Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch wrap",
    });
  }
};


module.exports = {
  getWraps,
  getWrapById,
};