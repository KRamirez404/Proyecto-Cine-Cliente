import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatbotModal from './ChatbotModal';
import { chatbotService } from '@services';
import { authService } from '@services';

// Mock de los servicios
vi.mock('@services', () => ({
  chatbotService: {
    enviarMensaje: vi.fn(),
  },
  authService: {
    getCurrentUser: vi.fn(),
  },
}));

describe('ChatbotModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authService.getCurrentUser.mockReturnValue({ id_usuario: 1 });
  });

  it('renders when isOpen is true', () => {
    render(<ChatbotModal isOpen={true} onClose={vi.fn()} />);
    
    expect(screen.getByText('CineChat')).toBeInTheDocument();
    expect(screen.getByText('En línea')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ChatbotModal isOpen={false} onClose={vi.fn()} />);
    
    expect(screen.queryByText('CineChat')).not.toBeInTheDocument();
  });

  it('shows welcome message on open', async () => {
    render(<ChatbotModal isOpen={true} onClose={vi.fn()} />);
    
    await waitFor(() => {
      expect(screen.getByText(/¡Hola! 👋 Soy tu asistente virtual del cine/i)).toBeInTheDocument();
    });
  });

  it('sends message when form is submitted', async () => {
    const mockResponse = {
      success: true,
      data: {
        intencion: 'SALUDO',
        respuesta: {
          mensaje: 'Respuesta del bot',
        },
      },
    };

    chatbotService.enviarMensaje.mockResolvedValue(mockResponse);

    render(<ChatbotModal isOpen={true} onClose={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(chatbotService.enviarMensaje).toHaveBeenCalledWith('Hola', 1);
    });

    await waitFor(() => {
      expect(screen.getByText('Respuesta del bot')).toBeInTheDocument();
    });
  });

  it('displays user messages correctly', async () => {
    render(<ChatbotModal isOpen={true} onClose={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    chatbotService.enviarMensaje.mockResolvedValue({
      success: true,
      data: {
        respuesta: { mensaje: 'Respuesta' },
      },
    });

    fireEvent.change(input, { target: { value: 'Mensaje de prueba' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Mensaje de prueba')).toBeInTheDocument();
    });
  });

  it('handles errors gracefully', async () => {
    chatbotService.enviarMensaje.mockRejectedValue(new Error('Network error'));

    render(<ChatbotModal isOpen={true} onClose={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/ocurrió un error/i)).toBeInTheDocument();
    });
  });

  it('closes modal when close button is clicked', () => {
    const onClose = vi.fn();
    render(<ChatbotModal isOpen={true} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText('Cerrar chat');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('does not send empty messages', async () => {
    render(<ChatbotModal isOpen={true} onClose={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(chatbotService.enviarMensaje).not.toHaveBeenCalled();
    });
  });

  it('renders rich content from bot responses', async () => {
    const mockResponse = {
      success: true,
      data: {
        respuesta: {
          mensaje: 'Recomendaciones',
          recomendaciones: [
            {
              titulo: 'Película Test',
              genero: 'Acción',
              proximas_funciones: [{ hora: '18:00:00' }],
            },
          ],
        },
      },
    };

    chatbotService.enviarMensaje.mockResolvedValue(mockResponse);

    render(<ChatbotModal isOpen={true} onClose={vi.fn()} />);
    
    const input = screen.getByPlaceholderText('Escribe tu mensaje...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Recomiéndame algo' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Película Test')).toBeInTheDocument();
      expect(screen.getByText('Acción')).toBeInTheDocument();
    });
  });
});




