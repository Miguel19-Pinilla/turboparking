// src/components/FormularioPerfil.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FormularioPerfil = () => {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState(''); // Manejo de contraseña para edición
  const [confirmContrasena, setConfirmContrasena] = useState(''); // Para confirmar nueva contraseña
  const [mensaje, setMensaje] = useState(null); // Para mostrar mensajes al usuario (éxito/error)
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando
  const [loadingPerfil, setLoadingPerfil] = useState(true); // Para el loading inicial del perfil

  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL (si existe)
  const navigate = useNavigate(); // Para redirigir después de guardar

  // useEffect para cargar los datos del perfil si estamos en modo edición
  useEffect(() => {
    if (id) {
      setIsEditing(true); // Estamos en modo edición
      const fetchPerfil = async () => {
        try {
          setLoadingPerfil(true);
          console.log(`FormularioPerfil: Cargando perfil desde http://10.0.2.2:5000/api/perfil/${id}`); // Log de depuración
          const response = await fetch(`http://10.0.2.2:5000/api/perfil/${id}`); // <-- CORREGIDO: localhost a 10.0.2.2
          if (!response.ok) {
            // Intenta leer el error del backend si es JSON
            let errorText = `Error HTTP: ${response.status}`;
            try {
                const errorData = await response.json();
                errorText = errorData.message || errorText;
            } catch (jsonError) {
                // Si no es JSON, usa el estado HTTP
                console.error("FormularioPerfil: Error al parsear JSON en carga de perfil:", jsonError);
            }
            throw new Error(errorText);
          }
          const data = await response.json();
          setNombre(data.nombre);
          setCorreo(data.correo);
          setLoadingPerfil(false);
        } catch (error) {
          console.error("FormularioPerfil: Error al cargar perfil para edición:", error);
          setMensaje({ type: 'error', text: `Error al cargar perfil: ${error.message}` });
          setLoadingPerfil(false);
        }
      };
      fetchPerfil();
    } else {
      setIsEditing(false);
      setLoadingPerfil(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null); // Limpiar mensajes anteriores

    if (!nombre || !correo) {
      setMensaje({ type: 'error', text: 'Por favor, completa todos los campos obligatorios (Nombre, Correo).' });
      return;
    }

    if (isEditing) {
      // Lógica para ACTUALIZAR un perfil (PUT)
      if (contrasena && contrasena !== confirmContrasena) {
        setMensaje({ type: 'error', text: 'La contraseña y su confirmación no coinciden.' });
        return;
      }

      const perfilActualizado = {
        nombre,
        correo,
        ...(contrasena && { contrasena }) // Solo envía la contraseña si se ha ingresado
      };

      try {
        console.log(`FormularioPerfil: Actualizando perfil a http://10.0.2.2:5000/api/perfil/${id}`); // Log de depuración
        const response = await fetch(`http://10.0.2.2:5000/api/perfil/${id}`, { // <-- CORREGIDO: localhost a 10.0.2.2
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(perfilActualizado),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        setMensaje({ type: 'success', text: result.message || 'Perfil actualizado exitosamente.' });
        setTimeout(() => {
          navigate('/lista-perfiles');
        }, 2000);

      } catch (error) {
        console.error("FormularioPerfil: Error al actualizar perfil:", error);
        setMensaje({ type: 'error', text: `Error al actualizar perfil: ${error.message}` });
      }
    } else {
      // Lógica para CREAR un perfil (POST)
      if (!contrasena || contrasena !== confirmContrasena) {
        setMensaje({ type: 'error', text: 'Por favor, ingresa y confirma la contraseña.' });
        return;
      }
      if (contrasena.length < 6) { // Ejemplo de validación mínima de contraseña
        setMensaje({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
        return;
      }

      const nuevoPerfil = {
        nombre,
        correo,
        contrasena,
      };

      try {
        console.log('FormularioPerfil: Creando perfil en http://10.0.2.2:5000/api/perfil'); // Log de depuración
        const response = await fetch('http://10.0.2.2:5000/api/perfil', { // <-- CORREGIDO: localhost a 10.0.2.2
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoPerfil),
        });

        if (!response.ok) {
          // Intentar leer el mensaje de error del backend si es un JSON
          let errorText = `Error HTTP: ${response.status}`;
          try {
            const errorData = await response.json();
            errorText = errorData.message || errorText;
          } catch (jsonError) {
            console.error("FormularioPerfil: Error al parsear respuesta JSON de backend:", jsonError);
          }
          throw new Error(errorText); // Lanzar el error para que sea capturado por el catch
        }

        const result = await response.json();
        setMensaje({ type: 'success', text: result.message || 'Perfil creado exitosamente.' });
        setNombre('');
        setCorreo('');
        setContrasena('');
        setConfirmContrasena('');
        setTimeout(() => {
          navigate('/lista-perfiles');
        }, 2000);

      } catch (error) {
        console.error("FormularioPerfil: Error al crear perfil:", error);
        setMensaje({ type: 'error', text: `Error al crear perfil: ${error.message}` });
      }
    }
  };

  if (loadingPerfil) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Cargando datos del perfil...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mensajes de éxito o error */}
      {mensaje && (
        <div className={`alert ${mensaje.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg`}>
          <div>
            <span>{mensaje.text}</span>
          </div>
        </div>
      )}

      {/* Campo Nombre */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nombre:</span>
        </label>
        <input
          type="text"
          placeholder="Nombre completo"
          className="input input-bordered w-full"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      {/* Campo Correo */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Correo Electrónico:</span>
        </label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="input input-bordered w-full"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>

      {/* Campos de Contraseña (condicionales para edición) */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">{isEditing ? 'Nueva Contraseña (opcional):' : 'Contraseña:'}</span>
        </label>
        <input
          type="password"
          placeholder={isEditing ? "Dejar en blanco para no cambiar" : "Contraseña"}
          className="input input-bordered w-full"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          // En modo creación, la contraseña es requerida
          required={!isEditing}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">{isEditing ? 'Confirmar Nueva Contraseña:' : 'Confirmar Contraseña:'}</span>
        </label>
        <input
          type="password"
          placeholder={isEditing ? "Confirmar nueva contraseña" : "Confirmar contraseña"}
          className="input input-bordered w-full"
          value={confirmContrasena}
          onChange={(e) => setConfirmContrasena(e.target.value)}
          // En modo creación, la confirmación de contraseña es requerida
          required={!isEditing}
        />
      </div>

      {/* Botón de envío */}
      <button type="submit" className="btn btn-primary w-full">
        {isEditing ? 'Actualizar Perfil' : 'Registrar Perfil'}
      </button>
    </form>
  );
};

export default FormularioPerfil;