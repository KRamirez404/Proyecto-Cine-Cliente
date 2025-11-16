import apiClient from './api';

/**
 * Servicio de películas
 * Maneja todas las operaciones relacionadas con películas
 */
export const peliculasService = {
  /**
   * Obtener todas las películas
   * @param {Object} filters - Filtros opcionales
   * @param {string} filters.estado - Estado de la película (EN_CARTELERA, PROXIMAMENTE, etc.)
   * @param {string} filters.genero - Género de la película
   * @param {string} filters.search - Búsqueda por título
   * @returns {Promise<Object>} Lista de películas
   */
  async getAll(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.estado) params.append('estado', filters.estado);
      if (filters.genero) params.append('genero', filters.genero);
      if (filters.search) params.append('search', filters.search);
      
      const queryString = params.toString();
      const url = queryString ? `/api/peliculas?${queryString}` : '/api/peliculas';
      
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener una película por ID
   * @param {number} id - ID de la película
   * @returns {Promise<Object>} Datos de la película
   */
  async getById(id) {
    try {
      const response = await apiClient.get(`/api/peliculas/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Crear una nueva película (solo admin)
   * @param {Object} peliculaData - Datos de la película
   * @returns {Promise<Object>} Película creada
   */
  async create(peliculaData) {
    try {
      const response = await apiClient.post('/api/peliculas', peliculaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Actualizar una película (solo admin)
   * @param {number} id - ID de la película
   * @param {Object} peliculaData - Datos actualizados
   * @returns {Promise<Object>} Película actualizada
   */
  async update(id, peliculaData) {
    try {
      const response = await apiClient.put(`/api/peliculas/${id}`, peliculaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Eliminar una película (solo admin)
   * @param {number} id - ID de la película
   * @returns {Promise<Object>} Respuesta de eliminación
   */
  async delete(id) {
    try {
      const response = await apiClient.delete(`/api/peliculas/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

