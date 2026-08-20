// ==========================================
// BOUQUET IMAGE ASSETS
// ==========================================

const bouquetImages = import.meta.glob(
  "/src/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);


// ==========================================
// FIND IMAGE BY FILE NAME
// ==========================================

const findBouquetImage = (imageName) => {
  // ==========================================
  // NO IMAGE NAME
  // ==========================================

  if (!imageName) {
    return null;
  }

  // ==========================================
  // GET ONLY FILE NAME
  // ==========================================

  const fileName = imageName
    .split("/")
    .pop();

  // ==========================================
  // SEARCH IMAGE
  // ==========================================

  const match = Object.entries(
    bouquetImages
  ).find(
    ([path]) =>
      path.split("/").pop() === fileName
  );

  // ==========================================
  // RETURN IMAGE URL
  // ==========================================

  return match
    ? match[1]
    : null;
};


// ==========================================
// BOUQUET DISPLAY
// ==========================================

const BouquetDisplay = ({ bouquet }) => {

  // ==========================================
  // NO BOUQUET
  // ==========================================

  if (!bouquet) {
    return null;
  }


  // ==========================================
  // BOUQUET IMAGE
  //
  // Backend:
  // bouquetImage: "BW-WR001-001.png"
  // ==========================================

  const bouquetImage =
    findBouquetImage(
      bouquet.bouquetImage ||
        bouquet.image ||
        bouquet.imageUrl ||
        bouquet.bouquet?.image ||
        bouquet.bouquet?.imageUrl
    );


  // ==========================================
  // CARD DATA
  // ==========================================

  const card =
    bouquet.card &&
    typeof bouquet.card === "object"
      ? bouquet.card
      : null;


  // ==========================================
  // MESSAGE DATA
  // ==========================================

  const message =
    bouquet.message &&
    typeof bouquet.message === "object"
      ? bouquet.message
      : null;


  // ==========================================
  // MESSAGE TEXT
  //
  // IMPORTANT:
  // ONLY USER 1 ENTERED MESSAGE
  //
  // We DO NOT use:
  // card.name
  // card.subtitle
  // card.id
  // default text
  // placeholder text
  // ==========================================

  const messageText =
    typeof bouquet.message === "string"
      ? bouquet.message
      : message?.messageText ||
        message?.text ||
        message?.message ||
        "";


  // ==========================================
  // RECIPIENT NAME
  //
  // ONLY USER 1 ENTERED NAME
  // ==========================================

  const recipientName =
    message?.recipientName || "";


  // ==========================================
  // SENDER NAME
  //
  // ONLY USER 1 ENTERED NAME
  // ==========================================

  const senderName =
    message?.senderName || "";


  // ==========================================
  // CARD BACKGROUND
  //
  // This comes from the card selected
  // by USER 1.
  //
  // We keep the selected card design.
  // ==========================================

  const cardBackground =
    card?.background ||
    "linear-gradient(145deg, #302d43, #1f1d31)";


  // ==========================================
  // CARD TEXT COLOR
  //
  // Same color as USER 1 selected card.
  // ==========================================

  const cardTextColor =
    card?.textColor ||
    "#e6c477";


  // ==========================================
  // CARD BORDER COLOR
  //
  // Same border as USER 1 selected card.
  // ==========================================

  const cardBorderColor =
    card?.borderColor ||
    "#514b61";


  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div
      className="
        w-full
        flex
        flex-col
        items-center
      "
    >


      {/* ==========================================
          REAL USER 1 BOUQUET
          
          IMPORTANT:
          DO NOT CHANGE THIS SECTION.
          
          User 2 should still receive the
          actual bouquet image created by User 1.
      ========================================== */}

      {bouquetImage ? (

        <div
          className="
            w-full
            flex
            justify-center
          "
        >

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

      ) : (

        <div
          className="
            text-center
            py-10
          "
        >

          <p
            className="
              text-sm
              opacity-60
            "
          >
            Bouquet image unavailable
          </p>

        </div>

      )}


      {/* ==========================================
          CARD SECTION
          
          IMPORTANT:
          
          ONLY CARD SECTION IS CHANGED.
          
          Card design comes from USER 1.
          
          User-written content comes from
          USER 1 message data.
          
          We DO NOT display:
          
          - card.id
          - card.name
          - card.subtitle
          - card JSON
          - flower IDs
          - wrap ID
          - backend data
          - placeholder text
          - demo text
      ========================================== */}

      {card && (

        <div
          className="
            w-full
            max-w-[500px]
            mt-8
          "
        >


          {/* ========================================
              ACTUAL CARD
          ======================================== */}

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
                RECIPIENT SECTION
          
                ONLY USER 1 INPUT
          
                Example:
                User enters:
                LILY
          
                Receiver sees:
                To: LILY
          
                There is NO:
                "someone special"
                default value.
            ====================================== */}

            <div
              className="
                text-center
              "
            >

              {recipientName && (

                <p
                  className="
                    text-lg
                    italic
                    font-medium
                  "
                >
                  To: {recipientName}
                </p>

              )}

            </div>


            {/* ======================================
                MESSAGE SECTION
          
                ONLY USER 1 INPUT.
          
                Example:
          
                User 1 enters:
          
                HEY
                i Hope
          
                Receiver gets exactly:
          
                HEY
                i Hope
          
                No additional message.
            ====================================== */}

            <div
              className="
                flex
                flex-1
                items-center
                justify-center
                text-center
                py-8
              "
            >

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
                SENDER SECTION
          
                ONLY USER 1 INPUT.
          
                Example:
          
                User enters:
                Prem
          
                Receiver sees:
                With love,
                Prem
          
                There is NO:
                "Your name"
                default value.
            ====================================== */}

            {senderName && (

              <div
                className="
                  text-right
                "
              >

                <p
                  className="
                    text-sm
                    opacity-70
                    italic
                  "
                >
                  With love,
                </p>


                <p
                  className="
                    text-xl
                    italic
                    font-medium
                  "
                >
                  {senderName}
                </p>

              </div>

            )}

          </div>

        </div>

      )}


      {/* ==========================================
          FALLBACK MESSAGE
          
          IMPORTANT:
          THIS SECTION IS KEPT AS IT WAS.
          
          It only appears when there is NO CARD.
          
          If card exists, this section does NOT
          appear.
      ========================================== */}

      {!card && messageText && (

        <div
          className="
            w-full
            max-w-[500px]
            mt-8
          "
        >


          {/* ========================================
              FALLBACK MESSAGE BOX
          ======================================== */}

          <div
            className="
              rounded-2xl
              bg-white/80
              p-6
              shadow-sm
            "
          >


            {/* ======================================
                RECIPIENT
            ====================================== */}

            {recipientName && (

              <p
                className="
                  text-sm
                  opacity-60
                  mb-3
                "
              >
                To: {recipientName}
              </p>

            )}


            {/* ======================================
                MESSAGE
            ====================================== */}

            <p
              className="
                text-lg
                leading-relaxed
                whitespace-pre-wrap
              "
            >
              {messageText}
            </p>


            {/* ======================================
                SENDER
            ====================================== */}

            {senderName && (

              <p
                className="
                  text-right
                  mt-5
                "
              >
                With love, {senderName}
              </p>

            )}

          </div>

        </div>

      )}

    </div>
  );
};


// ==========================================
// EXPORT
// ==========================================

export default BouquetDisplay;