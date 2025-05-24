// src/components/HeaderPagina.jsx
import React from 'react';

const HeaderPagina = ({ titulo }) => {
  return (
    <div className="w-full py-6 text-center bg-gray-50 border-b border-gray-200">
      <h1 className="text-3xl font-bold text-blue-700">{titulo}</h1>
    </div>
  );
};

export default HeaderPagina;