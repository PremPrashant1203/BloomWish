import { useEffect, useMemo, useState } from "react";
import CardRenderer from "../components/cardRender";

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
          "http://localhost:5000/api/bouquets/match",
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
        "http://localhost:5000/api/bouquets/create",
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

  const handleShare = async () => {
    if (!generatedLink) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "Your BloomWish Bouquet 🌷",
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

          <div className="text-5xl">
            🌷
          </div>

          <h2 className="mt-4 text-xl font-bold text-[#4f4650]">
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

  return (
    <div
      className="min-h-screen px-4 py-8 sm:px-6"
      style={{
        background:
          selectedTheme.background,
      }}
    >
      <main className="mx-auto max-w-4xl">

        <div className="text-center">

          <p className="text-sm font-semibold text-[#d4477d]">
            Your BloomWish Bouquet 🌷
          </p>

          <h1 className="mt-1 font-serif text-4xl font-semibold text-[#d4477d] sm:text-5xl">
            A Bouquet Just For You
          </h1>

        </div>

        <div className="mt-5 flex flex-col items-center">

          {bouquetImage && (
            <img
              src={bouquetImage}
              alt="Your BloomWish Bouquet"
              className="max-h-[600px] w-auto max-w-[95%] object-contain drop-shadow-[0_25px_35px_rgba(80,40,60,0.22)]"
            />
          )}

          {selectedCard && (
            <div className="-mt-5 w-full max-w-[390px]">
              <CardRenderer
                card={selectedCard}
                recipient={recipient}
                message={message}
                sender={sender}
              />
            </div>
          )}

        </div>

        <section className="mx-auto mt-8 max-w-xl rounded-3xl bg-white/90 p-6 shadow-[0_15px_35px_rgba(70,40,60,0.15)]">

          <h2 className="text-center text-lg font-bold text-[#4f4650]">
            When should they open it? 💌
          </h2>

          <p className="mt-1 text-center text-xs text-[#927f8a]">
            Choose when the recipient can open your bouquet.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">

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

        {error && (
          <p className="mx-auto mt-4 max-w-xl rounded-xl bg-white p-3 text-center text-sm text-[#c55778]">
            {error}
          </p>
        )}

        {!generatedLink && (
          <div className="mt-7 text-center">

            <button
              type="button"
              onClick={
                handleGenerateLink
              }
              disabled={generating}
              className="rounded-full bg-[#df5890] px-9 py-3.5 font-bold text-white shadow-[0_10px_25px_rgba(223,88,144,0.30)] disabled:opacity-50"
            >
              {generating
                ? "Generating Link..."
                : "🔗 Generate Bouquet Link"}
            </button>

          </div>
        )}

        {generatedLink && (
          <section className="mx-auto mt-7 max-w-xl rounded-3xl bg-white p-6 text-center shadow-xl">

            <div className="text-4xl">
              💐
            </div>

            <h2 className="mt-2 text-xl font-bold text-[#4f4650]">
              Your bouquet is ready!
            </h2>

            <p className="mt-1 text-sm text-[#927f8a]">
              Share this link with someone special.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-[#efd5e0] bg-[#fff7fa] p-2">

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

            <button
              type="button"
              onClick={handleShare}
              className="mt-4 w-full rounded-full bg-[#4f4650] px-7 py-3 font-bold text-white"
            >
              {shared
                ? "Shared ✓"
                : "↗ Share Bouquet"}
            </button>

          </section>
        )}

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
  );
}

export default BouquetPreview;