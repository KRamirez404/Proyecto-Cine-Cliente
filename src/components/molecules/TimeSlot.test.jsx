import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TimeSlot from './TimeSlot';

describe('TimeSlot', () => {
  const defaultProps = {
    time: '18:30',
    sala: 'Sala 1',
    format: '3D',
    price: 12.50,
    available: true,
    selected: false,
  };

  describe('Rendering', () => {
    it('renderiza correctamente con props mínimas', () => {
      render(<TimeSlot time="18:30" />);
      expect(screen.getByText('18:30')).toBeInTheDocument();
    });

    it('muestra el horario correctamente', () => {
      render(<TimeSlot {...defaultProps} />);
      expect(screen.getByText('18:30')).toBeInTheDocument();
    });

    it('muestra la sala cuando se proporciona', () => {
      render(<TimeSlot {...defaultProps} />);
      expect(screen.getByText('Sala 1')).toBeInTheDocument();
    });

    it('muestra el formato correctamente', () => {
      render(<TimeSlot {...defaultProps} />);
      expect(screen.getByText('3D')).toBeInTheDocument();
    });

    it('formatea el precio correctamente', () => {
      render(<TimeSlot {...defaultProps} />);
      expect(screen.getByText('$12.50')).toBeInTheDocument();
    });

    it('formatea precio con un decimal', () => {
      render(<TimeSlot {...defaultProps} price={10} />);
      expect(screen.getByText('$10.00')).toBeInTheDocument();
    });

    it('oculta detalles cuando showDetails es false', () => {
      render(<TimeSlot {...defaultProps} showDetails={false} />);
      expect(screen.queryByText('Sala 1')).not.toBeInTheDocument();
      expect(screen.queryByText('3D')).not.toBeInTheDocument();
      expect(screen.queryByText('$12.50')).not.toBeInTheDocument();
    });
  });

  describe('Format Variants', () => {
    it('muestra formato 2D', () => {
      render(<TimeSlot {...defaultProps} format="2D" />);
      expect(screen.getByText('2D')).toBeInTheDocument();
    });

    it('muestra formato 3D', () => {
      render(<TimeSlot {...defaultProps} format="3D" />);
      expect(screen.getByText('3D')).toBeInTheDocument();
    });

    it('muestra formato IMAX', () => {
      render(<TimeSlot {...defaultProps} format="IMAX" />);
      expect(screen.getByText('IMAX')).toBeInTheDocument();
    });

    it('muestra formato 4D', () => {
      render(<TimeSlot {...defaultProps} format="4D" />);
      expect(screen.getByText('4D')).toBeInTheDocument();
    });

    it('muestra formato VIP', () => {
      render(<TimeSlot {...defaultProps} format="VIP" />);
      expect(screen.getByText('VIP')).toBeInTheDocument();
    });

    it('convierte formato a mayúsculas', () => {
      render(<TimeSlot {...defaultProps} format="3d" />);
      expect(screen.getByText('3D')).toBeInTheDocument();
    });
  });

  describe('Availability States', () => {
    it('muestra como disponible por defecto', () => {
      render(<TimeSlot {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('muestra como no disponible cuando available es false', () => {
      render(<TimeSlot {...defaultProps} available={false} />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByText('Agotado')).toBeInTheDocument();
    });

    it('botón está deshabilitado cuando no disponible', () => {
      render(<TimeSlot {...defaultProps} available={false} />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:cursor-not-allowed');
    });
  });

  describe('Selection States', () => {
    it('no muestra indicador cuando no está seleccionado', () => {
      const { container } = render(<TimeSlot {...defaultProps} selected={false} />);
      const indicator = container.querySelector('.bg-primary.rounded-full');
      expect(indicator).not.toBeInTheDocument();
    });

    it('muestra indicador visual cuando está seleccionado', () => {
      const { container } = render(<TimeSlot {...defaultProps} selected={true} />);
      const indicator = container.querySelector('.bg-primary.rounded-full');
      expect(indicator).toBeInTheDocument();
    });

    it('aplica ring cuando está seleccionado', () => {
      render(<TimeSlot {...defaultProps} selected={true} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ring-2', 'ring-primary');
    });

    it('usa variante primary cuando está seleccionado', () => {
      render(<TimeSlot {...defaultProps} selected={true} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });

    it('usa variante secondary cuando disponible pero no seleccionado', () => {
      render(<TimeSlot {...defaultProps} selected={false} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary');
    });
  });

  describe('Events', () => {
    it('llama onClick con datos correctos al hacer click', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<TimeSlot {...defaultProps} id="slot-1" onClick={handleClick} />);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledWith({
        id: 'slot-1',
        time: '18:30',
        sala: 'Sala 1',
        format: '3D',
        price: 12.50,
      });
    });

    it('no llama onClick cuando no está disponible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<TimeSlot {...defaultProps} available={false} onClick={handleClick} />);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('no rompe si no hay onClick', async () => {
      const user = userEvent.setup();
      
      render(<TimeSlot {...defaultProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // No debería explotar
      expect(button).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('aplica tamaño small', () => {
      render(<TimeSlot {...defaultProps} size="sm" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
    });

    it('aplica tamaño medium por defecto', () => {
      render(<TimeSlot {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11');
    });

    it('aplica tamaño large', () => {
      render(<TimeSlot {...defaultProps} size="lg" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12');
    });
  });

  describe('Composition', () => {
    it('usa Button component', () => {
      render(<TimeSlot {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('usa Badge component para formato', () => {
      const { container } = render(<TimeSlot {...defaultProps} />);
      const badge = container.querySelector('.inline-flex.items-center.justify-center.font-medium');
      expect(badge).toBeInTheDocument();
    });

    it('aplica className adicional', () => {
      render(<TimeSlot {...defaultProps} className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('tiene aria-label descriptivo completo', () => {
      render(<TimeSlot {...defaultProps} />);
      expect(
        screen.getByLabelText('Función a las 18:30, Sala 1, formato 3D, precio $12.50')
      ).toBeInTheDocument();
    });

    it('incluye estado no disponible en aria-label', () => {
      render(<TimeSlot {...defaultProps} available={false} />);
      expect(
        screen.getByLabelText(/No disponible/)
      ).toBeInTheDocument();
    });

    it('incluye estado seleccionado en aria-label', () => {
      render(<TimeSlot {...defaultProps} selected={true} />);
      expect(
        screen.getByLabelText(/Seleccionado/)
      ).toBeInTheDocument();
    });

    it('botón tiene type="button"', () => {
      render(<TimeSlot {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('iconos tienen aria-hidden', () => {
      const { container } = render(<TimeSlot {...defaultProps} />);
      const icons = container.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('no rompe sin sala', () => {
      render(<TimeSlot time="18:30" format="2D" price={10} />);
      expect(screen.getByText('18:30')).toBeInTheDocument();
    });

    it('no rompe sin formato', () => {
      render(<TimeSlot time="18:30" sala="Sala 1" price={10} />);
      expect(screen.getByText('18:30')).toBeInTheDocument();
    });

    it('no rompe sin precio', () => {
      render(<TimeSlot time="18:30" sala="Sala 1" format="2D" />);
      expect(screen.getByText('18:30')).toBeInTheDocument();
    });

    it('maneja precio cero', () => {
      render(<TimeSlot {...defaultProps} price={0} />);
      expect(screen.getByText('$0.00')).toBeInTheDocument();
    });

    it('maneja horarios con formato diferente', () => {
      render(<TimeSlot time="9:00" />);
      expect(screen.getByText('9:00')).toBeInTheDocument();
    });

    it('maneja horarios de medianoche', () => {
      render(<TimeSlot time="00:00" />);
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    it('muestra divider entre hora y detalles', () => {
      const { container } = render(<TimeSlot {...defaultProps} />);
      const divider = container.querySelector('.h-6.w-px.bg-current');
      expect(divider).toBeInTheDocument();
    });

    it('no muestra divider cuando showDetails es false', () => {
      const { container } = render(<TimeSlot {...defaultProps} showDetails={false} />);
      const divider = container.querySelector('.h-6.w-px.bg-current');
      expect(divider).not.toBeInTheDocument();
    });

    it('overlay agotado cubre el botón', () => {
      const { container } = render(<TimeSlot {...defaultProps} available={false} />);
      const overlay = container.querySelector('.absolute.inset-0');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass('bg-neutral-100/80');
    });
  });

  describe('Integration', () => {
    it('muestra toda la información en un solo componente', () => {
      render(<TimeSlot {...defaultProps} />);
      
      expect(screen.getByText('18:30')).toBeInTheDocument();
      expect(screen.getByText('Sala 1')).toBeInTheDocument();
      expect(screen.getByText('3D')).toBeInTheDocument();
      expect(screen.getByText('$12.50')).toBeInTheDocument();
    });

    it('funciona correctamente en modo mínimo', () => {
      render(<TimeSlot time="20:00" showDetails={false} />);
      
      expect(screen.getByText('20:00')).toBeInTheDocument();
      expect(screen.queryByText('Sala')).not.toBeInTheDocument();
    });

    it('puede ser usado en un grid de slots', () => {
      const slots = [
        { id: 1, time: '14:00', sala: 'Sala 1', format: '2D', price: 8.00 },
        { id: 2, time: '16:30', sala: 'Sala 2', format: '3D', price: 12.00 },
        { id: 3, time: '19:00', sala: 'Sala 1', format: 'IMAX', price: 15.00 },
      ];

      const { container } = render(
        <div>
          {slots.map(slot => (
            <TimeSlot key={slot.id} {...slot} />
          ))}
        </div>
      );

      expect(container.querySelectorAll('button').length).toBe(3);
      expect(screen.getByText('14:00')).toBeInTheDocument();
      expect(screen.getByText('16:30')).toBeInTheDocument();
      expect(screen.getByText('19:00')).toBeInTheDocument();
    });
  });
});
