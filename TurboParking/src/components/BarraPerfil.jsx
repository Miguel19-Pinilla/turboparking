// src/components/BarraPerfil.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BarraPerfil = () => {
  return (
    <div className="w-full bg-blue-700 text-white py-4 px-6 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Mi Perfil</h2>
      <Link to="/" className="hover:underline text-sm">Cerrar sesión</Link>
    </div>
  );
};

export default BarraPerfil;