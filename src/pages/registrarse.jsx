import React from 'react';

const Registrarse = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Crear cuenta</h1>
      <form className="flex flex-col w-full max-w-sm space-y-4">
        <input type="text" placeholder="Nombre" className="input input-bordered" />
        <input type="email" placeholder="Correo electrónico" className="input input-bordered" />
        <input type="password" placeholder="Contraseña" className="input input-bordered" />
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Registrarse;