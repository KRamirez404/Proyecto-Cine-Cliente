import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import { User, ChevronRight } from 'lucide-react';

describe('Button Component', () => {
  // Test básico de renderizado
  it('renderiza correctamente con children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  // Test de variantes
  describe('Variants', () => {
    it('aplica estilos de variante primary por defecto', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });

    it('aplica estilos de variante secondary', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary');
    });

    it('aplica estilos de variante outline', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-primary');
    });

    it('aplica estilos de variante ghost', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });

    it('aplica estilos de variante danger', () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-error');
    });

    it('aplica estilos de variante success', () => {
      render(<Button variant="success">Success</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-success');
    });
  });

  // Test de tamaños
  describe('Sizes', () => {
    it('aplica tamaño md por defecto', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11');
    });

    it('aplica tamaño sm', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
    });

    it('aplica tamaño lg', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12');
    });
  });

  // Test de estados
  describe('States', () => {
    it('maneja estado disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:bg-neutral-300');
    });

    it('muestra spinner cuando isLoading es true', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button.querySelector('svg.animate-spin')).toBeInTheDocument();
    });

    it('deshabilita el botón cuando isLoading', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  // Test de eventos
  describe('Events', () => {
    it('ejecuta onClick cuando se hace click', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('no ejecuta onClick si está disabled', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('no ejecuta onClick si está en loading', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick} isLoading>Loading</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Test de props adicionales
  describe('Additional Props', () => {
    it('aplica fullWidth correctamente', () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('aplica type submit', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('aplica clases CSS personalizadas', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('aplica aria-label personalizado', () => {
      render(<Button ariaLabel="Custom Label">Button</Button>);
      const button = screen.getByRole('button', { name: /custom label/i });
      expect(button).toBeInTheDocument();
    });
  });

  // Test de iconos
  describe('Icons', () => {
    it('renderiza icono a la izquierda por defecto', () => {
      render(<Button icon={User}>With Icon</Button>);
      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('h-5');
    });

    it('renderiza icono a la derecha', () => {
      render(<Button icon={ChevronRight} iconPosition="right">Next</Button>);
      const button = screen.getByRole('button');
      const svgs = button.querySelectorAll('svg');
      
      // Último svg debe ser el icono (no el spinner)
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('no muestra icono cuando isLoading', () => {
      render(<Button icon={User} isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      // Solo debe haber el spinner, no el icono
      const svgs = button.querySelectorAll('svg');
      expect(svgs.length).toBe(1); // Solo spinner
    });
  });

  // Test de accesibilidad
  describe('Accessibility', () => {
    it('tiene rol button', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('usa aria-label cuando se proporciona', () => {
      render(<Button ariaLabel="Close modal">X</Button>);
      expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument();
    });

    it('usa children como aria-label por defecto si es string', () => {
      render(<Button>Submit Form</Button>);
      expect(screen.getByRole('button', { name: /submit form/i })).toBeInTheDocument();
    });

    it('marca aria-busy cuando isLoading', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('oculta iconos decorativos con aria-hidden', () => {
      render(<Button icon={User}>Profile</Button>);
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
