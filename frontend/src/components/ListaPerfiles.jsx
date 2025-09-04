// src/components/ListaPerfiles.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPagina from './HeaderPagina';

const ListaPerfiles = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- NUEVOS ESTADOS PARA EL MODAL DE CONFIRMACIÓN Y MENSAJES ---
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [perfilToDelete, setPerfilToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // { type: 'success' | 'error', text: 'Mensaje' }
  // --- FIN NUEVOS ESTADOS ---

  // Función para cargar perfiles (la movemos fuera para reutilizarla)
  const fetchPerfiles = async () => {
    try {
      setLoading(true); // Mostrar cargando al recargar también
      // *** IMPORTANTE: Usar la URL de ngrok aquí también ***
      const ngrokUrl = ' https://68a8-200-118-62-21.ngrok-free.app'; // <-- ¡Pega aquí tu URL HTTPS de ngrok!
      console.log("ListaPerfiles: Cargando perfiles desde:", `${ngrokUrl}/api/perfiles`);
      const response = await fetch(`${ngrokUrl}/api/perfiles`); // <-- CORREGIDO: localhost a ngrokUrl
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPerfiles(data);
      setError(null); // Limpiar errores anteriores
    } catch (err) {
      setError(err.message);
      console.error("Error al cargar perfiles:", err);
      setAlertMessage({ type: 'error', text: `Error al cargar perfiles: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfiles();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para manejar la eliminación de un perfil (muestra el modal)
  const handleDeleteClick = (id) => {
    setPerfilToDelete(id);
    setShowConfirmModal(true);
  };

  // Función que se ejecuta cuando se confirma la eliminación en el modal
  const handleConfirmDelete = async () => {
    setShowConfirmModal(false); // Cierra el modal
    if (!perfilToDelete) return; // Si no hay perfil para eliminar, sale

    try {
      // *** IMPORTANTE: Usar la URL de ngrok aquí también ***
      const ngrokUrl = 'https://TU_URL_DE_NGROK_AQUI.ngrok.io'; // <-- ¡Pega aquí tu URL HTTPS de ngrok!
      console.log("ListaPerfiles: Eliminando perfil:", `${ngrokUrl}/api/perfil/${perfilToDelete}`);
      const response = await fetch(`${ngrokUrl}/api/perfil/${perfilToDelete}`, { // <-- CORREGIDO: localhost a ngrokUrl
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setAlertMessage({ type: 'success', text: 'Perfil eliminado exitosamente.' }); // Notificación de éxito
      fetchPerfiles(); // Recargar la lista para que el eliminado desaparezca
    } catch (err) {
      console.error("Error al eliminar perfil:", err);
      setAlertMessage({ type: 'error', text: `Error al eliminar el perfil: ${err.message}` });
    } finally {
      setPerfilToDelete(null); // Limpia el ID del perfil a eliminar
    }
  };

  // Función para cancelar la eliminación en el modal
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setPerfilToDelete(null);
  };

  // NUEVA FUNCIÓN: Para manejar la edición de un perfil
  const handleEdit = (id) => {
    navigate(`/perfil/editar/${id}`); // Redirige a la nueva ruta de edición con el ID
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <HeaderPagina titulo="Cargando Perfiles..." />
        <span className="loading loading-spinner loading-lg mt-4"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <HeaderPagina titulo="Error al Cargar Perfiles" />
        <p className="mt-4">Hubo un error: {error}</p>
        <p>Asegúrate de que el backend esté corriendo en http://0.0.0.0:5000 y ngrok esté activo.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <HeaderPagina titulo="Listado de Perfiles Registrados" />

      {/* Mensaje de alerta */}
      {alertMessage && (
        <div className={`alert ${alertMessage.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg mb-4`}>
          <div>
            <span>{alertMessage.text}</span>
          </div>
          <button className="btn btn-sm btn-ghost" onClick={() => setAlertMessage(null)}>✕</button>
        </div>
      )}

      {perfiles.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">No hay perfiles registrados todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {perfiles.map((perfil) => (
            <div key={perfil.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{perfil.nombre}</h3>
              <p className="text-gray-700 text-sm mb-1">Correo: <span className="font-medium">{perfil.correo}</span></p>
              <p className="text-gray-500 text-xs mb-4">Registrado el: {new Date(perfil.fecha_registro).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-info btn-sm flex-grow"
                  onClick={() => handleEdit(perfil.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-error btn-sm flex-grow"
                  onClick={() => handleDeleteClick(perfil.id)} // Llama a la nueva función
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="font-bold text-lg">Confirmar Eliminación</h3>
            <p className="py-4">¿Estás seguro de que quieres eliminar este perfil?</p>
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

export default ListaPerfiles;