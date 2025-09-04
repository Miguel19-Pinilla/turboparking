// src/components/NavbarPublic.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarPublic = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">TurboParking</Link>
      <div>
        <Link to="/iniciarsesion" className="mr-4 hover:text-gray-300">Iniciar Sesión</Link>
        <Link to="/registrarse" className="hover:text-gray-300">Registrarse</Link>
      </div>
    </nav>
  );
};

export default NavbarPublic;