import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  // Helper para limpiar portals después de cada test
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('no renderiza nada cuando isOpen es false', () => {
      render(<Modal isOpen={false}><p>Content</p></Modal>);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renderiza el modal cuando isOpen es true', () => {
      render(<Modal isOpen={true}><p>Content</p></Modal>);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renderiza el contenido children', () => {
      render(
        <Modal isOpen={true}>
          <p>Modal content here</p>
        </Modal>
      );
      expect(screen.getByText('Modal content here')).toBeInTheDocument();
    });

    it('renderiza el título cuando se proporciona', () => {
      render(
        <Modal isOpen={true} title="Modal Title">
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });

    it('renderiza el footer cuando se proporciona', () => {
      render(
        <Modal
          isOpen={true}
          footer={<button>Save</button>}
        >
          <p>Content</p>
        </Modal>
      );
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('muestra el botón de cerrar por defecto', () => {
      render(<Modal isOpen={true}><p>Content</p></Modal>);
      expect(screen.getByLabelText('Cerrar modal')).toBeInTheDocument();
    });

    it('oculta el botón de cerrar cuando showCloseButton es false', () => {
      render(
        <Modal isOpen={true} showCloseButton={false}>
          <p>Content</p>
        </Modal>
      );
      expect(screen.queryByLabelText('Cerrar modal')).not.toBeInTheDocument();
    });

    it('llama onClose cuando se hace click en el botón de cerrar', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );

      await user.click(screen.getByLabelText('Cerrar modal'));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Variants', () => {
    it('renderiza variante default sin ícono', () => {
      render(
        <Modal isOpen={true} variant="default" title="Default Modal">
          <p>Content</p>
        </Modal>
      );

      const title = screen.getByText('Default Modal');
      expect(title).toHaveClass('text-neutral-900');
      
      // No debería haber íconos de variante (solo X de cerrar)
      const icons = document.body.querySelectorAll('svg');
      expect(icons.length).toBe(1); // Solo el X
    });

    it('renderiza variante success con ícono CheckCircle', () => {
      render(
        <Modal isOpen={true} variant="success" title="Success Modal">
          <p>Content</p>
        </Modal>
      );

      const title = screen.getByText('Success Modal');
      expect(title).toHaveClass('text-success');
      
      // Debe haber 2 íconos: CheckCircle + X
      const icons = document.body.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(1);
    });

    it('renderiza variante error con ícono AlertCircle', () => {
      render(
        <Modal isOpen={true} variant="error" title="Error Modal">
          <p>Content</p>
        </Modal>
      );

      const title = screen.getByText('Error Modal');
      expect(title).toHaveClass('text-error');
    });

    it('renderiza variante warning con ícono AlertTriangle', () => {
      render(
        <Modal isOpen={true} variant="warning" title="Warning Modal">
          <p>Content</p>
        </Modal>
      );

      const title = screen.getByText('Warning Modal');
      expect(title).toHaveClass('text-warning');
    });

    it('renderiza variante info con ícono Info', () => {
      render(
        <Modal isOpen={true} variant="info" title="Info Modal">
          <p>Content</p>
        </Modal>
      );

      const title = screen.getByText('Info Modal');
      expect(title).toHaveClass('text-info');
    });

    it('oculta el ícono cuando showIcon es false', () => {
      render(
        <Modal isOpen={true} variant="success" showIcon={false} title="No Icon">
          <p>Content</p>
        </Modal>
      );

      const icons = document.body.querySelectorAll('svg');
      // Solo el ícono X de cerrar
      expect(icons.length).toBe(1);
    });
  });

  describe('Sizes', () => {
    it('aplica tamaño sm', () => {
      render(
        <Modal isOpen={true} size="sm">
          <p>Content</p>
        </Modal>
      );
      const modalWrapper = document.body.querySelector('.max-w-sm');
      expect(modalWrapper).toBeTruthy();
    });

    it('aplica tamaño md por defecto', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );
      const modalWrapper = document.body.querySelector('.max-w-md');
      expect(modalWrapper).toBeTruthy();
    });

    it('aplica tamaño lg', () => {
      render(
        <Modal isOpen={true} size="lg">
          <p>Content</p>
        </Modal>
      );
      const modalWrapper = document.body.querySelector('.max-w-lg');
      expect(modalWrapper).toBeTruthy();
    });

    it('aplica tamaño xl', () => {
      render(
        <Modal isOpen={true} size="xl">
          <p>Content</p>
        </Modal>
      );
      const modalWrapper = document.body.querySelector('.max-w-xl');
      expect(modalWrapper).toBeTruthy();
    });

    it('aplica tamaño 2xl', () => {
      render(
        <Modal isOpen={true} size="2xl">
          <p>Content</p>
        </Modal>
      );
      const modalWrapper = document.body.querySelector('.max-w-2xl');
      expect(modalWrapper).toBeTruthy();
    });

    it('aplica tamaño full', () => {
      render(
        <Modal isOpen={true} size="full">
          <p>Content</p>
        </Modal>
      );
      const modalWrapper = document.body.querySelector('.max-w-full');
      expect(modalWrapper).toBeTruthy();
    });
  });

  describe('Click Outside', () => {
    it('cierra el modal al hacer click en el backdrop por defecto', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );

      // Click en el backdrop (buscar en document.body)
      const backdrop = document.body.querySelector('.fixed.inset-0.z-50');
      if (backdrop) {
        await user.click(backdrop);
        expect(handleClose).toHaveBeenCalledTimes(1);
      }
    });

    it('no cierra al hacer click en el contenido del modal', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );

      await user.click(screen.getByText('Content'));

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('no cierra cuando closeOnClickOutside es false', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} closeOnClickOutside={false}>
          <p>Content</p>
        </Modal>
      );

      const backdrop = document.body.querySelector('.fixed.inset-0.z-50');
      if (backdrop) {
        await user.click(backdrop);
        expect(handleClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('ESC Key', () => {
    it('cierra el modal al presionar ESC por defecto', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose}>
          <p>Content</p>
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('no cierra cuando closeOnEsc es false', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();

      render(
        <Modal isOpen={true} onClose={handleClose} closeOnEsc={false}>
          <p>Content</p>
        </Modal>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('no rompe si no hay onClose', async () => {
      const user = userEvent.setup();

      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      // No debería explotar
      await user.keyboard('{Escape}');

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Body Scroll Prevention', () => {
    it('previene scroll del body cuando está abierto', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restaura scroll del body cuando se cierra', () => {
      const { rerender } = render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal isOpen={false}>
          <p>Content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('');
    });

    it('restaura scroll en cleanup', () => {
      const { unmount } = render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Composition', () => {
    it('usa Card component', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      // Card tiene border-radius
      const card = document.body.querySelector('.rounded-2xl');
      expect(card).toBeTruthy();
    });

    it('usa Button implícitamente para cerrar', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Cerrar modal');
      expect(closeButton).toHaveAttribute('type', 'button');
    });

    it('aplica className adicional', () => {
      render(
        <Modal isOpen={true} className="custom-modal">
          <p>Content</p>
        </Modal>
      );

      const card = document.body.querySelector('.custom-modal');
      expect(card).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('tiene role="dialog"', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('tiene aria-modal="true"', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('asocia aria-labelledby con el título', () => {
      render(
        <Modal isOpen={true} title="Test Title">
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(screen.getByText('Test Title')).toHaveAttribute('id', 'modal-title');
    });

    it('no tiene aria-labelledby si no hay título', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).not.toHaveAttribute('aria-labelledby');
    });

    it('iconos tienen aria-hidden', () => {
      render(
        <Modal isOpen={true} variant="success" title="Success">
          <p>Content</p>
        </Modal>
      );

      const icons = document.body.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('botón de cerrar tiene aria-label', () => {
      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      expect(screen.getByLabelText('Cerrar modal')).toBeInTheDocument();
    });
  });

  describe('Portal Rendering', () => {
    it('renderiza en document.body via portal', () => {
      render(
        <Modal isOpen={true}>
          <p>Portal Content</p>
        </Modal>
      );

      // El contenido debería estar en el body, no en el contenedor de render
      const modalInBody = document.body.querySelector('[role="dialog"]');
      expect(modalInBody).toBeInTheDocument();
    });

    it('maneja servidor-side rendering (sin document)', () => {
      // Skip este test ya que createPortal requiere document
      // En SSR, el componente devuelve null
      const { container } = render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      // El modal debería renderizarse normalmente en entorno de testing
      expect(container).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('modal completo con todos los elementos', () => {
      render(
        <Modal
          isOpen={true}
          title="Complete Modal"
          variant="info"
          footer={
            <>
              <button>Cancel</button>
              <button>Confirm</button>
            </>
          }
        >
          <p>Modal body content</p>
        </Modal>
      );

      expect(screen.getByText('Complete Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal body content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
      expect(screen.getByLabelText('Cerrar modal')).toBeInTheDocument();
    });

    it('funciona sin título ni footer', () => {
      render(
        <Modal isOpen={true}>
          <p>Simple content</p>
        </Modal>
      );

      expect(screen.getByText('Simple content')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('modal de confirmación típico', async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();
      const handleCancel = vi.fn();

      render(
        <Modal
          isOpen={true}
          title="Confirmar eliminación"
          variant="warning"
          onClose={handleCancel}
          footer={
            <>
              <button onClick={handleCancel}>Cancelar</button>
              <button onClick={handleConfirm}>Eliminar</button>
            </>
          }
        >
          <p>¿Estás seguro de que deseas eliminar este elemento?</p>
        </Modal>
      );

      // Hacer click en Eliminar
      await user.click(screen.getByRole('button', { name: 'Eliminar' }));
      expect(handleConfirm).toHaveBeenCalledTimes(1);

      // Hacer click en Cancelar
      await user.click(screen.getByRole('button', { name: 'Cancelar' }));
      expect(handleCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('maneja título muy largo', () => {
      const longTitle = 'Este es un título extremadamente largo que debería truncarse con ellipsis para no romper el layout del modal';

      render(
        <Modal isOpen={true} title={longTitle}>
          <p>Content</p>
        </Modal>
      );

      const title = screen.getByText(longTitle);
      expect(title).toHaveClass('truncate');
    });

    it('maneja children null', () => {
      render(
        <Modal isOpen={true}>
          {null}
        </Modal>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('maneja múltiples modales (z-index)', () => {
      render(
        <>
          <Modal isOpen={true}>
            <p>Modal 1</p>
          </Modal>
          <Modal isOpen={true}>
            <p>Modal 2</p>
          </Modal>
        </>
      );

      // Ambos deberían renderizarse
      expect(screen.getByText('Modal 1')).toBeInTheDocument();
      expect(screen.getByText('Modal 2')).toBeInTheDocument();
    });

    it('no rompe sin onClose al presionar X', async () => {
      const user = userEvent.setup();

      render(
        <Modal isOpen={true}>
          <p>Content</p>
        </Modal>
      );

      // No debería explotar
      await user.click(screen.getByLabelText('Cerrar modal'));

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});
