import apiClient from './api';

/**
 * Servicio de autenticación
 * Maneja todas las operaciones relacionadas con autenticación de usuarios
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param {Object} credentials - Credenciales del usuario
   * @param {string} credentials.usuario - Nombre de usuario (username)
   * @param {string} credentials.contrasena - Contraseña del usuario
   * @returns {Promise<Object>} Respuesta con token y datos del usuario
   */
  async login(credentials) {
    try {
      // El backend espera 'usuario' y 'contrasena'
      const response = await apiClient.post('/api/auth/login', {
        usuario: credentials.usuario || credentials.email,
        contrasena: credentials.contrasena || credentials.password,
      });
      
      if (response.success && response.data) {
        // Guardar token y datos del usuario en localStorage
        // El backend devuelve 'user' no 'usuario'
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || response.data.usuario));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Registrar nuevo usuario
   * @param {Object} userData - Datos del nuevo usuario
   * @returns {Promise<Object>} Respuesta con token y datos del usuario
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/api/auth/register', userData);
      
      if (response.success && response.data) {
        // Guardar token y datos del usuario en localStorage
        // El backend devuelve 'user' no 'usuario'
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user || response.data.usuario));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtener información del usuario actual
   * @returns {Promise<Object>} Datos del usuario autenticado
   */
  async getMe() {
    try {
      const response = await apiClient.get('/api/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cerrar sesión
   * Limpia el token y los datos del usuario del localStorage
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Verificar si hay un usuario autenticado
   * @returns {boolean} true si hay token y usuario en localStorage
   */
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  /**
   * Obtener el usuario actual del localStorage
   * @returns {Object|null} Datos del usuario o null si no existe
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  },

  /**
   * Obtener el token actual
   * @returns {string|null} Token o null si no existe
   */
  getToken() {
    return localStorage.getItem('token');
  },
};

