import { useEffect, useState } from "react";

import FlowerSelection from "./pages/FlowerSelection";
import BouquetWrapSelection from "./pages/BouquetWrapSelection";
import CardSelection from "./pages/CardSelection";
import Message from "./pages/Message";
import ThemeSelection from "./pages/ThemeSelection";
import BouquetPreview from "./pages/BouquetPreview";

// ==========================================
// USER 2 / RECEIVER
// ==========================================

import ReciverPage from "./Reciver/pages/ReciverPage";

import "./App.css";

// ==========================================
// DEFAULT BOUQUET DATA
// ==========================================

const defaultBouquetData = {
  flowers: [],
  wrap: null,
  card: null,
  message: null,
  theme: null,
};

// ==========================================
// GET SHARE ID FROM URL
// ==========================================

const getShareIdFromUrl = () => {
  const pathname = window.location.pathname;

  const match = pathname.match(
    /^\/bouquet\/([^/]+)\/?$/
  );

  return match ? match[1] : null;
};

// ==========================================
// APP
// ==========================================

function App() {
  // ==========================================
  // CHECK IF THIS IS USER 2
  // ==========================================

  const [shareId] = useState(() =>
    getShareIdFromUrl()
  );

  // ==========================================
  // USER 1 STATE
  // ==========================================

  const [appState, setAppState] = useState({
    currentStep: 1,

    bouquetData: {
      ...defaultBouquetData,
    },
  });

  const {
    currentStep,
    bouquetData,
  } = appState;

  // ==========================================
  // SCROLL TOP
  // ==========================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [currentStep]);

  // ==========================================
  // USER 2
  //
  // /bouquet/:shareId
  //
  // IMPORTANT:
  // USER 2 NEVER ENTERS USER 1 FLOW
  // ==========================================

  if (shareId) {
    return (
      <ReciverPage
        shareId={shareId}
      />
    );
  }

  // =========================================================
  // USER 1 FLOW
  //
  // /
  //
  // Flower
  // ↓
  // Wrap
  // ↓
  // Card
  // ↓
  // Message
  // ↓
  // Theme
  // ↓
  // Preview
  // ↓
  // Generate Link
  // =========================================================

  // ==========================================
  // STEP 1 → STEP 2
  // FLOWERS → WRAP
  // ==========================================

  const handleFlowersNext = (data) => {
    setAppState((previous) => ({
      ...previous,

      bouquetData: {
        ...previous.bouquetData,

        flowers:
          data?.flowers ||
          data?.selectedFlowers ||
          data ||
          [],
      },

      currentStep: 2,
    }));
  };

  // ==========================================
  // STEP 2 → STEP 3
  // WRAP → CARD
  // ==========================================

  const handleWrapNext = (data) => {
    setAppState((previous) => ({
      ...previous,

      bouquetData: {
        ...previous.bouquetData,

        flowers:
          data?.flowers ||
          previous.bouquetData.flowers,

        wrap:
          data?.wrap ||
          data?.selectedWrap ||
          data ||
          null,
      },

      currentStep: 3,
    }));
  };

  // ==========================================
  // STEP 3 → STEP 4
  // CARD → MESSAGE
  // ==========================================

  const handleCardNext = (data) => {
    setAppState((previous) => ({
      ...previous,

      bouquetData: {
        ...previous.bouquetData,

        card:
          data?.card ||
          data?.selectedCard ||
          data ||
          null,
      },

      currentStep: 4,
    }));
  };

  // ==========================================
  // STEP 4 → STEP 5
  // MESSAGE → THEME
  // ==========================================

  const handleMessageNext = (data) => {
    setAppState((previous) => ({
      ...previous,

      bouquetData: {
        ...previous.bouquetData,

        // EXACT MESSAGE WRITTEN BY USER 1
        message:
          data?.message ||
          data?.selectedMessage ||
          data ||
          null,
      },

      currentStep: 5,
    }));
  };

  // ==========================================
  // STEP 5 → STEP 6
  // THEME → PREVIEW
  // ==========================================

  const handleThemeNext = (data) => {
    setAppState((previous) => ({
      ...previous,

      bouquetData: {
        ...previous.bouquetData,

        theme:
          data?.theme ||
          data?.selectedTheme ||
          data ||
          null,
      },

      currentStep: 6,
    }));
  };

  // ==========================================
  // BACK
  // ==========================================

  const handleBack = () => {
    setAppState((previous) => ({
      ...previous,

      currentStep: Math.max(
        previous.currentStep - 1,
        1
      ),
    }));
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setAppState({
      currentStep: 1,

      bouquetData: {
        ...defaultBouquetData,
      },
    });
  };

  // ==========================================
  // USER 1 — STEP 1
  // FLOWER SELECTION
  // ==========================================

  if (currentStep === 1) {
    return (
      <FlowerSelection
        onNext={handleFlowersNext}
        currentStep={1}
      />
    );
  }

  // ==========================================
  // USER 1 — STEP 2
  // WRAP SELECTION
  // ==========================================

  if (currentStep === 2) {
    return (
      <BouquetWrapSelection
        selectedFlowers={
          bouquetData.flowers
        }
        onNext={handleWrapNext}
        onBack={handleBack}
        currentStep={2}
      />
    );
  }

  // ==========================================
  // USER 1 — STEP 3
  // CARD SELECTION
  // ==========================================

  if (currentStep === 3) {
    return (
      <CardSelection
        selectedFlowers={
          bouquetData.flowers
        }
        selectedWrap={
          bouquetData.wrap
        }
        onNext={handleCardNext}
        onBack={handleBack}
        currentStep={3}
      />
    );
  }

  // ==========================================
  // USER 1 — STEP 4
  // MESSAGE
  // ==========================================

  if (currentStep === 4) {
    return (
      <Message
        selectedFlowers={
          bouquetData.flowers
        }
        selectedWrap={
          bouquetData.wrap
        }
        selectedCard={
          bouquetData.card
        }
        onNext={handleMessageNext}
        onBack={handleBack}
        currentStep={4}
      />
    );
  }

  // ==========================================
  // USER 1 — STEP 5
  // THEME
  // ==========================================

  if (currentStep === 5) {
    return (
      <ThemeSelection
        selectedFlowers={
          bouquetData.flowers
        }
        selectedWrap={
          bouquetData.wrap
        }
        selectedCard={
          bouquetData.card
        }
        message={
          bouquetData.message
        }
        onNext={handleThemeNext}
        onBack={handleBack}
        currentStep={5}
      />
    );
  }

  // ==========================================
  // USER 1 — STEP 6
  // PREVIEW
  // ==========================================

  if (currentStep === 6) {
    return (
      <BouquetPreview
        bouquetData={bouquetData}
        onBack={handleBack}
        onReset={handleReset}
      />
    );
  }

  return null;
}

export default App;