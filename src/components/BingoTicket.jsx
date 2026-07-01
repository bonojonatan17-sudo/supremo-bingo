import { useMemo, useEffect } from "react";
import { useGame } from "../context/GameContext";
import "../styles/ticket.css";

function BingoTicket({ drawnNumbers = [], onBingo }) {
  const { gameId } = useGame();

  function randomColumn(min, max) {
    const numbers = [];

    while (numbers.length < 5) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;

      if (!numbers.includes(n)) {
        numbers.push(n);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  const board = useMemo(() => {
    const columns = [
      randomColumn(1, 15),
      randomColumn(16, 30),
      randomColumn(31, 45),
      randomColumn(46, 60),
      randomColumn(61, 75),
    ];

    const grid = [];

    for (let row = 0; row < 5; row++) {
      grid.push(columns.map((column) => column[row]));
    }

    grid[2][2] = "FREE";

    return grid;
  }, [gameId]);

  function isMarked(value) {
    return value === "FREE" || drawnNumbers.includes(value);
  }

  useEffect(() => {
    // Reihen
    for (let r = 0; r < 5; r++) {
      if (board[r].every(isMarked)) {
        onBingo?.();
        return;
      }
    }

    // Spalten
    for (let c = 0; c < 5; c++) {
      let win = true;

      for (let r = 0; r < 5; r++) {
        if (!isMarked(board[r][c])) {
          win = false;
          break;
        }
      }

      if (win) {
        onBingo?.();
        return;
      }
    }

    // Diagonale links → rechts
    if ([0, 1, 2, 3, 4].every((i) => isMarked(board[i][i]))) {
      onBingo?.();
      return;
    }

    // Diagonale rechts → links
    if ([0, 1, 2, 3, 4].every((i) => isMarked(board[i][4 - i]))) {
      onBingo?.();
    }
  }, [drawnNumbers, board, onBingo]);

  return (
    <div className="ticket">
      <div className="ticket-header">
        {["B", "I", "N", "G", "O"].map((letter) => (
          <div key={letter} className="letter">
            {letter}
          </div>
        ))}
      </div>

      <div className="ticket-grid">
        {board.flat().map((value, index) => {
          const marked = isMarked(value);

          return (
            <div
              key={index}
              className={`cell ${marked ? "marked" : ""}`}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BingoTicket;