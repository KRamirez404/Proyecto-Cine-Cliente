import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ANIMATIONS } from '@design/tokens';

/**
 * Button Component - Átomo base del Design System
 * 
 * Componente de botón reutilizable con múltiples variantes, tamaños y estados.
 * Sigue el design system establecido en FASE 0.
 * 
 * @component
 * @example
 * // Botón primario básico
 * <Button variant="primary" onClick={handleClick}>Click me</Button>
 * 
 * @example
 * // Botón con loading state
 * <Button variant="primary" isLoading>Procesando...</Button>
 * 
 * @example
 * // Botón deshabilitado
 * <Button variant="secondary" disabled>No disponible</Button>
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ariaLabel,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  // Variantes de estilos según design system
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-darker disabled:bg-neutral-300 disabled:text-neutral-500',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-darker disabled:bg-neutral-300 disabled:text-neutral-500',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary-dark disabled:border-neutral-300 disabled:text-neutral-400',
    ghost: 'bg-transparent text-primary hover:bg-primary-50 active:bg-primary-100 disabled:text-neutral-400',
    danger: 'bg-error text-white hover:bg-error-dark active:bg-error-darker disabled:bg-neutral-300 disabled:text-neutral-500',
    success: 'bg-success text-white hover:bg-success-dark active:bg-success-darker disabled:bg-neutral-300 disabled:text-neutral-500',
  };

  // Tamaños según design system (spacing system)
  const sizes = {
    sm: 'h-9 px-3 text-sm',      // 36px height
    md: 'h-11 px-4 text-base',   // 44px height
    lg: 'h-12 px-6 text-lg',     // 48px height
  };

  // Clase base común
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed';

  // Combinar clases
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Animaciones con Framer Motion
  const motionVariants = {
    tap: { scale: disabled || isLoading ? 1 : 0.95 },
    hover: { scale: disabled || isLoading ? 1 : 1.02 },
  };

  const handleClick = (e) => {
    if (disabled || isLoading || !onClick) return;
    onClick(e);
  };

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={isLoading}
      whileTap={motionVariants.tap}
      whileHover={motionVariants.hover}
      transition={{
        duration: ANIMATIONS.duration.fast / 1000, // Convert ms to seconds
        ease: ANIMATIONS.easing.easeInOut,
      }}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Icon (left position) */}
      {Icon && iconPosition === 'left' && !isLoading && (
        <Icon className="h-5 w-5" aria-hidden="true" />
      )}

      {/* Button Text */}
      {children}

      {/* Icon (right position) */}
      {Icon && iconPosition === 'right' && !isLoading && (
        <Icon className="h-5 w-5" aria-hidden="true" />
      )}
    </motion.button>
  );
};

Button.propTypes = {
  /** Contenido del botón (texto, iconos, elementos) */
  children: PropTypes.node.isRequired,
  
  /** Variante de estilo del botón */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success']),
  
  /** Tamaño del botón */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  
  /** Estado de carga (muestra spinner) */
  isLoading: PropTypes.bool,
  
  /** Estado deshabilitado */
  disabled: PropTypes.bool,
  
  /** Botón ocupa todo el ancho del contenedor */
  fullWidth: PropTypes.bool,
  
  /** Tipo de botón HTML */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  
  /** Función a ejecutar al hacer click */
  onClick: PropTypes.func,
  
  /** Clases CSS adicionales */
  className: PropTypes.string,
  
  /** Etiqueta ARIA para accesibilidad */
  ariaLabel: PropTypes.string,
  
  /** Componente de icono (de lucide-react) */
  icon: PropTypes.elementType,
  
  /** Posición del icono */
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Button;
