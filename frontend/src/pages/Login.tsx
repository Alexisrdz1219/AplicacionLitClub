import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/iniciosesion.css"; // Importa el CSS

export const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth?.login(email, contraseña);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setContraseña(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  </div>

  );
};
