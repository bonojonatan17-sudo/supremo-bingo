import { useState } from "react";

function ScratchBall({ number, onReveal }) {
  const [opened, setOpened] = useState(false);

  function reveal() {
    if (opened) return;

    setOpened(true);

    // Zahl an ScratchBoard melden
    onReveal(number);

    // Sound (falls vorhanden)
    try {
      const sound = new Audio("/sounds/scratch.mp3");
      sound.volume = 0.5;
      sound.play();
    } catch (e) {}
  }

  return (
    <div
      onClick={reveal}
      style={{
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        cursor: "pointer",
        userSelect: "none",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontWeight: "bold",
        fontSize: "24px",
        color: "white",

        transition: "0.25s",

        transform: opened ? "scale(1.05)" : "scale(1)",

        background: opened
          ? "radial-gradient(circle at 30% 30%, #4ADE80, #15803D)"
          : "radial-gradient(circle at 30% 30%, #F5F5F5, #A3A3A3)",

        border: opened
          ? "3px solid #22C55E"
          : "3px solid #D4D4D4",

        boxShadow: opened
          ? "0 0 20px #22C55E"
          : "0 0 15px rgba(255,255,255,.35)",
      }}
    >
      {opened ? number : "🎱"}
    </div>
  );
}

export default ScratchBall;