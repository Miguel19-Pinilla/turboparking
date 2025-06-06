// C:\Users\Miguel\turboparking\backend\routes\vehiculoRoutes.js
const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

// Rutas para vehículos
router.get('/vehiculos', vehiculoController.getAllVehiculos);      // GET /api/vehiculos (para obtener todos)
router.get('/vehiculo/:id', vehiculoController.getVehiculoById);   // GET /api/vehiculo/:id (para obtener uno por ID)
router.post('/vehiculo', vehiculoController.createVehiculo);       // POST /api/vehiculo (para crear uno nuevo)
router.put('/vehiculo/:id', vehiculoController.updateVehiculo);    // PUT /api/vehiculo/:id (para actualizar uno por ID)
router.delete('/vehiculo/:id', vehiculoController.deleteVehiculo); // DELETE /api/vehiculo/:id (para eliminar uno por ID)

module.exports = router;