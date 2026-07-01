import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

import Background from "../components/Background";
import Header from "../components/Header";
import ScratchBoard from "../components/ScratchBoard";
import MusicPlayer from "../components/MusicPlayer";

import "../styles/home.css";

function Home() {
  const player = localStorage.getItem("playerName");

  const [winners, setWinners] = useState([]);

  useEffect(() => {
    loadWinners();

    const channel = supabase
      .channel("live-winners")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "winners",
        },
        () => {
          loadWinners();
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadWinners() {
    const { data } = await supabase
      .from("winners")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (data) {
      setWinners(data);
    }
  }

  if (!player) {
    return <Navigate to="/register" replace />;
  }

  return (
    <>
      <Background />

      <Header />

      <div className="winner-history">

        <h2>🏆 Letzte Gewinner</h2>

        {winners.length === 0 ? (
          <p>Noch keine Gewinner vorhanden.</p>
        ) : (
          winners.map((winner) => (
            <div
              className="winner-item"
              key={winner.id}
            >
              <span>
                👤 {winner.player}
              </span>

              <span>
                💰 {winner.prize.toLocaleString("de-DE")} $
              </span>
            </div>
          ))
        )}

      </div>

      <ScratchBoard />

      <MusicPlayer />

      <div className="footer-bar">
        👤 {player} • Willkommen bei Supremo Bingo
      </div>
    </>
  );
}

export default Home;