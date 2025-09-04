// frontend/src/components/AuthManager.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Importaciones de tus componentes - ¡RUTAS DE ARCHIVO AJUSTADAS SEGÚN TUS NOMBRES DE ARCHIVO!
import NavbarPublic from './NavbarPublic';           // Barra de navegación para no autenticados
import NavbarAuthenticated from './NavbarAuthenticated'; // Barra de navegación para autenticados

// Otros componentes - Solo importa los que se usan directamente en el JSX de AuthManager
import HeaderPagina from './HeaderPagina';
import Dashboard from './Dashboard';             // Componente para la página principal de usuarios logueados
import Footer from './footer';                   // Asumiendo nombre de archivo: footer.jsx

// Importaciones de tus páginas de Login y Registro - ¡CAPITALIZACIÓN DE RUTA CORREGIDA!
import Login from '../pages/login';          // Asumiendo nombre de archivo: login.jsx
import Registrarse from '../pages/registrarse'; // Asumiendo nombre de archivo: registrarse.jsx
import MisVehiculos from '../pages/MisVehiculos'; // Importa el componente MisVehiculos (nombre corregido)

// Importaciones de componentes que se usan DENTRO de las rutas (no directamente en AuthManager's JSX)
// Estos se importan aquí para que estén disponibles para las rutas, pero no se usan en el JSX de AuthManager directamente.
import BotonPrimario from './botonprimario';
import BotonSecundario from './botonsecundario';
import TarjetaParqueadero from './TarjetaParqueadero';
import BarraPerfil from './BarraPerfil';
import FormularioPerfil from './FormularioPerfil';
import FormularioVehiculo from './FormularioVehiculo';
import ListaPerfiles from './ListaPerfiles';
import ListaVehiculos from './ListaVehiculos';


// Componente auxiliar para rutas protegidas
// Este componente decide si renderizar el contenido de la ruta o redirigir al login
const PrivateRoute = ({ children, isAuthenticated }) => {
  const navigate = useNavigate(); // Aquí useNavigate está dentro de un componente hijo de Router

  useEffect(() => {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    if (!isAuthenticated) {
      navigate('/iniciarsesion');
    }
  }, [isAuthenticated, navigate]); // Dependencias: se ejecuta cuando isAuthenticated o navigate cambian

  // Si está autenticado, renderiza los componentes hijos; de lo contrario, no renderiza nada (la redirección ya se encargó)
  return isAuthenticated ? children : null;
};


const AuthManager = () => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Ahora este hook se llama dentro de AuthManager, que será hijo de Router

  // Función para manejar el inicio de sesión exitoso
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/dashboard'); // Redirige al dashboard después del login exitoso
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem('currentUser'); // Elimina cualquier información del usuario si la guardaste
    navigate('/iniciarsesion'); // Redirige al usuario a la página de inicio de sesión
  };

  // Efecto para verificar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Intenta obtener el token del almacenamiento local
    if (token) {
      // Si se encuentra un token, se asume que el usuario está autenticado.
      // En una aplicación real, aquí podrías validar el token con el backend para mayor seguridad.
      setIsAuthenticated(true);
    }
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Renderiza el Navbar condicionalmente según el estado de autenticación */}
      {isAuthenticated ? <NavbarAuthenticated onLogout={handleLogout} /> : <NavbarPublic />}
      
      <main className="flex-grow p-4">
        <Routes>
          {/* Ruta principal pública (accesible sin autenticación) */}
          <Route path="/" element={
            <div className="flex flex-col items-center justify-center py-8">
              <HeaderPagina
                titulo="¡Bienvenido a TurboParking!"
                subtitulo="Tu solución rápida y sencilla para encontrar y gestionar parqueo en Bogotá."
              />
              <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full mt-8">
                <h1 className="text-2xl font-extrabold text-indigo-700 mb-4">
                  Explora y Reserva tu Espacio Ideal
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Encuentra parqueaderos disponibles cerca de ti.
                </p>
                <div className="space-y-4">
                  <BotonPrimario texto="Buscar Parqueaderos" onClick={() => console.log('Buscar Parqueaderos')} />
                  <BotonSecundario texto="Mis Reservas" onClick={() => console.log('Ver Mis Reservas')} />
                </div>
                <div className="mt-12">
                  <HeaderPagina
                    titulo="Parqueaderos Destacados"
                    subtitulo="Algunas opciones populares para ti."
                  />
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <TarjetaParqueadero
                      nombre="Parqueadero El Dorado"
                      direccion="Calle 26 # 68-50"
                      precio={2800}
                      disponible={true}
                    />
                    <TarjetaParqueadero
                      nombre="Parking Centro Internacional"
                      direccion="Carrera 7 # 32-15"
                      precio={3200}
                      disponible={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          } />

          {/* Rutas de autenticación - Pasa la función handleLogin al componente Login */}
          <Route path="/iniciarsesion" element={<Login onLogin={handleLogin} />} />
          {/* El componente Registrarse no necesita onLogin si solo redirige al login después de registrarse */}
          <Route path="/registrarse" element={<Registrarse />} />

          {/* Rutas Protegidas (solo accesibles si isAuthenticated es true) */}
          {/* Estas rutas usan el componente PrivateRoute para aplicar la lógica de protección */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <div className="flex flex-col items-center justify-center py-8">
                  <BarraPerfil />
                  <HeaderPagina titulo="Gestión de Perfil" subtitulo="Actualiza tu información personal." />
                  <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8">
                    <FormularioPerfil />
                  </div>
                </div>
              </PrivateRoute>
            } 
          />
          {/* RUTA DE VEHÍCULOS: Ahora usa el componente MisVehiculos que contiene tanto el formulario como la lista */}
           <Route
            path="/vehiculos" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
               <MisVehiculos /> 
              </PrivateRoute>
            } 
          />

          {/* Rutas para edición de perfil y vehículo (también protegidas) */}
          <Route 
            path="/perfil/editar/:id" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <div className="flex flex-col items-center justify-center py-8">
                  <BarraPerfil />
                  <HeaderPagina titulo="Editar Perfil" subtitulo="Modifica la información de este perfil." />
                  <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8">
                    <FormularioPerfil />
                  </div>
                </div>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/vehiculo/editar/:id" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <div className="flex flex-col items-center justify-center py-8">
                  <HeaderPagina titulo="Editar Vehículo" subtitulo="Modifica los detalles de este vehículo." />
                  <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8">
                    <FormularioVehiculo />
                  </div>
                </div>
              </PrivateRoute>
            } 
          />
         
          {/* Rutas para listas (también protegidas) */}
          <Route path="/lista-perfiles" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ListaPerfiles />
            </PrivateRoute>
          } />
          <Route path="/lista-vehiculos" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ListaVehiculos />
            </PrivateRoute>
          } />

          {/* Ruta comodín para manejar rutas no definidas o acceso no autorizado */}
          {/* Si el usuario está autenticado, lo redirige al dashboard; de lo contrario, al login. */}
          <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AuthManager;