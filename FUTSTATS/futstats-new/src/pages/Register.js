import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    const res = await registerUser({ name, email, password });

    if (res.success) {
      setSuccess("Cuenta creada correctamente.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(res.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <input
        type="text"
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="auth-input"
      />

      <input
        type="email"
        placeholder="Correo"
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

      <button onClick={handleRegister} className="auth-btn">
        Registrarse
      </button>

      <p className="auth-switch" onClick={() => navigate("/login")}>
        ¿Ya tienes cuenta? Inicia sesión aquí
      </p>
    </div>
  );
};

export default Register;
