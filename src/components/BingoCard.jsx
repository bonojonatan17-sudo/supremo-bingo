import { useState } from "react";

function BingoCard() {
  const [numbers] = useState(
    Array.from({ length: 25 }, () =>
      Math.floor(Math.random() * 75) + 1
    )
  );

  const [opened, setOpened] = useState([]);

  function openCard(index) {
    if (!opened.includes(index)) {
      setOpened([...opened, index]);
    }
  }

  return (
    <div
      style={{
        background: "#111827",
        padding: "30px",
        borderRadius: "20px",
        border: "2px solid #7C3AED",
        boxShadow: "0 0 25px #7C3AED55",
      }}
    >
      <h1
        style={{
          color: "#A855F7",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🎲 Supremo Bingo
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,80px)",
          gap: "12px",
        }}
      >
        {numbers.map((num, index) => (
          <div
            key={index}
            onClick={() => openCard(index)}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "15px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "26px",
              fontWeight: "bold",
              transition: ".3s",

              background: opened.includes(index)
                ? "#7C3AED"
                : "#374151",

              color: "white",
            }}
          >
            {opened.includes(index) ? num : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BingoCard;