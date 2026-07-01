import { useEffect, useRef, useState } from "react";

function ScratchCanvas({ number, onReveal }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 70;
    canvas.height = 70;

    // Silberne Schicht
    ctx.fillStyle = "#C0C0C0";
    ctx.beginPath();
    ctx.arc(35, 35, 35, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function scratch(e) {
    if (!isDrawing.current || revealed) return;

    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Vorläufig: nach dem ersten Rubbeln aufdecken
    if (!revealed) {
      setRevealed(true);
      onReveal(number);
    }
  }

  return (
    <div
      style={{
        width: "70px",
        height: "70px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle,#4ADE80,#15803D)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "22px",
        }}
      >
        {number}
      </div>

      {!revealed && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            cursor: "pointer",
          }}
          onMouseDown={() => (isDrawing.current = true)}
          onMouseUp={() => (isDrawing.current = false)}
          onMouseLeave={() => (isDrawing.current = false)}
          onMouseMove={scratch}
        />
      )}
    </div>
  );
}

export default ScratchCanvas;