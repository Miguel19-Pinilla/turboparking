// src/components/TituloSeccion.jsx
import React from 'react';

const TituloSeccion = ({ titulo, subtitulo }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-blue-700">{titulo}</h2>
      {subtitulo && <p className="text-gray-600 mt-2">{subtitulo}</p>}
    </div>
  );
};

export default TituloSeccion;