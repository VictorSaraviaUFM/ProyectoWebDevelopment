import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Aún no existe el backend, pero este fetch queda listo
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Login exitoso. Bienvenido!");
        localStorage.setItem("token", data.token);
      } else {
        setMensaje(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleLogin} className="auth-form">
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

          <button type="submit">Entrar</button>
        </form>

        {mensaje && <p className="auth-message">{mensaje}</p>}
      </div>

      <Footer />
    </div>
  );
}

export default Login;
