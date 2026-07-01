import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [balance, setBalance] = useState(500000);
  const [jackpot, setJackpot] = useState(2500000);
  const [tickets, setTickets] = useState(4);
  const [winners, setWinners] = useState([]);

  // Spieler
  const [players, setPlayers] = useState([]);

  // Geld
  function addMoney(amount) {
    setBalance((old) => old + amount);
  }

  function removeMoney(amount) {
    setBalance((old) => Math.max(0, old - amount));
  }

  // Gewinner hinzufügen
  function addWinner(player, prize) {
    const winner = {
      id: Date.now(),
      player,
      prize,
      paid: false,
      date: new Date().toLocaleString("de-DE"),
    };

    setWinners((old) => [winner, ...old]);
  }

  // Gewinner als ausgezahlt markieren
  function togglePaid(id) {
    setWinners((old) =>
      old.map((winner) =>
        winner.id === id
          ? { ...winner, paid: !winner.paid }
          : winner
      )
    );
  }

  // Spieler registrieren
  function registerPlayer(name) {
    if (!name.trim()) return;

    const exists = players.some(
      (player) =>
        player.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) return;

    setPlayers((old) => [
      ...old,
      {
        id: Date.now(),
        name,
        tickets: 0,
      },
    ]);
  }

  // Ticket vergeben
  function giveTicket(id, amount = 1) {
    setPlayers((old) =>
      old.map((player) =>
        player.id === id
          ? {
              ...player,
              tickets: player.tickets + amount,
            }
          : player
      )
    );
  }

  // Ticket entfernen
  function removeTicket(id) {
    setPlayers((old) =>
      old.map((player) =>
        player.id === id
          ? {
              ...player,
              tickets: Math.max(0, player.tickets - 1),
            }
          : player
      )
    );
  }

  return (
    <GameContext.Provider
      value={{
        balance,
        jackpot,
        tickets,
        winners,
        players,

        setBalance,
        setJackpot,
        setTickets,

        addMoney,
        removeMoney,

        addWinner,
        togglePaid,

        registerPlayer,
        giveTicket,
        removeTicket,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}