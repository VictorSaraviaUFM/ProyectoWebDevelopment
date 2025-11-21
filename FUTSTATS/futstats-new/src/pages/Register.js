import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Registro exitoso. Ya puedes iniciar sesión.");
      } else {
        setMensaje(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <h2>Crear Cuenta</h2>

        <form onSubmit={handleRegister} className="auth-form">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />

          <button type="submit">Registrarme</button>
        </form>

        {mensaje && <p className="auth-message">{mensaje}</p>}
      </div>

      <Footer />
    </div>
  );
}

export default Register;
