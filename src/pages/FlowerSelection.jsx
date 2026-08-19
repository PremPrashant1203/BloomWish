import { useState } from "react";
import Navbar from "../components/Navbar";
import Stepper from "../components/stepper";

import PinkLily from "../assets/flowers/Pink_lily.png";
import WhiteLily from "../assets/flowers/White-Lily.png";
import YellowLily from "../assets/flowers/Yellow_Lily.png";
import OrangeLily from "../assets/flowers/Orange_Lily.png";

import PinkTulip from "../assets/flowers/Pink_Tulip.png";
import RedTulip from "../assets/flowers/Red_Tulip.png";
import WhiteTulip from "../assets/flowers/White Tulip.png";

import PinkRose from "../assets/flowers/Pink_rose.png";
import RedRose from "../assets/flowers/Red_Rose.png";
import WhiteRose from "../assets/flowers/White_rose.png";

import RedOrchid from "../assets/flowers/Red_orchid.png";
import YellowOrchid from "../assets/flowers/Yellow_orchid.png";

import RedChrysanthemum from "../assets/flowers/Red_Chrysanthemum.png";
import WhiteChrysanthemum from "../assets/flowers/White_Chrysanthemum.png";

import PinkPeony from "../assets/flowers/Pink_Peony.png";
import RedPeony from "../assets/flowers/Red_peony.png";

import WhiteDaisy from "../assets/flowers/White_Daisy.png";
import RedDaisy from "../assets/flowers/Red_Daisy.png";

import Lotus from "../assets/flowers/Lotus.png";
import Sunflower from "../assets/flowers/Sunflower.png";

const flowers = [
  {
    id: "FL001",
    name: "Pink Lily",
    image: PinkLily,
  },
  {
    id: "FL002",
    name: "White Lily",
    image: WhiteLily,
  },
  {
    id: "FL003",
    name: "Yellow Lily",
    image: YellowLily,
  },
  {
    id: "FL004",
    name: "Orange Lily",
    image: OrangeLily,
  },
  {
    id: "FL005",
    name: "Pink Tulip",
    image: PinkTulip,
  },
  {
    id: "FL006",
    name: "Red Tulip",
    image: RedTulip,
  },
  {
    id: "FL007",
    name: "White Tulip",
    image: WhiteTulip,
  },
  {
    id: "FL008",
    name: "Pink Rose",
    image: PinkRose,
  },
  {
    id: "FL009",
    name: "Red Rose",
    image: RedRose,
  },
  {
    id: "FL010",
    name: "White Rose",
    image: WhiteRose,
  },
  {
    id: "FL011",
    name: "Red Orchid",
    image: RedOrchid,
  },
  {
    id: "FL012",
    name: "Yellow Orchid",
    image: YellowOrchid,
  },
  {
    id: "FL013",
    name: "Red Chrysanthemum",
    image: RedChrysanthemum,
  },
  {
    id: "FL014",
    name: "White Chrysanthemum",
    image: WhiteChrysanthemum,
  },
  {
    id: "FL015",
    name: "Pink Peony",
    image: PinkPeony,
  },
  {
    id: "FL016",
    name: "Red Peony",
    image: RedPeony,
  },
  {
    id: "FL017",
    name: "White Daisy",
    image: WhiteDaisy,
  },
  {
    id: "FL018",
    name: "Red Daisy",
    image: RedDaisy,
  },
  {
    id: "FL019",
    name: "Lotus",
    image: Lotus,
  },
  {
    id: "FL020",
    name: "Sunflower",
    image: Sunflower,
  },
];

