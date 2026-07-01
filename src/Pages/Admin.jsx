import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/admin.css";

function Admin() {
  if (localStorage.getItem("admin") !== "true") {
    return <Navigate to="/admin-login" replace />;
  }

  const [players, setPlayers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [search, setSearch] = useState("");
  const [jackpot, setJackpot] = useState(0);

  useEffect(() => {
    loadPlayers();
    loadJackpot();
    loadWinners();
  }, []);

  async function loadPlayers() {
    const { data } = await supabase
      .from("players")
      .select("*")
      .order("name");

    if (data) setPlayers(data);
  }

  async function loadJackpot() {
    const { data } = await supabase
      .from("settings")
      .select("jackpot")
      .eq("id", 1)
      .single();

    if (data) setJackpot(data.jackpot);
  }

  async function loadWinners() {
    const { data } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setWinners(data);
  }

  async function addTicket(player) {
    await supabase
      .from("players")
      .update({
        tickets: player.tickets + 1,
      })
      .eq("id", player.id);

    const neuerJackpot = jackpot + 5000;

    await supabase
      .from("settings")
      .update({
        jackpot: neuerJackpot,
      })
      .eq("id", 1);

    setJackpot(neuerJackpot);

    loadPlayers();
    loadJackpot();
  }

  async function removeTicket(player) {
    await supabase
      .from("players")
      .update({
        tickets: Math.max(0, player.tickets - 1),
      })
      .eq("id", player.id);

    loadPlayers();
  }

  async function togglePaid(winner) {
    await supabase
      .from("winners")
      .update({
        paid: !winner.paid,
      })
      .eq("id", winner.id);

    loadWinners();
  }

  function logout() {
    localStorage.removeItem("admin");
    window.location.href = "/admin-login";
  }

  const filtered = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">

      <h1>👑 Supremo Adminpanel</h1>

      <div className="admin-card">
        <h2>👑 Jackpot</h2>

        <h1 style={{ color: "#22C55E" }}>
          {jackpot.toLocaleString("de-DE")} $
        </h1>
      </div>

      <input
        className="search"
        placeholder="🔍 Spieler suchen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="admin-card">

        <h2>👥 Registrierte Spieler</h2>

        {filtered.map((player) => (
          <div className="player-card" key={player.id}>

            <div>
              <h3>{player.name}</h3>

              <p>
                🎟️ Tickets: <b>{player.tickets}</b>
              </p>
            </div>

            <div className="buttons">

              <button onClick={() => addTicket(player)}>
                ➕
              </button>

              <button onClick={() => removeTicket(player)}>
                ➖
              </button>

            </div>

          </div>
        ))}

      </div>

      <div className="admin-card">

        <h2>🏆 Gewinner</h2>

        {winners.length === 0 ? (
          <p>Noch keine Gewinner vorhanden.</p>
        ) : (
          winners.map((winner) => (
            <div className="player-card" key={winner.id}>

              <div>
                <h3>{winner.player}</h3>

                <p>
                  💰 {winner.prize.toLocaleString("de-DE")} $
                </p>

                <p>
                  📅 {new Date(winner.created_at).toLocaleString("de-DE")}
                </p>

                <p>
                  {winner.paid ? "🟢 Ausgezahlt" : "🟡 Offen"}
                </p>
              </div>

              <div className="buttons">

                <button onClick={() => togglePaid(winner)}>
                  {winner.paid ? "↩ Offen" : "✅ Ausgezahlt"}
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      <button className="logout" onClick={logout}>
        🚪 Ausloggen
      </button>

    </div>
  );
}

export default Admin;