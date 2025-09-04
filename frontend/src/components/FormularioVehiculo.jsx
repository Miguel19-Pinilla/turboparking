// src/components/FormularioVehiculo.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate

const FormularioVehiculo = () => {
  // Estado para los campos del formulario
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [mensaje, setMensaje] = useState(null); // Para mostrar mensajes al usuario (éxito/error)
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando
  const [loadingVehiculo, setLoadingVehiculo] = useState(true); // Para el loading inicial del vehículo

  const { id } = useParams(); // Obtiene el ID de los parámetros de la URL (si existe)
  const navigate = useNavigate(); // Para redirigir después de guardar

  // useEffect para cargar los datos del vehículo si estamos en modo edición
  useEffect(() => {
    if (id) {
      setIsEditing(true); // Estamos en modo edición
      const fetchVehiculo = async () => {
        try {
          setLoadingVehiculo(true);
          // Usar localhost directamente ya que estás probando en el mismo PC
          console.log(`FormularioVehiculo: Cargando vehículo desde http://localhost:5000/api/vehiculo/${id}`);
          const response = await fetch(`http://localhost:5000/api/vehiculo/${id}`); // <-- CORREGIDO: Usar localhost
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
          const data = await response.json();
          // Precargar los campos del formulario con los datos del vehículo
          setPlaca(data.placa);
          setMarca(data.marca);
          setColor(data.color);
          setLoadingVehiculo(false);
        } catch (error) {
          console.error("Error al cargar vehículo para edición:", error);
          setMensaje({ type: 'error', text: `Error al cargar vehículo: ${error.message}` });
          setLoadingVehiculo(false);
        }
      };
      fetchVehiculo();
    } else {
      // Si no hay ID en la URL, estamos en modo creación
      setIsEditing(false);
      setLoadingVehiculo(false); // No necesitamos cargar un vehículo existente
    }
  }, [id]); // Se ejecuta cada vez que el ID de la URL cambia

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Validaciones básicas
    if (!placa || !marca || !color) {
      setMensaje({ type: 'error', text: 'Por favor, completa todos los campos obligatorios.' });
      return;
    }

    if (isEditing) {
      // Lógica para ACTUALIZAR un vehículo (PUT)
      const vehiculoActualizado = {
        placa,
        marca,
        color,
      };

      try {
        // Usar localhost directamente ya que estás probando en el mismo PC
        console.log(`FormularioVehiculo: Actualizando vehículo a http://localhost:5000/api/vehiculo/${id}`);
        const response = await fetch(`http://localhost:5000/api/vehiculo/${id}`, { // <-- CORREGIDO: Usar localhost
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vehiculoActualizado),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        setMensaje({ type: 'success', text: result.message || 'Vehículo actualizado exitosamente.' });
        setTimeout(() => {
          navigate('/lista-vehiculos'); // Redirige a la lista de vehículos después de 2 segundos
        }, 2000);

      } catch (error) {
        console.error("Error al actualizar vehículo:", error);
        setMensaje({ type: 'error', text: `Error al actualizar vehículo: ${error.message}` });
      }
    } else {
      // Lógica para CREAR un vehículo (POST)
      const nuevoVehiculo = {
        placa,
        marca,
        color,
      };

      try {
        // Usar localhost directamente ya que estás probando en el mismo PC
        console.log('FormularioVehiculo: Creando vehículo en http://localhost:5000/api/vehiculo');
        const response = await fetch('http://localhost:5000/api/vehiculo', { // <-- CORREGIDO: Usar localhost
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoVehiculo),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error HTTP: ${response.status}`);
        }

        const result = await response.json();
        setMensaje({ type: 'success', text: result.message || 'Vehículo creado exitosamente.' });
        // Limpiar formulario después de la creación exitosa
        setPlaca('');
        setMarca('');
        setColor('');
        setTimeout(() => {
          navigate('/lista-vehiculos'); // Redirige a la lista de vehículos después de 2 segundos
        }, 2000);

      } catch (error) {
        console.error("Error al crear vehículo:", error);
        setMensaje({ type: 'error', text: `Error al crear vehículo: ${error.message}` });
      }
    }
  };

  if (loadingVehiculo) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-2">Cargando datos del vehículo...</p>
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

      {/* Campo Placa */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Placa:</span>
        </label>
        <input
          type="text"
          placeholder="Ej: ABC123"
          className="input input-bordered w-full"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          required
        />
      </div>

      {/* Campo Marca */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Marca:</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Chevrolet"
          className="input input-bordered w-full"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          required
        />
      </div>

      {/* Campo Color */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Color:</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Rojo"
          className="input input-bordered w-full"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </div>

      {/* Botón de envío */}
      <button type="submit" className="btn btn-primary w-full">
        {isEditing ? 'Actualizar Vehículo' : 'Registrar Vehículo'}
      </button>
    </form>
  );
};

export default FormularioVehiculo;