import Navbar from "../components/Navbar";
import Stepper from "../components/stepper";

import flowers from "../Data/flowers";
import greenery from "../Data/greenery";


// ============================================================
// BOUQUET PREVIEW
// ============================================================

function BouquetPreview({
  flowers: selectedFlowers,
  greenery: selectedGreenery,
  onBack,
  onNext,
}) {

  // ==========================================================
  // 1. SELECTED FLOWERS
  // ==========================================================
  //
  // selectedFlowers ka format:
  //
  // {
  //   1: 1,
  //   3: 1,
  //   7: 1
  // }
  //
  // Har flower maximum 1 baar selected ho sakta hai.
  //


  const flowerItems = Object.entries(
    selectedFlowers || {}
  ).filter(([, count]) => Number(count) > 0);


  // ==========================================================
  // 2. SELECTED GREENERY
  // ==========================================================

  const greeneryItems = Object.entries(
    selectedGreenery || {}
  ).filter(([, count]) => Number(count) > 0);


  // ==========================================================
  // 3. FIND FLOWER FROM FLOWERS DATA
  // ==========================================================

  const getFlower = (id) => {
    return flowers.find(
      (flower) => flower.id === Number(id)
    );
  };


  // ==========================================================
  // 4. FIND GREENERY FROM GREENERY DATA
  // ==========================================================

  const getGreenery = (id) => {
    return greenery.find(
      (item) => item.id === Number(id)
    );
  };


  // ==========================================================
  // 5. CREATE FINAL FLOWER LIST
  // ==========================================================
  //
  // IMPORTANT:
  // Ek flower ko dobara render nahi karna hai.
  //
  // Isliye count ko quantity ki tarah use nahi kar rahe.
  // Sirf selected / not selected check kar rahe hain.
  //
  // ==========================================================

  const flowerCopies = [];

  flowerItems.forEach(([id]) => {

    const flower = getFlower(id);

    if (!flower) {
      return;
    }

    flowerCopies.push({
      ...flower,
      uniqueId: `${flower.id}-flower`,
    });

  });


  // ==========================================================
  // 6. TOTAL SELECTED FLOWERS
  // ==========================================================

  const totalFlowers = flowerCopies.length;


  // ==========================================================
  // 7. BOUQUET POSITION SLOTS
  // ==========================================================
  //
  // Maximum 10 flowers allowed hain.
  //
  // Har flower ko ek natural position milegi.
  //
  // Ye generic mathematical fan se better hai kyunki
  // bouquet mein flowers random line mein nahi hote.
  //
  // ==========================================================
const bouquetSlots = [
  // BACK LEFT
  {
    left: 18,
    top: 35,
    width: 105,
    rotate: -12,
    zIndex: 20,
  },

  // BACK CENTER LEFT
  {
    left: 35,
    top: 15,
    width: 115,
    rotate: -6,
    zIndex: 25,
  },

  // BACK CENTER
  {
    left: 50,
    top: 5,
    width: 125,
    rotate: 0,
    zIndex: 30,
  },

  // BACK CENTER RIGHT
  {
    left: 65,
    top: 18,
    width: 115,
    rotate: 7,
    zIndex: 25,
  },

  // BACK RIGHT
  {
    left: 82,
    top: 38,
    width: 105,
    rotate: 12,
    zIndex: 20,
  },

  // MIDDLE LEFT
  {
    left: 27,
    top: 105,
    width: 120,
    rotate: -10,
    zIndex: 40,
  },

  // MIDDLE CENTER
  {
    left: 50,
    top: 85,
    width: 125,
    rotate: 0,
    zIndex: 45,
  },

  // MIDDLE RIGHT
  {
    left: 73,
    top: 105,
    width: 120,
    rotate: 10,
    zIndex: 40,
  },

  // FRONT LEFT
  {
    left: 38,
    top: 165,
    width: 110,
    rotate: -7,
    zIndex: 60,
  },

  // FRONT RIGHT
  {
    left: 62,
    top: 165,
    width: 110,
    rotate: 7,
    zIndex: 60,
  },
];


  // ==========================================================
  // 8. FLOWER CATEGORY POSITION ADJUSTMENTS
  // ==========================================================
  //
  // Different flowers ka natural size alag hota hai.
  //
  // Example:
  //
  // Lily → thoda bada
  // Rose → medium
  // Daisy → slightly smaller
  // Tulip → medium/tall
  //
  // ==========================================================

const getFlowerAdjustment = (flowerName) => {
  const name = flowerName.toLowerCase();

  // =========================
  // LILIES
  // =========================

  if (name.includes("lily")) {
    return {
      scale: 0.88,
      topOffset: -8,
    };
  }

  // =========================
  // TULIPS
  // =========================

  if (name.includes("tulip")) {
    return {
      scale: 0.85,
      topOffset: -5,
    };
  }

  // =========================
  // ROSES
  // =========================

  if (name.includes("rose")) {
    return {
      scale: 0.82,
      topOffset: 8,
    };
  }

  // =========================
  // ORCHIDS
  // =========================

  if (name.includes("orchid")) {
    return {
      scale: 0.82,
      topOffset: 5,
    };
  }

  // =========================
  // CHRYSANTHEMUM
  // =========================

  if (name.includes("chrysanthemum")) {
    return {
      scale: 0.78,
      topOffset: 8,
    };
  }

  // =========================
  // PEONY
  // =========================

  if (name.includes("peony")) {
    return {
      scale: 0.82,
      topOffset: 6,
    };
  }

  // =========================
  // DAISY
  // =========================

  if (name.includes("daisy")) {
    return {
      scale: 0.72,
      topOffset: 10,
    };
  }

  // =========================
  // LOTUS
  // =========================

  if (name.includes("lotus")) {
    return {
      scale: 0.85,
      topOffset: 0,
    };
  }

  // =========================
  // SUNFLOWER
  // =========================

  if (name.includes("sunflower")) {
    return {
      scale: 0.85,
      topOffset: 0,
    };
  }

  // =========================
  // DEFAULT
  // =========================

  return {
    scale: 0.82,
    topOffset: 0,
  };
};


  // ==========================================================
  // 9. GET FLOWER STYLE
  // ==========================================================
const getFlowerStyle = (flower, index) => {
  const slot =
    bouquetSlots[
      Math.min(
        index,
        bouquetSlots.length - 1
      )
    ];

  const adjustment =
    getFlowerAdjustment(flower.name);

  const finalWidth =
    slot.width * adjustment.scale;

  const finalTop =
    slot.top + adjustment.topOffset;

  return {
    left: `${slot.left}%`,
    top: `${finalTop}px`,
    width: `${finalWidth}px`,

    transform:
      `translateX(-50%) rotate(${slot.rotate}deg)`,

    zIndex: slot.zIndex,

    opacity: 1,
    visibility: "visible",
    display: "block",

    animationDelay:
      `${index * 80}ms`,
  };
};

  // ==========================================================
  // 10. RENDER
  // ==========================================================

  return (

    <div className="flower-page">

      {/* ====================================================
          NAVBAR
      ==================================================== */}

      <Navbar />


      {/* ====================================================
          STEPPER
      ==================================================== */}

      <Stepper />


      <main className="bouquet-page">


        {/* ==================================================
            HEADING
        ================================================== */}

        <section className="bouquet-heading">

          <h1>
            Your Bouquet
          </h1>

          <p>
            Here's how your bouquet is coming together
          </p>

        </section>


        {/* ==================================================
            BOUQUET STAGE
        ================================================== */}

        <section className="bouquet-stage">


          <div className="bouquet">


            {/* ==============================================
                GREENERY
                ==============================================

                Greenery intentionally flowers ke peeche
                rahegi.

                Baad mein:
                - stems
                - bundle
                - ribbon
                - bow

                isi structure ke andar add karenge.
            ============================================== */}

            <div className="bouquet-greenery-layer">

              {greeneryItems.map(
                ([id], index) => {

                  const item =
                    getGreenery(id);


                  if (!item) {
                    return null;
                  }


                  return (

                    <div
                      key={`greenery-${id}`}
                      className={
                        `bouquet-greenery greenery-${index}`
                      }
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        loading="eager"
                        decoding="async"
                      />

                    </div>

                  );

                }
              )}

            </div>


            {/* ==============================================
                FLOWER LAYER
            ============================================== */}

            <div className="bouquet-flower-layer">


              {flowerCopies.map(
                (flower, index) => (

                  <div
                    key={flower.uniqueId}
                    className="bouquet-flower"
                    style={
                      getFlowerStyle(
                        flower,
                        index
                      )
                    }
                  >

                    <img
                      src={flower.image}
                      alt={flower.name}
                      loading="eager"
                      decoding="async"
                    />

                  </div>

                )
              )}


            </div>


            {/* ==============================================
                STEMS
            ============================================== */}

            <div className="bouquet-stems">

              <span></span>

              <span></span>

              <span></span>

              <span></span>

              <span></span>

            </div>


            {/* ==============================================
                RIBBON
            ==============================================

                Abhi placeholder hai.

                Later yahan actual PNG:
                stem bundle + wrapped ribbon + bow
                add karenge.
            ============================================== */}

            <div className="bouquet-ribbon">

              <div className="ribbon-left"></div>

              <div className="ribbon-knot"></div>

              <div className="ribbon-right"></div>

            </div>


          </div>

        </section>


        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <div className="bouquet-navigation">


          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>


          <button
            className="next-button"
            onClick={onNext}
          >
            Continue →
          </button>


        </div>


      </main>

    </div>
  );
}


export default BouquetPreview;