import apiClient from './api';

/**
 * Servicio del Chatbot
 * Maneja todas las operaciones relacionadas con el chatbot
 */
export const chatbotService = {
  /**
   * Enviar mensaje al chatbot
   * @param {string} mensaje - Mensaje del usuario
   * @param {number|null} id_cliente - ID del cliente (opcional)
   * @returns {Promise<Object>} Respuesta del chatbot
   */
  async enviarMensaje(mensaje, id_cliente = null) {
    try {
      const response = await apiClient.post('/api/chatbot/mensaje', {
        mensaje,
        id_cliente,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener disponibilidad de sillas para una función
   * @param {number} id_funcion - ID de la función
   * @returns {Promise<Object>} Disponibilidad de sillas
   */
  async obtenerDisponibilidadSillas(id_funcion) {
    try {
      const response = await apiClient.get(`/api/chatbot/sillas/${id_funcion}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener funciones disponibles para una película
   * @param {number} id_pelicula - ID de la película
   * @param {string|null} dia - Día de la semana (opcional)
   * @param {Object|null} horario - Horario {hora, minutos} (opcional)
   * @returns {Promise<Object>} Funciones disponibles
   */
  async obtenerFuncionesPelicula(id_pelicula, dia = null, horario = null) {
    try {
      const params = {};
      if (dia) params.dia = dia;
      if (horario) params.horario = JSON.stringify(horario);

      const response = await apiClient.get(`/api/chatbot/funciones/${id_pelicula}`, {
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener recomendaciones personalizadas
   * @param {number} id_cliente - ID del cliente
   * @param {string|null} dia - Día de la semana (opcional)
   * @param {Object|null} horario - Horario {hora, minutos} (opcional)
   * @returns {Promise<Object>} Recomendaciones personalizadas
   */
  async obtenerRecomendacionesPersonalizadas(id_cliente, dia = null, horario = null) {
    try {
      const params = {};
      if (dia) params.dia = dia;
      if (horario) params.horario = JSON.stringify(horario);

      const response = await apiClient.get(
        `/api/chatbot/recomendaciones-personalizadas/${id_cliente}`,
        { params }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};




