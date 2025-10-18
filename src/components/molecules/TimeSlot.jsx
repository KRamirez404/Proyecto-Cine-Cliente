import PropTypes from 'prop-types';
import { Button, Badge } from '@atoms';
import { Clock, MapPin, Film } from 'lucide-react';

/**
 * TimeSlot Component - Molecule del Design System
 * 
 * Slot de horario para selección de funciones de cine.
 * Combina Button + Badge mostrando horario, sala, formato y precio.
 * 
 * @component
 * @example
 * <TimeSlot
 *   time="18:30"
 *   sala="Sala 1"
 *   format="3D"
 *   price={12.50}
 *   available={true}
 *   selected={false}
 *   onClick={() => console.log('Slot selected')}
 * />
 */
const TimeSlot = ({
  id,
  time,
  sala,
  format = '2D',
  price,
  available = true,
  selected = false,
  onClick,
  className = '',
  showDetails = true,
  size = 'md',
  ...props
}) => {
  // Formatear precio
  const formatPrice = (amount) => {
    if (amount === undefined || amount === null) return '';
    return `$${amount.toFixed(2)}`;
  };

  // Determinar variante del botón según estado
  const getButtonVariant = () => {
    if (!available) return 'outline';
    if (selected) return 'primary';
    return 'secondary';
  };

  // Determinar variante del badge de formato
  const getFormatColor = () => {
    switch (format.toUpperCase()) {
      case '3D':
        return 'info';
      case 'IMAX':
        return 'warning';
      case '4D':
        return 'success';
      default:
        return 'default';
    }
  };

  // Handler de click
  const handleClick = () => {
    if (available && onClick) {
      onClick({ id, time, sala, format, price });
    }
  };

  return (
    <Button
      variant={getButtonVariant()}
      size={size}
      onClick={handleClick}
      disabled={!available}
      className={`relative ${selected ? 'ring-2 ring-primary ring-offset-2' : ''} ${className}`}
      aria-label={`Función a las ${time}, ${sala}, formato ${format}, precio ${formatPrice(price)}${!available ? ' - No disponible' : ''}${selected ? ' - Seleccionado' : ''}`}
      {...props}
    >
      <div className="flex items-center gap-3">
        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span className="font-semibold text-base">{time}</span>
        </div>

        {showDetails && (
          <>
            {/* Divider */}
            <div className="h-6 w-px bg-current opacity-20" aria-hidden="true" />

            {/* Details */}
            <div className="flex items-center gap-2">
              {/* Sala */}
              {sala && (
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{sala}</span>
                </div>
              )}

              {/* Format Badge */}
              {format && (
                <Badge variant={getFormatColor()} size="sm">
                  <Film className="h-3 w-3 mr-1" aria-hidden="true" />
                  {format.toUpperCase()}
                </Badge>
              )}

              {/* Price */}
              {price !== undefined && price !== null && (
                <span className="font-bold text-sm ml-1">
                  {formatPrice(price)}
                </span>
              )}
            </div>
          </>
        )}

        {/* Selected indicator */}
        {selected && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white" aria-hidden="true" />
        )}

        {/* Not available overlay */}
        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/80 rounded-lg">
            <span className="text-xs font-medium text-neutral-600">Agotado</span>
          </div>
        )}
      </div>
    </Button>
  );
};

TimeSlot.propTypes = {
  /** ID único del slot */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  /** Hora de la función (formato HH:MM) */
  time: PropTypes.string.isRequired,
  
  /** Nombre de la sala */
  sala: PropTypes.string,
  
  /** Formato de proyección (2D, 3D, IMAX, 4D) */
  format: PropTypes.oneOf(['2D', '3D', 'IMAX', '4D', 'VIP']),
  
  /** Precio del ticket */
  price: PropTypes.number,
  
  /** Si el slot está disponible */
  available: PropTypes.bool,
  
  /** Si el slot está seleccionado */
  selected: PropTypes.bool,
  
  /** Callback al hacer click */
  onClick: PropTypes.func,
  
  /** Clases CSS adicionales */
  className: PropTypes.string,
  
  /** Mostrar detalles (sala, formato, precio) */
  showDetails: PropTypes.bool,
  
  /** Tamaño del componente */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default TimeSlot;
