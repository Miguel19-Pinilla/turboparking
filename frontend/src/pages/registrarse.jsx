// src/pages/Registrarse.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoTexto from '../components/campotexto';     // Importa desde components
import BotonPrimario from '../components/botonprimario'; // Importa desde components
import HeaderPagina from '../components/HeaderPagina'; // Importa desde components

// Si el registro auto-loguea al usuario, podrías pasar `onLogin` como prop aquí también.
// Por ahora, asumiremos que redirige al login después de un registro exitoso.
const Registrarse = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmContrasena, setConfirmContrasena] = useState('');
  const [mensaje, setMensaje] = useState(null); // Para mostrar mensajes al usuario
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    // Validación básica del lado del cliente
    if (!nombre || !correo || !contrasena || !confirmContrasena) {
      setMensaje({ type: 'error', text: 'Todos los campos son obligatorios.' });
      return;
    }
    if (contrasena !== confirmContrasena) {
      setMensaje({ type: 'error', text: 'Las contraseñas no coinciden.' });
      return;
    }
    if (contrasena.length < 6) { // Ejemplo de validación de contraseña
        setMensaje({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
        return;
    }

    try {
      // Usar la IP directa de tu máquina host
      const backendHost = 'localhost'; // <-- ¡Usar localhost para pruebas en la misma máquina!
      const apiUrl = `http://${backendHost}:5000/api/perfil`; 

      console.log("Registrarse: Intentando registrar usuario con:", { nombre, correo });
      console.log("Registrarse: Realizando fetch a:", apiUrl); // Log para verificar la URL

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, contrasena }), // Envía los datos
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Registrarse: Error al registrar usuario:', data.message || 'Error desconocido');
        setMensaje({ type: 'error', text: data.message || 'Error al registrar. Intenta con otro correo.' });
        return;
      }

      // Registro exitoso
      console.log('Registrarse: Registro exitoso:', data);
      setMensaje({ type: 'success', text: data.message || 'Registro exitoso. ¡Ahora puedes iniciar sesión!' });

      // Redirigir al usuario a la página de login después de un breve delay
      setTimeout(() => {
        navigate('/iniciarsesion');
      }, 2000); // Espera 2 segundos antes de redirigir

    } catch (error) {
      console.error('Registrarse: Error de red o del servidor:', error);
      setMensaje({ type: 'error', text: `Error de conexión: ${error.message}. Asegúrate de que el backend esté corriendo en http://192.168.0.180:5000 y sea accesible.` });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8 text-center">
        <HeaderPagina titulo="Registrarse" subtitulo="Crea una nueva cuenta en TurboParking" className="mb-6" />
        
        {/* Mensajes de retroalimentación */}
        {mensaje && (
          <div className={`alert ${mensaje.type === 'success' ? 'alert-success' : 'alert-error'} mb-4 text-center`}>
            <span>{mensaje.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CampoTexto 
            placeholder="Nombre completo" 
            tipo="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
          <CampoTexto 
            placeholder="Correo electrónico" 
            tipo="email" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            required 
          />
          <CampoTexto 
            placeholder="Contraseña" 
            tipo="password" 
            value={contrasena} 
            onChange={(e) => setContrasena(e.target.value)} 
            required 
          />
          <CampoTexto 
            placeholder="Confirmar Contraseña" 
            tipo="password" 
            value={confirmContrasena} 
            onChange={(e) => setConfirmContrasena(e.target.value)} 
            required 
          />
          <BotonPrimario texto="Registrarme" type="submit" className="w-full" />
        </form>
        <div className="mt-4 text-sm text-gray-600">
          ¿Ya tienes una cuenta? <Link to="/iniciarsesion" className="text-blue-600 hover:underline">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;