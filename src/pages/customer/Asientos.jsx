import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Badge } from '@atoms';
import { ChevronLeft, Clock, MapPin, Film, Armchair, DollarSign } from 'lucide-react';

/**
 * Asientos Page
 * 
 * Selección interactiva de asientos para una función específica.
 * Grid 2D: 10 filas (A-J) x 12 columnas (1-12) = 120 asientos.
 * Estados: available, selected, occupied.
 * Multi-select con click toggle.
 */
const Asientos = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  // Mock showtime data - TODO: Replace with API call
  const showtime = {
    id: parseInt(showtimeId),
    movieTitle: 'Avengers: Endgame',
    date: '2025-10-17',
    time: '19:00',
    sala: 'Sala 2',
    format: '3D',
    price: 12.00,
  };

  // Generate seat map (10 rows x 12 columns)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // Mock occupied seats - TODO: Replace with API call
  const occupiedSeats = [
    'A5', 'A6', 'B4', 'B5', 'B6', 'B7',
    'C6', 'D5', 'D6', 'D7',
    'E4', 'E5', 'E6', 'E7', 'E8',
    'F8', 'G7', 'G8', 'G9',
    'H5', 'H6', 'I5', 'I6', 'I7',
  ];

  // State: selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Helper function to get seat ID
  const getSeatId = (row, col) => `${row}${col}`;

  // Check if seat is occupied
  const isSeatOccupied = (seatId) => occupiedSeats.includes(seatId);

  // Check if seat is selected
  const isSeatSelected = (seatId) => selectedSeats.includes(seatId);

  // Toggle seat selection
  const handleSeatClick = (seatId) => {
    if (isSeatOccupied(seatId)) return; // Can't select occupied seats

    setSelectedSeats(prev => 
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId) // Deselect
        : [...prev, seatId] // Select
    );
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    return selectedSeats.length * showtime.price;
  }, [selectedSeats.length, showtime.price]);

  // Handle continue to checkout
  const handleContinue = () => {
    if (selectedSeats.length === 0) return;

    console.log('Proceeding to checkout with:', {
      showtime,
      seats: selectedSeats,
      totalPrice,
    });

    // TODO: Store in cart/state management (Zustand)
    navigate('/compra', {
      state: {
        showtime,
        seats: selectedSeats,
        totalPrice,
      },
    });
  };

  // Get seat styling
  const getSeatClasses = (seatId) => {
    const baseClasses = 'w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg transition-all cursor-pointer flex items-center justify-center text-xs font-medium';
    
    if (isSeatOccupied(seatId)) {
      return `${baseClasses} bg-neutral-300 text-neutral-500 cursor-not-allowed hover:bg-neutral-300`;
    }
    
    if (isSeatSelected(seatId)) {
      return `${baseClasses} bg-primary text-white shadow-lg scale-110 border-2 border-primary`;
    }
    
    return `${baseClasses} bg-success text-white hover:bg-success-dark hover:scale-105`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <Link 
        to={`/horarios/${showtime.id}`} 
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Volver a Horarios</span>
      </Link>

      {/* Showtime Info Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">{showtime.movieTitle}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{new Date(showtime.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} - {showtime.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{showtime.sala}</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-primary" />
                <Badge variant="info" size="sm">{showtime.format}</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-600 mb-1">Precio por asiento</p>
            <p className="text-3xl font-bold text-primary">${showtime.price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-info-light rounded-lg p-4 mb-6 border border-info">
        <div className="flex items-start gap-3">
          <Armchair className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-info font-medium mb-1">Selecciona tus asientos</p>
            <p className="text-sm text-info">
              Haz click en los asientos disponibles para seleccionarlos. Puedes seleccionar varios asientos. Los asientos ocupados no pueden ser seleccionados.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            {/* Screen */}
            <div className="mb-8">
              <div className="bg-gradient-to-b from-neutral-800 to-neutral-600 text-white text-center py-3 rounded-lg shadow-lg">
                <p className="text-sm font-medium tracking-wider">PANTALLA</p>
              </div>
              <div className="h-2 bg-gradient-to-b from-neutral-600 to-transparent opacity-30"></div>
            </div>

            {/* Seat Grid */}
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                {/* Column Numbers */}
                <div className="flex mb-2">
                  <div className="w-8 sm:w-10"></div> {/* Space for row labels */}
                  {columns.map(col => (
                    <div key={col} className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xs font-medium text-neutral-500">
                      {col}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {rows.map((row) => (
                  <div key={row} className="flex mb-1">
                    {/* Row Label */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-bold text-neutral-700">
                      {row}
                    </div>

                    {/* Seats */}
                    {columns.map(col => {
                      const seatId = getSeatId(row, col);
                      const isOccupied = isSeatOccupied(seatId);
                      const isSelected = isSeatSelected(seatId);

                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={isOccupied}
                          className={getSeatClasses(seatId)}
                          title={`Asiento ${seatId} - ${isOccupied ? 'Ocupado' : isSelected ? 'Seleccionado' : 'Disponible'}`}
                          aria-label={`Asiento ${seatId}`}
                        >
                          {/* Icon based on state */}
                          {isOccupied ? '✕' : isSelected ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <p className="text-sm font-semibold text-neutral-900 mb-3">Leyenda</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-success text-white rounded-t-lg flex items-center justify-center">
                    <Armchair className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-neutral-700">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary text-white rounded-t-lg flex items-center justify-center shadow-lg border-2 border-primary">
                    ✓
                  </div>
                  <span className="text-sm text-neutral-700">Seleccionado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-neutral-300 text-neutral-500 rounded-t-lg flex items-center justify-center">
                    ✕
                  </div>
                  <span className="text-sm text-neutral-700">Ocupado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Armchair className="w-5 h-5 text-primary" />
              Resumen de Selección
            </h3>

            {/* Selected Seats List */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-neutral-700 mb-2">
                Asientos seleccionados ({selectedSeats.length})
              </p>
              
              {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.sort().map(seatId => (
                    <Badge key={seatId} variant="primary" size="md">
                      {seatId}
                      <button
                        onClick={() => handleSeatClick(seatId)}
                        className="ml-2 hover:text-error transition-colors"
                        aria-label={`Quitar asiento ${seatId}`}
                      >
                        ✕
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500 italic">
                  No has seleccionado ningún asiento
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-neutral-200 pt-4 mb-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Precio por asiento</span>
                  <span className="font-medium text-neutral-900">${showtime.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Cantidad</span>
                  <span className="font-medium text-neutral-900">× {selectedSeats.length}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                <span className="text-lg font-bold text-neutral-900">Total</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-success" />
                  <span className="text-2xl font-bold text-success">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
            >
              {selectedSeats.length === 0 
                ? 'Selecciona asientos'
                : 'Continuar con la Compra →'
              }
            </Button>

            {/* Info */}
            <p className="text-xs text-neutral-500 mt-4 text-center">
              Puedes cambiar tu selección en cualquier momento
            </p>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-success">{120 - occupiedSeats.length}</p>
            <p className="text-sm text-neutral-600 mt-1">Asientos Disponibles</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-400">{occupiedSeats.length}</p>
            <p className="text-sm text-neutral-600 mt-1">Asientos Ocupados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{selectedSeats.length}</p>
            <p className="text-sm text-neutral-600 mt-1">Asientos Seleccionados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">{Math.round((occupiedSeats.length / 120) * 100)}%</p>
            <p className="text-sm text-neutral-600 mt-1">Ocupación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asientos;
