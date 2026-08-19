function GreeneryCard({ greenery, count, onQuantityChange }) {
  return (
    <div
      className={`flower-card ${count > 0 ? "selected" : ""}`}
      onClick={() => onQuantityChange(greenery.id)}
    >
      {count > 0 && (
        <span className="flower-count">
          {count}
        </span>
      )}

      <div className="flower-image-wrapper">
        <img
          src={greenery.image}
          alt={greenery.name}
          className="flower-image"
        />
      </div>

      <h2>{greenery.name}</h2>
    </div>
  );
}

export default GreeneryCard;