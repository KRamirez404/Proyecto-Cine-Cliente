import apiClient from './api';

/**
 * Servicio para gestión de cajeros
 */
export const cajerosService = {
  /**
   * Registrar cajero
   * @param {{ nombre: string; email: string; password: string; horario: string }} data
   */
  async createCajero(data) {
    // Construir payload según esquema de /api/auth/register
    const payload = {
      nombre: data.nombre,
      usuario: data.usuario, // normalmente derivado del email
      contrasena: data.password,
      rol: 'CAJERO',
    };

    return apiClient.post('/api/auth/register', payload);
  },
};
