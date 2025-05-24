// src/pages/ubicacionreserva.jsx
import React from 'react';
import BarraPerfil from '../components/BarraPerfil';
import HeaderPagina from '../components/HeaderPagina';

const ubicacionreserva = () => {
  return (
    <div className="min-h-screen bg-white">
      <BarraPerfil />
      <HeaderPagina titulo="Ubicación del Parqueadero" />
      <div className="p-6">
        <div className="bg-gray-200 w-full h-80 rounded-lg flex items-center justify-center text-gray-600">
          Aquí irá el mapa o imagen del parqueadero.
        </div>
        <div className="mt-6 text-lg">
          <p><strong>Nombre:</strong> Parking Centro</p>
          <p><strong>Dirección:</strong> Cra 10 #20-30</p>
          <p><strong>Horario:</strong> 6:00 AM - 10:00 PM</p>
          <p><strong>Precio:</strong> $3.000 por hora</p>
        </div>
      </div>
    </div>
  );
};

export default ubicacionreserva;