import { useEffect, useMemo, useState } from "react";
import CardRenderer from "../components/cardRender";

const API_BASE_URL = "https://bloomwish.onrender.com";


// ==========================================
// BOUQUET IMAGES
// ==========================================

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


// ==========================================
// THEMES
// ==========================================

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


// ==========================================
// DATE & TIME HELPERS
// ==========================================

const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getLocalTimeString = (date = new Date()) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const getMaxDateString = (date = new Date()) => {
  const maxDate = new Date(date);

  maxDate.setDate(maxDate.getDate() + 7);

  return getLocalDateString(maxDate);
};


// ==========================================
// COMPONENT
// ==========================================

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

  const [currentDateTime, setCurrentDateTime] =
    useState(new Date());

  const todayDate =
    getLocalDateString(currentDateTime);

  const currentTime =
    getLocalTimeString(currentDateTime);

  const maxCustomDate =
    getMaxDateString(currentDateTime);

  const [customDate, setCustomDate] =
    useState(() => getLocalDateString());

  const [customTime, setCustomTime] =
    useState(() => getLocalTimeString());

  const [generating, setGenerating] =
    useState(false);

  const [generatedLink, setGeneratedLink] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  const [shared, setShared] =
    useState(false);

  const [cardExpanded, setCardExpanded] =
    useState(false);


  // ==========================================
  // REAL-TIME DATE & TIME
  // ==========================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  // Keep custom date/time valid as the current time changes.
  useEffect(() => {
    if (customDate < todayDate) {
      setCustomDate(todayDate);
      setCustomTime(currentTime);
      return;
    }

    if (customDate > maxCustomDate) {
      setCustomDate(maxCustomDate);
      return;
    }

    if (customDate === todayDate && customTime < currentTime) {
      setCustomTime(currentTime);
    }
  }, [todayDate, currentTime, maxCustomDate, customDate, customTime]);


  // ==========================================
  // CARD DATA
  // ==========================================

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


  // ==========================================
  // THEME
  // ==========================================

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


  // ==========================================
  // BOUQUET IMAGE
  // ==========================================

  const bouquetImage = useMemo(() => {
    return getBouquetImage(
      matchedBouquet?.image
    );
  }, [matchedBouquet]);


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
  // ESC CLOSE
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (
        event.key === "Escape" &&
        cardExpanded
      ) {
        setCardExpanded(false);
      }
    };


    document.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [cardExpanded]);


  // ==========================================
  // OPEN TIME
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
      if (customDate < todayDate || customDate > maxCustomDate) {
        return null;
      }

      let finalTime = customTime;

      if (customDate === todayDate && finalTime < currentTime) {
        finalTime = currentTime;
      }

      return new Date(
        `${customDate}T${finalTime}`
      ).toISOString();
    }


    return null;
  };


  // ==========================================
  // GENERATE LINK
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
  // COPY
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
  // SHARE
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
        className="flex min-h-screen items-center justify-center px-4"
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
  // MAIN
  // ==========================================

  return (
    <div
      className="min-h-screen overflow-x-hidden px-4 py-5 sm:px-6 sm:py-7"
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

          <p className="text-xs font-semibold text-[#d4477d] sm:text-sm">
            Your BloomWish Bouquet
          </p>

          <h1 className="mt-1 font-serif text-3xl font-semibold text-[#d4477d] sm:text-5xl">
            A Bouquet Just For You
          </h1>

        </div>


        {/* =====================================
            BOUQUET + CARD
        ====================================== */}

        <div className="mt-3 flex flex-col items-center">


          {/* ===================================
              BOUQUET
          ==================================== */}

          {bouquetImage && (
            <img
              src={bouquetImage}
              alt="Your BloomWish Bouquet"
              className="max-h-[380px] w-auto max-w-[72%] object-contain drop-shadow-[0_20px_30px_rgba(80,40,60,0.20)] sm:max-h-[450px] sm:max-w-[65%]"
            />
          )}


          {/* ===================================
              SMALL CARD
          ==================================== */}

          {selectedCard && (
            <>

              <button
                type="button"
                aria-label="Open greeting card"
                onClick={() =>
                  setCardExpanded(true)
                }
                className="-mt-3 w-full max-w-[270px] cursor-pointer border-0 bg-transparent p-0 text-left transition-transform duration-300 hover:scale-[1.02] sm:max-w-[300px]"
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
                  className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black/65 px-4 py-5 backdrop-blur-sm"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Expanded greeting card"
                  onClick={() =>
                    setCardExpanded(false)
                  }
                >

                  {/* =================================
                      RESPONSIVE MODAL
                  ================================== */}

                  <div
                    className="relative flex h-[calc(100vh-40px)] max-h-[760px] w-full max-w-[440px] items-center justify-center"
                    onClick={(event) =>
                      event.stopPropagation()
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
                      className="absolute right-[-6px] top-[-6px] z-[10000] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[27px] font-light leading-none text-[#4f4650] shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 sm:h-11 sm:w-11"
                    >
                      ×
                    </button>


                    {/* =================================
                        CARD
                        NO SCROLL
                    ================================== */}

                    <div
                      className="
                        flex
                        max-h-full
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-3xl
                      "
                    >

                      <div
                        className="
                          w-full
                          max-w-[420px]
                          origin-center
                        "
                      >

                        <CardRenderer
                          card={selectedCard}
                          recipient={recipient}
                          message={message}
                          sender={sender}
                        />

                      </div>

                    </div>

                  </div>

                </div>
              )}

            </>
          )}

        </div>


        {/* =====================================
            OPEN TIME
        ====================================== */}

        <section className="mx-auto mt-6 max-w-xl rounded-3xl bg-white/90 p-5 shadow-[0_15px_35px_rgba(70,40,60,0.15)]">

          <h2 className="text-center text-lg font-bold text-[#4f4650]">
            When should they open it? 💌
          </h2>

          <p className="mt-1 text-center text-xs text-[#927f8a]">
            Choose when the recipient can open your bouquet.
          </p>


          <div className="mt-4 grid grid-cols-2 gap-3">


            <button
              type="button"
              onClick={() =>
                setOpenTime("immediately")
              }
              className={`rounded-2xl border p-3 text-sm font-semibold ${
                openTime === "immediately"
                  ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                  : "border-[#edd8e1] bg-white text-[#766b74]"
              }`}
            >
              Open Immediately
            </button>


            <button
              type="button"
              onClick={() =>
                setOpenTime("5minutes")
              }
              className={`rounded-2xl border p-3 text-sm font-semibold ${
                openTime === "5minutes"
                  ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                  : "border-[#edd8e1] bg-white text-[#766b74]"
              }`}
            >
              After 5 Minutes
            </button>


            <button
              type="button"
              onClick={() =>
                setOpenTime("1hour")
              }
              className={`rounded-2xl border p-3 text-sm font-semibold ${
                openTime === "1hour"
                  ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                  : "border-[#edd8e1] bg-white text-[#766b74]"
              }`}
            >
              After 1 Hour
            </button>


            <button
              type="button"
              onClick={() =>
                setOpenTime("tomorrow")
              }
              className={`rounded-2xl border p-3 text-sm font-semibold ${
                openTime === "tomorrow"
                  ? "border-[#df5890] bg-[#fff0f6] text-[#d4477d]"
                  : "border-[#edd8e1] bg-white text-[#766b74]"
              }`}
            >
              Tomorrow
            </button>

          </div>


          <button
            type="button"
            onClick={() =>
              setOpenTime("custom")
            }
            className={`mt-3 w-full rounded-2xl border p-3 text-sm font-semibold ${
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
                min={todayDate}
                max={maxCustomDate}
                onChange={(event) => {
                  const selectedDate = event.target.value;

                  if (selectedDate < todayDate) {
                    setCustomDate(todayDate);
                    setCustomTime(currentTime);
                    return;
                  }

                  if (selectedDate > maxCustomDate) {
                    setCustomDate(maxCustomDate);
                    return;
                  }

                  setCustomDate(selectedDate);

                  if (selectedDate === todayDate && customTime < currentTime) {
                    setCustomTime(currentTime);
                  }
                }}
                className="rounded-xl border border-[#edd8e1] bg-white px-4 py-3 text-sm outline-none focus:border-[#df5890]"
              />


              <input
                type="time"
                value={customTime}
                min={
                  customDate === todayDate
                    ? currentTime
                    : "00:00"
                }
                onChange={(event) => {
                  const selectedTime = event.target.value;

                  if (
                    customDate === todayDate &&
                    selectedTime < currentTime
                  ) {
                    setCustomTime(currentTime);
                    return;
                  }

                  setCustomTime(selectedTime);
                }}
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
            GENERATE LINK
        ====================================== */}

        {!generatedLink && (
          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={
                handleGenerateLink
              }
              disabled={generating}
              className="rounded-full bg-[#df5890] px-8 py-3 font-bold text-white shadow-[0_10px_25px_rgba(223,88,144,0.30)] disabled:opacity-50"
            >
              {generating
                ? "Generating Link..."
                : "🔗 Generate Bouquet Link"}
            </button>

          </div>
        )}


        {/* =====================================
            GENERATED LINK
        ====================================== */}

        {generatedLink && (
          <section className="mx-auto mt-5 max-w-lg rounded-3xl bg-white p-4 text-center shadow-lg">

            <h2 className="text-lg font-bold text-[#4f4650]">
              Your bouquet is ready!
            </h2>


            <p className="mt-1 text-xs text-[#927f8a]">
              Share this link with someone special.
            </p>


            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[#efd5e0] bg-[#fff7fa] p-1.5">

              <input
                type="text"
                value={generatedLink}
                readOnly
                className="min-w-0 flex-1 bg-transparent px-2 text-xs text-[#4f4650] outline-none"
              />


              <button
                type="button"
                onClick={handleCopy}
                className="rounded-xl bg-[#df5890] px-4 py-2 text-xs font-bold text-white"
              >
                {copied
                  ? "Copied ✓"
                  : "Copy"}
              </button>

            </div>


            <button
              type="button"
              onClick={handleShare}
              className="mt-2.5 w-full rounded-full bg-[#4f4650] px-6 py-2.5 text-sm font-bold text-white"
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

        <div className="pb-7 pt-6 text-center">

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
  );
}


export default BouquetPreview;