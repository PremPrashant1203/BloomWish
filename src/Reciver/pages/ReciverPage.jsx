import { useEffect, useState } from "react";
import { getSharedBouquet } from "../services/reciverApi";

import ReciverTimer from "../components/ReciverTimer";
import GiftRevel from "../components/GiftRevel";

const ReciverPage = ({ shareId }) => {
  const [bouquet, setBouquet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [timerFinished, setTimerFinished] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  useEffect(() => {
    const loadBouquet = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getSharedBouquet(shareId);

        console.log("Receiver Bouquet:", data);

        if (!data?.success || !data?.bouquet) {
          throw new Error("Bouquet not found");
        }

        setBouquet(data.bouquet);

        // Agar timer nahi hai to direct gift open karne ka option
        if (!data.bouquet.openAt) {
          setTimerFinished(true);
        }
      } catch (err) {
        console.error("Receiver Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      loadBouquet();
    }
  }, [shareId]);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="text-5xl mb-4">💐</div>

          <h2 className="text-2xl font-semibold text-pink-500">
            Your bouquet is arriving...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait a moment 💗
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (error || !bouquet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🥀</div>

          <h2 className="text-2xl font-semibold text-gray-700">
            Bouquet not found
          </h2>

          <p className="text-gray-500 mt-2">
            This bouquet link may be invalid or expired.
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // GIFT OPENED
  // ==============================

  if (giftOpened) {
    return (
      <GiftRevel
        bouquet={bouquet}
      />
    );
  }

  // ==============================
  // TIMER / GIFT SCREEN
  // ==============================

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">

        {/* TITLE */}

        <div className="mb-8">
          <div className="text-5xl mb-4">
            💐
          </div>

          <h1 className="text-4xl font-semibold text-pink-500">
            A Bouquet For You
          </h1>

          <p className="text-gray-500 mt-3">
            Someone created this special gift just for you 💗
          </p>
        </div>

        {/* TIMER */}

        {!timerFinished && bouquet.openAt ? (
          <ReciverTimer
            openAt={bouquet.openAt}
            onFinish={() => {
              setTimerFinished(true);
            }}
          />
        ) : (
          /* ==============================
             OPEN GIFT
             ============================== */

          <button
            type="button"
            onClick={() => setGiftOpened(true)}
            className="px-8 py-4 rounded-full bg-pink-500 text-white text-lg font-semibold shadow-lg hover:bg-pink-600 transition"
          >
            Tap to see your gift 💝
          </button>
        )}
      </div>
    </div>
  );
};

export default ReciverPage;