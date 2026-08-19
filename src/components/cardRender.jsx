function CardRenderer({
  card,
  recipient = "You",
  message = "Your message...",
  sender = "PREM",
}) {
  if (!card) {
    return null;
  }

  return (
    <div
      className="
        relative
        aspect-[3/4]
        w-full
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

      {/* Inner Border */}

      <div
        className="
          absolute
          inset-3
          rounded-[10px]
          border
          opacity-40
        "
        style={{
          borderColor: card.borderColor,
        }}
      />

      {/* Top */}

      <div className="absolute left-[10%] right-[10%] top-[13%]">

        <p className="text-center font-[cursive] text-2xl italic">
          To: {recipient}
        </p>

      </div>

      {/* Divider */}

      <div
        className="
          absolute
          left-[10%]
          right-[10%]
          top-[30%]
          flex
          items-center
          gap-3
        "
      >

        <div
          className="h-px flex-1 opacity-50"
          style={{
            backgroundColor: card.borderColor,
          }}
        />

        <span className="text-sm">♥</span>

        <div
          className="h-px flex-1 opacity-50"
          style={{
            backgroundColor: card.borderColor,
          }}
        />

      </div>

      {/* Message */}

      <div
        className="
          absolute
          left-[10%]
          right-[10%]
          top-[36%]
          whitespace-pre-wrap
          text-left
          text-base
          leading-relaxed
        "
      >
        {message}
      </div>

      {/* Bottom */}

      <div
        className="
          absolute
          bottom-[9%]
          right-[10%]
          text-right
        "
      >

        <p className="font-[cursive] text-base italic opacity-80">
          With love,
        </p>

        <p className="mt-1 font-[cursive] text-2xl italic">
          {sender}
        </p>

      </div>

    </div>
  );
}

export default CardRenderer;