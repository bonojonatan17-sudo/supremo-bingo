import { useState } from "react";
import { useGame } from "../context/GameContext";
import "../styles/headerbuttons.css";

function HeaderButtons() {
  const { buyTicket } = useGame();

  const [showRules, setShowRules] = useState(false);

  function handleBuy() {
    if (buyTicket()) {
      alert("🎉 Los erfolgreich gekauft!");
    }
  }

  return (
    <>
      <div className="header-buttons">

        <button onClick={handleBuy}>
          🛒 Los kaufen
        </button>

        <button onClick={() => setShowRules(true)}>
          📜 Regeln
        </button>

      </div>

      {showRules && (
        <div className="rules-overlay">
          <div className="rules-box">

            <h2>📜 Supremo Bingo Regeln</h2>

            <ul>
              <li>🎱 Rubble alle Kugeln auf.</li>
              <li>✅ Passende Zahlen werden automatisch markiert.</li>
              <li>🏆 Reihe, Spalte oder Diagonale = Bingo.</li>
              <li>💰 Gewinne werden im GTA RP Server ausgezahlt.</li>
              <li>🎟️ Mehr Lose = mehr Gewinnchancen.</li>
            </ul>

            <button onClick={() => setShowRules(false)}>
              Verstanden
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default HeaderButtons;