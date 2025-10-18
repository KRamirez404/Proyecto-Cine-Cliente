import PropTypes from 'prop-types';

/**
 * Badge Component - Átomo base del Design System
 * 
 * Componente de badge/etiqueta reutilizable para géneros, estados, y categorías.
 * Sigue el design system establecido en FASE 0.
 * 
 * @component
 * @example
 * // Badge de género
 * <Badge variant="accion">Acción</Badge>
 * 
 * @example
 * // Badge de estado
 * <Badge variant="disponible">Disponible</Badge>
 * 
 * @example
 * // Badge VIP
 * <Badge variant="vip" size="md">VIP</Badge>
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = true,
  className = '',
  onClick,
  ariaLabel,
  ...props
}) => {
  // Variantes de géneros de películas (según design system)
  const genreVariants = {
    accion: 'bg-genre-action text-white',
    comedia: 'bg-genre-comedy text-neutral-900',
    drama: 'bg-genre-drama text-white',
    terror: 'bg-genre-horror text-white',
    scifi: 'bg-genre-scifi text-white',
    romance: 'bg-genre-romance text-white',
    infantil: 'bg-genre-kids text-neutral-900',
  };

  // Variantes de estados
  const stateVariants = {
    disponible: 'bg-seat-available text-neutral-900 border border-neutral-300',
    ocupado: 'bg-seat-occupied text-white',
    seleccionado: 'bg-seat-selected text-white',
    vip: 'bg-seat-vip text-white',
    reservado: 'bg-warning text-white',
    confirmado: 'bg-success text-white',
    cancelado: 'bg-error text-white',
    default: 'bg-neutral-200 text-neutral-700',
  };

  // Variantes generales
  const generalVariants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
    info: 'bg-info text-white',
    neutral: 'bg-neutral-500 text-white',
  };

  // Combinar todas las variantes
  const allVariants = {
    ...genreVariants,
    ...stateVariants,
    ...generalVariants,
  };

  // Tamaños
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',    // Small
    md: 'px-2.5 py-1 text-sm',    // Medium (default)
    lg: 'px-3 py-1.5 text-base',  // Large
  };

  // Clase base
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200';

  // Border radius
  const roundedClass = rounded ? 'rounded-full' : 'rounded';

  // Interactividad
  const interactiveClass = onClick ? 'cursor-pointer hover:opacity-80 active:opacity-90' : '';

  // Combinar clases
  const badgeClasses = `
    ${baseClasses}
    ${allVariants[variant] || allVariants.default}
    ${sizes[size]}
    ${roundedClass}
    ${interactiveClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Handler
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  // Si es clickeable, usar button
  if (onClick) {
    return (
      <button
        type="button"
        className={badgeClasses}
        onClick={handleClick}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Si no es clickeable, usar span
  return (
    <span
      className={badgeClasses}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  /** Contenido del badge */
  children: PropTypes.node.isRequired,
  
  /** Variante de estilo del badge */
  variant: PropTypes.oneOf([
    // Géneros
    'accion',
    'comedia',
    'drama',
    'terror',
    'scifi',
    'romance',
    'infantil',
    // Estados
    'disponible',
    'ocupado',
    'seleccionado',
    'vip',
    'reservado',
    'confirmado',
    'cancelado',
    // Generales
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
    'neutral',
    'default',
  ]),
  
  /** Tamaño del badge */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  
  /** Bordes completamente redondeados (pill) */
  rounded: PropTypes.bool,
  
  /** Clases CSS adicionales */
  className: PropTypes.string,
  
  /** Función onClick (hace el badge clickeable) */
  onClick: PropTypes.func,
  
  /** Etiqueta ARIA para accesibilidad */
  ariaLabel: PropTypes.string,
};

export default Badge;
