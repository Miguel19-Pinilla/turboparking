// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importa el controlador de autenticación

// Ruta para el inicio de sesión
router.post('/login', authController.login);

// Puedes añadir rutas para registrar si quieres que el registro también use este módulo de auth
// router.post('/register', authController.register); 

module.exports = router;