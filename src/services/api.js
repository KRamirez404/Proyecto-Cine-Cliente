import axios from 'axios';

// Obtener la URL base de la API desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    // Retornar solo los datos de la respuesta
    return response.data;
  },
  (error) => {
    // Manejar errores de respuesta
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const { status, data } = error.response;

      // Si el token expiró o es inválido, redirigir a login
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Solo redirigir si no estamos ya en la página de login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      // Retornar el error con información estructurada
      return Promise.reject({
        status,
        message: data?.error?.message || data?.message || 'Error en la petición',
        data: data?.error || data,
      });
    } else if (error.request) {
      // La petición se hizo pero no se recibió respuesta
      return Promise.reject({
        status: 0,
        message: 'No se pudo conectar con el servidor. Verifica tu conexión.',
        data: null,
      });
    } else {
      // Algo pasó al configurar la petición
      return Promise.reject({
        status: 0,
        message: error.message || 'Error desconocido',
        data: null,
      });
    }
  }
);

export default apiClient;