function FlowerSelection({
  onNext,
  onBack,
  currentStep,
}) {
  const [selectedFlowers, setSelectedFlowers] = useState([]);

  const toggleFlower = (flowerId) => {
    setSelectedFlowers((previous) => {
      if (previous.includes(flowerId)) {
        return previous.filter((id) => id !== flowerId);
      }

      if (previous.length >= 10) {
        return previous;
      }

      return [...previous, flowerId];
    });
  };

  const handleNext = () => {
    if (selectedFlowers.length < 7) {
      return;
    }

    onNext(selectedFlowers);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#fff7f8] via-[#fffafa] to-[#fff5f0]">

      <Navbar />

      <Stepper currentStep={currentStep} />

      <main className="mx-auto w-full max-w-[1200px] px-3 pb-10 pt-6 sm:px-5 sm:pt-8 md:px-8">

        <section className="mb-6 text-center sm:mb-8">

          <h1 className="font-[cursive] text-3xl font-semibold text-[#d4477d] sm:text-4xl md:text-5xl">
            Pick Your Flowers
          </h1>

          <p className="mt-2 px-2 text-sm text-[#938995] sm:text-base md:text-lg">
            Select the flowers for your bouquet (pick at least 7)
          </p>

          <p className="mt-2 hidden text-sm text-[#a49aa3] sm:block">
            Choose beautiful flowers to create your personalized bouquet.
          </p>

        </section>

        <section
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-3
            sm:gap-4
            lg:grid-cols-4
            lg:gap-5
          "
        >

          {flowers.map((flower) => {
            const selectedIndex =
              selectedFlowers.indexOf(flower.id);

            const isSelected = selectedIndex !== -1;

            return (
              <button
                key={flower.id}
                type="button"
                onClick={() => toggleFlower(flower.id)}
                className={`
                  relative
                  min-w-0
                  overflow-hidden
                  rounded-[16px]
                  bg-white
                  p-2
                  shadow-[0_5px_18px_rgba(100,60,80,0.08)]
                  transition-all
                  duration-300
                  sm:rounded-[18px]
                  sm:p-3
                  ${
                    isSelected
                      ? "scale-[1.02] border-2 border-[#ed5a95] shadow-[0_8px_25px_rgba(230,80,140,0.18)]"
                      : "border-2 border-transparent hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(100,60,80,0.12)]"
                  }
                `}
              >

                {isSelected && (
                  <span
                    className="
                      absolute
                      right-2
                      top-2
                      z-20
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-[#ed4f8d]
                      text-xs
                      font-bold
                      text-white
                      shadow-md
                      sm:h-8
                      sm:w-8
                      sm:text-sm
                    "
                  >
                    {selectedIndex + 1}
                  </span>
                )}

                <div
                  className="
                    flex
                    h-[125px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    bg-white
                    sm:h-[145px]
                    md:h-[155px]
                  "
                >
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="
                      h-full
                      w-full
                      object-contain
                      p-3
                      transition-transform
                      duration-300
                      sm:p-4
                    "
                  />
                </div>

                <p
                  className="
                    mt-2
                    truncate
                    px-1
                    pb-1
                    text-center
                    text-[12px]
                    font-semibold
                    text-[#514b54]
                    sm:mt-3
                    sm:text-sm
                  "
                >
                  {flower.name}
                </p>

              </button>
            );
          })}

        </section>

        <div className="mt-6 text-center sm:mt-8">

          <p className="text-sm font-medium text-[#d4477d] sm:text-base">
            Flowers 🌸 {selectedFlowers.length} / 10
          </p>

          {selectedFlowers.length > 0 &&
            selectedFlowers.length < 7 && (
              <p className="mt-1 text-xs text-[#a07889] sm:text-sm">
                Select {7 - selectedFlowers.length} more{" "}
                {7 - selectedFlowers.length === 1
                  ? "flower"
                  : "flowers"}
              </p>
            )}

          {selectedFlowers.length >= 7 && (
            <p className="mt-1 text-xs text-[#65a16b] sm:text-sm">
              Perfect! You can continue now.
            </p>
          )}

        </div>

        <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4">

          <button
            type="button"
            onClick={onBack}
            className="
              rounded-full
              border-2
              border-[#e8dce3]
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#756b78]
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:shadow-md
              sm:px-8
              sm:py-3
              sm:text-base
            "
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={selectedFlowers.length < 7}
            className="
              rounded-full
              bg-[#d94f88]
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-[0_8px_20px_rgba(217,79,136,0.22)]
              transition-all
              hover:-translate-y-0.5
              hover:bg-[#ce417b]
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:translate-y-0
              sm:px-9
              sm:py-3
              sm:text-base
            "
          >
            Next →
          </button>

        </div>

      </main>

    </div>
  );
}

export default FlowerSelection;