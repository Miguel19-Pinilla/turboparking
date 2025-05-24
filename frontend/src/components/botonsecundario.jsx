// src/components/BotonSecundario.jsx
import React from 'react';

const BotonSecundario = ({ texto, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-white border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-50 transition duration-200"
    >
      {texto}
    </button>
  );
};

export default BotonSecundario;