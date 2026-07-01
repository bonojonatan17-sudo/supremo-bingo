import "../styles/winpopup.css";

function WinPopup({ open, prize, onClose }) {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">

        <h1>🎉 BINGO! 🎉</h1>

        <h2>Gewonnen</h2>

        <div className="prize">
          {prize.toLocaleString("de-DE")} $
        </div>

        <p>
          Der Gewinn wird dir im GTA RP
          von einem Teammitglied ausgezahlt.
        </p>

        <button onClick={onClose}>
          Gewonnen ✔
        </button>

      </div>
    </div>
  );
}

export default WinPopup;