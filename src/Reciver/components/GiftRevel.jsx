import BouquetDisplay from "./BouquetDisplay";

const GiftReveal = ({ bouquet, onSave }) => {
  return (
    <div
      id="bloomwish-gift"
      className="min-h-screen w-full flex flex-col items-center px-4 py-10"
    >

      <div className="text-center mb-8">
        <p className="text-sm opacity-60">
          Your BloomWish gift
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mt-2">
          A bouquet just for you 💐
        </h1>
      </div>

      <div className="w-full max-w-[700px]">
        <BouquetDisplay bouquet={bouquet} />
      </div>

      <button
        onClick={onSave}
        className="mt-8 px-6 py-3 rounded-full bg-white shadow-md hover:scale-105 transition"
      >
        Save as Image
      </button>

    </div>
  );
};

export default GiftReveal;