// C:\Users\Miguel\turboparking\backend\routes\perfilRoutes.js
const express = require('express');
const router = express.Router(); // Usamos el Router de Express
const perfilController = require('../controllers/perfilController'); // Importa el controlador

// Rutas para perfiles (ahora con los segmentos de ruta completos)
router.get('/perfiles', perfilController.getAllPerfiles);     // GET /api/perfiles (para obtener todos)
router.get('/perfil/:id', perfilController.getPerfilById);    // GET /api/perfil/:id (para obtener uno por ID)
router.post('/perfil', perfilController.createPerfil);        // POST /api/perfil (para crear uno nuevo)
router.put('/perfil/:id', perfilController.updatePerfil);     // PUT /api/perfil/:id (para actualizar uno por ID)
router.delete('/perfil/:id', perfilController.deletePerfil);  // DELETE /api/perfil/:id (para eliminar uno por ID)

module.exports = router; // Exporta el router