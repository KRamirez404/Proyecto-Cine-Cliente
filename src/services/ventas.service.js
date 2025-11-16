import apiClient from './api';

/**
 * Servicio de ventas
 * Maneja todas las operaciones relacionadas con ventas
 */
export const ventasService = {
  /**
   * Obtener todas las ventas
   * @param {Object} filters - Filtros opcionales
   * @param {number} filters.cliente_id - ID del cliente
   * @param {number} filters.usuario_id - ID del usuario (cajero)
   * @param {string} filters.fecha_inicio - Fecha de inicio (YYYY-MM-DD)
   * @param {string} filters.fecha_fin - Fecha de fin (YYYY-MM-DD)
   * @returns {Promise<Object>} Lista de ventas
   */
  async getAll(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.cliente_id) params.append('cliente_id', filters.cliente_id);
      if (filters.usuario_id) params.append('usuario_id', filters.usuario_id);
      if (filters.fecha_inicio) params.append('fecha_inicio', filters.fecha_inicio);
      if (filters.fecha_fin) params.append('fecha_fin', filters.fecha_fin);
      
      const queryString = params.toString();
      const url = queryString ? `/api/ventas?${queryString}` : '/api/ventas';
      
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una venta por ID
   * @param {number} id - ID de la venta
   * @returns {Promise<Object>} Datos de la venta
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/api/ventas/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva venta
   * @param {Object} ventaData - Datos de la venta
   * @param {number} ventaData.reserva_id - ID de la reserva
   * @param {string} ventaData.metodo_pago - Método de pago (EFECTIVO, TARJETA, etc.)
   * @returns {Promise<Object>} Venta creada con boleta
   */
  async create(ventaData) {
    try {
      const response = await apiClient.post('/api/ventas', ventaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener boleta PDF de una venta
   * @param {number} id - ID de la venta
   * @returns {Promise<Blob>} Archivo PDF de la boleta
   */
  async getBoleta(id) {
    try {
      const response = await apiClient.get(`/api/ventas/${id}/boleta`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

