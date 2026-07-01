import "../styles/ticketpopup.css";

function TicketPopup({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">

        <h1>🎟️ Ticket beantragen</h1>

        <div className="ticket-info">
          <h2>Preis: 10.000 $ RP</h2>

          <p>
            1️⃣ Überweise <b>10.000 $</b> im GTA RP an
            <br />
            <b>Sync x Nico</b>.
          </p>

          <p>
            2️⃣ Melde dich anschließend bei einem
            Teammitglied.
          </p>

          <p>
            3️⃣ Nach Bestätigung wird dein Ticket
            freigeschaltet.
          </p>
        </div>

        <button onClick={onClose}>
          Verstanden
        </button>

      </div>
    </div>
  );
}

export default TicketPopup;