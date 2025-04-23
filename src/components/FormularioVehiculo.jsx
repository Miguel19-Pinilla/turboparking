// src/components/FormularioVehiculo.jsx
import React from 'react';

const FormularioVehiculo = () => {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <input type="text" placeholder="Placa" className="w-full border border-gray-300 rounded px-4 py-2" />
      <input type="text" placeholder="Marca" className="w-full border border-gray-300 rounded px-4 py-2" />
      <input type="text" placeholder="Color" className="w-full border border-gray-300 rounded px-4 py-2" />
      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold hover:bg-blue-800">Guardar</button>
    </form>
  );
};

export default FormularioVehiculo;