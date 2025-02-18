import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/nav.css";
import { FaUserCircle } from "react-icons/fa"; // Icono de perfil

export const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className="nav">
      <h4 className="logo">LitClub</h4>
      <div className="auth-buttons">
        {auth?.token ? (
          <>
            <Link to="/dashboard" className="nav-link">Inicio</Link>
            {auth.user?.rol === "administrador" && (
              <>
                <Link to="/admin" className="nav-link">Admin Panel</Link>
                <Link to="/books" className="nav-link">Gestión de Libros</Link>
              </>
            )}
            <Link to="/my-books" className="nav-link">Mis Libros</Link>
            <Link to="/catalog" className="nav-link">Catálogo</Link>

            {/* Botón con ícono de perfil para cerrar sesión */}
            <button onClick={auth.logout} className="btn-profile">
              <FaUserCircle />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};
