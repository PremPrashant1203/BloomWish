const bouquets = require("../data/bouquet");

// Temporary in-memory storage for generated bouquet links
const sharedBouquets = new Map();


// ==========================================
// GET ALL BOUQUETS
// ==========================================

const getBouquets = (req, res) => {
  try {
    const { wrapId } = req.query;

    let result = bouquets;

    if (wrapId) {
      result = bouquets.filter(
        (bouquet) => bouquet.wrapId === wrapId
      );
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      bouquets: result,
    });
  } catch (error) {
    console.error("Get Bouquets Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch bouquets",
    });
  }
};


// ==========================================
// GET SINGLE BOUQUET
// ==========================================

const getBouquetById = (req, res) => {
  try {
    const { bouquetId } = req.params;

    const bouquet = bouquets.find(
      (item) => item.bouquetId === bouquetId
    );

    if (!bouquet) {
      return res.status(404).json({
        success: false,
        message: "Bouquet not found",
      });
    }

    return res.status(200).json({
      success: true,
      bouquet,
    });
  } catch (error) {
    console.error("Get Bouquet Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch bouquet",
    });
  }
};


// ==========================================
// MATCH BOUQUET
// ==========================================

const matchBouquet = (req, res) => {
  try {
    const { flowerIds, wrapId } = req.body;

    console.log("=================================");
    console.log("MATCH BOUQUET REQUEST");
    console.log("Flower IDs:", flowerIds);
    console.log("Wrap ID:", wrapId);
    console.log("=================================");


    // --------------------------------------
    // VALIDATE FLOWER IDS
    // --------------------------------------

    if (!Array.isArray(flowerIds)) {
      return res.status(400).json({
        success: false,
        message: "flowerIds must be an array",
      });
    }


    // --------------------------------------
    // REMOVE DUPLICATES
    // --------------------------------------

    const selectedFlowers = [
      ...new Set(
        flowerIds.filter(
          (id) =>
            typeof id === "string" &&
            id.trim() !== ""
        )
      ),
    ];


    // --------------------------------------
    // VALIDATE FLOWER COUNT
    // BloomWish rule: 1–10 flowers
    // --------------------------------------

    if (
      selectedFlowers.length < 1 ||
      selectedFlowers.length > 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select between 1 and 10 flowers",
      });
    }


    // --------------------------------------
    // VALIDATE WRAP
    // --------------------------------------

    if (
      !wrapId ||
      typeof wrapId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "wrapId is required",
      });
    }


    // --------------------------------------
    // FIND BOUQUETS FOR SELECTED WRAP
    // --------------------------------------

    const availableBouquets = bouquets.filter(
      (bouquet) =>
        bouquet.wrapId === wrapId
    );


    if (availableBouquets.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No bouquets available for this wrap",
      });
    }


    // --------------------------------------
    // CALCULATE MATCH SCORE
    // --------------------------------------

    const results = availableBouquets.map(
      (bouquet) => {
        const bouquetSet = new Set(
          Array.isArray(bouquet.flowerIds)
            ? bouquet.flowerIds
            : []
        );

        let matchedFlowers = 0;


        selectedFlowers.forEach(
          (flowerId) => {
            if (bouquetSet.has(flowerId)) {
              matchedFlowers++;
            }
          }
        );


        const recall =
          selectedFlowers.length === 0
            ? 0
            : matchedFlowers /
              selectedFlowers.length;


        const precision =
          bouquet.flowerIds.length === 0
            ? 0
            : matchedFlowers /
              bouquet.flowerIds.length;


        const f1 =
          precision + recall === 0
            ? 0
            : (2 * precision * recall) /
              (precision + recall);


        return {
          bouquet,
          matchedFlowers,
          precision,
          recall,
          score: f1,
        };
      }
    );


    // --------------------------------------
    // SORT BEST MATCH
    // --------------------------------------

    results.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        b.matchedFlowers -
        a.matchedFlowers
      );
    });


    const bestMatch = results[0];


    // --------------------------------------
    // RESPONSE
    // --------------------------------------

    return res.status(200).json({
      success: true,

      match: {
        bouquetId:
          bestMatch.bouquet.bouquetId,

        wrapId:
          bestMatch.bouquet.wrapId,

        flowerIds:
          bestMatch.bouquet.flowerIds,

        flowerCount:
          bestMatch.bouquet.flowerCount,

        image:
          bestMatch.bouquet.image,

        matchedFlowers:
          bestMatch.matchedFlowers,

        score: Number(
          (
            bestMatch.score * 100
          ).toFixed(2)
        ),
      },

      alternatives:
        results
          .slice(1, 3)
          .map((item) => ({
            bouquetId:
              item.bouquet.bouquetId,

            matchedFlowers:
              item.matchedFlowers,

            score: Number(
              (
                item.score * 100
              ).toFixed(2)
            ),
          })),
    });

  } catch (error) {
    console.error(
      "Match Bouquet Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to match bouquet",
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};


// ==========================================
// CREATE BOUQUET SHARE LINK
// ==========================================

const createBouquetLink = (req, res) => {
  try {
    const {
      bouquetId,
      wrapId,
      flowerIds,
      card,
      message,
      theme,
      openAt,
    } = req.body;


    console.log("=================================");
    console.log("CREATE BOUQUET LINK REQUEST");
    console.log("Bouquet ID:", bouquetId);
    console.log("Wrap ID:", wrapId);
    console.log("Flower IDs:", flowerIds);
    console.log("=================================");


    // --------------------------------------
    // VALIDATE BOUQUET ID
    // --------------------------------------

    if (!bouquetId) {
      return res.status(400).json({
        success: false,
        message:
          "bouquetId is required",
      });
    }


    // --------------------------------------
    // FIND BOUQUET
    // --------------------------------------

    const bouquet = bouquets.find(
      (item) =>
        item.bouquetId === bouquetId
    );


    if (!bouquet) {
      return res.status(404).json({
        success: false,
        message: "Bouquet not found",
      });
    }


    // --------------------------------------
    // VALIDATE WRAP
    // --------------------------------------

    if (!wrapId) {
      return res.status(400).json({
        success: false,
        message: "wrapId is required",
      });
    }


    // --------------------------------------
    // GENERATE UNIQUE SHARE ID
    // --------------------------------------

    const shareId =
      `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;


    // --------------------------------------
    // FLOWER IDS
    // --------------------------------------

    const finalFlowerIds =
      Array.isArray(flowerIds)
        ? [
            ...new Set(
              flowerIds.filter(
                (id) =>
                  typeof id === "string" &&
                  id.trim() !== ""
              )
            ),
          ]
        : bouquet.flowerIds;


    // --------------------------------------
    // SAVE SHARE DATA
    // --------------------------------------

    const sharedBouquet = {
      shareId,

      bouquetId,

      wrapId,

      flowerIds:
        finalFlowerIds,

      bouquetImage:
        bouquet.image,

      card:
        card || null,

      message:
        message || null,

      theme:
        theme || null,

      openAt:
        openAt || null,

      createdAt:
        new Date().toISOString(),
    };


    sharedBouquets.set(
      shareId,
      sharedBouquet
    );


    // --------------------------------------
    // FRONTEND URL
    // --------------------------------------

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "https://bloomwish-frontend.onrender.com";


    // --------------------------------------
    // CREATE SHARE LINK
    // --------------------------------------

    const link =
      `${frontendUrl}/bouquet/${shareId}`;


    // --------------------------------------
    // RESPONSE
    // --------------------------------------

    return res.status(201).json({
      success: true,

      message:
        "Bouquet link generated successfully",

      shareId,

      link,

      bouquet:
        sharedBouquet,
    });

  } catch (error) {
    console.error(
      "Create Bouquet Link Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to generate bouquet link",

      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : error.message,
    });
  }
};


// ==========================================
// GET SHARED BOUQUET
// ==========================================

const getSharedBouquet = (req, res) => {
  try {
    const { shareId } = req.params;


    const sharedBouquet =
      sharedBouquets.get(shareId);


    if (!sharedBouquet) {
      return res.status(404).json({
        success: false,
        message:
          "Shared bouquet not found",
      });
    }


    return res.status(200).json({
      success: true,

      bouquet:
        sharedBouquet,
    });

  } catch (error) {
    console.error(
      "Get Shared Bouquet Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch shared bouquet",
    });
  }
};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  getBouquets,
  getBouquetById,
  matchBouquet,
  createBouquetLink,
  getSharedBouquet,
};