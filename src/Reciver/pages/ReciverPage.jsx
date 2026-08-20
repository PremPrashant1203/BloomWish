import { useEffect, useState } from "react";

import ReceiverTimer from "../components/ReceiverTimer";
import GiftReveal from "../components/GiftReveal";
import SavedAsImage from "../components/SavedAsImage";

import { getSharedBouquet } from "../services/receiverApi";

const ReceiverPage = () => {
  const [bouquet, setBouquet] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [timerFinished, setTimerFinished] =
    useState(false);

  const [giftOpened, setGiftOpened] =
    useState(false);

  const { saveAsImage } = SavedAsImage();

  useEffect(() => {
    const loadBouquet = async () => {
      try {
        setLoading(true);

        const path = window.location.pathname;

        const parts = path.split("/");

        const shareId = parts[parts.length - 1];

        if (!shareId) {
          throw new Error(
            "Invalid BloomWish link"
          );
        }

        const data =
          await getSharedBouquet(shareId);

        setBouquet(data);

        // No timer
        if (!data.openAt) {
          setTimerFinished(true);
        }
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Unable to open this BloomWish"
        );
      } finally {
        setLoading(false);
      }
    };

    loadBouquet();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">
          Preparing your BloomWish 💐
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-3">
            Bouquet unavailable 💔
          </h1>

          <p className="opacity-70">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!bouquet) {
    return null;
  }

  /*
   * -----------------------------------------
   * GIFT ALREADY OPENED
   * -----------------------------------------
   */

  if (giftOpened) {
    return (
      <GiftReveal
        bouquet={bouquet}
        onSave={saveAsImage}
      />
    );
  }

  /*
   * -----------------------------------------
   * TIMER
   * -----------------------------------------
   */

  if (!timerFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">

        <div className="text-center">

          <div className="text-6xl mb-6">
            💐
          </div>

          <h1 className="text-4xl font-semibold mb-3">
            A bouquet for you 💗
          </h1>

          <p className="opacity-70 mb-8">
            Someone special has prepared
            something for you.
          </p>

          <ReceiverTimer
            openAt={bouquet.openAt}
            onReady={() =>
              setTimerFinished(true)
            }
          />

        </div>

      </div>
    );
  }

  /*
   * -----------------------------------------
   * TAP TO SEE GIFT
   * -----------------------------------------
   */

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="text-center">

        <div className="text-7xl mb-6">
          💐
        </div>

        <h1 className="text-4xl font-semibold mb-3">
          A bouquet for you! 💗
        </h1>

        <p className="opacity-70 mb-8">
          Someone special made this just for you.
        </p>

        <button
          onClick={() => setGiftOpened(true)}
          className="px-8 py-4 rounded-full bg-white shadow-lg text-lg font-medium hover:scale-105 transition"
        >
          Tap to see your gift 💝
        </button>

      </div>

    </div>
  );
};

export default ReceiverPage;