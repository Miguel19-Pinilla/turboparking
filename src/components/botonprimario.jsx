// src/components/BotonPrimario.jsx
import React from 'react';

const BotonPrimario = ({ texto, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
    >
      {texto}
    </button>
  );
};

export default BotonPrimario;