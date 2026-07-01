function NewsCard() {
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
      <h2 style={{ color: "#A855F7" }}>📢 News</h2>

      <p style={{ marginTop: "20px" }}>
        🎲 Neue Bingo-Runde gestartet!
      </p>

      <p style={{ marginTop: "15px" }}>
        💰 Jackpot wurde erhöht.
      </p>

      <p style={{ marginTop: "15px" }}>
        🎁 VIP-Spieler erhalten Bonuslose.
      </p>
    </div>
  );
}

export default NewsCard;