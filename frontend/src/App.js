import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import HeaderPagina from './components/HeaderPagina';
import BotonPrimario from './components/botonprimario';
import BotonSecundario from './components/botonsecundario';
import CampoTexto from './components/campotexto';
import TarjetaParqueadero from './components/TarjetaParqueadero';
import BarraPerfil from './components/BarraPerfil';
import FormularioPerfil from './components/FormularioPerfil';
import FormularioVehiculo from './components/FormularioVehiculo';
import Footer from './components/footer';
import TituloSeccion from './components/TituloSeccion';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center py-8">
                <TituloSeccion
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
                    <TituloSeccion
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
            <Route path="/perfil" element={
              <div className="flex flex-col items-center justify-center py-8">
                <BarraPerfil />
                <TituloSeccion titulo="Gestión de Perfil" subtitulo="Actualiza tu información personal." />
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8">
                  <FormularioPerfil />
                </div>
              </div>
            } />
            <Route path="/vehiculos" element={
              <div className="flex flex-col items-center justify-center py-8">
                 <HeaderPagina titulo="Mis Vehículos" />
                 <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8">
                  <FormularioVehiculo />
                 </div>
              </div>
            } />
            <Route path="/iniciarsesion" element={
              <div className="flex flex-col items-center justify-center py-8">
                <TituloSeccion titulo="Iniciar Sesión" subtitulo="Ingresa a tu cuenta." />
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8">
                    <form className="space-y-4">
                        <CampoTexto placeholder="Correo electrónico" tipo="email" />
                        <CampoTexto placeholder="Contraseña" tipo="password" />
                        <BotonPrimario texto="Ingresar" type="submit" />
                    </form>
                </div>
              </div>
            } />
            <Route path="/registrarse" element={
              <div className="flex flex-col items-center justify-center py-8">
                <TituloSeccion titulo="Registrarse" subtitulo="Crea una nueva cuenta." />
                 <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mt-8">
                    <form className="space-y-4">
                        <CampoTexto placeholder="Nombre completo" />
                        <CampoTexto placeholder="Correo electrónico" tipo="email" />
                        <CampoTexto placeholder="Contraseña" tipo="password" />
                        <BotonPrimario texto="Registrarme" type="submit" />
                    </form>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;