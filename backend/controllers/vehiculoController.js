// C:\Users\Miguel\turboparking\backend\controllers\vehiculoController.js
const pool = require('../config/db'); // Importa el pool de conexión

// Obtener todos los vehículos
exports.getAllVehiculos = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, placa, marca, color, fecha_registro FROM vehiculos ORDER BY id ASC');
    console.log('Vehículos obtenidos de la DB:', result.rows.length);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener vehículos de la base de datos:', err.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener vehículos.' });
  }
};

// Obtener un vehículo por su ID
exports.getVehiculoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, placa, marca, color, fecha_registro FROM vehiculos WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Vehículo no encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(`Error al obtener el vehículo con ID ${id} de la base de datos:`, err.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener el vehículo.' });
  }
};

// Crear un nuevo vehículo
exports.createVehiculo = async (req, res) => {
  const { placa, marca, color } = req.body;
  if (!placa || !marca || !color) {
    return res.status(400).json({ message: 'Todos los campos de vehículo son obligatorios.' });
  }
  try {
    const query = 'INSERT INTO vehiculos (placa, marca, color) VALUES ($1, $2, $3) RETURNING id, placa, marca, color, fecha_registro';
    const values = [placa, marca, color];
    const result = await pool.query(query, values);
    console.log('Vehículo guardado en DB:', result.rows[0]);
    res.status(201).json({
      message: 'Vehículo guardado exitosamente en la base de datos!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error al guardar el vehículo en la base de datos:', err.message);
    // Manejar error de duplicado de placa si tu BD tiene una restricción UNIQUE en 'placa'
    if (err.code === '23505' && err.constraint === 'vehiculos_placa_key') { // 'vehiculos_placa_key' es un nombre de ejemplo
        return res.status(409).json({ message: 'La placa ya está registrada.' });
    }
    res.status(500).json({ message: 'Error interno del servidor al guardar el vehículo.' });
  }
};

// Actualizar un vehículo
exports.updateVehiculo = async (req, res) => {
  const { id } = req.params;
  const { placa, marca, color } = req.body;
  try {
    const result = await pool.query(
      'UPDATE vehiculos SET placa = $1, marca = $2, color = $3 WHERE id = $4 RETURNING *',
      [placa, marca, color, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Vehículo no encontrado para actualizar.' });
    }
    console.log('Vehículo actualizado en la DB:', result.rows[0]);
    res.status(200).json({
      message: 'Vehículo actualizado exitosamente!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(`Error al actualizar el vehículo con ID ${id} en la base de datos:`, err.message);
    // Manejar error de duplicado de placa
    if (err.code === '23505' && err.constraint === 'vehiculos_placa_key') {
        return res.status(409).json({ message: 'La placa ya está registrada con otro vehículo.' });
    }
    res.status(500).json({ message: 'Error interno del servidor al actualizar el vehículo.' });
  }
};

// Eliminar un vehículo
exports.deleteVehiculo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM vehiculos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Vehículo no encontrado.' });
    }
    console.log('Vehículo eliminado de la DB:', result.rows[0]);
    res.status(200).json({
      message: 'Vehículo eliminado exitosamente de la base de datos!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(`Error al eliminar el vehículo con ID ${id} de la base de datos:`, err.message);
    res.status(500).json({ message: 'Error interno del servidor al eliminar el vehículo.' });
  }
};