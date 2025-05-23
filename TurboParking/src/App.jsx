// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio';
import iniciarsesion from './pages/iniciarsesion';
import registrarse from './pages/registrarse';
import miperfil from './pages/miperfil';
import misvehiculos from './pages/misvehiculos';
import seleccionreserva from './pages/seleccionreserva';
import ubicacionreserva from './pages/ubicacionreserva';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/iniciarsesion" element={<iniciarsesion />} />
        <Route path="/registrarse" element={<registrarse />} />
        <Route path="/miperfil" element={<miperfil />} />
        <Route path="/misvehiculos" element={<misvehiculos />} />
        <Route path="/seleccionreserva" element={<seleccionreserva />} />
        <Route path="/ubicacionreserva" element={<ubicacionreserva />} />
      </Routes>
    </Router>
  );
}

export default App;