import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MovieCard } from '@molecules';
import { Button, Badge } from '@atoms';
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

/**
 * MovieGrid Component - Organism del Design System
 * 
 * Grid de películas con filtering, sorting y pagination.
 * Combina MovieCard + Filters + Pagination.
 * 
 * @component
 * @example
 * <MovieGrid
 *   movies={moviesData}
 *   onMovieClick={(movie) => navigate(`/movie/${movie.id}`)}
 *   onViewSchedule={(movie) => navigate(`/schedules/${movie.id}`)}
 * />
 */
const MovieGrid = ({
  movies = [],
  loading = false,
  onMovieClick,
  onViewSchedule,
  // Filtering
  availableGenres = [],
  selectedGenres = [],
  onGenreToggle,
  minRating = 0,
  onRatingChange,
  searchQuery = '',
  onSearchChange,
  // Sorting
  sortBy = 'releaseDate',
  sortOrder = 'desc',
  onSortChange,
  // Pagination
  currentPage = 1,
  totalPages = 1,
  pageSize = 12,
  onPageChange,
  // Display
  showFilters = true,
  emptyMessage = 'No se encontraron películas',
  className = '',
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Skeleton loader
  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(pageSize)].map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="animate-pulse"
        >
          <div className="bg-neutral-200 rounded-2xl h-96" />
        </div>
      ))}
    </div>
  );

  // Empty state
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <p className="text-neutral-500 text-lg mb-4">{emptyMessage}</p>
      {(selectedGenres.length > 0 || minRating > 0 || searchQuery) && (
        <Button
          variant="outline"
          onClick={() => {
            onGenreToggle?.([]);
            onRatingChange?.(0);
            onSearchChange?.('');
          }}
        >
          Limpiar filtros
        </Button>
      )}
    </motion.div>
  );

  // Sort options
  const sortOptions = [
    { value: 'releaseDate-desc', label: 'Más recientes' },
    { value: 'releaseDate-asc', label: 'Más antiguas' },
    { value: 'rating-desc', label: 'Mejor calificadas' },
    { value: 'rating-asc', label: 'Peor calificadas' },
    { value: 'title-asc', label: 'Título A-Z' },
    { value: 'title-desc', label: 'Título Z-A' },
  ];

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('-');
    onSortChange?.(field, order);
  };

  // Rating stars
  const renderRatingFilter = () => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-700">
        Calificación mínima
      </label>
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onRatingChange?.(rating)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
              ${minRating === rating
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }
            `}
          >
            {rating === 0 ? 'Todas' : `${rating}★`}
          </button>
        ))}
      </div>
    </div>
  );

  // Genre filters
  const renderGenreFilters = () => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-neutral-700">
        Géneros
      </label>
      <div className="flex flex-wrap gap-2">
        {availableGenres.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <Badge
              key={genre}
              variant={isSelected ? 'primary' : 'default'}
              clickable
              onClick={() => {
                if (isSelected) {
                  onGenreToggle?.(selectedGenres.filter(g => g !== genre));
                } else {
                  onGenreToggle?.([...selectedGenres, genre]);
                }
              }}
              className="cursor-pointer"
            >
              {genre}
              {isSelected && <X className="h-3 w-3 ml-1" />}
            </Badge>
          );
        })}
      </div>
    </div>
  );

  // Filters panel
  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <motion.div
        initial={false}
        animate={{ height: filtersOpen ? 'auto' : 0, opacity: filtersOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="bg-neutral-50 rounded-2xl p-6 mb-6 space-y-6">
          {/* Rating filter */}
          {renderRatingFilter()}

          {/* Genre filters */}
          {availableGenres.length > 0 && renderGenreFilters()}

          {/* Active filters count */}
          {(selectedGenres.length > 0 || minRating > 0) && (
            <div className="pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">
                  {selectedGenres.length + (minRating > 0 ? 1 : 0)} filtros activos
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onGenreToggle?.([]);
                    onRatingChange?.(0);
                  }}
                >
                  Limpiar todo
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Pagination
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          icon={ChevronLeft}
          iconPosition="left"
        >
          Anterior
        </Button>

        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            // Show first, last, current, and adjacent pages
            const showPage =
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1;

            if (!showPage) {
              if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 text-neutral-400">...</span>;
              }
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`
                  w-10 h-10 rounded-lg font-medium transition-all duration-200
                  ${page === currentPage
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={ChevronRight}
          iconPosition="right"
        >
          Siguiente
        </Button>
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Header: Sort + Filter toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-neutral-900">
            Cartelera
          </h2>
          {!loading && movies.length > 0 && (
            <span className="text-sm text-neutral-500">
              {movies.length} películas
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={handleSortChange}
            className="px-4 py-2 rounded-lg border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Filter toggle */}
          {showFilters && (
            <Button
              variant={filtersOpen ? 'primary' : 'outline'}
              size="md"
              icon={Filter}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Filters panel */}
      {renderFilters()}

      {/* Grid */}
      {loading ? (
        renderSkeletons()
      ) : movies.length === 0 ? (
        renderEmptyState()
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard
                {...movie}
                onClick={() => onMovieClick?.(movie)}
                onViewSchedule={() => onViewSchedule?.(movie)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

MovieGrid.propTypes = {
  /** Array de películas a mostrar */
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string,
    rating: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
    releaseDate: PropTypes.string,
    isAvailable: PropTypes.bool,
  })),
  /** Si está cargando */
  loading: PropTypes.bool,
  /** Callback al hacer click en una película */
  onMovieClick: PropTypes.func,
  /** Callback al hacer click en "Ver Horarios" */
  onViewSchedule: PropTypes.func,
  /** Géneros disponibles para filtrar */
  availableGenres: PropTypes.arrayOf(PropTypes.string),
  /** Géneros seleccionados */
  selectedGenres: PropTypes.arrayOf(PropTypes.string),
  /** Callback al cambiar géneros */
  onGenreToggle: PropTypes.func,
  /** Rating mínimo seleccionado */
  minRating: PropTypes.number,
  /** Callback al cambiar rating */
  onRatingChange: PropTypes.func,
  /** Query de búsqueda */
  searchQuery: PropTypes.string,
  /** Callback al cambiar búsqueda */
  onSearchChange: PropTypes.func,
  /** Campo de ordenamiento */
  sortBy: PropTypes.oneOf(['releaseDate', 'rating', 'title']),
  /** Orden de ordenamiento */
  sortOrder: PropTypes.oneOf(['asc', 'desc']),
  /** Callback al cambiar ordenamiento */
  onSortChange: PropTypes.func,
  /** Página actual */
  currentPage: PropTypes.number,
  /** Total de páginas */
  totalPages: PropTypes.number,
  /** Tamaño de página */
  pageSize: PropTypes.number,
  /** Callback al cambiar página */
  onPageChange: PropTypes.func,
  /** Si muestra panel de filtros */
  showFilters: PropTypes.bool,
  /** Mensaje cuando no hay resultados */
  emptyMessage: PropTypes.string,
  /** Clases CSS adicionales */
  className: PropTypes.string,
};

export default MovieGrid;
