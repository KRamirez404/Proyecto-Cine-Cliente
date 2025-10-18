import PropTypes from 'prop-types';
import { Card, Badge, Button } from '@atoms';
import { Clock, Star, Calendar } from 'lucide-react';

/**
 * MovieCard Component - Molecule del Design System
 * 
 * Tarjeta de película que combina Card, Badge y Button.
 * Muestra información completa de una película con poster, título, géneros, rating.
 * 
 * @component
 * @example
 * <MovieCard
 *   title="Avatar: El Camino del Agua"
 *   genres={['accion', 'scifi']}
 *   duration={192}
 *   rating={4.5}
 *   posterUrl="/posters/avatar.jpg"
 *   releaseDate="2022-12-16"
 *   onViewSchedule={() => console.log('Ver horarios')}
 * />
 */
const MovieCard = ({
  id,
  title,
  genres = [],
  duration,
  rating,
  posterUrl,
  releaseDate,
  description,
  isAvailable = true,
  onViewSchedule,
  onClick,
  className = '',
  showScheduleButton = true,
  ...props
}) => {
  // Formatear duración (minutos a horas y minutos)
  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handler para click en la card
  const handleCardClick = () => {
    if (onClick) onClick({ id, title });
  };

  // Handler para botón de horarios
  const handleScheduleClick = (e) => {
    e.stopPropagation(); // Evitar que dispare el onClick de la card
    if (onViewSchedule) onViewSchedule({ id, title });
  };

  return (
    <Card
      variant="elevated"
      padding="none"
      hoverable
      onClick={onClick ? handleCardClick : undefined}
      className={`overflow-hidden group ${className}`}
      ariaLabel={`Película: ${title}`}
      {...props}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] bg-neutral-200 overflow-hidden">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster de ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-300 to-neutral-400">
            <span className="text-neutral-500 text-sm text-center px-4">
              Sin poster
            </span>
          </div>
        )}

        {/* Rating Badge (overlay) */}
        {rating && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="h-4 w-4 text-accent fill-accent" aria-hidden="true" />
            <span className="text-white text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Disponibilidad Badge */}
        {!isAvailable && (
          <div className="absolute top-2 left-2">
            <Badge variant="error" size="sm">Próximamente</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg text-neutral-900 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {genres.slice(0, 3).map((genre, index) => (
              <Badge key={index} variant={genre} size="sm">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </Badge>
            ))}
            {genres.length > 3 && (
              <Badge variant="default" size="sm">
                +{genres.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-3 text-sm text-neutral-600">
          {/* Duration */}
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{formatDuration(duration)}</span>
            </div>
          )}

          {/* Release Date */}
          {releaseDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs">{formatDate(releaseDate).split(' ')[2]}</span>
            </div>
          )}
        </div>

        {/* Description (opcional) */}
        {description && (
          <p className="text-sm text-neutral-600 line-clamp-2">
            {description}
          </p>
        )}

        {/* Action Button */}
        {showScheduleButton && isAvailable && (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleScheduleClick}
          >
            Ver Horarios
          </Button>
        )}

        {!isAvailable && (
          <Button
            variant="outline"
            size="sm"
            fullWidth
            disabled
          >
            Próximamente
          </Button>
        )}
      </div>
    </Card>
  );
};

MovieCard.propTypes = {
  /** ID único de la película */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  /** Título de la película */
  title: PropTypes.string.isRequired,
  
  /** Array de géneros (accion, comedia, drama, terror, scifi, romance, infantil) */
  genres: PropTypes.arrayOf(PropTypes.string),
  
  /** Duración en minutos */
  duration: PropTypes.number,
  
  /** Rating (1-5) */
  rating: PropTypes.number,
  
  /** URL del poster */
  posterUrl: PropTypes.string,
  
  /** Fecha de estreno (ISO string) */
  releaseDate: PropTypes.string,
  
  /** Descripción breve */
  description: PropTypes.string,
  
  /** Si la película está disponible para ver */
  isAvailable: PropTypes.bool,
  
  /** Callback al hacer click en "Ver Horarios" */
  onViewSchedule: PropTypes.func,
  
  /** Callback al hacer click en la card */
  onClick: PropTypes.func,
  
  /** Clases CSS adicionales */
  className: PropTypes.string,
  
  /** Mostrar botón de horarios */
  showScheduleButton: PropTypes.bool,
};

export default MovieCard;
