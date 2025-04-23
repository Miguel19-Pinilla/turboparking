// src/pages/MiPerfil.jsx
import React from 'react';
import BarraPerfil from '../components/BarraPerfil';
import HeaderPagina from '../components/HeaderPagina';
import FormularioPerfil from '../components/FormularioPerfil';

const miperfil = () => {
  return (
    <div className="min-h-screen bg-white">
      <BarraPerfil />
      <HeaderPagina titulo="Mi Perfil" />
      <FormularioPerfil />
    </div>
  );
};

export default miperfil;