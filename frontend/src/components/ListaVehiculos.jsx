// src/components/ListaVehiculos.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPagina from './HeaderPagina';

const ListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vehiculoToDelete, setVehiculoToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const fetchVehiculos = async () => {
    try {
      setLoading(true);
      // Usar localhost directamente ya que estás probando en el mismo PC
      console.log("ListaVehiculos: Cargando vehículos desde:", `http://localhost:5000/api/vehiculos`);
      const response = await fetch(`http://localhost:5000/api/vehiculos`); // <-- ¡Usar localhost!
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVehiculos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error al cargar vehículos:", err);
      setAlertMessage({ type: 'error', text: `Error al cargar vehículos: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const handleDeleteClick = (id) => {
    setVehiculoToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    if (!vehiculoToDelete) return;

    try {
      // Usar localhost directamente ya que estás probando en el mismo PC
      console.log("ListaVehiculos: Eliminando vehículo:", `http://localhost:5000/api/vehiculo/${vehiculoToDelete}`);
      const response = await fetch(`http://localhost:5000/api/vehiculo/${vehiculoToDelete}`, { // <-- ¡Usar localhost!
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setAlertMessage({ type: 'success', text: 'Vehículo eliminado exitosamente.' });
      fetchVehiculos();
    } catch (err) {
      console.error("Error al eliminar vehículo:", err);
      setAlertMessage({ type: 'error', text: `Error al eliminar el vehículo: ${err.message}` });
    } finally {
      setVehiculoToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setVehiculoToDelete(null);
  };

  const handleEdit = (id) => {
    navigate(`/vehiculo/editar/${id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <HeaderPagina titulo="Cargando Vehículos..." />
        <span className="loading loading-spinner loading-lg mt-4"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <HeaderPagina titulo="Error al Cargar Vehículos" />
        <p className="mt-4">Hubo un error: {error}</p>
        <p>Asegúrate de que el backend esté corriendo en http://localhost:5000</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <HeaderPagina titulo="Listado de Vehículos Registrados" />

      {alertMessage && (
        <div className={`alert ${alertMessage.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg mb-4`}>
          <div>
            <span>{alertMessage.text}</span>
          </div>
          <button className="btn btn-sm btn-ghost" onClick={() => setAlertMessage(null)}>✕</button>
        </div>
      )}

      {vehiculos.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">No hay vehículos registrados todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {vehiculos.map((vehiculo) => (
            <div key={vehiculo.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Placa: {vehiculo.placa}</h3>
              <p className="text-gray-700 text-sm mb-1">Marca: <span className="font-medium">{vehiculo.marca}</span></p>
              <p className="text-gray-700 text-sm mb-1">Color: <span className="font-medium">{vehiculo.color}</span></p>
              <p className="text-gray-500 text-xs mb-4">Registrado el: {new Date(vehiculo.fecha_registro).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-info btn-sm flex-grow"
                  onClick={() => handleEdit(vehiculo.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-error btn-sm flex-grow"
                  onClick={() => handleDeleteClick(vehiculo.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="font-bold text-lg">Confirmar Eliminación</h3>
            <p className="py-4">¿Estás seguro de que quieres eliminar este vehículo?</p>
            <div className="modal-action flex justify-center gap-4">
              <button className="btn btn-error" onClick={handleConfirmDelete}>Eliminar</button>
              <button className="btn btn-neutral" onClick={handleCancelDelete}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaVehiculos;