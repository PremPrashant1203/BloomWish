import BouquetDisplay from "./BouquetDisplay";
import SavedAsImage from "./SavedAsImage";

const GiftRevel = ({ bouquet }) => {
  return (
    <div
      id="bloomwish-gift"
      className="min-h-screen w-full flex flex-col items-center px-4 py-10"
    >
      {/* ==============================
          HEADER
      ============================== */}

      <div className="text-center mb-8">
        <p className="text-sm opacity-60">
          Your BloomWish gift
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mt-2">
          A bouquet just for you 💐
        </h1>
      </div>

      {/* ==============================
          REAL USER 1 BOUQUET
      ============================== */}

      <div className="w-full max-w-[700px]">
        <BouquetDisplay bouquet={bouquet} />
      </div>

      {/* ==============================
          SAVE AS IMAGE
      ============================== */}

      <SavedAsImage
        targetId="bloomwish-gift"
      />
    </div>
  );
};

export default GiftRevel;