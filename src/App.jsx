import { useEffect, useState } from "react";

import FlowerSelection from "./pages/FlowerSelection";
import BouquetWrapSelection from "./pages/BouquetWrapSelection";
import CardSelection from "./pages/CardSelection";
import Message from "./pages/Message";
import ThemeSelection from "./pages/ThemeSelection";
import BouquetPreview from "./pages/BouquetPreview";
import SharedBouquet from "./pages/SharedBouquet";

import "./App.css";

const STORAGE_KEY = "bloomwish_app_state";

// ==========================================
// BACKEND URL
// ==========================================

const BACKEND_URL = "http://localhost:5000";

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
// GET SHARED BOUQUET ID FROM URL
// Example:
// /bouquet/mt1l5kx4-9p8aoo
// ==========================================

const getSharedBouquetId = () => {
  const pathname = window.location.pathname;

  if (!pathname.startsWith("/bouquet/")) {
    return null;
  }

  const shareId = pathname
    .replace("/bouquet/", "")
    .split("/")[0];

  return shareId || null;
};

function App() {
  // ==========================================
  // CHECK SHARED BOUQUET URL
  // ==========================================

  const sharedBouquetId = getSharedBouquetId();

  // ==========================================
  // RESTORE STATE AFTER REFRESH
  // ==========================================

  const [appState, setAppState] = useState(() => {
    try {
      const savedState =
        localStorage.getItem(STORAGE_KEY);

      if (savedState) {
        const parsedState = JSON.parse(savedState);

        return {
          currentStep:
            parsedState.currentStep || 1,

          bouquetData: {
            ...defaultBouquetData,
            ...(parsedState.bouquetData || {}),
          },
        };
      }
    } catch (error) {
      console.error(
        "Unable to restore BloomWish state:",
        error
      );
    }

    return {
      currentStep: 1,
      bouquetData: defaultBouquetData,
    };
  });

  const {
    currentStep,
    bouquetData,
  } = appState;

  // ==========================================
  // SAVE STATE
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appState)
      );
    } catch (error) {
      console.error(
        "Unable to save BloomWish state:",
        error
      );
    }
  }, [appState]);

  // ==========================================
  // SCROLL TO TOP WHEN STEP CHANGES
  // ==========================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [currentStep]);

  // ==========================================
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
  // MESSAGE → THEME
  // ==========================================

  const handleMessageNext = (data) => {
    setAppState((previous) => ({
      ...previous,

      bouquetData: {
        ...previous.bouquetData,

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
  // RESET BLOOMWISH
  // ==========================================

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);

    setAppState({
      currentStep: 1,
      bouquetData: {
        ...defaultBouquetData,
        flowers: [],
      },
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  // ==========================================
  // SHARED BOUQUET PAGE
  // ==========================================
  //
  // If URL is:
  //
  // /bouquet/mt1l5kx4-9p8aoo
  //
  // then show SharedBouquet instead of
  // FlowerSelection.
  //
  // ==========================================

  if (sharedBouquetId) {
    return (
      <SharedBouquet
        shareId={sharedBouquetId}
        backendUrl={BACKEND_URL}
      />
    );
  }

  // ==========================================
  // STEP 1
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
  // STEP 2
  // ==========================================

  if (currentStep === 2) {
    return (
      <BouquetWrapSelection
        selectedFlowers={bouquetData.flowers}
        onNext={handleWrapNext}
        onBack={handleBack}
        currentStep={2}
      />
    );
  }

  // ==========================================
  // STEP 3
  // ==========================================

  if (currentStep === 3) {
    return (
      <CardSelection
        selectedFlowers={bouquetData.flowers}
        selectedWrap={bouquetData.wrap}
        onNext={handleCardNext}
        onBack={handleBack}
        currentStep={3}
      />
    );
  }

  // ==========================================
  // STEP 4
  // ==========================================

  if (currentStep === 4) {
    return (
      <Message
        selectedFlowers={bouquetData.flowers}
        selectedWrap={bouquetData.wrap}
        selectedCard={bouquetData.card}
        onNext={handleMessageNext}
        onBack={handleBack}
        currentStep={4}
      />
    );
  }

  // ==========================================
  // STEP 5
  // ==========================================

  if (currentStep === 5) {
    return (
      <ThemeSelection
        selectedFlowers={bouquetData.flowers}
        selectedWrap={bouquetData.wrap}
        selectedCard={bouquetData.card}
        message={bouquetData.message}
        onNext={handleThemeNext}
        onBack={handleBack}
        currentStep={5}
      />
    );
  }

  // ==========================================
  // STEP 6
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