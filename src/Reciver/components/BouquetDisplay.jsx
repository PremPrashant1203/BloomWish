// ==========================================
// BOUQUET DISPLAY
// USER 2 — CARD ONLY
// ==========================================

const BouquetDisplay = ({ bouquet }) => {
  if (!bouquet) {
    return null;
  }

  // ==========================================
  // CARD DATA
  // ==========================================

  const card =
    bouquet.card &&
    typeof bouquet.card === "object"
      ? bouquet.card
      : null;

  // Agar card nahi hai to kuch render nahi hoga
  if (!card) {
    return null;
  }

  // ==========================================
  // MESSAGE DATA
  // EXACT USER 1 MESSAGE
  // ==========================================

  const message =
    bouquet.message &&
    typeof bouquet.message === "object"
      ? bouquet.message
      : {};

  const recipientName =
    message?.recipientName || "";

  const messageText =
    typeof bouquet.message === "string"
      ? bouquet.message
      : message?.messageText ||
        message?.text ||
        message?.message ||
        "";

  const senderName =
    message?.senderName || "";

  // ==========================================
  // CARD STYLE
  // SAME STYLE DATA USER 1 SELECTED
  // ==========================================

  const cardBackground =
    card?.background ||
    "linear-gradient(145deg, #302d43, #1f1d31)";

  const cardTextColor =
    card?.textColor ||
    "#e6c477";

  const cardBorderColor =
    card?.borderColor ||
    "#514b61";

  // ==========================================
  // CARD
  // ==========================================

  return (
    <div className="w-full flex justify-center">

      <div className="w-full max-w-[500px]">

        <div
          className="
            relative
            w-full
            min-h-[355px]
            rounded-2xl
            p-8
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
              CARD TITLE
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
              MESSAGE
          ====================================== */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              text-center
              flex-1
              py-8
            "
          >

            {recipientName && (
              <p
                className="
                  text-sm
                  opacity-80
                  mb-5
                "
              >
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

    </div>
  );
};

export default BouquetDisplay;