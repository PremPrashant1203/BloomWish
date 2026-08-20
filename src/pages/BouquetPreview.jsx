import { useEffect, useMemo, useState } from "react";
import CardRenderer from "../components/cardRender";

const API_BASE_URL = "https://bloomwish.onrender.com";

const bouquetImages = import.meta.glob(
  "../assets/bouquets/*.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const getBouquetImage = (imageName) => {
  if (!imageName) return null;

  const fileName = imageName.split("/").pop();

  return (
    bouquetImages[
      `../assets/bouquets/${fileName}`
    ] || null
  );
};

const themes = {
  "Soft Blush": {
    background:
      "linear-gradient(135deg, #fff0f7 0%, #f8c6dc 50%, #ffeaf3 100%)",
  },

  "Midnight Garden": {
    background:
      "linear-gradient(135deg, #071633 0%, #182d55 50%, #09162f 100%)",
  },

  "Golden Hour": {
    background:
      "linear-gradient(135deg, #fff1c9 0%, #ffd27e 50%, #ffe9b2 100%)",
  },

  "Lavender Dream": {
    background:
      "linear-gradient(135deg, #f0ddf5 0%, #d2a5df 50%, #f3e5f7 100%)",
  },

  "Spring Meadow": {
    background:
      "linear-gradient(135deg, #e4f5e0 0%, #b9ddb4 50%, #eef9eb 100%)",
  },

  "Starlit Night": {
    background:
      "linear-gradient(135deg, #0b1839 0%, #172b54 50%, #07132e 100%)",
  },

  "Rose Mist": {
    background:
      "linear-gradient(135deg, #f8d9e6 0%, #df9fbc 50%, #f9e7ef 100%)",
  },

  "Ocean Breeze": {
    background:
      "linear-gradient(135deg, #dff7f5 0%, #8bcfc8 50%, #e9fbfa 100%)",
  },

  "Sunset Glow": {
    background:
      "linear-gradient(135deg, #ffe0cf 0%, #ff9a76 50%, #ffe9dd 100%)",
  },

  "Cherry Blossom": {
    background:
      "linear-gradient(135deg, #ffd8e8 0%, #f27ca9 50%, #ffe8f0 100%)",
  },

  Classic: {
    background:
      "linear-gradient(135deg, #faf9f5 0%, #eee9df 50%, #fffdf9 100%)",
  },

  "Dreamy Pink": {
    background:
      "linear-gradient(135deg, #f9e4ef 0%, #edbfd5 50%, #fff0f7 100%)",
  },
};

