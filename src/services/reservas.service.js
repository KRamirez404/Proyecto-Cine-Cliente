import apiClient from './api';

/**
 * Servicio de reservas
 * Maneja todas las operaciones relacionadas con reservas
 */
export const reservasService = {
  /**
   * Obtener todas las reservas
   * @param {Object} filters - Filtros opcionales
   * @param {number} filters.cliente_id - ID del cliente
   * @param {number} filters.funcion_id - ID de la función
   * @returns {Promise<Object>} Lista de reservas
   */
  async getAll(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.cliente_id) params.append('cliente_id', filters.cliente_id);
      if (filters.funcion_id) params.append('funcion_id', filters.funcion_id);
      
      const queryString = params.toString();
      const url = queryString ? `/api/reservas?${queryString}` : '/api/reservas';
      
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una reserva por ID
   * @param {number} id - ID de la reserva
   * @returns {Promise<Object>} Datos de la reserva
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/api/reservas/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva reserva
   * @param {Object} reservaData - Datos de la reserva
   * @param {number} reservaData.funcion_id - ID de la función
   * @param {Array<number>} reservaData.silla_ids - IDs de las sillas a reservar
   * @returns {Promise<Object>} Reserva creada
   */
  async create(reservaData) {
    try {
      const response = await apiClient.post('/api/reservas', reservaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cancelar una reserva
   * @param {number} id - ID de la reserva
   * @returns {Promise<Object>} Respuesta de cancelación
   */
  async cancel(id) {
    try {
      const response = await apiClient.delete(`/api/reservas/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

