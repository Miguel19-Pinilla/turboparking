// src/components/CampoTexto.jsx
import React from 'react';

const CampoTexto = ({ tipo = 'text', valor, onChange, placeholder }) => {
  return (
    <input
      type={tipo}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default CampoTexto;