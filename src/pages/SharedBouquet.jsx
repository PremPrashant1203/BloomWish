import { useState } from "react";

function SharedBouquet({
  shareId,
  sharedBouquet,
  loading,
  error,
}) {
  const [giftOpened, setGiftOpened] = useState(false);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fff7f8, #ffecef)",
          padding: "24px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#c94f76",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              marginBottom: "20px",
              animation: "pulse 1.5s infinite",
            }}
          >
            💐
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Preparing your special gift...
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#a97888",
            }}
          >
            Just a moment 🌸
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !sharedBouquet) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fff7f8, #ffecef)",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
            background: "#ffffff",
            borderRadius: "28px",
            padding: "50px 30px",
            boxShadow:
              "0 20px 60px rgba(190, 80, 110, 0.12)",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "20px",
            }}
          >
            💔
          </div>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: "600",
              color: "#b94d70",
              marginBottom: "12px",
            }}
          >
            Gift not found
          </h1>

          <p
            style={{
              color: "#987783",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            This special gift link may have expired
            or is no longer available.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // GIFT INTRO
  // ==========================================

  if (!giftOpened) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fff8f9 0%, #ffe8ed 100%)",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative flowers */}

        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "8%",
            fontSize: "38px",
            opacity: 0.55,
            transform: "rotate(-15deg)",
          }}
        >
          🌸
        </div>

        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            fontSize: "34px",
            opacity: 0.5,
            transform: "rotate(15deg)",
          }}
        >
          🌷
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "12%",
            fontSize: "32px",
            opacity: 0.45,
          }}
        >
          🌼
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "12%",
            fontSize: "38px",
            opacity: 0.5,
          }}
        >
          🌹
        </div>

        {/* Main Card */}

        <div
          style={{
            width: "100%",
            maxWidth: "560px",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.94)",
            borderRadius: "32px",
            padding: "55px 30px",
            boxShadow:
              "0 25px 80px rgba(190, 80, 110, 0.15)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Logo */}

          <div
            style={{
              fontSize: "46px",
              marginBottom: "12px",
            }}
          >
            🌷
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#d64f7b",
              letterSpacing: "-0.5px",
              marginBottom: "32px",
            }}
          >
            BloomWish
          </div>

          {/* Gift */}

          <div
            style={{
              fontSize: "90px",
              lineHeight: 1,
              marginBottom: "28px",
              animation: "floatGift 3s ease-in-out infinite",
            }}
          >
            🎁
          </div>

          <p
            style={{
              fontSize: "14px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#c88a9b",
              marginBottom: "12px",
              fontWeight: "600",
            }}
          >
            A special gift for you
          </p>

          <h1
            style={{
              fontSize: "38px",
              lineHeight: "1.2",
              fontWeight: "600",
              color: "#38282d",
              margin: "0 0 16px",
            }}
          >
            Someone sent you
            <br />
            something special 💝
          </h1>

          <p
            style={{
              maxWidth: "400px",
              margin: "0 auto 32px",
              color: "#91777f",
              fontSize: "16px",
              lineHeight: "1.7",
            }}
          >
            A beautiful bouquet was created especially
            for you. Tap below to discover your gift.
          </p>

          {/* Open Gift Button */}

          <button
            onClick={() => setGiftOpened(true)}
            style={{
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #d94f7c, #c83f6b)",
              color: "#ffffff",
              padding: "16px 38px",
              borderRadius: "999px",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow:
                "0 12px 30px rgba(210, 70, 110, 0.25)",
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform =
                "translateY(-2px)";
              event.currentTarget.style.boxShadow =
                "0 16px 35px rgba(210, 70, 110, 0.32)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform =
                "translateY(0)";
              event.currentTarget.style.boxShadow =
                "0 12px 30px rgba(210, 70, 110, 0.25)";
            }}
          >
            Tap to See Your Special Gift ✨
          </button>

          <p
            style={{
              marginTop: "22px",
              fontSize: "12px",
              color: "#b99aa4",
            }}
          >
            Made with love by BloomWish
          </p>
        </div>

        <style>
          {`
            @keyframes floatGift {
              0%, 100% {
                transform: translateY(0);
              }

              50% {
                transform: translateY(-10px);
              }
            }

            @keyframes pulse {
              0%, 100% {
                transform: scale(1);
              }

              50% {
                transform: scale(1.08);
              }
            }
          `}
        </style>
      </div>
    );
  }

  // ==========================================
  // GIFT OPENED
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #fff8f9, #ffe9ee)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#ffffff",
          borderRadius: "32px",
          padding: "50px 30px",
          textAlign: "center",
          boxShadow:
            "0 25px 80px rgba(190, 80, 110, 0.14)",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            marginBottom: "20px",
          }}
        >
          💐
        </div>

        <h1
          style={{
            fontSize: "38px",
            color: "#c94f76",
            marginBottom: "15px",
          }}
        >
          Your Bouquet Has Arrived 💝
        </h1>

        <p
          style={{
            color: "#8f737d",
            fontSize: "17px",
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          This bouquet was created especially for you.
        </p>

        {/* Temporary data display.
            Later this will become the actual bouquet reveal. */}

        <div
          style={{
            background: "#fff6f8",
            borderRadius: "22px",
            padding: "25px",
            marginBottom: "25px",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#9b7180",
              fontSize: "13px",
            }}
          >
            Your special bouquet
          </p>

          <div
            style={{
              fontSize: "45px",
              margin: "15px 0",
            }}
          >
            🌷 🌹 🌸 🌼
          </div>

          <p
            style={{
              margin: 0,
              color: "#c94f76",
              fontWeight: "600",
            }}
          >
            Made with love ❤️
          </p>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "#b99aa4",
          }}
        >
          BloomWish • Your special gift
        </p>
      </div>
    </div>
  );
}

export default SharedBouquet;