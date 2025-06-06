// src/pages/MisVehiculos.jsx
import React from 'react';
import BarraPerfil from '../components/BarraPerfil';
import HeaderPagina from '../components/HeaderPagina';
import FormularioVehiculo from '../components/FormularioVehiculo';
import ListaVehiculos from '../components/ListaVehiculos'; // <-- Importa ListaVehiculos

const MisVehiculos = () => { // Renombrado a MisVehiculos (PascalCase) por convención
  return (
    <div className="min-h-screen bg-white">
      <BarraPerfil />
      <HeaderPagina titulo="Mis Vehículos" />
      
      <div className="container mx-auto p-4"> {/* Contenedor para el contenido principal */}
        {/* Sección para registrar un nuevo vehículo */}
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto w-full mt-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Registrar Nuevo Vehículo</h2>
          <FormularioVehiculo />
        </div>

        {/* Sección para listar los vehículos existentes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Mis Vehículos Registrados</h2>
          <ListaVehiculos /> {/* <-- Renderiza la lista de vehículos aquí */}
        </div>
      </div>
    </div>
  );
};

export default MisVehiculos;