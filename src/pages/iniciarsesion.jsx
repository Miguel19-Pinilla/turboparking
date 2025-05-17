// src/pages/IniciarSesion.jsx
import React from 'react';
import HeaderPagina from '../components/HeaderPagina';

const iniciarsesion = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-10">
      <HeaderPagina titulo="Home" />
      <form className="max-w-md mx-auto mt-8 space-y-4">
        <input type="email" placeholder="Correo electrónico" className="w-full border border-gray-300 rounded px-4 py-2" />
        <input type="password" placeholder="Contraseña" className="w-full border border-gray-300 rounded px-4 py-2" />
        <button className="w-full bg-blue-700 text-white py-2 rounded-full hover:bg-blue-800">Ingresar</button>
      </form>
    </div>
  );
};

export default iniciarsesion;