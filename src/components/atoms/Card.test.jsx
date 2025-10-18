import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './Card';

describe('Card Component', () => {
  // Test básico de renderizado
  it('renderiza correctamente con children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
  });

  // Test de variantes
  describe('Variants', () => {
    it('aplica estilos elevated por defecto', () => {
      const { container } = render(<Card>Elevated</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('shadow-card');
    });

    it('aplica estilos flat', () => {
      const { container } = render(<Card variant="flat">Flat</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('bg-white');
      expect(card).not.toHaveClass('shadow-card');
    });

    it('aplica estilos outlined', () => {
      const { container } = render(<Card variant="outlined">Outlined</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('border-2');
      expect(card).toHaveClass('border-neutral-200');
    });

    it('aplica estilos ghost', () => {
      const { container } = render(<Card variant="ghost">Ghost</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('bg-transparent');
    });
  });

  // Test de padding
  describe('Padding', () => {
    it('aplica padding md por defecto', () => {
      const { container } = render(<Card>Medium Padding</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-4');
    });

    it('aplica padding none', () => {
      const { container } = render(<Card padding="none">No Padding</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-0');
    });

    it('aplica padding sm', () => {
      const { container } = render(<Card padding="sm">Small Padding</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-2');
    });

    it('aplica padding lg', () => {
      const { container } = render(<Card padding="lg">Large Padding</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-6');
    });

    it('aplica padding xl', () => {
      const { container } = render(<Card padding="xl">Extra Large Padding</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('p-8');
    });
  });

  // Test de rounded
  describe('Rounded', () => {
    it('aplica rounded-lg por defecto', () => {
      const { container } = render(<Card>Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-lg');
    });

    it('aplica rounded-none', () => {
      const { container } = render(<Card rounded="none">No Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-none');
    });

    it('aplica rounded-sm', () => {
      const { container } = render(<Card rounded="sm">Small Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-sm');
    });

    it('aplica rounded-md', () => {
      const { container } = render(<Card rounded="md">Medium Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-md');
    });

    it('aplica rounded-xl', () => {
      const { container } = render(<Card rounded="xl">Extra Large Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-xl');
    });

    it('aplica rounded-2xl', () => {
      const { container } = render(<Card rounded="2xl">2XL Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-2xl');
    });

    it('aplica rounded-full', () => {
      const { container } = render(<Card rounded="full">Full Rounded</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-full');
    });
  });

  // Test de hoverable
  describe('Hoverable', () => {
    it('no aplica estilos hover por defecto', () => {
      const { container } = render(<Card>Not Hoverable</Card>);
      const card = container.firstChild;
      expect(card).not.toHaveClass('cursor-pointer');
    });

    it('aplica estilos hover cuando hoverable es true', () => {
      const { container } = render(<Card hoverable>Hoverable</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveClass('hover:shadow-card-hover');
    });
  });

  // Test de interactividad
  describe('Interactive', () => {
    it('renderiza como div por defecto', () => {
      const { container } = render(<Card>Default Div</Card>);
      const card = container.firstChild;
      expect(card.tagName).toBe('DIV');
    });

    it('ejecuta onClick cuando se hace click', () => {
      const handleClick = vi.fn();
      const { container } = render(<Card onClick={handleClick}>Click me</Card>);
      
      const card = container.firstChild;
      fireEvent.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('agrega role button cuando es clickeable y es div', () => {
      const { container } = render(<Card onClick={() => {}}>Clickable</Card>);
      const card = container.firstChild;
      expect(card).toHaveAttribute('role', 'button');
    });

    it('agrega tabIndex cuando es clickeable', () => {
      const { container } = render(<Card onClick={() => {}}>Clickable</Card>);
      const card = container.firstChild;
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });

  // Test de prop 'as'
  describe('As Prop', () => {
    it('renderiza como section cuando as="section"', () => {
      const { container } = render(<Card as="section">Section Card</Card>);
      const card = container.firstChild;
      expect(card.tagName).toBe('SECTION');
    });

    it('renderiza como article cuando as="article"', () => {
      const { container } = render(<Card as="article">Article Card</Card>);
      const card = container.firstChild;
      expect(card.tagName).toBe('ARTICLE');
    });

    it('renderiza como aside cuando as="aside"', () => {
      const { container } = render(<Card as="aside">Aside Card</Card>);
      const card = container.firstChild;
      expect(card.tagName).toBe('ASIDE');
    });
  });

  // Test de props adicionales
  describe('Additional Props', () => {
    it('aplica clases CSS personalizadas', () => {
      const { container } = render(<Card className="custom-class">Custom</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('custom-class');
    });

    it('aplica aria-label', () => {
      render(<Card ariaLabel="Movie Card">Content</Card>);
      expect(screen.getByLabelText(/movie card/i)).toBeInTheDocument();
    });

    it('pasa props adicionales al elemento', () => {
      const { container } = render(
        <Card data-testid="test-card" id="my-card">
          Test
        </Card>
      );
      const card = container.firstChild;
      expect(card).toHaveAttribute('data-testid', 'test-card');
      expect(card).toHaveAttribute('id', 'my-card');
    });
  });

  // Test de combinaciones
  describe('Combinations', () => {
    it('combina variante, padding y rounded', () => {
      const { container } = render(
        <Card variant="outlined" padding="lg" rounded="2xl">
          Combined Card
        </Card>
      );
      const card = container.firstChild;
      expect(card).toHaveClass('border-2');
      expect(card).toHaveClass('p-6');
      expect(card).toHaveClass('rounded-2xl');
    });

    it('combina hoverable con onClick', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card hoverable onClick={handleClick}>
          Interactive Card
        </Card>
      );
      const card = container.firstChild;
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveClass('hover:shadow-card-hover');
      expect(card).toHaveAttribute('role', 'button');
      
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalled();
    });

    it('combina todas las props', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card
          variant="elevated"
          padding="xl"
          rounded="xl"
          hoverable
          onClick={handleClick}
          className="custom"
          as="article"
          ariaLabel="Featured Movie"
        >
          Full Card
        </Card>
      );
      const card = container.firstChild;
      
      expect(card.tagName).toBe('ARTICLE');
      expect(card).toHaveClass('shadow-card');
      expect(card).toHaveClass('p-8');
      expect(card).toHaveClass('rounded-xl');
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveClass('custom');
      expect(card).toHaveAttribute('aria-label', 'Featured Movie');
      
      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  // Test de accesibilidad
  describe('Accessibility', () => {
    it('tiene aria-label cuando se proporciona', () => {
      render(<Card ariaLabel="Movie information">Content</Card>);
      expect(screen.getByLabelText(/movie information/i)).toBeInTheDocument();
    });

    it('tiene role button cuando es clickeable', () => {
      const { container } = render(<Card onClick={() => {}}>Clickable</Card>);
      const card = container.firstChild;
      expect(card).toHaveAttribute('role', 'button');
    });

    it('es navegable con teclado cuando es clickeable', () => {
      const { container } = render(<Card onClick={() => {}}>Keyboard Nav</Card>);
      const card = container.firstChild;
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('no tiene role button cuando no es clickeable', () => {
      const { container } = render(<Card>Not Clickable</Card>);
      const card = container.firstChild;
      expect(card).not.toHaveAttribute('role', 'button');
    });
  });
});
