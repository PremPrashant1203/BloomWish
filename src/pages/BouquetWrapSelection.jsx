import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Stepper from "../components/stepper";

import classicWhite from "../assets/Wrap/Classic_white-WR001.png";
import softPink from "../assets/Wrap/Soft-pink-WR002.png";
import lavender from "../assets/Wrap/Lavender-WR003.png";
import kraftNatural from "../assets/Wrap/Kraft Natural-WR004.png";

const API_BASE_URL = "https://bloomwish.onrender.com";

const wrapImages = {
  WR001: classicWhite,
  WR002: softPink,
  WR003: lavender,
  WR004: kraftNatural,
};

function BouquetWrapSelection({
  selectedFlowers = [],
  onNext,
  onBack,
  currentStep = 2,
}) {
  const [wraps, setWraps] = useState([]);
  const [selectedWrap, setSelectedWrap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWraps = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/wraps`
      );

      if (!response.ok) {
        throw new Error("Failed to load wraps");
      }

      const data = await response.json();

      console.log("WRAP API:", data);

      if (
        !data.success ||
        !Array.isArray(data.wraps)
      ) {
        throw new Error("Invalid wrap data");
      }

      const formattedWraps = data.wraps.map((wrap) => ({
        ...wrap,
        image: wrapImages[wrap.id] || null,
      }));

      setWraps(formattedWraps);
    } catch (err) {
      console.error("Wrap API Error:", err);

      setError(
        "Unable to load bouquet wraps. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWraps();
  }, []);

  const handleSelect = (wrapId) => {
    setSelectedWrap((previous) =>
      previous === wrapId ? null : wrapId
    );
  };

  const handleNext = () => {
    if (!selectedWrap) {
      return;
    }

    const selectedWrapData = wraps.find(
      (wrap) => wrap.id === selectedWrap
    );

    if (!selectedWrapData) {
      return;
    }

    console.log(
      "Selected Wrap:",
      selectedWrapData
    );

    onNext({
      flowers: selectedFlowers,
      wrap: selectedWrapData,
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fff8f8]">

      <Navbar />

      <Stepper currentStep={currentStep} />

      <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">

        {/* HEADING */}

        <section className="mx-auto mb-8 max-w-3xl text-center">

          <h1 className="font-serif text-3xl font-semibold text-[#d4477d] sm:text-4xl lg:text-5xl">
            Choose Your Bouquet Wrap
          </h1>

          <p className="mt-2 text-sm text-[#8d7d88] sm:text-base">
            Select a wrap for your bouquet
          </p>

          <p className="mt-1 text-xs leading-5 text-[#a99aa3] sm:text-sm">
            Choose the perfect wrap to complete your
            personalized bouquet.
          </p>

        </section>


        {/* LOADING */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#f7d6e3] border-t-[#df5890]" />

              <p className="text-sm text-[#927f8a]">
                Loading bouquet wraps...
              </p>

            </div>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-[#f3cbd8] bg-white p-6 text-center shadow-sm">

            <div className="mb-3 text-3xl">
              🌷
            </div>

            <h2 className="text-base font-semibold text-[#4f4650]">
              Wraps couldn't be loaded
            </h2>

            <p className="mt-2 text-sm text-[#c55778]">
              {error}
            </p>

            <button
              type="button"
              onClick={loadWraps}
              className="mt-4 rounded-full bg-[#df5890] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#cc4c81]"
            >
              Try Again
            </button>

          </div>
        )}


        {/* WRAPS */}

        {!loading &&
          !error &&
          wraps.length > 0 && (
            <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

              {wraps.map((wrap, index) => {

                const isSelected =
                  selectedWrap === wrap.id;

                return (
                  <button
                    key={wrap.id}
                    type="button"
                    onClick={() =>
                      handleSelect(wrap.id)
                    }
                    className={`
                      group
                      relative
                      w-full
                      overflow-hidden
                      rounded-2xl
                      bg-white
                      text-left
                      transition-all
                      duration-300
                      ${
                        isSelected
                          ? "scale-[1.02] border-2 border-[#eb5d97] shadow-[0_10px_30px_rgba(235,93,151,0.25)]"
                          : "border-2 border-transparent shadow-[0_6px_20px_rgba(100,70,90,0.08)] hover:-translate-y-1 hover:shadow-xl"
                      }
                    `}
                    style={{
                      animationDelay:
                        `${index * 80}ms`,
                    }}
                  >

                    {/* CHECK */}

                    {isSelected && (
                      <div className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#ed4f91] text-base font-bold text-white shadow-lg">
                        ✓
                      </div>
                    )}


                    {/* IMAGE */}

                    <div className="flex h-[300px] w-full items-center justify-center overflow-hidden bg-white p-3 sm:h-[330px]">

                      {wrap.image ? (
                        <img
                          src={wrap.image}
                          alt={wrap.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">

                          <span className="text-4xl">
                            🌷
                          </span>

                          <span className="mt-2 text-xs text-gray-400">
                            Image unavailable
                          </span>

                        </div>
                      )}

                    </div>


                    {/* DETAILS */}

                    <div className="border-t border-[#f3e9ed] px-4 py-4">

                      <div className="flex items-center justify-between gap-2">

                        <h2 className="truncate text-base font-semibold text-[#4f4650]">
                          {wrap.name}
                        </h2>

                        <span className="shrink-0 rounded-full bg-[#fff0f5] px-2 py-1 text-[10px] font-semibold text-[#d4477d]">
                          {wrap.id}
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-[#998b93]">
                        Choose this wrap
                      </p>

                    </div>

                  </button>
                );
              })}

            </section>
          )}


        {/* NO WRAPS */}

        {!loading &&
          !error &&
          wraps.length === 0 && (
            <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">

              <div className="text-4xl">
                🌷
              </div>

              <p className="mt-3 text-sm text-gray-500">
                No bouquet wraps available.
              </p>

            </div>
          )}


        {/* BOTTOM */}

        {!loading &&
          !error &&
          wraps.length > 0 && (
            <section className="mt-8 pb-6 text-center">

              <p className="mb-4 text-sm text-[#9a687e]">
                {selectedWrap
                  ? "Wrap selected ✓"
                  : "Choose a wrap to continue"}
              </p>

              <div className="flex items-center justify-center gap-3">

                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-full border border-[#edcbd9] bg-white px-6 py-2.5 text-sm font-semibold text-[#766b74] shadow-sm transition hover:bg-[#fff1f6]"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  disabled={!selectedWrap}
                  onClick={handleNext}
                  className={`
                    rounded-full
                    px-7
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    ${
                      selectedWrap
                        ? "bg-[#df5890] shadow-[0_7px_18px_rgba(223,88,144,0.25)] hover:-translate-y-0.5 hover:bg-[#d24f84]"
                        : "cursor-not-allowed bg-[#edbfd2]"
                    }
                  `}
                >
                  Next →
                </button>

              </div>

            </section>
          )}

      </main>

    </div>
  );
}


// IMPORTANT:
// This is a DEFAULT export.
// App.jsx must import it without { }.

export default BouquetWrapSelection;