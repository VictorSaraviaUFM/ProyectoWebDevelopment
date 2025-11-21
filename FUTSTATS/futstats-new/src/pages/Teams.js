import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Teams() {
  const teams = [
    { name: "Barcelona", league: "LaLiga", titles: 27 },
    { name: "Manchester City", league: "Premier League", titles: 9 },
    { name: "PSG", league: "Ligue 1", titles: 10 },
  ];

  return (
    <div>
      <Navbar />

      <h1>Equipos</h1>
      <p>Consulta rendimiento, estadísticas y logros de cada equipo.</p>

      <ul>
        {teams.map((t, i) => (
          <li key={i}>
            <strong>{t.name}</strong> – {t.league} – Títulos: {t.titles}
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
}

export default Teams;
