import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatbotButton from './ChatbotButton';

// Mock del ChatbotModal
vi.mock('./ChatbotModal', () => ({
  default: ({ isOpen, onClose }) => (
    isOpen ? (
      <div data-testid="chatbot-modal">
        <button onClick={onClose} data-testid="close-modal">Close</button>
      </div>
    ) : null
  ),
}));

describe('ChatbotButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the floating button', () => {
    render(<ChatbotButton />);
    
    const button = screen.getByRole('button', { name: /abrir asistente virtual/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('fixed', 'bottom-6', 'right-6');
  });

  it('opens modal when button is clicked', async () => {
    render(<ChatbotButton />);
    
    const button = screen.getByRole('button', { name: /abrir asistente virtual/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('chatbot-modal')).toBeInTheDocument();
    });
  });

  it('closes modal when close button is clicked', async () => {
    render(<ChatbotButton />);
    
    const button = screen.getByRole('button', { name: /abrir asistente virtual/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('chatbot-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('close-modal');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('chatbot-modal')).not.toBeInTheDocument();
    });
  });

  it('has correct accessibility attributes', () => {
    render(<ChatbotButton />);
    
    const button = screen.getByRole('button', { name: /abrir asistente virtual/i });
    expect(button).toHaveAttribute('aria-label', 'Abrir asistente virtual');
  });
});




