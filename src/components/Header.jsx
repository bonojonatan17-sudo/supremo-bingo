import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import TicketPopup from "./TicketPopup";
import "../styles/header.css";

function Header() {
  const player = localStorage.getItem("playerName") || "Gast";

  const [tickets, setTickets] = useState(0);
  const [jackpot, setJackpot] = useState(0);

  const [showTicket, setShowTicket] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel("supremo-live")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "players",
        },
        () => {
          loadData();
        }
      )

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "settings",
        },
        () => {
          loadData();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadData() {
    const { data: playerData } = await supabase
      .from("players")
      .select("tickets")
      .eq("name", player)
      .single();

    if (playerData) {
      setTickets(playerData.tickets);
    }

    const { data: settings } = await supabase
      .from("settings")
      .select("jackpot")
      .eq("id", 1)
      .single();

    if (settings) {
      setJackpot(settings.jackpot);
    }
  }

  return (
    <>
      <header className="header">

        {/* LINKS */}
        <div className="header-left">

          <div className="header-box">
            <span>👑 Jackpot</span>
            <h2>{jackpot.toLocaleString("de-DE")} $</h2>
          </div>

          <div className="header-box">
            <span>🎟️ Lose</span>
            <h2>{tickets}</h2>
          </div>

        </div>

        {/* MITTE */}
        <div className="header-center">

          <h1 className="header-title">
            🎲 Sync x Nico
          </h1>

          <p className="header-subtitle">
            Supremo Bingo • GTA RP
          </p>

          <p className="header-player">
            👤 {player}
          </p>

        </div>

        {/* RECHTS */}
        <div className="header-right">

          <button
            className="header-btn"
            onClick={() => setShowTicket(true)}
          >
            🎟️ Ticket beantragen
          </button>

          <button
            className="header-btn"
            onClick={() => setShowRules(true)}
          >
            📜 Regeln
          </button>        </div>

      </header>

      <TicketPopup
        open={showTicket}
        onClose={() => setShowTicket(false)}
      />

      {showRules && (
        <div className="popup-overlay">
          <div className="popup">

            <h1>📜 Supremo Bingo Regeln</h1>

            <p>🎱 Rubble alle Kugeln auf.</p>
            <p>✅ Passende Zahlen werden automatisch markiert.</p>
            <p>🏆 Eine vollständige Reihe, Spalte oder Diagonale gewinnt.</p>
            <p>💰 Gewinne werden im GTA RP von einem Teammitglied ausgezahlt.</p>
            <p>🎟️ Tickets werden nach erfolgreicher RP-Zahlung freigeschaltet.</p>

            <button onClick={() => setShowRules(false)}>
              Verstanden
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default Header;