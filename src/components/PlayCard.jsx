function PlayCard() {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "25px",
        border: "1px solid #2A3447",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#A855F7" }}>🎮 Jetzt spielen</h2>

      <p style={{ marginTop: "20px" }}>
        Kaufe dein Los für <b>2.000 $</b>
      </p>

      <button
        style={{
          marginTop: "25px",
          background: "#7C3AED",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "12px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        🎲 Los kaufen
      </button>
    </div>
  );
}

export default PlayCard;