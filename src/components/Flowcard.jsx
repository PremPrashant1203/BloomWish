function Flowcard({ flower, count, onQuantityChange }) {
  return (
    <div
      className={`flower-card ${count > 0 ? "selected" : ""}`}
      onClick={() => onQuantityChange(flower.id)}
    >
      {count > 0 && (
        <span className="flower-count">
          {count}
        </span>
      )}

      <div className="flower-image-wrapper">
        <img
          src={flower.image}
          alt={flower.name}
          className="flower-image"
        />
      </div>

      <h2>{flower.name}</h2>
    </div>
  );
}

export default Flowcard;