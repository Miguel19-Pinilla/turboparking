// src/components/NavbarAuthenticated.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarAuthenticated = ({ onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold">Dashboard</Link>
      <div>
        <Link to="/perfil" className="mr-4 hover:text-blue-200">Mi Perfil</Link>
        <Link to="/vehiculos" className="mr-4 hover:text-blue-200">Mis Vehículos</Link>
        {/* Agrega más enlaces para rutas autenticadas, ej. /reservas, /parqueaderos */}
        <button 
          onClick={onLogout} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default NavbarAuthenticated;