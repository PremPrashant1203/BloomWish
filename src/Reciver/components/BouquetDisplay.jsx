const BouquetDisplay = ({ bouquet }) => {
  if (!bouquet) {
    return null;
  }

  // ==========================================
  // BOUQUET IMAGE
  // Backend me field ka naam alag ho sakta hai
  // ==========================================

  const bouquetImage =
    bouquet.bouquetImage ||
    bouquet.image ||
    bouquet.imageUrl ||
    bouquet.bouquet?.image ||
    bouquet.bouquet?.imageUrl ||
    null;

  // ==========================================
  // CARD DATA
  // ==========================================

  const card =
    typeof bouquet.card === "object"
      ? bouquet.card
      : null;

  // ==========================================
  // MESSAGE DATA
  // ==========================================

  const message =
    typeof bouquet.message === "object"
      ? bouquet.message
      : null;

  const messageText =
    typeof bouquet.message === "string"
      ? bouquet.message
      : message?.messageText ||
        message?.text ||
        message?.message ||
        "";

  const recipientName =
    message?.recipientName || "";

  const senderName =
    message?.senderName || "";

  // ==========================================
  // CARD BACKGROUND
  // ==========================================

  const cardBackground =
    card?.background ||
    "linear-gradient(145deg, #302d43, #1f1d31)";

  // ==========================================
  // CARD TEXT COLOR
  // ==========================================

  const cardTextColor =
    card?.textColor || "#e6c477";

  // ==========================================
  // CARD BORDER COLOR
  // ==========================================

  const cardBorderColor =
    card?.borderColor || "#514b61";

  return (
    <div
      className="w-full flex flex-col items-center"
    >

      {/* ==========================================
          REAL BOUQUET
      ========================================== */}

      {bouquetImage && (
        <div className="w-full flex justify-center">
          <img
            src={bouquetImage}
            alt="Your BloomWish bouquet"
            className="
              w-full
              max-w-[650px]
              max-h-[650px]
              object-contain
              rounded-2xl
            "
          />
        </div>
      )}

      {/* ==========================================
          CARD
      ========================================== */}

      {card && (
        <div className="w-full max-w-[500px] mt-8">

          <div
            className="
              relative
              rounded-2xl
              p-8
              min-h-[320px]
              shadow-xl
              overflow-hidden
              flex
              flex-col
              justify-between
            "
            style={{
              background: cardBackground,
              color: cardTextColor,
              border: `1px solid ${cardBorderColor}`,
            }}
          >

            {/* ======================================
                CARD HEADER
            ====================================== */}

            <div className="text-center">

              {card.name && (
                <p
                  className="
                    text-xl
                    font-semibold
                    tracking-wide
                  "
                >
                  {card.name}
                </p>
              )}

              {card.subtitle && (
                <p
                  className="
                    text-sm
                    mt-2
                    opacity-80
                  "
                >
                  {card.subtitle}
                </p>
              )}

            </div>

            {/* ======================================
                MESSAGE ON CARD
            ====================================== */}

            <div className="text-center py-8">

              {recipientName && (
                <p className="text-sm opacity-80 mb-4">
                  To: {recipientName}
                </p>
              )}

              {messageText && (
                <p
                  className="
                    text-lg
                    leading-relaxed
                    whitespace-pre-wrap
                  "
                >
                  {messageText}
                </p>
              )}

            </div>

            {/* ======================================
                SENDER
            ====================================== */}

            {senderName && (
              <div className="text-right">

                <p className="text-sm opacity-70">
                  With love,
                </p>

                <p className="text-lg font-medium">
                  {senderName}
                </p>

              </div>
            )}

          </div>

        </div>
      )}

      {/* ==========================================
          FALLBACK MESSAGE
          Agar card nahi hai lekin message hai
      ========================================== */}

      {!card && messageText && (
        <div className="w-full max-w-[500px] mt-8">

          <div
            className="
              rounded-2xl
              bg-white/80
              p-6
              shadow-sm
            "
          >

            {recipientName && (
              <p className="text-sm opacity-60 mb-3">
                To: {recipientName}
              </p>
            )}

            <p
              className="
                text-lg
                leading-relaxed
                whitespace-pre-wrap
              "
            >
              {messageText}
            </p>

            {senderName && (
              <p className="text-right mt-5">
                With love, {senderName}
              </p>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default BouquetDisplay;