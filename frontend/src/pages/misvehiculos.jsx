// src/pages/MisVehiculos.jsx
import React from 'react';
import BarraPerfil from '../components/BarraPerfil';
import HeaderPagina from '../components/HeaderPagina';
import FormularioVehiculo from '../components/FormularioVehiculo';

const misvehiculos = () => {
  return (
    <div className="min-h-screen bg-white">
      <BarraPerfil />
      <HeaderPagina titulo="Mis Vehículos" />
      <FormularioVehiculo />
    </div>
  );
};

export default misvehiculos;