import apiClient from './api';

/**
 * Servicio de funciones (horarios de películas)
 * Maneja todas las operaciones relacionadas con funciones
 */
export const funcionesService = {
  /**
   * Obtener todas las funciones
   * @param {Object} filters - Filtros opcionales
   * @param {number} filters.pelicula_id - ID de la película
   * @param {string} filters.fecha - Fecha de la función (YYYY-MM-DD)
   * @param {string} filters.formato - Formato de la función (2D, 3D, IMAX)
   * @returns {Promise<Object>} Lista de funciones
   */
  async getAll(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.pelicula_id) params.append('pelicula_id', filters.pelicula_id);
      if (filters.fecha) params.append('fecha', filters.fecha);
      if (filters.formato) params.append('formato', filters.formato);
      
      const queryString = params.toString();
      const url = queryString ? `/api/funciones?${queryString}` : '/api/funciones';
      
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una función por ID
   * @param {number} id - ID de la función
   * @returns {Promise<Object>} Datos de la función
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/api/funciones/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener asientos disponibles para una función
   * @param {number} funcionId - ID de la función
   * @returns {Promise<Object>} Lista de asientos con su disponibilidad
   */
  async getAsientos(funcionId) {
    try {
      const response = await apiClient.get(`/api/funciones/${funcionId}/asientos`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva función (solo admin)
   * @param {Object} funcionData - Datos de la función
   * @returns {Promise<Object>} Función creada
   */
  async create(funcionData) {
    try {
      const response = await apiClient.post('/api/funciones', funcionData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una función (solo admin)
   * @param {number} id - ID de la función
   * @param {Object} funcionData - Datos actualizados
   * @returns {Promise<Object>} Función actualizada
   */
  async update(id, funcionData) {
    try {
      const response = await apiClient.put(`/api/funciones/${id}`, funcionData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una función (solo admin)
   * @param {number} id - ID de la función
   * @returns {Promise<Object>} Respuesta de eliminación
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/api/funciones/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

