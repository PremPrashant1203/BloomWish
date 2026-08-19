import { useState } from "react";
import Navbar from "../components/Navbar";
import Stepper from "../components/stepper";

function ThemeSelection({
  onNext,
  onBack,
  currentStep,
}) {
  const [selectedTheme, setSelectedTheme] =
    useState("soft-blush");

  const themes = [
    {
      id: "soft-blush",
      name: "Soft Blush",
      description: "Sweet and romantic",
      background:
        "linear-gradient(135deg, #ffd6e5, #f5b6cf)",
      textColor: "#d94f88",
      animated: false,
    },
    {
      id: "midnight-garden",
      name: "Midnight Garden",
      description: "Dark and magical",
      background:
        "linear-gradient(135deg, #101936, #173b68)",
      textColor: "#ffffff",
      animated: true,
    },
    {
      id: "golden-hour",
      name: "Golden Hour",
      description: "Warm and glowing",
      background:
        "linear-gradient(135deg, #fff0c9, #ffcf88)",
      textColor: "#9b6a2d",
      animated: true,
    },
    {
      id: "lavender-dream",
      name: "Lavender Dream",
      description: "Soft and dreamy",
      background:
        "linear-gradient(135deg, #ead1f1, #c993d4)",
      textColor: "#8d529c",
      animated: false,
    },
    {
      id: "spring-meadow",
      name: "Spring Meadow",
      description: "Fresh and natural",
      background:
        "linear-gradient(135deg, #d9f1d8, #a9d5aa)",
      textColor: "#4d9657",
      animated: true,
    },
    {
      id: "starlit-night",
      name: "Starlit Night",
      description: "Calm and mysterious",
      background:
        "linear-gradient(135deg, #122032, #202b75)",
      textColor: "#ffffff",
      animated: true,
    },
    {
      id: "rose-mist",
      name: "Rose Mist",
      description: "Elegant and romantic",
      background:
        "linear-gradient(135deg, #f2d0df, #d98bad)",
      textColor: "#a64f76",
      animated: true,
    },
    {
      id: "ocean-breeze",
      name: "Ocean Breeze",
      description: "Fresh and peaceful",
      background:
        "linear-gradient(135deg, #b9e8e5, #55b8b0)",
      textColor: "#287e79",
      animated: true,
    },
    {
      id: "sunset-glow",
      name: "Sunset Glow",
      description: "Warm and cheerful",
      background:
        "linear-gradient(135deg, #ffd1b8, #ff9878)",
      textColor: "#b85c42",
      animated: false,
    },
    {
      id: "cherry-blossom",
      name: "Cherry Blossom",
      description: "Pretty and playful",
      background:
        "linear-gradient(135deg, #ffc5d8, #ee6799)",
      textColor: "#b83d6e",
      animated: true,
    },
    {
      id: "classic",
      name: "Classic",
      description: "Simple and timeless",
      background:
        "linear-gradient(135deg, #fffdf9, #f1ece5)",
      textColor: "#806f65",
      animated: false,
    },
    {
      id: "dreamy-pink",
      name: "Dreamy Pink",
      description: "Soft and lovely",
      background:
        "linear-gradient(135deg, #fff0f7, #edb6d1)",
      textColor: "#b44d7d",
      animated: false,
    },
  ];

  const handleNext = () => {
    if (!selectedTheme) return;

    const theme = themes.find(
      (item) => item.id === selectedTheme
    );

    onNext(theme);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fff8f8]">

      <Navbar />

      <Stepper currentStep={currentStep} />

      <main className="mx-auto w-full max-w-7xl px-3 pb-10 pt-6 sm:px-5 sm:pt-8 lg:px-8">

        {/* HEADING */}

        <section className="mx-auto mb-6 max-w-2xl text-center sm:mb-9">

          <h1 className="font-serif text-3xl font-semibold text-[#d4477d] sm:text-4xl lg:text-5xl">
            Set the Mood
          </h1>

          <p className="mt-2 text-sm text-[#8d7d88] sm:text-base">
            Choose a background theme for your bouquet
          </p>

        </section>

        {/* THEMES */}

        <section className="mx-auto grid w-full max-w-[1100px] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">

          {themes.map((theme, index) => {
            const isSelected =
              selectedTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() =>
                  setSelectedTheme(theme.id)
                }
                className={`
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-2xl
                  bg-white
                  p-2.5
                  text-left
                  transition-all
                  duration-300
                  sm:p-3
                  ${
                    isSelected
                      ? "scale-[1.02] border-2 border-[#eb5d97] shadow-[0_8px_22px_rgba(235,93,151,0.20)]"
                      : "border-2 border-transparent shadow-[0_5px_16px_rgba(90,60,80,0.08)] hover:-translate-y-1 hover:shadow-lg"
                  }
                `}
                style={{
                  animationDelay: `${index * 60}ms`,
                }}
              >

                {/* CHECK */}

                {isSelected && (
                  <div className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#eb5d97] text-xs font-bold text-white shadow-md sm:right-3 sm:top-3 sm:h-7 sm:w-7 sm:text-sm">
                    ✓
                  </div>
                )}

                {/* PREVIEW */}

                <div
                  className={`
                    relative
                    h-[95px]
                    w-full
                    overflow-hidden
                    rounded-xl
                    border
                    sm:h-[115px]
                    lg:h-[120px]
                  `}
                  style={{
                    background: theme.background,
                  }}
                >

                  {/* STARS */}

                  {(theme.id === "midnight-garden" ||
                    theme.id === "starlit-night") && (
                    <>
                      <span className="absolute left-[20%] top-[25%] text-white opacity-70">
                        ✦
                      </span>

                      <span className="absolute left-[55%] top-[50%] text-white opacity-60">
                        ✦
                      </span>

                      <span className="absolute right-[18%] top-[25%] text-white opacity-70">
                        ✦
                      </span>

                      <span className="absolute right-[30%] bottom-[20%] text-white opacity-50">
                        ✦
                      </span>
                    </>
                  )}

                  {/* HEARTS */}

                  {(theme.id === "soft-blush" ||
                    theme.id === "rose-mist" ||
                    theme.id === "dreamy-pink" ||
                    theme.id === "cherry-blossom") && (
                    <>
                      <span className="absolute left-[18%] top-[25%] text-white/70">
                        ♡
                      </span>

                      <span className="absolute right-[18%] bottom-[20%] text-white/60">
                        ♡
                      </span>
                    </>
                  )}

                  {/* SUN */}

                  {(theme.id === "golden-hour" ||
                    theme.id === "sunset-glow") && (
                    <div className="absolute bottom-2 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full bg-white/35 blur-[1px]" />
                  )}

                  {/* PREVIEW TEXT */}

                  <div
                    className="absolute inset-0 flex items-center justify-center text-center"
                    style={{
                      color: theme.textColor,
                    }}
                  >
                    <span className="text-xs font-semibold opacity-80 sm:text-sm">
                      BloomWish
                    </span>
                  </div>

                </div>

                {/* INFO */}

                <div className="px-1 pb-1 pt-2 text-center sm:pt-3">

                  <h2 className="truncate text-[11px] font-bold text-[#3f3940] sm:text-sm">
                    {theme.name}
                  </h2>

                  <p className="mt-1 truncate text-[9px] text-[#9b8d95] sm:text-[10px]">
                    {theme.description}
                  </p>

                  {theme.animated && (
                    <span className="mt-1.5 inline-block rounded-full bg-[#fff0f5] px-2 py-0.5 text-[8px] font-semibold text-[#e85b94] sm:text-[9px]">
                      Animated
                    </span>
                  )}

                </div>

              </button>
            );
          })}

        </section>

        {/* BOTTOM */}

        <section className="mt-7 text-center sm:mt-9">

          <p className="mb-4 text-sm text-[#9a687e]">
            {selectedTheme
              ? "Theme selected ✓"
              : "Choose a theme"}
          </p>

          <div className="flex items-center justify-center gap-3">

            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-[#edcbd9] bg-white px-5 py-2.5 text-sm font-semibold text-[#766b74] shadow-sm transition hover:bg-[#fff1f6] sm:px-7"
            >
              ← Back
            </button>

            <button
              type="button"
              disabled={!selectedTheme}
              onClick={handleNext}
              className="rounded-full bg-[#df5890] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_7px_18px_rgba(223,88,144,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 sm:px-8"
            >
              Create Bouquet 🌷
            </button>

          </div>

        </section>

      </main>
    </div>
  );
}

export default ThemeSelection;