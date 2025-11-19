import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chatbotService } from './chatbot.service';
import apiClient from './api';

// Mock del apiClient
vi.mock('./api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('Chatbot Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('enviarMensaje', () => {
    it('should send a message successfully', async () => {
      const mockResponse = {
        success: true,
        data: {
          intencion: 'SALUDO',
          respuesta: {
            mensaje: '¡Hola! 👋 Soy tu asistente virtual del cine.',
          },
        },
      };

      apiClient.post.mockResolvedValue(mockResponse);

      const result = await chatbotService.enviarMensaje('Hola', 1);

      expect(apiClient.post).toHaveBeenCalledWith('/api/chatbot/mensaje', {
        mensaje: 'Hola',
        id_cliente: 1,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Network error');
      apiClient.post.mockRejectedValue(mockError);

      await expect(chatbotService.enviarMensaje('Hola')).rejects.toThrow('Network error');
    });
  });

  describe('obtenerDisponibilidadSillas', () => {
    it('should get seat availability', async () => {
      const mockResponse = {
        success: true,
        data: {
          funcion: { id_funcion: 1 },
          sala: { nombre: 'Sala 1' },
          sillas_por_bloque: {},
        },
      };

      apiClient.get.mockResolvedValue(mockResponse);

      const result = await chatbotService.obtenerDisponibilidadSillas(1);

      expect(apiClient.get).toHaveBeenCalledWith('/api/chatbot/sillas/1');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('obtenerFuncionesPelicula', () => {
    it('should get functions for a movie', async () => {
      const mockResponse = {
        success: true,
        data: {
          funciones: [],
          cantidad: 0,
        },
      };

      apiClient.get.mockResolvedValue(mockResponse);

      const result = await chatbotService.obtenerFuncionesPelicula(1);

      expect(apiClient.get).toHaveBeenCalledWith('/api/chatbot/funciones/1', {
        params: {},
      });
      expect(result).toEqual(mockResponse);
    });

    it('should include optional filters', async () => {
      const mockResponse = {
        success: true,
        data: { funciones: [] },
      };

      apiClient.get.mockResolvedValue(mockResponse);

      await chatbotService.obtenerFuncionesPelicula(1, 'viernes', { hora: 18, minutos: 0 });

      expect(apiClient.get).toHaveBeenCalledWith('/api/chatbot/funciones/1', {
        params: {
          dia: 'viernes',
          horario: JSON.stringify({ hora: 18, minutos: 0 }),
        },
      });
    });
  });

  describe('obtenerRecomendacionesPersonalizadas', () => {
    it('should get personalized recommendations', async () => {
      const mockResponse = {
        success: true,
        data: {
          recomendaciones: [],
        },
      };

      apiClient.get.mockResolvedValue(mockResponse);

      const result = await chatbotService.obtenerRecomendacionesPersonalizadas(1);

      expect(apiClient.get).toHaveBeenCalledWith(
        '/api/chatbot/recomendaciones-personalizadas/1',
        { params: {} }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});




