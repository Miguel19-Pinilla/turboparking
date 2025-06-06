// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Solo importa Router
import AuthManager from './components/AuthManager'; // Importa el nuevo componente AuthManager

function App() {
  return (
    <Router>
      <AuthManager /> {/* Renderiza AuthManager dentro del Router */}
    </Router>
  );
}

export default App;
