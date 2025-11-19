import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chatbotService, authService } from '@services';
import apiClient from '@services/api';

/**
 * Tests de Integración Frontend-Backend
 * 
 * Estos tests verifican que el frontend se comunique correctamente
 * con el backend. Requieren que el backend esté corriendo.
 */

// Configurar timeout más largo para tests de integración
const API_TIMEOUT = 15000;

describe('Integración Frontend-Backend', () => {
  let authToken = null;

  beforeAll(async () => {
    // Intentar hacer login para obtener token
    try {
      const response = await authService.login({
        usuario: 'admin',
        contrasena: 'admin123',
      });
      
      if (response.success && response.data) {
        authToken = response.data.token;
      }
    } catch (error) {
      console.warn('No se pudo obtener token de autenticación. Algunos tests pueden fallar.');
    }
  }, API_TIMEOUT);

  describe('Health Check', () => {
    it('debe verificar que el backend esté corriendo', async () => {
      try {
        const response = await apiClient.get('/health');
        expect(response.success).toBe(true);
        expect(response.message).toContain('running');
      } catch (error) {
        throw new Error('El backend no está corriendo. Inicia el servidor con: npm run dev');
      }
    }, API_TIMEOUT);
  });

  describe('Autenticación', () => {
    it('debe hacer login exitosamente con credenciales válidas', async () => {
      const response = await authService.login({
        usuario: 'admin',
        contrasena: 'admin123',
      });

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.token).toBeDefined();
      expect(response.data.user).toBeDefined();
      expect(response.data.user.rol).toBe('ADMIN');
    }, API_TIMEOUT);

    it('debe fallar con credenciales inválidas', async () => {
      await expect(
        authService.login({
          usuario: 'usuario_inexistente',
          contrasena: 'password123',
        })
      ).rejects.toThrow();
    }, API_TIMEOUT);
  });

  describe('Chatbot', () => {
    it('debe enviar mensaje al chatbot y recibir respuesta', async () => {
      if (!authToken) {
        // Obtener token si no existe
        const loginResponse = await authService.login({
          usuario: 'admin',
          contrasena: 'admin123',
        });
        authToken = loginResponse.data.token;
      }

      const response = await chatbotService.enviarMensaje('Hola', null);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.intencion).toBeDefined();
      expect(response.data.respuesta).toBeDefined();
    }, API_TIMEOUT);

    it('debe procesar recomendación correctamente', async () => {
      if (!authToken) {
        const loginResponse = await authService.login({
          usuario: 'admin',
          contrasena: 'admin123',
        });
        authToken = loginResponse.data.token;
      }

      const response = await chatbotService.enviarMensaje('¿Qué me recomiendas?', null);

      expect(response.success).toBe(true);
      expect(response.data.intencion).toBe('PEDIR_RECOMENDACION');
    }, API_TIMEOUT);
  });

  describe('Películas', () => {
    it('debe obtener lista de películas', async () => {
      if (!authToken) {
        const loginResponse = await authService.login({
          usuario: 'admin',
          contrasena: 'admin123',
        });
        authToken = loginResponse.data.token;
      }

      // Importar servicio de películas
      const { peliculasService } = await import('@services');
      const response = await peliculasService.getAll({ estado: 'EN_CARTELERA' });

      expect(response.success).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
    }, API_TIMEOUT);
  });
});



