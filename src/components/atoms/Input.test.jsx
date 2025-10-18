import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './Input';
import { Search, Mail } from 'lucide-react';

describe('Input Component', () => {
  // Test básico de renderizado
  it('renderiza correctamente', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  // Test de label
  describe('Label', () => {
    it('renderiza label cuando se proporciona', () => {
      render(<Input label="Username" />);
      expect(screen.getByText(/username/i)).toBeInTheDocument();
    });

    it('asocia label con input mediante htmlFor', () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText(/email/i);
      const input = screen.getByLabelText(/email/i);
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('muestra asterisco si required es true', () => {
      render(<Input label="Password" required />);
      expect(screen.getByLabelText(/obligatorio/i)).toBeInTheDocument();
    });
  });

  // Test de tipos
  describe('Types', () => {
    it('renderiza input type text por defecto', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renderiza input type email', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renderiza input type password', () => {
      render(<Input type="password" label="Password" />);
      const input = screen.getByLabelText(/password/i);
      expect(input).toHaveAttribute('type', 'password');
    });

    it('renderiza input type number', () => {
      render(<Input type="number" label="Age" />);
      const input = screen.getByLabelText(/age/i);
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  // Test de estados
  describe('States', () => {
    it('aplica estilos de error cuando hay error', () => {
      render(<Input error="Invalid input" label="Test" />);
      const input = screen.getByLabelText(/test/i);
      expect(input).toHaveClass('border-error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('muestra mensaje de error', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByRole('alert')).toHaveTextContent(/this field is required/i);
    });

    it('aplica estilos de success', () => {
      render(<Input success label="Valid" />);
      const input = screen.getByLabelText(/valid/i);
      expect(input).toHaveClass('border-success');
    });

    it('muestra helperText', () => {
      render(<Input helperText="Enter at least 8 characters" />);
      expect(screen.getByText(/enter at least 8 characters/i)).toBeInTheDocument();
    });

    it('deshabilita el input cuando disabled es true', () => {
      render(<Input disabled label="Disabled" />);
      const input = screen.getByLabelText(/disabled/i);
      expect(input).toBeDisabled();
    });
  });

  // Test de eventos
  describe('Events', () => {
    it('ejecuta onChange cuando el valor cambia', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('ejecuta onFocus al enfocar', () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('ejecuta onBlur al desenfocar', () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // Test de password toggle
  describe('Password Toggle', () => {
    it('muestra botón de toggle en type password', () => {
      render(<Input type="password" label="Password" />);
      expect(screen.getByLabelText(/mostrar contraseña/i)).toBeInTheDocument();
    });

    it('cambia type de password a text al hacer click en toggle', () => {
      render(<Input type="password" label="Password" />);
      const input = screen.getByLabelText(/password/i);
      const toggleButton = screen.getByLabelText(/mostrar contraseña/i);
      
      expect(input).toHaveAttribute('type', 'password');
      
      fireEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText(/ocultar contraseña/i)).toBeInTheDocument();
      
      fireEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'password');
    });

    it('no muestra toggle si está disabled', () => {
      render(<Input type="password" disabled label="Password" />);
      expect(screen.queryByLabelText(/mostrar contraseña/i)).not.toBeInTheDocument();
    });
  });

  // Test de iconos
  describe('Icons', () => {
    it('renderiza icono a la izquierda', () => {
      const { container } = render(<Input icon={Search} iconPosition="left" />);
      const iconContainer = container.querySelector('.absolute.left-3');
      expect(iconContainer).toBeInTheDocument();
    });

    it('renderiza icono a la derecha', () => {
      const { container } = render(<Input icon={Mail} iconPosition="right" />);
      const iconContainer = container.querySelector('.absolute.right-3');
      expect(iconContainer).toBeInTheDocument();
    });

    it('muestra icono de error cuando hay error', () => {
      const { container } = render(<Input error="Error message" />);
      const errorIcon = container.querySelector('.text-error');
      expect(errorIcon).toBeInTheDocument();
    });

    it('muestra icono de success cuando success es true', () => {
      const { container } = render(<Input success />);
      const successIcon = container.querySelector('.text-success');
      expect(successIcon).toBeInTheDocument();
    });
  });

  // Test de props adicionales
  describe('Additional Props', () => {
    it('aplica fullWidth', () => {
      const { container } = render(<Input fullWidth />);
      const wrapper = container.querySelector('.w-full');
      expect(wrapper).toBeInTheDocument();
    });

    it('aplica maxLength', () => {
      render(<Input maxLength={10} label="Limited" />);
      const input = screen.getByLabelText(/limited/i);
      expect(input).toHaveAttribute('maxLength', '10');
    });

    it('aplica min y max para type number', () => {
      render(<Input type="number" min={0} max={100} label="Number" />);
      const input = screen.getByLabelText(/number/i);
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('aplica pattern para validación', () => {
      render(<Input pattern="[0-9]+" label="Pattern" />);
      const input = screen.getByLabelText(/pattern/i);
      expect(input).toHaveAttribute('pattern', '[0-9]+');
    });

    it('aplica autoComplete', () => {
      render(<Input autoComplete="email" label="Email" />);
      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('autoComplete', 'email');
    });

    it('aplica clases personalizadas', () => {
      render(<Input className="custom-class" label="Custom" />);
      const input = screen.getByLabelText(/custom/i);
      expect(input).toHaveClass('custom-class');
    });
  });

  // Test de accesibilidad
  describe('Accessibility', () => {
    it('tiene aria-label cuando se proporciona', () => {
      render(<Input ariaLabel="Search input" />);
      expect(screen.getByLabelText(/search input/i)).toBeInTheDocument();
    });

    it('usa label como aria-label por defecto', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    });

    it('tiene aria-invalid true cuando hay error', () => {
      render(<Input error="Error" label="Test" />);
      const input = screen.getByLabelText(/test/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('tiene aria-invalid false cuando no hay error', () => {
      render(<Input label="Test" />);
      const input = screen.getByLabelText(/test/i);
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('tiene aria-describedby para error', () => {
      render(<Input error="Error message" id="test-input" label="Test" />);
      const input = screen.getByLabelText(/test/i);
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
    });

    it('tiene aria-describedby para helperText', () => {
      render(<Input helperText="Helper text" id="test-input" label="Test" />);
      const input = screen.getByLabelText(/test/i);
      expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
    });

    it('marca iconos como aria-hidden', () => {
      const { container } = render(<Input icon={Search} />);
      const icon = container.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // Test de controlled input
  describe('Controlled Input', () => {
    it('funciona como controlled component', () => {
      const { rerender } = render(<Input value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      
      expect(input).toHaveValue('');
      
      rerender(<Input value="test value" onChange={() => {}} />);
      expect(input).toHaveValue('test value');
    });
  });
});
