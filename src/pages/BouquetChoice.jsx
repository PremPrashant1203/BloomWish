import Navbar from "../components/Navbar";
import Stepper from "../components/stepper";

function BouquetChoice({ onCreateOwn, onChooseReadyMade }) {
  return (
    <div className="flower-page">
      <Navbar />

      <Stepper />

      <main className="choice-page">

        {/* =========================
            HEADING
        ========================= */}

        <section className="choice-heading">
          <h1>Create Your Bouquet</h1>

          <p>
            Choose how you want to create your personalized BloomWish
          </p>
        </section>

        {/* =========================
            CHOICE CARDS
        ========================= */}

        <section className="bouquet-choice-grid">

          {/* =========================
              CREATE YOUR OWN
          ========================= */}

          <div className="choice-card">

            <div className="choice-icon">
              🌸
            </div>

            <h2>
              Create Your Own Bouquet
            </h2>

            <p>
              Choose your favorite flowers and greenery to create
              a bouquet made just for you.
            </p>

            <button
              type="button"
              className="choice-button"
              onClick={onCreateOwn}
            >
              Start Creating →
            </button>

          </div>

          {/* =========================
              ALREADY MADE
          ========================= */}

          <div className="choice-card">

            <div className="choice-icon">
              💐
            </div>

            <h2>
              Already Made Bouquet
            </h2>

            <p>
              Pick a beautiful ready-made bouquet from our
              curated collection.
            </p>

            <button
              type="button"
              className="choice-button"
              onClick={onChooseReadyMade}
            >
              Choose Bouquet →
            </button>

          </div>

        </section>

      </main>
    </div>
  );
}

export default BouquetChoice;