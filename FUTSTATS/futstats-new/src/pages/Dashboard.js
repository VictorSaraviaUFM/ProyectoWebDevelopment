import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div>
      <Navbar />

      <h1>Dashboard del Usuario</h1>
      <p>Aquí podrás ver tus jugadores favoritos, equipos guardados y tu perfil.</p>

      <div className="dashboard-grid">
        <div className="db-card">
          <h3>Favoritos</h3>
          <p>⚽ Aquí se mostrarán tus jugadores y equipos favoritos.</p>
        </div>

        <div className="db-card">
          <h3>Actividad</h3>
          <p>📊 Comentarios, debates y actividad reciente.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
