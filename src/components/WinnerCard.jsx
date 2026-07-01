function WinnerCard() {
  const winners = [
    { name: "Max_Mustermann", prize: "25.000 $" },
    { name: "LucaRP", prize: "10.000 $" },
    { name: "SupremoKing", prize: "50.000 $" },
  ];

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
      <h2 style={{ color: "#A855F7" }}>🏆 Letzte Gewinner</h2>

      {winners.map((winner, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "18px",
          }}
        >
          <span>{winner.name}</span>
          <span style={{ color: "#22C55E" }}>{winner.prize}</span>
        </div>
      ))}
    </div>
  );
}

export default WinnerCard;