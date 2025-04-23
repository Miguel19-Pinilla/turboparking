// src/components/FormularioPerfil.jsx
import React from 'react';

const FormularioPerfil = () => {
  return (
    <form className="space-y-4 max-w-md mx-auto">
      <input type="text" placeholder="Nombre completo" className="w-full border border-gray-300 rounded px-4 py-2" />
      <input type="email" placeholder="Correo electrónico" className="w-full border border-gray-300 rounded px-4 py-2" />
      <input type="password" placeholder="Contraseña" className="w-full border border-gray-300 rounded px-4 py-2" />
      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold hover:bg-blue-800">Guardar</button>
    </form>
  );
};

export default FormularioPerfil;