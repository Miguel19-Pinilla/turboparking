// src/pages/seleccionreserva.jsx
import React from 'react';
import BarraPerfil from '../components/BarraPerfil';
import HeaderPagina from '../components/HeaderPagina';
import TarjetaParqueadero from '../components/TarjetaParqueadero';

const parqueaderos = [
  { nombre: 'Parking Centro', direccion: 'Cra 10 #20-30', precio: 3000, disponible: true },
  { nombre: 'Parqueadero Norte', direccion: 'Av 19 #120-50', precio: 2500, disponible: false },
  { nombre: 'Estacionamiento Sur', direccion: 'Cl 8 #30-22', precio: 2000, disponible: true }
];

const seleccionreserva = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BarraPerfil />
      <HeaderPagina titulo="Selecciona un parqueadero" />
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {parqueaderos.map((p, index) => (
          <TarjetaParqueadero key={index} {...p} />
        ))}
      </div>
    </div>
  );
};

export default seleccionreserva;