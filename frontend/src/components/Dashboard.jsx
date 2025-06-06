// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import HeaderPagina from './HeaderPagina'; // Asegúrate de importar HeaderPagina

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <HeaderPagina titulo="Bienvenido a tu Dashboard" subtitulo="Gestiona tus vehículos, perfil y reservas." />
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full mt-8">
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-4">
          ¡Acceso Exclusivo!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Aquí puedes acceder a todas las funciones de tu cuenta.
        </p>
        <div className="space-y-4">
          <Link to="/perfil" className="w-full inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Gestionar Perfil
          </Link>
          <Link to="/vehiculos" className="w-full inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
            Ver Mis Vehículos
          </Link>
          {/* Añade más enlaces según las funcionalidades de tu Dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;