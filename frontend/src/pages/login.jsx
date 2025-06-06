// src/pages/login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CampoTexto from '../components/campotexto';
import BotonPrimario from '../components/botonprimario';
import HeaderPagina from '../components/HeaderPagina';
import loginBg from '../assets/principal.png'; // Asegúrate de que esta ruta y nombre sean correctos

const Login = ({ onLogin }) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!correo || !contrasena) {
      setMensaje({ type: 'error', text: 'Por favor, ingresa tu correo y contraseña.' });
      return;
    }

    try {
      // **IMPORTANTE: Cambiar 'localhost' a '192.168.0.180' para pruebas en emulador**
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error en el inicio de sesión:', data.message || 'Error desconocido');
        setMensaje({ type: 'error', text: data.message || 'Credenciales inválidas. Intenta de nuevo.' });
        return;
      }

      console.log('Login exitoso:', data);
      setMensaje({ type: 'success', text: data.message || 'Inicio de sesión exitoso.' });

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      if (data.user) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
      }

      onLogin(); 
      navigate('/dashboard'); 

    } catch (error) {
      console.error('Error de red o del servidor:', error);
      setMensaje({ type: 'error', text: `Error de conexión: ${error.message}. Asegúrate de que el backend esté corriendo y sea accesible.` });
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-end items-center relative p-4" // <-- Añadido bg-no-repeat
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* Overlay para oscurecer la imagen y mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenido del formulario centrado y sobre el overlay */}
      <div className="relative z-10 w-full max-w-sm p-6 bg-white bg-opacity-90 rounded-lg shadow-xl text-center mb-16">
        <HeaderPagina titulo="Iniciar Sesión" subtitulo="Ingresa a tu cuenta TurboParking" className="mb-6" />
        
        {/* Mensajes de retroalimentación */}
        {mensaje && (
          <div className={`alert ${mensaje.type === 'success' ? 'alert-success' : 'alert-error'} mb-4 text-center`}>
            <span>{mensaje.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <BotonPrimario texto="Ingresar" type="submit" className="w-full" />
        </form>
        <div className="mt-4 text-sm text-gray-600">
          ¿No tienes una cuenta? <Link to="/registrarse" className="text-blue-600 hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;