function BouquetPreview({
  bouquetData,
  onBack,
}) {
  const [matchedBouquet, setMatchedBouquet] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [openTime, setOpenTime] =
    useState("immediately");

  const [customDate, setCustomDate] =
    useState("");

  const [customTime, setCustomTime] =
    useState("");

  const [generating, setGenerating] =
    useState(false);

  const [generatedLink, setGeneratedLink] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const [shared, setShared] =
    useState(false);

  // ==========================================
  // CARD FULLSCREEN STATE
  // ==========================================

  const [cardExpanded, setCardExpanded] =
    useState(false);

  const selectedCard =
    bouquetData?.card || null;

  const messageData =
    bouquetData?.message || {};

  const recipient =
    typeof messageData === "string"
      ? "You"
      : messageData?.recipient ||
        messageData?.recipientName ||
        messageData?.name ||
        messageData?.to ||
        "You";

  const message =
    typeof messageData === "string"
      ? messageData
      : messageData?.message ||
        messageData?.messageText ||
        messageData?.text ||
        messageData?.content ||
        "Your message...";

  const sender =
    typeof messageData === "string"
      ? "PREM"
      : messageData?.sender ||
        messageData?.senderName ||
        messageData?.yourName ||
        messageData?.from ||
        "PREM";

  const themeData =
    bouquetData?.theme || {};

  const themeName =
    typeof themeData === "string"
      ? themeData
      : themeData?.name ||
        themeData?.title ||
        "Soft Blush";

  const selectedTheme =
    themes[themeName] ||
    themes["Soft Blush"];

  const bouquetImage = useMemo(() => {
    return getBouquetImage(
      matchedBouquet?.image
    );
  }, [matchedBouquet]);

  // ==========================================
  // CLOSE CARD WITH ESCAPE
  // ==========================================

  useEffect(() => {
    if (!cardExpanded) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setCardExpanded(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [cardExpanded]);

  // ==========================================
  // LOAD MATCHED BOUQUET
  // ==========================================

  useEffect(() => {
    const loadBouquet = async () => {
      try {
        setLoading(true);
        setError("");

        const flowerIds = (
          bouquetData?.flowers || []
        ).map((flower) => {
          if (typeof flower === "string") {
            return flower;
          }

          return flower?.id;
        });

        const wrapId =
          typeof bouquetData?.wrap === "string"
            ? bouquetData.wrap
            : bouquetData?.wrap?.id;

        if (!wrapId) {
          throw new Error(
            "Wrap selection is missing."
          );
        }

        if (!flowerIds.length) {
          throw new Error(
            "Flower selection is missing."
          );
        }

        const response = await fetch(
          `${API_BASE_URL}/api/bouquets/match`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              flowerIds,
              wrapId,
            }),
          }
        );

        const data =
          await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to find bouquet."
          );
        }

        const bouquet =
          data.match ||
          data.bouquet;

        if (!bouquet) {
          throw new Error(
            "No matching bouquet found."
          );
        }

        setMatchedBouquet(bouquet);

      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Unable to create bouquet."
        );

      } finally {
        setLoading(false);
      }
    };

    loadBouquet();
  }, [bouquetData]);

  // ==========================================
  // GET OPEN TIME
  // ==========================================

  const getOpenAt = () => {
    if (openTime === "immediately") {
      return new Date().toISOString();
    }

    if (openTime === "5minutes") {
      return new Date(
        Date.now() + 5 * 60 * 1000
      ).toISOString();
    }

    if (openTime === "1hour") {
      return new Date(
        Date.now() + 60 * 60 * 1000
      ).toISOString();
    }

    if (openTime === "tomorrow") {
      const date = new Date();

      date.setDate(
        date.getDate() + 1
      );

      date.setHours(
        9,
        0,
        0,
        0
      );

      return date.toISOString();
    }

    if (
      openTime === "custom" &&
      customDate &&
      customTime
    ) {
      return new Date(
        `${customDate}T${customTime}`
      ).toISOString();
    }

    return null;
  };

  // ==========================================
  // GENERATE BOUQUET LINK
  // ==========================================

  const handleGenerateLink = async () => {
    try {
      setGenerating(true);
      setError("");

      const openAt = getOpenAt();

      if (!openAt) {
        setError(
          "Please select date and time."
        );

        setGenerating(false);

        return;
      }

      const flowerIds = (
        bouquetData?.flowers || []
      ).map((flower) => {
        if (typeof flower === "string") {
          return flower;
        }

        return flower?.id;
      });

      const wrapId =
        typeof bouquetData?.wrap === "string"
          ? bouquetData.wrap
          : bouquetData?.wrap?.id;

      const payload = {
        bouquetId:
          matchedBouquet?.bouquetId,

        wrapId,

        flowerIds,

        card: selectedCard,

        message: messageData,

        theme: themeData,

        openAt,
      };

      console.log(
        "Bouquet Link Payload:",
        payload
      );

      const response = await fetch(
        `${API_BASE_URL}/api/bouquets/create`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to generate link."
        );
      }

      const link =
        data.link ||
        data.shareLink;

      if (link) {
        setGeneratedLink(link);
        return;
      }

      const shareId =
        data.shareId ||
        data.id;

      if (shareId) {
        setGeneratedLink(
          `${window.location.origin}/bouquet/${shareId}`
        );

        return;
      }

      throw new Error(
        "Backend did not return a link."
      );

    } catch (err) {
      console.error(
        "Generate Link Error:",
        err
      );

      setError(
        err.message ||
          "Unable to generate link."
      );

    } finally {
      setGenerating(false);
    }
  };

  // ==========================================
  // COPY LINK
  // ==========================================

  const handleCopy = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(
        generatedLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // SHARE LINK
  // ==========================================

  const handleShare = async () => {
    if (!generatedLink) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "Your BloomWish Bouquet",

          text:
            "Someone created a special bouquet for you.",

          url: generatedLink,
        });

        setShared(true);

        setTimeout(() => {
          setShared(false);
        }, 2000);

        return;
      }

      await handleCopy();

      setShared(true);

      setTimeout(() => {
        setShared(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{
          background:
            selectedTheme.background,
        }}
      >
        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/60 border-t-[#df5890]" />

          <p className="mt-4 text-sm font-semibold text-[#765f6b]">
            Creating your bouquet...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error && !matchedBouquet) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-5"
        style={{
          background:
            selectedTheme.background,
        }}
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <h2 className="text-xl font-bold text-[#4f4650]">
            Bouquet couldn't be created
          </h2>

          <p className="mt-2 text-sm text-[#c55778]">
            {error}
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-full bg-[#df5890] px-7 py-3 font-semibold text-white"
          >
            ← Back
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN PREVIEW
  // ==========================================

  return (
    <>
      {/* ========================================
          CARD ANIMATIONS
      ========================================= */}

      <style>{`
        @keyframes bloomCardFloat {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-5px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes cardModalFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes cardZoomIn {
          0% {
            opacity: 0;
            transform: scale(0.72);
          }

          70% {
            opacity: 1;
            transform: scale(1.03);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes cardGlow {
          0% {
            box-shadow:
              0 12px 25px rgba(70, 40, 60, 0.12);
          }

          50% {
            box-shadow:
              0 18px 35px rgba(70, 40, 60, 0.20);
          }

          100% {
            box-shadow:
              0 12px 25px rgba(70, 40, 60, 0.12);
          }
        }

        .bloomwish-card-small {
          animation:
            bloomCardFloat 3.5s ease-in-out infinite,
            cardGlow 3.5s ease-in-out infinite;
        }

        .bloomwish-card-modal {
          animation:
            cardModalFade 0.25s ease-out forwards;
        }

        .bloomwish-card-expanded {
          animation:
            cardZoomIn 0.42s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .bloomwish-card-small,
          .bloomwish-card-modal,
          .bloomwish-card-expanded {
            animation: none;
          }
        }
      `}</style>

      <div
        className="min-h-screen px-4 py-8 sm:px-6"
        style={{
          background:
            selectedTheme.background,
        }}
      >
        <main className="mx-auto max-w-4xl">

          {/* =====================================
              TITLE
          ====================================== */}

          <div className="text-center">

            <p className="text-sm font-semibold text-[#d4477d]">
              Your BloomWish Bouquet
            </p>

            <h1 className="mt-1 font-serif text-4xl font-semibold text-[#d4477d] sm:text-5xl">
              A Bouquet Just For You
            </h1>

          </div>

          {/* =====================================
              BOUQUET + CARD
          ====================================== */}

          <div className="mt-4 flex flex-col items-center">

            {/* ===================================
                BOUQUET IMAGE
            ==================================== */}

            {bouquetImage && (
              <img
                src={bouquetImage}
                alt="Your BloomWish Bouquet"
                className="max-h-[450px] w-auto max-w-[78%] object-contain drop-shadow-[0_18px_28px_rgba(80,40,60,0.20)] sm:max-h-[500px] sm:max-w-[72%]"
              />
            )}

            {/* ===================================
                CARD
            ==================================== */}

            {selectedCard && (
              <>
                {/* =================================
                    SMALL CARD
                ================================== */}

                <button
                  type="button"
                  aria-label="Expand card"
                  onClick={() =>
                    setCardExpanded(true)
                  }
                  className="bloomwish-card-small -mt-3 w-full max-w-[300px] cursor-pointer border-0 bg-transparent p-0 text-left transition-transform duration-300 hover:scale-[1.015] active:scale-[0.98] sm:max-w-[330px]"
                >
                  <CardRenderer
                    card={selectedCard}
                    recipient={recipient}
                    message={message}
                    sender={sender}
                  />
                </button>

                {/* =================================
                    FULLSCREEN CARD
                ================================== */}

                {cardExpanded && (
                  <div
                    className="bloomwish-card-modal fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#071a3d]/90 p-3 backdrop-blur-md sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Expanded greeting card"
                    onClick={() =>
                      setCardExpanded(false)
                    }
                  >

                    {/* =================================
                        CLOSE BUTTON
                    ================================== */}

                    <button
                      type="button"
                      aria-label="Close card"
                      onClick={() =>
                        setCardExpanded(false)
                      }
                      className="absolute right-4 top-4 z-[10001] flex h-11 w-11 items-center justify-center rounded-full bg-white text-3xl font-light leading-none text-[#273451] shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 sm:right-6 sm:top-6"
                    >
                      ×
                    </button>

                    {/* =================================
                        FULL CARD
                    ================================== */}

                    <div
                      className="bloomwish-card-expanded flex max-h-[94vh] max-w-[96vw] items-center justify-center"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      <div className="max-h-[94vh] w-[92vw] max-w-[900px] overflow-auto rounded-[28px] sm:w-[82vw]">
                        <CardRenderer
                          card={selectedCard}
                          recipient={recipient}
                          message={message}
                          sender={sender}
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* CARD HINT */}

                <p className="mt-3 text-xs font-medium text-[#927f8a]">
                  Tap the card to expand
                </p>
              </>
            )}

          </div>

          {/* =====================================
              OPEN TIME
          ====================================== */}

          <section className="mx-auto mt-7 max-w-xl rounded-3xl bg-white/90 p-6 shadow-[0_15px_35px_rgba(70,40,60,0.15)]">

            <h2 className="text-center text-lg font-bold text-[#4f4650]">
              When should they open it?
            </h2>

            <p className="mt-1 text-center text-xs text-[#927f8a]">
              Choose when the recipient can open your bouquet.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">

              {/* IMMEDIATELY */}

              <button
                type="button"
                onClick={() =>
                  setOpenTime("immediately")
                }
                className={`rounded-2xl border p-4 text-sm font-semibold ${
                  openTime === "immediately"
                    ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                    : "border-[#edd8e1] bg-white text-[#766b74]"
                }`}
              >
                Open Immediately
              </button>

              {/* 5 MINUTES */}

              <button
                type="button"
                onClick={() =>
                  setOpenTime("5minutes")
                }
                className={`rounded-2xl border p-4 text-sm font-semibold ${
                  openTime === "5minutes"
                    ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                    : "border-[#edd8e1] bg-white text-[#766b74]"
                }`}
              >
                After 5 Minutes
              </button>

              {/* 1 HOUR */}

              <button
                type="button"
                onClick={() =>
                  setOpenTime("1hour")
                }
                className={`rounded-2xl border p-4 text-sm font-semibold ${
                  openTime === "1hour"
                    ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                    : "border-[#edd8e1] bg-white text-[#766b74]"
                }`}
              >
                After 1 Hour
              </button>

              {/* TOMORROW */}

              <button
                type="button"
                onClick={() =>
                  setOpenTime("tomorrow")
                }
                className={`rounded-2xl border p-4 text-sm font-semibold ${
                  openTime === "tomorrow"
                    ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                    : "border-[#edd8e1] bg-white text-[#766b74]"
                }`}
              >
                Tomorrow
              </button>

            </div>

            {/* CUSTOM */}

            <button
              type="button"
              onClick={() =>
                setOpenTime("custom")
              }
              className={`mt-3 w-full rounded-2xl border p-4 text-sm font-semibold ${
                openTime === "custom"
                  ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                  : "border-[#edd8e1] bg-white text-[#766b74]"
              }`}
            >
              Custom Date & Time
            </button>

            {openTime === "custom" && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <input
                  type="date"
                  value={customDate}
                  onChange={(e) =>
                    setCustomDate(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-[#edd8e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#df5890]"
                />

                <input
                  type="time"
                  value={customTime}
                  onChange={(e) =>
                    setCustomTime(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-[#edd8e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#df5890]"
                />

              </div>
            )}

          </section>

          {/* =====================================
              ERROR
          ====================================== */}

          {error && (
            <p className="mx-auto mt-4 max-w-xl rounded-xl bg-white p-3 text-center text-sm text-[#c55778]">
              {error}
            </p>
          )}

          {/* =====================================
              GENERATE LINK BUTTON
          ====================================== */}

          {!generatedLink && (
            <div className="mt-7 text-center">

              <button
                type="button"
                onClick={
                  handleGenerateLink
                }
                disabled={generating}
                className="rounded-full bg-[#df5890] px-9 py-3.5 font-bold text-white shadow-[0_10px_25px_rgba(223,88,144,0.30)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {generating
                  ? "Generating Link..."
                  : "Generate Bouquet Link"}
              </button>

            </div>
          )}

          {/* =====================================
              GENERATED LINK
          ====================================== */}

          {generatedLink && (
            <section className="mx-auto mt-5 max-w-lg rounded-3xl bg-white p-5 text-center shadow-lg">

              <h2 className="text-xl font-bold text-[#4f4650]">
                Your bouquet is ready!
              </h2>

              <p className="mt-1 text-sm text-[#927f8a]">
                Share this link with someone special.
              </p>

              {/* LINK */}

              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[#efd5e0] bg-[#fff7fa] p-2">

                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#4f4650] outline-none"
                />

                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-xl bg-[#df5890] px-4 py-2.5 text-xs font-bold text-white"
                >
                  {copied
                    ? "Copied ✓"
                    : "Copy"}
                </button>

              </div>

              {/* SHARE */}

              <button
                type="button"
                onClick={handleShare}
                className="mt-3 w-full rounded-full bg-[#4f4650] px-6 py-2.5 font-bold text-white transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
              >
                {shared
                  ? "Shared ✓"
                  : "↗ Share Bouquet"}
              </button>

            </section>
          )}

          {/* =====================================
              BACK
          ====================================== */}

          <div className="pb-8 pt-7 text-center">

            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-[#edcbd9] bg-white px-7 py-3 text-sm font-semibold text-[#766b74]"
            >
              ← Back
            </button>

          </div>

        </main>
      </div>
    </>
  );
}

export default BouquetPreview;