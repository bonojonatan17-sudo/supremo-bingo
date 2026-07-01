import { useEffect, useState } from "react";
import "../styles/intro.css";

function IntroScreen({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);

      setTimeout(() => {
        onFinish();
      }, 800);

    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`intro ${hide ? "hide" : ""}`}>
      <div className="intro-box">

        <h1 className="logo">
          🎲 Sync x Nico
        </h1>

        <h2>Supremo Bingo</h2>

        <p>
          Willkommen im GTA RP Bingo
        </p>

        <p>
          💰 Gewinne werden Ingame ausgezahlt
        </p>

        <button onClick={()=>{
          setHide(true);

          setTimeout(()=>{
            onFinish();
          },600);
        }}>
          Spiel starten
        </button>

      </div>
    </div>
  );
}

export default IntroScreen;