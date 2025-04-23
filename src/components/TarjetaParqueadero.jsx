import React from 'react';

const TarjetaParqueadero = ({ nombre, direccion, precio, disponible }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold text-gray-800">{nombre}</h2>
      <p className="text-gray-600">{direccion}</p>
      <p className="text-blue-600 font-semibold">${precio} / hora</p>
      <p className={`font-medium ${disponible ? 'text-green-600' : 'text-red-600'}`}>
  {disponible ? 'Disponible' : 'Ocupado'}
      </p>
    </div>
  );
};

export default TarjetaParqueadero;