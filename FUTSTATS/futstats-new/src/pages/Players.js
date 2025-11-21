import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlayerCard from "../components/PlayerCard";

function Players() {
  // Simulación temporal
  const players = [
    { name: "Lionel Messi", team: "Inter Miami", goals: 12, assists: 7 },
    { name: "Erling Haaland", team: "Man City", goals: 22, assists: 3 },
    { name: "Vinícius Jr", team: "Real Madrid", goals: 14, assists: 9 },
  ];

  return (
    <div>
      <Navbar />

      <h1>Jugadores</h1>
      <p>Explora estadísticas y rendimiento de jugadores.</p>

      <div className="players-container">
        {players.map((p, i) => (
          <PlayerCard
            key={i}
            name={p.name}
            team={p.team}
            goals={p.goals}
            assists={p.assists}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Players;
