const BouquetDisplay = ({ bouquet }) => {
  if (!bouquet) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center">

      {/* ==========================================
          ACTUAL BOUQUET
      ========================================== */}

      {bouquet.bouquetImage && (
        <div className="w-full flex justify-center">
          <img
            src={bouquet.bouquetImage}
            alt="BloomWish bouquet"
            className="w-full max-w-[500px] object-contain rounded-2xl"
          />
        </div>
      )}

      {/* ==========================================
          CARD
      ========================================== */}

      {bouquet.card && (
        <div className="w-full max-w-[500px] mt-8">
          <div className="rounded-2xl bg-white/80 p-6 shadow-sm">

            <p className="text-sm opacity-60 mb-2">
              Your card
            </p>

            {typeof bouquet.card === "string" ? (
              <p className="text-lg">
                {bouquet.card}
              </p>
            ) : (
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(
                  bouquet.card,
                  null,
                  2
                )}
              </pre>
            )}

          </div>
        </div>
      )}

      {/* ==========================================
          EXACT MESSAGE FROM USER 1
      ========================================== */}

      {bouquet.message && (
        <div className="w-full max-w-[500px] mt-6">
          <div className="rounded-2xl bg-white/80 p-6 shadow-sm">

            <p className="text-sm opacity-60 mb-2">
              A message for you
            </p>

            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {typeof bouquet.message === "string"
                ? bouquet.message
                : bouquet.message?.text ||
                  bouquet.message?.message ||
                  JSON.stringify(
                    bouquet.message,
                    null,
                    2
                  )}
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default BouquetDisplay;