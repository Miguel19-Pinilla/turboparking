// C:\Users\Miguel\turboparking\backend\controllers\perfilController.js
const pool = require('../config/db'); // Importa el pool de conexión
const bcrypt = require('bcrypt');     // Importa bcrypt para hashear contraseñas

// Obtener todos los perfiles
exports.getAllPerfiles = async (req, res) => {
  try {
    // CORRECCIÓN: Usar 'id' y 'rol_id' según la tabla de la BD
    const result = await pool.query('SELECT id, nombre, correo, fecha_registro, rol_id FROM usuarios ORDER BY id ASC');
    console.log('Perfiles obtenidos de la DB:', result.rows.length);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener perfiles de la base de datos:', err.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener perfiles.' });
  }
};

// Obtener un perfil por su ID
exports.getPerfilById = async (req, res) => {
  const { id } = req.params; // 'id' viene de la URL
  try {
    // CORRECCIÓN: Usar 'id' y 'rol_id' según la tabla de la BD
    const result = await pool.query('SELECT id, nombre, correo, fecha_registro, rol_id FROM usuarios WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(`Error al obtener el perfil con ID ${id} de la base de datos:`, err.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener el perfil.' });
  }
};

// Crear un nuevo perfil
exports.createPerfil = async (req, res) => {
  const { nombre, correo, contrasena, documento_identidad, telefono, apodo, rol_id } = req.body; 

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ message: 'Los campos nombre, correo y contraseña son obligatorios.' });
  }

  try {
    const existingUser = await pool.query('SELECT id FROM usuarios WHERE correo = $1', [correo]);
    if (existingUser.rowCount > 0) {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }

    // *** MODIFICACIÓN CLAVE AQUÍ: Hashear la contraseña antes de guardarla ***
    const saltRounds = 10; // Número de rondas de salting. 10 es un buen valor por defecto.
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds); 

    // CORRECCIÓN: Usar 'rol_id' y asegurar que todos los campos de la tabla 'usuarios' sean insertados.
    // También, se asume que la columna de contraseña en la DB se llama 'contrasena' y no 'contrasena_hash'.
    const query = 'INSERT INTO usuarios (nombre, correo, contrasena, documento_identidad, telefono, apodo, rol_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, nombre, correo, fecha_registro, rol_id';
    const values = [
      nombre,
      correo,
      hashedPassword, // <-- Usa la contraseña hasheada
      documento_identidad || null, 
      telefono || null,         
      apodo || null,            
      rol_id || 1               // Asigna un rol por defecto (ej. 1 para 'cliente')
    ];
    
    const result = await pool.query(query, values);
    console.log('Perfil guardado en DB:', result.rows[0]);
    res.status(201).json({
      message: 'Perfil guardado exitosamente en la base de datos!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error al guardar el perfil en la base de datos:', err.message);
    if (err.code === '23505' && err.constraint === 'usuarios_correo_key') { 
      return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }
    res.status(500).json({ message: 'Error interno del servidor al guardar el perfil.' });
  }
};

// Actualizar un perfil
exports.updatePerfil = async (req, res) => {
  const { id } = req.params; 
  const { nombre, correo, contrasena, documento_identidad, telefono, apodo, rol_id } = req.body; 

  try {
    const updates = [];
    const updateValues = [];
    let paramIndex = 1;

    if (nombre !== undefined) {
      updates.push(`nombre = $${paramIndex++}`);
      updateValues.push(nombre);
    }
    if (correo !== undefined) {
      updates.push(`correo = $${paramIndex++}`);
      updateValues.push(correo);
    }
    if (documento_identidad !== undefined) {
        updates.push(`documento_identidad = $${paramIndex++}`);
        updateValues.push(documento_identidad);
    }
    if (telefono !== undefined) {
        updates.push(`telefono = $${paramIndex++}`);
        updateValues.push(telefono);
    }
    if (apodo !== undefined) {
        updates.push(`apodo = $${paramIndex++}`);
        updateValues.push(apodo);
    }
    if (rol_id !== undefined) {
        updates.push(`rol_id = $${paramIndex++}`);
        updateValues.push(rol_id);
    }
    
    // *** MODIFICACIÓN CLAVE AQUÍ: Hashear la contraseña si se está actualizando ***
    if (contrasena) { // Solo hashear si se proporciona una nueva contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
      updates.push(`contrasena = $${paramIndex++}`); // Asume columna 'contrasena' en DB
      updateValues.push(hashedPassword); // <-- Usa la contraseña hasheada
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No hay campos para actualizar.' });
    }

    // Se mantiene 'id' como columna para la condición WHERE
    const query = `UPDATE usuarios SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, nombre, correo, fecha_registro, rol_id`;
    const values = [...updateValues, id]; 

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado para actualizar.' });
    }
    console.log('Perfil actualizado en la DB:', result.rows[0]);
    res.status(200).json({
      message: 'Perfil actualizado exitosamente!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(`Error al actualizar el perfil con ID ${id} en la base de datos:`, err.message);
    if (err.code === '23505' && err.constraint === 'usuarios_correo_key') {
        return res.status(409).json({ message: 'El correo electrónico ya está registrado con otro perfil.' });
    }
    res.status(500).json({ message: 'Error interno del servidor al actualizar el perfil.' });
  }
};

// Eliminar un perfil
exports.deletePerfil = async (req, res) => {
  const { id } = req.params; 
  try {
    // CORRECCIÓN: Usar 'id' para la eliminación
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]); 
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }
    console.log('Perfil eliminado de la DB:', result.rows[0]);
    res.status(200).json({
      message: 'Perfil eliminado exitosamente de la base de datos!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(`Error al eliminar el perfil con ID ${id} de la base de datos:`, err.message);
    res.status(500).json({ message: 'Error interno del servidor al eliminar el perfil.' });
  }
};