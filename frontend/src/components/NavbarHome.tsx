import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navHome.css";

export const NavbarHome: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-white px-4 py-2 shadow rounded-2xl">
      <div className="flex items-center space-x-4">
      <div className="titulo">LitClub</div>
      </div>
      <div className="flex space-x-4">

      <ul className="hidden md:flex space-x-6 text-gray-600">
        
          <li>
            <Link to="/" className="hover:text-gray-900">Inicio</Link>
          </li>
          <li>
            <Link to="/catalog" className="hover:text-gray-900">Catálogo</Link>
          </li>
          <li>
            <Link to="/comunidad" className="hover:text-gray-900">Comunidad</Link>
          </li>
          <li>
            <Link to="/sobre-nosotros" className="hover:text-gray-900">Sobre Nosotros</Link>
          </li>
          <li>
            <Link to="/contacto" className="hover:text-gray-900">Contacto</Link>
          </li>
          <div className="auth-buttons">
        <Link to="/login">
          <button className="btn-login">Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button className="btn-register">Registro</button>
        </Link>
      </div>
        </ul>
        
      </div>
    </nav>
  );
};

export default NavbarHome;
