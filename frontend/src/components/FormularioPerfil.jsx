// src/components/FormularioPerfil.jsx
import React, { useState } from 'react'; // Importa useState

const FormularioPerfil = () => {
  // Define estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Aquí puedes agregar la lógica para guardar el perfil,
    // por ejemplo, enviando los datos a un backend.
    console.log('Datos de perfil enviados:', {
      nombre,
      correo,
      contrasena,
    });

    // Opcional: limpiar el formulario después del envío
    // setNombre('');
    // setCorreo('');
    // setContrasena('');
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}> {/* Agrega onSubmit */}
      <input
        type="text"
        placeholder="Nombre completo"
        className="w-full border border-gray-300 rounded px-4 py-2"
        value={nombre} // Conecta el input al estado 'nombre'
        onChange={(e) => setNombre(e.target.value)} // Actualiza el estado cuando el valor cambia
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full border border-gray-300 rounded px-4 py-2"
        value={correo} // Conecta el input al estado 'correo'
        onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado cuando el valor cambia
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full border border-gray-300 rounded px-4 py-2"
        value={contrasena} // Conecta el input al estado 'contrasena'
        onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado cuando el valor cambia
      />
      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold hover:bg-blue-800"
      >
        Guardar
      </button>
    </form>
  );
};

export default FormularioPerfil;