import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ANIMATIONS } from '@design/tokens';

/**
 * Card Component - Átomo base del Design System
 * 
 * Componente de contenedor/tarjeta reutilizable con múltiples variantes.
 * Base para MovieCard, BookingCard, PaymentCard, etc.
 * Sigue el design system establecido en FASE 0.
 * 
 * @component
 * @example
 * // Card básica
 * <Card>
 *   <h3>Título</h3>
 *   <p>Contenido de la tarjeta</p>
 * </Card>
 * 
 * @example
 * // Card clickeable con hover
 * <Card variant="elevated" hoverable onClick={handleClick}>
 *   <p>Click me!</p>
 * </Card>
 * 
 * @example
 * // Card con padding personalizado
 * <Card variant="outlined" padding="lg">
 *   <p>Large padding content</p>
 * </Card>
 */
const Card = ({
  children,
  variant = 'elevated',
  padding = 'md',
  rounded = 'lg',
  hoverable = false,
  onClick,
  className = '',
  as: Component = 'div',
  ariaLabel,
  ...props
}) => {
  // Variantes de estilo
  const variants = {
    flat: 'bg-white',
    elevated: 'bg-white shadow-card',
    outlined: 'bg-white border-2 border-neutral-200',
    ghost: 'bg-transparent',
  };

  // Tamaños de padding (según sistema de 8px)
  const paddings = {
    none: 'p-0',
    sm: 'p-2',      // 8px
    md: 'p-4',      // 16px
    lg: 'p-6',      // 24px
    xl: 'p-8',      // 32px
  };

  // Border radius
  const roundedSizes = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  // Clase base
  const baseClasses = 'transition-all duration-300';

  // Hover effect
  const hoverClasses = hoverable
    ? 'hover:shadow-card-hover cursor-pointer'
    : '';

  // Combinar clases
  const cardClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${paddings[padding]}
    ${roundedSizes[rounded]}
    ${hoverClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Animaciones con Framer Motion
  const motionVariants = {
    initial: { opacity: 1, scale: 1 },
    hover: hoverable ? { scale: 1.02, y: -4 } : {},
    tap: hoverable && onClick ? { scale: 0.98 } : {},
  };

  // Handler
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  // Si es clickeable, puede ser button o div clickeable
  const isClickable = !!onClick;
  const role = isClickable && Component === 'div' ? 'button' : undefined;
  const tabIndex = isClickable && Component === 'div' ? 0 : undefined;

  // Componente con animación
  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      className={cardClasses}
      onClick={isClickable ? handleClick : undefined}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={motionVariants}
      transition={{
        duration: ANIMATIONS.duration.normal / 1000,
        ease: ANIMATIONS.easing.easeInOut,
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

Card.propTypes = {
  /** Contenido de la tarjeta */
  children: PropTypes.node.isRequired,
  
  /** Variante de estilo de la tarjeta */
  variant: PropTypes.oneOf(['flat', 'elevated', 'outlined', 'ghost']),
  
  /** Tamaño del padding interno */
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  
  /** Tamaño del border-radius */
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full']),
  
  /** Activa efectos hover (elevación) */
  hoverable: PropTypes.bool,
  
  /** Función onClick (hace la card clickeable) */
  onClick: PropTypes.func,
  
  /** Clases CSS adicionales */
  className: PropTypes.string,
  
  /** Elemento HTML a renderizar (div, section, article, etc) */
  as: PropTypes.string,
  
  /** Etiqueta ARIA para accesibilidad */
  ariaLabel: PropTypes.string,
};

export default Card;
