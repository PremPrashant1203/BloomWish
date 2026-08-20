const BouquetDisplay = ({ bouquet }) => {
  if (!bouquet) return null;

  return (
    <div className="flex flex-col items-center w-full">

      {/* Actual Bouquet */}
      {bouquet.bouquetImage && (
        <img
          src={bouquet.bouquetImage}
          alt="Your BloomWish bouquet"
          className="max-w-[420px] w-full object-contain"
        />
      )}

      {/* Message */}
      {bouquet.message && (
        <div className="mt-6 w-full max-w-[420px]">
          <div className="bg-white/70 rounded-2xl p-6 shadow-sm">

            <p className="text-xs opacity-60 mb-3">
              Your special message
            </p>

            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {bouquet.message}
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default BouquetDisplay;