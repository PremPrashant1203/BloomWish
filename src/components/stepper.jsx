function Stepper({ currentStep }) {
  const steps = [
    "Flowers",
    "Wrap",
    "Card",
    "Message",
    "Theme",
  ];

  return (
    <section className="w-full border-b border-[#f1dfe7] bg-[#fffafa]">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-3 sm:px-6 sm:py-4">

        <div className="relative">

          {/* Progress Line */}
          <div className="absolute left-[10%] right-[10%] top-[16px] h-[2px] bg-[#f3dbe5] sm:top-[18px]">
            <div
              className="h-full bg-gradient-to-r from-[#e85b94] to-[#70c4a0] transition-all duration-500"
              style={{
                width:
                  currentStep === 1
                    ? "0%"
                    : currentStep === 2
                    ? "25%"
                    : currentStep === 3
                    ? "50%"
                    : currentStep === 4
                    ? "75%"
                    : "100%",
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-5">

            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep >= stepNumber;
              const isCurrent = currentStep === stepNumber;

              return (
                <div
                  key={step}
                  className="flex min-w-0 flex-col items-center"
                >

                  {/* Circle */}
                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      text-xs
                      font-semibold
                      transition-all
                      duration-300
                      sm:h-9
                      sm:w-9
                      sm:text-sm

                      ${
                        isActive
                          ? "border-[#e85b94] bg-[#e85b94] text-white"
                          : "border-[#f3cbdc] bg-[#fffafa] text-[#d9a8bc]"
                      }

                      ${
                        isCurrent
                          ? "shadow-[0_4px_12px_rgba(232,91,148,0.25)]"
                          : ""
                      }
                    `}
                  >
                    {stepNumber}
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      mt-1.5
                      max-w-full
                      truncate
                      px-1
                      text-center
                      text-[9px]
                      font-medium
                      sm:mt-2
                      sm:text-xs

                      ${
                        isActive
                          ? "text-[#e34f8b]"
                          : "text-[#c6b8c0]"
                      }
                    `}
                  >
                    {step}
                  </span>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}

export default Stepper;