import { useState } from "react";
import Navbar from "../components/Navbar";
import Stepper from "../components/stepper";
import cards from "../assets/cards/card";

function CardSelection({
  onNext,
  onBack,
  currentStep,
}) {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleNext = () => {
    if (!selectedCard) return;

    const card = cards.find(
      (item) => item.id === selectedCard
    );

    if (card) {
      onNext(card);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f7] via-[#fffafa] to-[#faf4f0]">

      <Navbar />

      <Stepper currentStep={currentStep} />

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-8">

        <section className="mb-8 text-center">

          <h1 className="font-[cursive] text-4xl font-semibold text-[#d4477d] md:text-5xl">
            Choose Your Card
          </h1>

          <p className="mt-2 text-base text-[#938995] md:text-lg">
            Pick a card style for your personal message
          </p>

        </section>

        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {cards.map((card) => {
            const isSelected =
              selectedCard === card.id;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() =>
                  setSelectedCard(card.id)
                }
                className={`
                  relative
                  rounded-[20px]
                  bg-white
                  p-3
                  text-left
                  transition-all
                  duration-300
                  ${
                    isSelected
                      ? "scale-[1.02] border-[3px] border-[#ed5a95] shadow-[0_10px_28px_rgba(230,80,140,0.20)]"
                      : "border-2 border-transparent shadow-[0_5px_18px_rgba(80,55,65,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(80,55,65,0.13)]"
                  }
                `}
              >

                {isSelected && (
                  <span
                    className="
                      absolute
                      right-[-8px]
                      top-[-8px]
                      z-20
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#ed4f8d]
                      text-lg
                      font-bold
                      text-white
                      shadow-md
                    "
                  >
                    ✓
                  </span>
                )}

                <div
                  className="
                    relative
                    h-[170px]
                    overflow-hidden
                    rounded-[12px]
                    border
                  "
                  style={{
                    background: card.background,
                    color: card.textColor,
                    borderColor: card.borderColor,
                  }}
                >

                  <div
                    className="
                      absolute
                      inset-2
                      rounded-[9px]
                      border
                      opacity-40
                    "
                    style={{
                      borderColor:
                        card.borderColor,
                    }}
                  />

                  <div className="relative z-10 px-5 pt-5">

                    <p className="text-center font-[cursive] text-lg italic">
                      To: You
                    </p>

                  </div>

                  <div className="relative z-10 flex h-[85px] items-center justify-center">

                    <p className="text-[14px] opacity-70">
                      Your message...
                    </p>

                  </div>

                  <div className="absolute bottom-5 left-0 right-0 z-10 text-center">

                    <p className="font-[cursive] text-base italic">
                      With love
                    </p>

                  </div>

                </div>

                <div className="px-1 pb-1 pt-3 text-center">

                  <h2 className="text-[15px] font-bold text-[#29242a]">
                    {card.name}
                  </h2>

                  <p className="mt-1 text-[10px] text-[#a098a0]">
                    {card.subtitle}
                  </p>

                </div>

              </button>
            );
          })}

        </section>

        <div className="mt-7 text-center">

          <p className="text-sm text-[#756b78]">

            {selectedCard
              ? `${
                  cards.find(
                    (card) =>
                      card.id === selectedCard
                  )?.name
                } selected`
              : "Choose a card"}

          </p>

        </div>

        <div className="mt-5 flex justify-center gap-4">

          <button
            type="button"
            onClick={onBack}
            className="
              rounded-full
              border-2
              border-[#e5dce3]
              bg-white
              px-8
              py-3
              font-semibold
              text-[#756b78]
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            ← Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedCard}
            className="
              rounded-full
              bg-[#d94f88]
              px-9
              py-3
              font-semibold
              text-white
              shadow-[0_8px_20px_rgba(217,79,136,0.25)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#ce417b]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Next →
          </button>

        </div>

      </main>

    </div>
  );
}

export default CardSelection;