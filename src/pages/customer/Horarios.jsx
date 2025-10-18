import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TimeSlot } from '@molecules';
import { Badge, Button } from '@atoms';
import { ChevronLeft, Calendar, Clock, MapPin, Film as FilmIcon } from 'lucide-react';

/**
 * Horarios Page
 * 
 * Muestra los horarios disponibles para una película específica.
 * Permite filtrar por fecha, formato (2D/3D/IMAX/4D/VIP) y sala.
 * Click en horario navega a selección de asientos.
 */
const Horarios = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  // State para filtros
  const [selectedDate, setSelectedDate] = useState('2025-10-17');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  // Mock movie data - TODO: Replace with API call using movieId
  const movie = {
    id: parseInt(movieId),
    title: 'Avengers: Endgame',
    genres: ['Acción', 'Aventura', 'Sci-Fi'],
    duration: 181,
    rating: 8.4,
    posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    director: 'Anthony Russo, Joe Russo',
    cast: 'Robert Downey Jr., Chris Evans, Mark Ruffalo',
    synopsis: 'Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos que destruyó la mitad del universo.',
  };

  // Mock available dates (next 7 days)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date('2025-10-17');
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
        fullDate: date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
      });
    }
    
    return dates;
  }, []);

  // Mock showtimes data - TODO: Replace with API call
  const allShowtimes = [
    // Viernes 17 Oct
    { id: 1, date: '2025-10-17', time: '10:00', sala: 'Sala 1', format: '2D', price: 8.50, available: true },
    { id: 2, date: '2025-10-17', time: '13:00', sala: 'Sala 2', format: '3D', price: 12.00, available: true },
    { id: 3, date: '2025-10-17', time: '16:00', sala: 'Sala 1', format: '2D', price: 8.50, available: true },
    { id: 4, date: '2025-10-17', time: '16:30', sala: 'Sala 3', format: 'IMAX', price: 15.00, available: false },
    { id: 5, date: '2025-10-17', time: '19:00', sala: 'Sala 2', format: '3D', price: 12.00, available: true },
    { id: 6, date: '2025-10-17', time: '19:30', sala: 'Sala 4', format: '4D', price: 18.00, available: true },
    { id: 7, date: '2025-10-17', time: '22:00', sala: 'Sala 1', format: '2D', price: 8.50, available: true },
    { id: 8, date: '2025-10-17', time: '22:30', sala: 'Sala 5', format: 'VIP', price: 20.00, available: true },
    
    // Sábado 18 Oct
    { id: 9, date: '2025-10-18', time: '11:00', sala: 'Sala 1', format: '2D', price: 8.50, available: true },
    { id: 10, date: '2025-10-18', time: '14:00', sala: 'Sala 2', format: '3D', price: 12.00, available: true },
    { id: 11, date: '2025-10-18', time: '17:00', sala: 'Sala 3', format: 'IMAX', price: 15.00, available: true },
    { id: 12, date: '2025-10-18', time: '20:00', sala: 'Sala 4', format: '4D', price: 18.00, available: true },
    { id: 13, date: '2025-10-18', time: '23:00', sala: 'Sala 5', format: 'VIP', price: 20.00, available: true },
    
    // Domingo 19 Oct
    { id: 14, date: '2025-10-19', time: '12:00', sala: 'Sala 1', format: '2D', price: 8.50, available: true },
    { id: 15, date: '2025-10-19', time: '15:00', sala: 'Sala 2', format: '3D', price: 12.00, available: true },
    { id: 16, date: '2025-10-19', time: '18:00', sala: 'Sala 3', format: 'IMAX', price: 15.00, available: false },
    { id: 17, date: '2025-10-19', time: '21:00', sala: 'Sala 4', format: '4D', price: 18.00, available: true },
  ];

  // Filtrar showtimes por fecha y formato
  const filteredShowtimes = useMemo(() => {
    let filtered = allShowtimes.filter(showtime => showtime.date === selectedDate);
    
    if (selectedFormat !== 'all') {
      filtered = filtered.filter(showtime => showtime.format === selectedFormat);
    }
    
    return filtered;
  }, [selectedDate, selectedFormat]);

  // Agrupar por horario (mañana, tarde, noche)
  const groupedShowtimes = useMemo(() => {
    const morning = filteredShowtimes.filter(s => {
      const hour = parseInt(s.time.split(':')[0]);
      return hour < 14;
    });
    
    const afternoon = filteredShowtimes.filter(s => {
      const hour = parseInt(s.time.split(':')[0]);
      return hour >= 14 && hour < 20;
    });
    
    const night = filteredShowtimes.filter(s => {
      const hour = parseInt(s.time.split(':')[0]);
      return hour >= 20;
    });
    
    return { morning, afternoon, night };
  }, [filteredShowtimes]);

  // Stats
  const stats = useMemo(() => {
    const available = filteredShowtimes.filter(s => s.available).length;
    const formats = [...new Set(filteredShowtimes.map(s => s.format))];
    
    return {
      available,
      total: filteredShowtimes.length,
      formats: formats.length,
    };
  }, [filteredShowtimes]);

  // Handlers
  const handleSlotClick = (data) => {
    if (!data.available) return;
    
    setSelectedSlotId(data.id);
    console.log('Selected showtime:', data);
  };

  const handleContinue = () => {
    if (!selectedSlotId) return;
    
    const selectedShowtime = allShowtimes.find(s => s.id === selectedSlotId);
    console.log('Navigating to seat selection for:', selectedShowtime);
    navigate(`/asientos/${selectedSlotId}`);
  };

  const formats = ['all', '2D', '3D', 'IMAX', '4D', 'VIP'];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <Link 
        to="/cartelera" 
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Volver a Cartelera</span>
      </Link>

      {/* Movie Info Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Poster */}
          <div className="md:col-span-1">
            <img 
              src={movie.posterUrl} 
              alt={movie.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map(genre => (
                <Badge key={genre} variant="secondary" size="md">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="space-y-2 text-neutral-700 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-neutral-500" />
                <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
              </div>
              <div className="flex items-center gap-2">
                <FilmIcon className="w-5 h-5 text-neutral-500" />
                <span>Director: {movie.director}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-neutral-500" />
                <span>Reparto: {movie.cast}</span>
              </div>
            </div>

            <p className="text-neutral-600 leading-relaxed">
              {movie.synopsis}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-warning">★</span>
                <span className="text-xl font-bold text-neutral-900">{movie.rating}</span>
                <span className="text-sm text-neutral-500">/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-8">
        {/* Date Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-neutral-900">Selecciona una fecha</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
            {availableDates.map((date) => (
              <button
                key={date.value}
                onClick={() => {
                  setSelectedDate(date.value);
                  setSelectedSlotId(null);
                }}
                className={`
                  p-3 rounded-lg border-2 transition-all font-medium text-sm
                  ${selectedDate === date.value
                    ? 'border-primary bg-primary text-white shadow-md'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary hover:bg-primary-light'
                  }
                `}
              >
                {date.label}
              </button>
            ))}
          </div>

          {selectedDate && (
            <p className="mt-3 text-sm text-neutral-600">
              <Calendar className="w-4 h-4 inline mr-1" />
              {availableDates.find(d => d.value === selectedDate)?.fullDate}
            </p>
          )}
        </div>

        {/* Format Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FilmIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-neutral-900">Formato</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formats.map((format) => (
              <button
                key={format}
                onClick={() => {
                  setSelectedFormat(format);
                  setSelectedSlotId(null);
                }}
                className={`
                  px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm
                  ${selectedFormat === format
                    ? 'border-primary bg-primary text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary hover:bg-primary-light'
                  }
                `}
              >
                {format === 'all' ? 'Todos los Formatos' : format}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-neutral-600">{stats.available} funciones disponibles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-400"></div>
              <span className="text-neutral-600">{stats.total - stats.available} agotadas</span>
            </div>
            <div className="flex items-center gap-2">
              <FilmIcon className="w-4 h-4 text-primary" />
              <span className="text-neutral-600">{stats.formats} formatos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Grid */}
      {filteredShowtimes.length > 0 ? (
        <>
          {/* Morning */}
          {groupedShowtimes.morning.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Mañana (antes de 14:00)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedShowtimes.morning.map((showtime) => (
                  <TimeSlot
                    key={showtime.id}
                    {...showtime}
                    selected={selectedSlotId === showtime.id}
                    onClick={handleSlotClick}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Afternoon */}
          {groupedShowtimes.afternoon.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-info" />
                Tarde (14:00 - 20:00)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedShowtimes.afternoon.map((showtime) => (
                  <TimeSlot
                    key={showtime.id}
                    {...showtime}
                    selected={selectedSlotId === showtime.id}
                    onClick={handleSlotClick}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Night */}
          {groupedShowtimes.night.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Noche (después de 20:00)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {groupedShowtimes.night.map((showtime) => (
                  <TimeSlot
                    key={showtime.id}
                    {...showtime}
                    selected={selectedSlotId === showtime.id}
                    onClick={handleSlotClick}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
          <Clock className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
            No hay funciones disponibles
          </h3>
          <p className="text-neutral-600 mb-6">
            No encontramos funciones para la fecha y formato seleccionados.
            Intenta con otra combinación.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedDate(availableDates[0].value);
              setSelectedFormat('all');
            }}
          >
            Restablecer Filtros
          </Button>
        </div>
      )}

      {/* Continue Button (Sticky) */}
      {selectedSlotId && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg p-4 z-30">
          <div className="container mx-auto max-w-7xl flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Función seleccionada</p>
              <p className="font-semibold text-neutral-900">
                {allShowtimes.find(s => s.id === selectedSlotId)?.time} - {allShowtimes.find(s => s.id === selectedSlotId)?.sala}
              </p>
            </div>
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleContinue}
            >
              Seleccionar Asientos →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Horarios;
