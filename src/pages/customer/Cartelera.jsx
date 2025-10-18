import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieGrid } from '@organisms';
import PropTypes from 'prop-types';

/**
 * Cartelera Page
 * 
 * Página principal que muestra todas las películas disponibles.
 * Permite filtrar por género, rating, búsqueda, y ordenar.
 * Incluye paginación para grandes catálogos.
 */
const Cartelera = ({ searchQuery = '' }) => {
  const navigate = useNavigate();

  // State para filtros
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('releaseDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Mock data - TODO: Replace with API call
  const allMovies = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      genres: ['Acción', 'Aventura', 'Sci-Fi'],
      duration: 181,
      rating: 8.4,
      posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      releaseDate: '2019-04-26',
      description: 'Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos.',
      isAvailable: true,
    },
    {
      id: 2,
      title: 'The Batman',
      genres: ['Acción', 'Crimen', 'Drama'],
      duration: 176,
      rating: 7.9,
      posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
      releaseDate: '2022-03-04',
      description: 'Bruce Wayne lucha contra la corrupción en Gotham City mientras enfrenta a un asesino enigmático.',
      isAvailable: true,
    },
    {
      id: 3,
      title: 'Avatar: El Camino del Agua',
      genres: ['Aventura', 'Sci-Fi', 'Acción'],
      duration: 192,
      rating: 7.6,
      posterUrl: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      releaseDate: '2022-12-16',
      description: 'Jake Sully y Neytiri han formado una familia y hacen todo lo posible por permanecer juntos.',
      isAvailable: true,
    },
    {
      id: 4,
      title: 'Top Gun: Maverick',
      genres: ['Acción', 'Drama'],
      duration: 131,
      rating: 8.3,
      posterUrl: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
      releaseDate: '2022-05-27',
      description: 'Después de más de 30 años de servicio, Pete "Maverick" Mitchell sigue siendo uno de los mejores pilotos de la Marina.',
      isAvailable: true,
    },
    {
      id: 5,
      title: 'Spider-Man: No Way Home',
      genres: ['Acción', 'Aventura', 'Sci-Fi'],
      duration: 148,
      rating: 8.2,
      posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      releaseDate: '2021-12-17',
      description: 'Peter Parker busca la ayuda del Doctor Strange cuando su identidad como Spider-Man es revelada.',
      isAvailable: true,
    },
    {
      id: 6,
      title: 'Dune',
      genres: ['Aventura', 'Sci-Fi', 'Drama'],
      duration: 155,
      rating: 8.0,
      posterUrl: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      releaseDate: '2021-10-22',
      description: 'Paul Atreides viaja al planeta más peligroso del universo para asegurar el futuro de su familia y su pueblo.',
      isAvailable: true,
    },
    {
      id: 7,
      title: 'Oppenheimer',
      genres: ['Drama', 'Historia'],
      duration: 180,
      rating: 8.5,
      posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      releaseDate: '2023-07-21',
      description: 'La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.',
      isAvailable: true,
    },
    {
      id: 8,
      title: 'Barbie',
      genres: ['Comedia', 'Aventura', 'Fantasía'],
      duration: 114,
      rating: 7.1,
      posterUrl: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
      releaseDate: '2023-07-21',
      description: 'Barbie y Ken tienen el día de sus vidas en el mundo de Barbie Land, pero cuando tienen la oportunidad de ir al mundo real, descubren las alegrías y los peligros de vivir entre humanos.',
      isAvailable: true,
    },
    {
      id: 9,
      title: 'Interestelar',
      genres: ['Aventura', 'Drama', 'Sci-Fi'],
      duration: 169,
      rating: 8.6,
      posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      releaseDate: '2014-11-07',
      description: 'Un grupo de exploradores hace uso de un agujero de gusano recién descubierto para superar las limitaciones de los viajes espaciales humanos.',
      isAvailable: true,
    },
    {
      id: 10,
      title: 'Inception',
      genres: ['Acción', 'Sci-Fi', 'Thriller'],
      duration: 148,
      rating: 8.8,
      posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      releaseDate: '2010-07-16',
      description: 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea en la mente de un CEO.',
      isAvailable: true,
    },
    {
      id: 11,
      title: 'The Dark Knight',
      genres: ['Acción', 'Crimen', 'Drama'],
      duration: 152,
      rating: 9.0,
      posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      releaseDate: '2008-07-18',
      description: 'Batman se enfrenta al Joker, un criminal que quiere sumir a Gotham City en la anarquía.',
      isAvailable: true,
    },
    {
      id: 12,
      title: 'Guardianes de la Galaxia Vol. 3',
      genres: ['Acción', 'Aventura', 'Comedia'],
      duration: 150,
      rating: 8.0,
      posterUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      releaseDate: '2023-05-05',
      description: 'Los Guardianes emprenden una misión peligrosa para proteger a uno de los suyos.',
      isAvailable: true,
    },
    {
      id: 13,
      title: 'John Wick: Capítulo 4',
      genres: ['Acción', 'Thriller', 'Crimen'],
      duration: 169,
      rating: 7.8,
      posterUrl: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
      releaseDate: '2023-03-24',
      description: 'John Wick descubre un camino para derrotar a la Mesa Alta, pero antes deberá enfrentarse a un nuevo enemigo.',
      isAvailable: true,
    },
    {
      id: 14,
      title: 'El Juego del Miedo X',
      genres: ['Terror', 'Thriller', 'Misterio'],
      duration: 118,
      rating: 5.7,
      posterUrl: 'https://image.tmdb.org/t/p/w500/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg',
      releaseDate: '2023-09-29',
      description: 'Un nuevo juego retorcido pone a prueba la voluntad de supervivencia de un grupo de desconocidos.',
      isAvailable: true,
    },
    {
      id: 15,
      title: 'Rápidos y Furiosos X',
      genres: ['Acción', 'Crimen', 'Thriller'],
      duration: 141,
      rating: 5.9,
      posterUrl: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      releaseDate: '2023-05-19',
      description: 'Dom Toretto y su familia deben enfrentarse al oponente más letal que jamás hayan enfrentado.',
      isAvailable: true,
    },
    {
      id: 16,
      title: 'La Sirenita',
      genres: ['Fantasía', 'Aventura', 'Familia'],
      duration: 135,
      rating: 7.0,
      posterUrl: 'https://image.tmdb.org/t/p/w500/ym1dxyOk4jFcSl4Q2zmRrA5SIDO.jpg',
      releaseDate: '2023-05-26',
      description: 'La joven sirena Ariel hace un trato para cambiar su cola por piernas y explorar el mundo sobre el agua.',
      isAvailable: true,
    },
    {
      id: 17,
      title: 'Misión: Imposible - Sentencia Mortal Parte Uno',
      genres: ['Acción', 'Thriller', 'Aventura'],
      duration: 163,
      rating: 7.7,
      posterUrl: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
      releaseDate: '2023-07-14',
      description: 'Ethan Hunt y su equipo deben rastrear una aterradora nueva arma que amenaza a toda la humanidad.',
      isAvailable: true,
    },
    {
      id: 18,
      title: 'Próximamente: Dune Parte 2',
      genres: ['Aventura', 'Sci-Fi', 'Drama'],
      duration: 166,
      rating: 0,
      posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      releaseDate: '2024-03-01',
      description: 'Paul Atreides se une a Chani y los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.',
      isAvailable: false,
    },
  ];

  // Extraer todos los géneros disponibles
  const availableGenres = useMemo(() => {
    const genresSet = new Set();
    allMovies.forEach(movie => {
      movie.genres.forEach(genre => genresSet.add(genre));
    });
    return Array.from(genresSet).sort();
  }, []);

  // Filtrar películas
  const filteredMovies = useMemo(() => {
    let filtered = [...allMovies];

    // Filtro por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por géneros seleccionados
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        selectedGenres.some(genre => movie.genres.includes(genre))
      );
    }

    // Filtro por rating mínimo
    if (minRating > 0) {
      filtered = filtered.filter(movie => movie.rating >= minRating);
    }

    return filtered;
  }, [searchQuery, selectedGenres, minRating]);

  // Ordenar películas
  const sortedMovies = useMemo(() => {
    const sorted = [...filteredMovies];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'releaseDate':
          comparison = new Date(a.releaseDate) - new Date(b.releaseDate);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [filteredMovies, sortBy, sortOrder]);

  // Paginación
  const totalPages = Math.ceil(sortedMovies.length / pageSize);
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedMovies.slice(startIndex, startIndex + pageSize);
  }, [sortedMovies, currentPage, pageSize]);

  // Handlers
  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
    setCurrentPage(1); // Reset a primera página
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
    // Navigate to horarios page
    navigate(`/horarios/${movie.id}`);
  };

  const handleViewSchedule = (movie) => {
    console.log('View schedule for:', movie);
    navigate(`/horarios/${movie.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">
          Cartelera de Cine
        </h1>
        <p className="text-lg text-neutral-600">
          Descubre las mejores películas en cartelera. Filtra, ordena y encuentra tu próxima película favorita.
        </p>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-primary-light rounded-lg border border-primary">
          <p className="text-primary font-medium">
            Mostrando resultados para: <span className="font-bold">&quot;{searchQuery}&quot;</span>
          </p>
          <p className="text-sm text-primary mt-1">
            {filteredMovies.length} película{filteredMovies.length !== 1 ? 's' : ''} encontrada{filteredMovies.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* MovieGrid Component */}
      <MovieGrid
        movies={paginatedMovies}
        loading={false}
        // Filtering props
        availableGenres={availableGenres}
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
        minRating={minRating}
        onRatingChange={handleRatingChange}
        searchQuery={searchQuery}
        // Sorting props
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        // Pagination props
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        // Display props
        showFilters={true}
        emptyMessage={
          searchQuery
            ? `No se encontraron películas para "${searchQuery}"`
            : selectedGenres.length > 0 || minRating > 0
            ? 'No hay películas que coincidan con los filtros seleccionados'
            : 'No hay películas disponibles en este momento'
        }
        // Event handlers
        onMovieClick={handleMovieClick}
        onViewSchedule={handleViewSchedule}
      />

      {/* Stats Footer */}
      <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">{allMovies.filter(m => m.isAvailable).length}</p>
            <p className="text-sm text-neutral-600 mt-1">Películas Disponibles</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-info">{availableGenres.length}</p>
            <p className="text-sm text-neutral-600 mt-1">Géneros</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-success">
              {(allMovies.reduce((sum, m) => sum + m.rating, 0) / allMovies.filter(m => m.rating > 0).length).toFixed(1)}
            </p>
            <p className="text-sm text-neutral-600 mt-1">Rating Promedio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Cartelera.propTypes = {
  searchQuery: PropTypes.string,
};

export default Cartelera;
