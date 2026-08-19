import { useState } from "react";

import FlowerSelection from "./pages/FlowerSelection";
import BouquetWrapSelection from "./pages/BouquetWrapSelection";
import CardSelection from "./pages/CardSelection";
import Message from "./pages/Message";
import ThemeSelection from "./pages/ThemeSelection";
import BouquetPreview from "./pages/BouquetPreview";

import "./App.css";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [bouquetData, setBouquetData] = useState({
    flowers: [],
    wrap: null,
    card: null,
    message: null,
    theme: null,
  });

  const handleFlowersNext = (data) => {
    setBouquetData((previous) => ({
      ...previous,
      flowers:
        data?.flowers ||
        data?.selectedFlowers ||
        data ||
        [],
    }));

    setCurrentStep(2);
  };

  const handleWrapNext = (data) => {
    setBouquetData((previous) => ({
      ...previous,
      flowers:
        data?.flowers ||
        previous.flowers,
      wrap:
        data?.wrap ||
        data?.selectedWrap ||
        data ||
        null,
    }));

    setCurrentStep(3);
  };

  const handleCardNext = (data) => {
    setBouquetData((previous) => ({
      ...previous,
      card:
        data?.card ||
        data?.selectedCard ||
        data ||
        null,
    }));

    setCurrentStep(4);
  };

  const handleMessageNext = (data) => {
    setBouquetData((previous) => ({
      ...previous,
      message:
        data?.message ||
        data?.selectedMessage ||
        data ||
        null,
    }));

    setCurrentStep(5);
  };

  const handleThemeNext = (data) => {
    setBouquetData((previous) => ({
      ...previous,
      theme:
        data?.theme ||
        data?.selectedTheme ||
        data ||
        null,
    }));

    setCurrentStep(6);
  };

  const handleBack = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1)
    );
  };

  if (currentStep === 1) {
    return (
      <FlowerSelection
        onNext={handleFlowersNext}
        currentStep={1}
      />
    );
  }

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

  if (currentStep === 6) {
    return (
      <BouquetPreview
        bouquetData={bouquetData}
        onBack={handleBack}
      />
    );
  }

  return null;
}

export default App;