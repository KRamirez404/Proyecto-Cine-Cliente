import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Badge from './Badge';

describe('Badge Component', () => {
  // Test básico de renderizado
  it('renderiza correctamente con children', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText(/test badge/i)).toBeInTheDocument();
  });

  // Test de variantes de géneros
  describe('Genre Variants', () => {
    it('aplica estilos de acción', () => {
      render(<Badge variant="accion">Acción</Badge>);
      const badge = screen.getByText(/acción/i);
      expect(badge).toHaveClass('bg-genre-action');
    });

    it('aplica estilos de comedia', () => {
      render(<Badge variant="comedia">Comedia</Badge>);
      const badge = screen.getByText(/comedia/i);
      expect(badge).toHaveClass('bg-genre-comedy');
    });

    it('aplica estilos de drama', () => {
      render(<Badge variant="drama">Drama</Badge>);
      const badge = screen.getByText(/drama/i);
      expect(badge).toHaveClass('bg-genre-drama');
    });

    it('aplica estilos de terror', () => {
      render(<Badge variant="terror">Terror</Badge>);
      const badge = screen.getByText(/terror/i);
      expect(badge).toHaveClass('bg-genre-horror');
    });

    it('aplica estilos de scifi', () => {
      render(<Badge variant="scifi">Sci-Fi</Badge>);
      const badge = screen.getByText(/sci-fi/i);
      expect(badge).toHaveClass('bg-genre-scifi');
    });

    it('aplica estilos de romance', () => {
      render(<Badge variant="romance">Romance</Badge>);
      const badge = screen.getByText(/romance/i);
      expect(badge).toHaveClass('bg-genre-romance');
    });

    it('aplica estilos de infantil', () => {
      render(<Badge variant="infantil">Infantil</Badge>);
      const badge = screen.getByText(/infantil/i);
      expect(badge).toHaveClass('bg-genre-kids');
    });
  });

  // Test de variantes de estados
  describe('State Variants', () => {
    it('aplica estilos de disponible', () => {
      render(<Badge variant="disponible">Disponible</Badge>);
      const badge = screen.getByText(/disponible/i);
      expect(badge).toHaveClass('bg-seat-available');
    });

    it('aplica estilos de ocupado', () => {
      render(<Badge variant="ocupado">Ocupado</Badge>);
      const badge = screen.getByText(/ocupado/i);
      expect(badge).toHaveClass('bg-seat-occupied');
    });

    it('aplica estilos de seleccionado', () => {
      render(<Badge variant="seleccionado">Seleccionado</Badge>);
      const badge = screen.getByText(/seleccionado/i);
      expect(badge).toHaveClass('bg-seat-selected');
    });

    it('aplica estilos de vip', () => {
      render(<Badge variant="vip">VIP</Badge>);
      const badge = screen.getByText(/vip/i);
      expect(badge).toHaveClass('bg-seat-vip');
    });

    it('aplica estilos de reservado', () => {
      render(<Badge variant="reservado">Reservado</Badge>);
      const badge = screen.getByText(/reservado/i);
      expect(badge).toHaveClass('bg-warning');
    });

    it('aplica estilos de confirmado', () => {
      render(<Badge variant="confirmado">Confirmado</Badge>);
      const badge = screen.getByText(/confirmado/i);
      expect(badge).toHaveClass('bg-success');
    });

    it('aplica estilos de cancelado', () => {
      render(<Badge variant="cancelado">Cancelado</Badge>);
      const badge = screen.getByText(/cancelado/i);
      expect(badge).toHaveClass('bg-error');
    });
  });

  // Test de variantes generales
  describe('General Variants', () => {
    it('aplica estilos default por defecto', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText(/default/i);
      expect(badge).toHaveClass('bg-neutral-200');
    });

    it('aplica estilos primary', () => {
      render(<Badge variant="primary">Primary</Badge>);
      const badge = screen.getByText(/primary/i);
      expect(badge).toHaveClass('bg-primary');
    });

    it('aplica estilos secondary', () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText(/secondary/i);
      expect(badge).toHaveClass('bg-secondary');
    });

    it('aplica estilos success', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText(/success/i);
      expect(badge).toHaveClass('bg-success');
    });

    it('aplica estilos warning', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText(/warning/i);
      expect(badge).toHaveClass('bg-warning');
    });

    it('aplica estilos error', () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText(/error/i);
      expect(badge).toHaveClass('bg-error');
    });

    it('aplica estilos info', () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText(/info/i);
      expect(badge).toHaveClass('bg-info');
    });

    it('aplica estilos neutral', () => {
      render(<Badge variant="neutral">Neutral</Badge>);
      const badge = screen.getByText(/neutral/i);
      expect(badge).toHaveClass('bg-neutral-500');
    });
  });

  // Test de tamaños
  describe('Sizes', () => {
    it('aplica tamaño md por defecto', () => {
      render(<Badge>Medium</Badge>);
      const badge = screen.getByText(/medium/i);
      expect(badge).toHaveClass('text-sm');
    });

    it('aplica tamaño sm', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText(/small/i);
      expect(badge).toHaveClass('text-xs');
    });

    it('aplica tamaño lg', () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText(/large/i);
      expect(badge).toHaveClass('text-base');
    });
  });

  // Test de rounded
  describe('Rounded', () => {
    it('aplica rounded-full por defecto', () => {
      render(<Badge>Rounded</Badge>);
      const badge = screen.getByText(/rounded/i);
      expect(badge).toHaveClass('rounded-full');
    });

    it('aplica rounded cuando rounded es false', () => {
      render(<Badge rounded={false}>Not Pill</Badge>);
      const badge = screen.getByText(/not pill/i);
      expect(badge).toHaveClass('rounded');
      expect(badge).not.toHaveClass('rounded-full');
    });
  });

  // Test de interactividad
  describe('Interactive', () => {
    it('renderiza como span cuando no hay onClick', () => {
      render(<Badge>Static Badge</Badge>);
      const badge = screen.getByText(/static badge/i);
      expect(badge.tagName).toBe('SPAN');
    });

    it('renderiza como button cuando hay onClick', () => {
      render(<Badge onClick={() => {}}>Clickable</Badge>);
      const badge = screen.getByText(/clickable/i);
      expect(badge.tagName).toBe('BUTTON');
    });

    it('ejecuta onClick cuando se hace click', () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Click me</Badge>);
      
      const badge = screen.getByText(/click me/i);
      fireEvent.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('aplica estilos hover cuando es clickeable', () => {
      render(<Badge onClick={() => {}}>Hover</Badge>);
      const badge = screen.getByText(/hover/i);
      expect(badge).toHaveClass('cursor-pointer');
      expect(badge).toHaveClass('hover:opacity-80');
    });

    it('no aplica estilos hover cuando no es clickeable', () => {
      render(<Badge>Not Clickable</Badge>);
      const badge = screen.getByText(/not clickable/i);
      expect(badge).not.toHaveClass('cursor-pointer');
    });
  });

  // Test de props adicionales
  describe('Additional Props', () => {
    it('aplica clases CSS personalizadas', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      const badge = screen.getByText(/custom/i);
      expect(badge).toHaveClass('custom-class');
    });

    it('aplica aria-label personalizado', () => {
      render(<Badge ariaLabel="Custom Label">Badge</Badge>);
      const badge = screen.getByLabelText(/custom label/i);
      expect(badge).toBeInTheDocument();
    });

    it('usa children como aria-label por defecto si es string', () => {
      render(<Badge onClick={() => {}}>Action Badge</Badge>);
      const badge = screen.getByLabelText(/action badge/i);
      expect(badge).toBeInTheDocument();
    });
  });

  // Test de accesibilidad
  describe('Accessibility', () => {
    it('tiene aria-label cuando es clickeable', () => {
      render(<Badge onClick={() => {}} ariaLabel="Close tag">X</Badge>);
      expect(screen.getByLabelText(/close tag/i)).toBeInTheDocument();
    });

    it('usa children como aria-label en botones', () => {
      render(<Badge onClick={() => {}}>Filter: Drama</Badge>);
      expect(screen.getByLabelText(/filter: drama/i)).toBeInTheDocument();
    });

    it('tiene type button cuando es clickeable', () => {
      render(<Badge onClick={() => {}}>Click</Badge>);
      const badge = screen.getByText(/click/i);
      expect(badge).toHaveAttribute('type', 'button');
    });
  });

  // Test de combinaciones
  describe('Combinations', () => {
    it('combina variante, tamaño y rounded', () => {
      render(
        <Badge variant="accion" size="lg" rounded={false}>
          Large Action Badge
        </Badge>
      );
      const badge = screen.getByText(/large action badge/i);
      expect(badge).toHaveClass('bg-genre-action');
      expect(badge).toHaveClass('text-base');
      expect(badge).toHaveClass('rounded');
    });

    it('combina clickeable con variante y tamaño', () => {
      const handleClick = vi.fn();
      render(
        <Badge variant="vip" size="sm" onClick={handleClick}>
          VIP Small
        </Badge>
      );
      const badge = screen.getByText(/vip small/i);
      expect(badge).toHaveClass('bg-seat-vip');
      expect(badge).toHaveClass('text-xs');
      expect(badge).toHaveClass('cursor-pointer');
      
      fireEvent.click(badge);
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
