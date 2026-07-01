function JackpotCard() {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "25px",
        border: "1px solid #2A3447",
        color: "white",
      }}
    >
      <h2 style={{ color: "#A855F7" }}>💰 Aktueller Jackpot</h2>

      <h1
        style={{
          fontSize: "42px",
          color: "#22C55E",
          marginTop: "20px",
        }}
      >
        250.000 $
      </h1>

      <p style={{ color: "#9CA3AF", marginTop: "15px" }}>
        Jeder Loskauf erhöht den Jackpot.
      </p>
    </div>
  );
}

export default JackpotCard;