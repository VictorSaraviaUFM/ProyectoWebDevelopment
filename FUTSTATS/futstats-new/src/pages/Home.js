import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MatchCard from "../components/MatchCard";

function Home() {
  return (
    <div>
      <Navbar />

      <section className="home-header">
        <h1>Bienvenido a FutStats</h1>
        <p>Estadísticas, rendimiento y análisis del mundo del fútbol.</p>
      </section>

      <section className="recent-matches">
        <h2>Partidos Recientes</h2>

        {/* Más adelante conectaremos API real */}
        <MatchCard
          homeTeam="Barcelona"
          awayTeam="Real Madrid"
          score="2 - 1"
          date="2025-02-10"
        />

        <MatchCard
          homeTeam="Liverpool"
          awayTeam="Chelsea"
          score="1 - 1"
          date="2025-02-09"
        />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
