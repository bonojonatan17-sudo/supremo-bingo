import { useState } from "react";

function Gewinne() {
  const [winners, setWinners] = useState([
    {
      id: "SB-1001",
      player: "Sync x Nico",
      prize: 50000,
      status: false,
    },
    {
      id: "SB-1002",
      player: "Max",
      prize: 25000,
      status: true,
    },
  ]);

  function toggleStatus(id) {
    setWinners((old) =>
      old.map((winner) =>
        winner.id === id
          ? { ...winner, status: !winner.status }
          : winner
      )
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        color: "white",
      }}
    >
      <h1 style={{ color: "#A855F7" }}>
        👑 Admin – Gewinner
      </h1>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Spieler</th>
            <th>Gewinn</th>
            <th>Status</th>
            <th>Aktion</th>
          </tr>
        </thead>

        <tbody>
          {winners.map((winner) => (
            <tr key={winner.id}>
              <td>{winner.id}</td>

              <td>{winner.player}</td>

              <td>
                {winner.prize.toLocaleString("de-DE")} $
              </td>

              <td>
                {winner.status
                  ? "✅ Ausgezahlt"
                  : "⏳ Offen"}
              </td>

              <td>
                <button
                  onClick={() => toggleStatus(winner.id)}
                >
                  {winner.status
                    ? "Zurücksetzen"
                    : "Auszahlen"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Gewinne;