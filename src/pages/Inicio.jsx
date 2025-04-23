import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <h1 className="text-5xl font-bold mb-4">TURBOPARKING</h1>
      <p className="text-xl mb-6 text-center">Encuentra y parquea fácilmente</p>
      <p className="text-md mb-10 text-center px-4">
        Somos la forma más rápida y sencilla para gestionar tu aparcamiento en Bogotá
      </p>
      <div className="flex space-x-4">
        <Link to="/iniciarsesion" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ingresar
        </Link>
        <Link to="/registrarse" className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded">
          Registrarme
        </Link>
      </div>
    </div>
  );
};

export default Inicio;