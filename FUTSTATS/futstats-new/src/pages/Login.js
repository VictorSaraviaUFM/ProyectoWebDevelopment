import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await loginUser({ email, password });

    if (res.success) {
      localStorage.setItem("token", res.token);
      navigate("/"); // redirige al dashboard
    } else {
      setError(res.message || "Credenciales incorrectas");
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>

      {error && <p className="error-msg">{error}</p>}

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />

      <button onClick={handleLogin} className="auth-btn">
        Entrar
      </button>

      <p className="auth-switch" onClick={() => navigate("/register")}>
        ¿No tienes cuenta? Regístrate aquí
      </p>
    </div>
  );
};

export default Login;
