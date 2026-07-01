import { useState, useMemo, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { getPlayer, removeTicket } from "../lib/player";
import { supabase } from "../lib/supabase";
import ScratchBall from "./ScratchBall";
import BingoTicket from "./BingoTicket";
import WinPopup from "./WinPopup";
import "../styles/scratchboard.css";

function ScratchBoard() {
  const { addMoney, addWinner } = useGame();

  const playerName = localStorage.getItem("playerName");

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [showWin, setShowWin] = useState(false);
  const [prize, setPrize] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await getPlayer(playerName);
      setPlayer(data);
      setLoading(false);
    }

    load();
  }, [playerName]);

  const balls = useMemo(() => {
    const nums = [];

    while (nums.length < 20) {
      const n = Math.floor(Math.random() * 75) + 1;

      if (!nums.includes(n)) nums.push(n);
    }

    return nums;
  }, []);

  function revealNumber(number) {
    setDrawnNumbers((old) => {
      if (old.includes(number)) return old;
      return [...old, number];
    });
  }

  async function handleBingo() {
    if (showWin) return;

    const ok = await removeTicket(playerName);

    if (!ok) {
      alert("❌ Du besitzt kein Bingolos.");
      return;
    }

    // Aktuellen Jackpot laden
    const { data: settings } = await supabase
      .from("settings")
      .select("jackpot")
      .eq("id", 1)
      .single();

    const jackpot = settings?.jackpot || 20000;

    addMoney(jackpot);
    addWinner(playerName, jackpot);

    // Gewinner speichern
    await supabase
      .from("winners")
      .insert({
        player: playerName,
        prize: jackpot,
        paid: false,
      });

    // Jackpot zurücksetzen
    await supabase
      .from("settings")
      .update({
        jackpot: 20000,
      })
      .eq("id", 1);

    setPrize(jackpot);
    setShowWin(true);

    const updated = await getPlayer(playerName);
    setPlayer(updated);

    try {
      new Audio("/sounds/win.mp3").play();
    } catch {}
  }
    if (loading) {
    return <h2>Lade...</h2>;
  }

  if (!player || player.tickets <= 0) {
    return (
      <div className="no-ticket">
        <h1>🎟️ Kein Bingolos vorhanden</h1>

        <p>
          Kaufe ein Bingolos bei einem
          Teammitglied im RP.
        </p>

        <h2>
          Deine Tickets: {player ? player.tickets : 0}
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="board">

        <div className="balls-panel">

          <h2>🎱 Rubbelkugeln</h2>

          <div className="balls-grid">
            {balls.map((number) => (
              <ScratchBall
                key={number}
                number={number}
                onReveal={revealNumber}
              />
            ))}
          </div>

        </div>

        <div className="tickets-panel">

          <h2>🎟️ Deine Bingokarten</h2>

          <h3>
            Verfügbare Tickets: {player.tickets}
          </h3>

          <div className="tickets-grid">
  {Array.from({ length: player.tickets }).map((_, index) => (
    <BingoTicket
      key={index}
      drawnNumbers={drawnNumbers}
      onBingo={handleBingo}
    />
  ))}
</div>

        </div>

      </div>

      <WinPopup
        open={showWin}
        prize={prize}
        onClose={() => setShowWin(false)}
      />
    </>
  );
}

export default ScratchBoard;