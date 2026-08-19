import { useState } from "react";
import Navbar from "../components/Navbar";
import Stepper from "../components/stepper";
import CardRenderer from "../components/cardRender";

function Message({
  onNext,
  onBack,
  currentStep,
  selectedCard,
}) {
  const [recipientName, setRecipientName] =
    useState("");

  const [messageText, setMessageText] =
    useState("");

  const [senderName, setSenderName] =
    useState("");

  const handleNext = () => {
    const recipient =
      recipientName.trim();

    const message =
      messageText.trim();

    const sender =
      senderName.trim();

    if (!recipient) {
      return;
    }

    if (!message) {
      return;
    }

    if (!sender) {
      return;
    }

    onNext({
      recipientName: recipient,
      messageText: message,
      senderName: sender,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f7] via-[#fffafa] to-[#faf4f0]">

      <Navbar />

      <Stepper currentStep={currentStep} />

      <main className="mx-auto w-full max-w-[1120px] px-5 pb-12 pt-8">

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[420px_1fr]">

          {/* CARD PREVIEW */}

          <section className="flex flex-col items-center">

            <div className="w-full max-w-[320px]">

              <CardRenderer
                card={selectedCard}
                recipient={
                  recipientName ||
                  "someone special"
                }
                message={
                  messageText ||
                  "Your heartfelt message will appear here..."
                }
                sender={
                  senderName ||
                  "Your name"
                }
              />

            </div>

            {selectedCard?.name && (
              <div className="mt-3 rounded-full border border-[#ead5df] bg-white px-5 py-1.5 text-xs text-[#765f6b] shadow-sm">
                {selectedCard.name}
              </div>
            )}

          </section>


          {/* FORM */}

          <section className="w-full">

            {/* Recipient */}

            <div className="mb-5">

              <label
                htmlFor="recipient-name"
                className="mb-2 block text-xs font-semibold text-[#5f5660]"
              >
                Recipient's Name
              </label>

              <input
                id="recipient-name"
                type="text"
                value={recipientName}
                onChange={(event) =>
                  setRecipientName(
                    event.target.value
                  )
                }
                placeholder="Who is this for?"
                maxLength={60}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#e5d9df]
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-[#403842]
                  outline-none
                  transition
                  focus:border-[#df5890]
                  focus:ring-2
                  focus:ring-[#df5890]/10
                "
              />

            </div>


            {/* Message */}

            <div className="mb-5">

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="message-text"
                  className="block text-xs font-semibold text-[#5f5660]"
                >
                  Your Message
                </label>

                <span className="text-[10px] text-[#9a9098]">
                  {messageText.length}/200
                </span>

              </div>

              <textarea
                id="message-text"
                value={messageText}
                onChange={(event) =>
                  setMessageText(
                    event.target.value
                  )
                }
                placeholder="Write something sweet..."
                maxLength={200}
                rows={5}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#e5d9df]
                  bg-white
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-[#403842]
                  outline-none
                  transition
                  focus:border-[#df5890]
                  focus:ring-2
                  focus:ring-[#df5890]/10
                "
              />

            </div>


            {/* Sender */}

            <div className="mb-6">

              <label
                htmlFor="sender-name"
                className="mb-2 block text-xs font-semibold text-[#5f5660]"
              >
                Your Name
              </label>

              <input
                id="sender-name"
                type="text"
                value={senderName}
                onChange={(event) =>
                  setSenderName(
                    event.target.value
                  )
                }
                placeholder="From..."
                maxLength={60}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#e5d9df]
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-[#403842]
                  outline-none
                  transition
                  focus:border-[#df5890]
                  focus:ring-2
                  focus:ring-[#df5890]/10
                "
              />

            </div>


            {/* Buttons */}

            <div className="flex gap-4">

              <button
                type="button"
                onClick={onBack}
                className="
                  rounded-full
                  border
                  border-[#e5d9df]
                  bg-white
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-[#756b78]
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !recipientName.trim() ||
                  !messageText.trim() ||
                  !senderName.trim()
                }
                className="
                  rounded-full
                  bg-[#df5890]
                  px-8
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_8px_20px_rgba(217,79,136,0.25)]
                  transition
                  hover:-translate-y-0.5
                  hover:bg-[#ce417b]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next →
              </button>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Message;