// backend/controllers/authController.js
const pool = require('../config/db');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    exports.login = async (req, res) => {
        const { correo, contrasena } = req.body; // <-- BREAKPOINT 1: Aquí veremos la contraseña que llega del frontend
        console.log(`Backend: Petición de login recibida para correo: ${correo}`);
        console.log(`Backend: Contraseña recibida (SOLO PARA DEPURACIÓN): ${contrasena.replace(/./g, '*')}`); // Oculta la contraseña en logs

        try {
            // Buscar el usuario por correo
            const userResult = await pool.query('SELECT id, nombre, correo, contrasena, rol_id FROM usuarios WHERE correo = $1', [correo]);

            if (userResult.rowCount === 0) {
                console.log(`Backend: Usuario no encontrado con correo: ${correo}`);
                return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
            }

            const user = userResult.rows[0];
            console.log(`Backend: Usuario encontrado : ${user.correo} ID : ${user.id} Rol_ID : ${user.rol_id}`);
            console.log(`Backend: Comparando contraseñas para usuario : ${user.correo}`);

            // Comparar la contraseña proporcionada con el hash almacenado
            const isMatch = await bcrypt.compare(contrasena, user.contrasena); // <-- BREAKPOINT 2: Aquí se hace la comparación
                                                                              // Después de esta línea, inspecciona 'isMatch'

            if (!isMatch) { // <-- BREAKPOINT 3: Si llega aquí, es que isMatch es false
                console.log(`Backend: Contraseña incorrecta para usuario : ${user.correo}`);
                return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
            }

            // Si las credenciales son correctas, generar un token JWT
            console.log('Backend: Credenciales correctas. Generando JWT...');
            const token = jwt.sign(
                { id: user.id, rol_id: user.rol_id },
                process.env.JWT_SECRET, // Asegúrate de que JWT_SECRET esté en tu .env
                { expiresIn: '1h' } // Token expira en 1 hora
            );

            console.log('Backend: Login exitoso. Enviando respuesta.');
            res.status(200).json({ message: 'Inicio de sesión exitoso', token, user: { id: user.id, nombre: user.nombre, correo: user.correo, rol_id: user.rol_id } });

        } catch (error) {
            console.error('Backend: Error en el proceso de login:', error);
            res.status(500).json({ message: 'Error del servidor al intentar iniciar sesión.' });
        }
    };
