import { useState, useEffect, useMemo } from 'react';
import {
  Film,
  Clock,
  User,
  CreditCard,
  DollarSign,
  Printer,
  RefreshCw,
  CheckCircle,
  ShoppingCart,
  Wallet,
  QrCode,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Receipt,
  AlertCircle,
  Armchair
} from 'lucide-react';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Badge from '../../components/atoms/Badge';
import Modal from '../../components/molecules/Modal';

// Mock Movies con horarios HOY
const MOCK_MOVIES = [
  {
    id: 1,
    titulo: 'Oppenheimer',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    duracion: 180,
    sala: 'Sala VIP 1',
    precio: 85,
    horarios: ['10:00', '14:30', '18:00', '21:30']
  },
  {
    id: 2,
    titulo: 'Barbie',
    poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    duracion: 114,
    sala: 'Sala 2',
    precio: 70,
    horarios: ['11:00', '13:30', '16:00', '19:00', '21:30']
  },
  {
    id: 3,
    titulo: 'Dune: Part Two',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    duracion: 166,
    sala: 'Sala IMAX',
    precio: 95,
    horarios: ['12:00', '15:30', '19:00', '22:00']
  },
  {
    id: 4,
    titulo: 'Spider-Man: Across the Spider-Verse',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    duracion: 140,
    sala: 'Sala 3',
    precio: 75,
    horarios: ['10:30', '13:00', '15:30', '18:00', '20:30']
  },
  {
    id: 5,
    titulo: 'Guardians of the Galaxy Vol. 3',
    poster: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    duracion: 150,
    sala: 'Sala 4',
    precio: 70,
    horarios: ['11:30', '14:00', '17:00', '20:00']
  },
  {
    id: 6,
    titulo: 'The Flash',
    poster: 'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    duracion: 144,
    sala: 'Sala 5',
    precio: 65,
    horarios: ['12:30', '15:00', '18:00', '21:00']
  },
  {
    id: 7,
    titulo: 'Indiana Jones and the Dial of Destiny',
    poster: 'https://image.tmdb.org/t/p/w500/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg',
    duracion: 154,
    sala: 'Sala 6',
    precio: 70,
    horarios: ['13:00', '16:30', '20:00']
  },
  {
    id: 8,
    titulo: 'Mission: Impossible - Dead Reckoning',
    poster: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    duracion: 163,
    sala: 'Sala 7',
    precio: 75,
    horarios: ['14:00', '17:30', '21:00']
  }
];

// ✨ CONFIGURACIÓN DE ASIENTOS - ESTRUCTURA REAL DE CINE
// 🎭 2 Bloques (BLOQUE 1 y BLOQUE 2) con pasillo central
// 📐 Cada bloque: 13 filas (A-M) × 10 columnas (1-10) = 130 asientos/bloque
// 🎟️  Total: 260 asientos en la sala
// 🏷️  Nomenclatura: B{bloque}{fila}{columna} (ej: B1A5 = Bloque 1, Fila A, Asiento 5)

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
const COLUMNS_BLOCK_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const COLUMNS_BLOCK_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Helper: Generar ID de asiento con formato B{bloque}{fila}{columna}
const getSeatId = (block, row, col) => `B${block}${row}${col}`;

// Generate initial occupied seats (aleatorio) - Usando nuevo formato
const generateOccupiedSeats = () => {
  const occupied = [];
  const occupiedCount = Math.floor(Math.random() * 30) + 20; // 20-50 ocupados de 260 total
  
  for (let i = 0; i < occupiedCount; i++) {
    const block = Math.random() > 0.5 ? 1 : 2; // Aleatorio entre bloque 1 y 2
    const row = ROWS[Math.floor(Math.random() * ROWS.length)];
    const col = Math.floor(Math.random() * 10) + 1; // 1-10
    const seat = getSeatId(block, row, col);
    if (!occupied.includes(seat)) {
      occupied.push(seat);
    }
  }
  
  return occupied;
};

const CajeroVentas = () => {
  // State Management
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState(generateOccupiedSeats());
  const [customerData, setCustomerData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [amountReceived, setAmountReceived] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastTicket, setLastTicket] = useState(null);
  const [salesCount, setSalesCount] = useState(0);
  const [cashDrawerOpen, setCashDrawerOpen] = useState(false);

  // Load sales count from localStorage
  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem('cajeroVentas') || '[]');
    const todaySales = savedSales.filter(sale => {
      const saleDate = new Date(sale.timestamp);
      const today = new Date();
      return saleDate.toDateString() === today.toDateString();
    });
    setSalesCount(todaySales.length);
  }, []);

  // Calculate total
  const total = useMemo(() => {
    if (!selectedMovie || selectedSeats.length === 0) return 0;
    return selectedSeats.length * selectedMovie.precio;
  }, [selectedMovie, selectedSeats]);

  // Calculate change
  const cambio = useMemo(() => {
    if (paymentMethod !== 'efectivo' || !amountReceived) return 0;
    const received = parseFloat(amountReceived);
    return received >= total ? received - total : 0;
  }, [paymentMethod, amountReceived, total]);

  // Handle movie selection
  const handleMovieSelect = (e) => {
    const movieId = parseInt(e.target.value);
    const movie = MOCK_MOVIES.find(m => m.id === movieId);
    setSelectedMovie(movie || null);
    setSelectedShow(null);
    setSelectedSeats([]);
    setOccupiedSeats(generateOccupiedSeats()); // New occupied seats for each movie
  };

  // Handle seat click
  const handleSeatClick = (seat) => {
    if (occupiedSeats.includes(seat)) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // Handle customer data
  const handleCustomerChange = (field, value) => {
    setCustomerData({ ...customerData, [field]: value });
  };

  // Validate sale
  const canConfirmSale = () => {
    if (!selectedMovie || !selectedShow || selectedSeats.length === 0) return false;
    if (paymentMethod === 'efectivo') {
      const received = parseFloat(amountReceived);
      return received >= total;
    }
    return true; // Tarjeta siempre válida
  };

  // Confirm sale
  const handleConfirmSale = () => {
    const ticket = {
      id: `TKT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      movie: selectedMovie.titulo,
      sala: selectedMovie.sala,
      horario: selectedShow,
      asientos: selectedSeats.sort(),
      total: total,
      paymentMethod: paymentMethod === 'efectivo' ? 'Efectivo' : 'Tarjeta',
      customer: customerData.nombre || 'Cliente General',
      cajero: 'Cajero 1', // TODO: Get from auth context
      estado: 'completada'
    };

    // Save to localStorage
    const savedSales = JSON.parse(localStorage.getItem('cajeroVentas') || '[]');
    savedSales.push(ticket);
    localStorage.setItem('cajeroVentas', JSON.stringify(savedSales));

    setLastTicket(ticket);
    setShowSuccessModal(true);
    setSalesCount(prev => prev + 1);

    // Play print sound (simulación)
    console.log('🎫 Imprimiendo ticket...', ticket);
  };

  // Reset form
  const handleReset = () => {
    setSelectedMovie(null);
    setSelectedShow(null);
    setSelectedSeats([]);
    setOccupiedSeats(generateOccupiedSeats());
    setCustomerData({ nombre: '', email: '', telefono: '' });
    setPaymentMethod('efectivo');
    setAmountReceived('');
    setShowSuccessModal(false);
  };

  // Handle cash drawer
  const handleCashDrawer = () => {
    setCashDrawerOpen(true);
    setTimeout(() => setCashDrawerOpen(false), 2000);
    console.log('💰 Caja registradora abierta');
  };

  // Seat Component
  const SeatButton = ({ seat, num }) => {
    const isOccupied = occupiedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);
    
    let bgColor = 'bg-gray-200 hover:bg-gray-300';
    let cursor = 'cursor-pointer';
    
    if (isOccupied) {
      bgColor = 'bg-red-200 cursor-not-allowed';
      cursor = 'cursor-not-allowed';
    } else if (isSelected) {
      bgColor = 'bg-green-500 hover:bg-green-600 text-white';
    }

    return (
      <button
        onClick={() => handleSeatClick(seat)}
        disabled={isOccupied}
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md text-[10px] sm:text-xs font-medium transition-all duration-200 ${bgColor} ${cursor} flex items-center justify-center`}
        title={`${seat} - ${isOccupied ? 'Ocupado' : isSelected ? 'Seleccionado' : 'Disponible'}`}
      >
        {num}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Punto de Venta</h1>
                <p className="text-sm text-gray-500">Sistema de ventas rápidas</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sales Counter */}
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <Receipt className="w-4 h-4 text-green-600" />
                <div className="text-left">
                  <p className="text-xs text-gray-600">Ventas hoy</p>
                  <p className="text-lg font-bold text-green-600">{salesCount}</p>
                </div>
              </div>

              {/* Cash Drawer Button */}
              <Button
                variant="outline"
                onClick={handleCashDrawer}
                className="flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                Abrir Caja
              </Button>

              {/* Reset Button */}
              <Button
                variant="ghost"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Nueva Venta
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie Selection */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">Seleccionar Película</h2>
              </div>

              <select
                value={selectedMovie?.id || ''}
                onChange={handleMovieSelect}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">-- Seleccione una película --</option>
                {MOCK_MOVIES.map(movie => (
                  <option key={movie.id} value={movie.id}>
                    {movie.titulo} - {movie.sala} (${movie.precio})
                  </option>
                ))}
              </select>

              {selectedMovie && (
                <div className="mt-4 flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.titulo}
                    className="w-20 h-28 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{selectedMovie.titulo}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedMovie.sala}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{selectedMovie.duracion} minutos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">${selectedMovie.precio} COP</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Show Time Selection */}
            {selectedMovie && (
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Horario - HOY</h2>
                  <Badge variant="info" className="ml-auto">
                    {new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long' })}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {selectedMovie.horarios.map(horario => (
                    <button
                      key={horario}
                      onClick={() => setSelectedShow(horario)}
                      className={`py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                        selectedShow === horario
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {horario}
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {/* Seat Selection */}
            {selectedMovie && selectedShow && (
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Armchair className="w-5 h-5 text-primary-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Seleccionar Asientos</h2>
                  </div>
                  <Badge variant={selectedSeats.length > 0 ? 'success' : 'neutral'}>
                    {selectedSeats.length} seleccionado{selectedSeats.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <span className="text-gray-600">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Seleccionado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-200 rounded"></div>
                    <span className="text-gray-600">Ocupado</span>
                  </div>
                </div>

                {/* Screen */}
                <div className="mb-6">
                  <div className="bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center py-2 rounded-t-3xl text-sm font-medium">
                    PANTALLA
                  </div>
                </div>

                {/* Seat Map - 2 Bloques lado a lado */}
                <div className="overflow-x-auto pb-4">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-start max-w-full">
                    {/* BLOQUE 1 */}
                    <div className="flex-shrink-0 w-full lg:w-auto">
                      <h3 className="text-center text-sm font-semibold text-gray-700 mb-3 bg-gray-100 py-2 rounded-lg">BLOQUE 1</h3>
                      
                      {/* Column Numbers */}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="w-5 sm:w-6"></span>
                        <div className="flex gap-1">
                          {COLUMNS_BLOCK_1.map(col => (
                            <span key={col} className="w-6 sm:w-7 text-center text-[10px] sm:text-xs text-gray-500">{col}</span>
                          ))}
                        </div>
                        <span className="w-5 sm:w-6"></span>
                      </div>

                      {/* Rows */}
                      <div className="space-y-1">
                        {ROWS.map(row => (
                          <div key={`b1-${row}`} className="flex items-center gap-1">
                            <span className="w-5 sm:w-6 text-center font-semibold text-gray-700 text-[10px] sm:text-xs">{row}</span>
                            <div className="flex gap-1">
                              {COLUMNS_BLOCK_1.map(col => {
                                const seat = getSeatId(1, row, col);
                                return <SeatButton key={seat} seat={seat} num={col} />;
                              })}
                            </div>
                            <span className="w-5 sm:w-6 text-center font-semibold text-gray-700 text-[10px] sm:text-xs">{row}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Separator - PASILLO */}
                    <div className="hidden lg:block w-px bg-gray-300 self-stretch"></div>

                    {/* BLOQUE 2 */}
                    <div className="flex-shrink-0 w-full lg:w-auto">
                      <h3 className="text-center text-sm font-semibold text-gray-700 mb-3 bg-gray-100 py-2 rounded-lg">BLOQUE 2</h3>
                      
                      {/* Column Numbers */}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="w-5 sm:w-6"></span>
                        <div className="flex gap-1">
                          {COLUMNS_BLOCK_2.map(col => (
                            <span key={col} className="w-6 sm:w-7 text-center text-[10px] sm:text-xs text-gray-500">{col}</span>
                          ))}
                        </div>
                        <span className="w-5 sm:w-6"></span>
                      </div>

                      {/* Rows */}
                      <div className="space-y-1">
                        {ROWS.map(row => (
                          <div key={`b2-${row}`} className="flex items-center gap-1">
                            <span className="w-5 sm:w-6 text-center font-semibold text-gray-700 text-[10px] sm:text-xs">{row}</span>
                            <div className="flex gap-1">
                              {COLUMNS_BLOCK_2.map(col => {
                                const seat = getSeatId(2, row, col);
                                return <SeatButton key={seat} seat={seat} num={col} />;
                              })}
                            </div>
                            <span className="w-5 sm:w-6 text-center font-semibold text-gray-700 text-[10px] sm:text-xs">{row}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Asientos seleccionados:</strong> {selectedSeats.sort().join(', ')}
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Customer Data (Optional) */}
            {selectedSeats.length > 0 && (
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Datos del Cliente</h2>
                  <Badge variant="neutral" className="ml-auto">Opcional</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="text"
                    placeholder="Nombre completo"
                    value={customerData.nombre}
                    onChange={(e) => handleCustomerChange('nombre', e.target.value)}
                    icon={User}
                  />
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={customerData.email}
                    onChange={(e) => handleCustomerChange('email', e.target.value)}
                    icon={Mail}
                  />
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={customerData.telefono}
                    onChange={(e) => handleCustomerChange('telefono', e.target.value)}
                    icon={Phone}
                  />
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT COLUMN - Ticket Preview & Payment */}
          <div className="space-y-6">
            {/* Ticket Preview */}
            <Card className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">Resumen de Compra</h2>
              </div>

              {!selectedMovie ? (
                <div className="text-center py-8 text-gray-500">
                  <Film className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Seleccione una película para continuar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Movie Info */}
                  <div className="pb-3 border-b border-dashed border-gray-300">
                    <p className="font-semibold text-gray-900">{selectedMovie.titulo}</p>
                    <p className="text-sm text-gray-600 mt-1">{selectedMovie.sala}</p>
                    {selectedShow && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Hoy, {selectedShow}</span>
                      </div>
                    )}
                  </div>

                  {/* Seats */}
                  {selectedSeats.length > 0 && (
                    <div className="pb-3 border-b border-dashed border-gray-300">
                      <p className="text-sm font-medium text-gray-700 mb-1">Asientos:</p>
                      <p className="text-sm text-gray-600">{selectedSeats.sort().join(', ')}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedSeats.length} x ${selectedMovie.precio} COP
                      </p>
                    </div>
                  )}

                  {/* Customer */}
                  {customerData.nombre && (
                    <div className="pb-3 border-b border-dashed border-gray-300">
                      <p className="text-sm font-medium text-gray-700">Cliente:</p>
                      <p className="text-sm text-gray-600">{customerData.nombre}</p>
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">${total} COP</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-primary-600">
                      <span>TOTAL:</span>
                      <span>${total} COP</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  {selectedSeats.length > 0 && (
                    <>
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <CreditCard className="w-5 h-5 text-primary-600" />
                          <h3 className="font-semibold text-gray-900">Método de Pago</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <button
                            onClick={() => setPaymentMethod('efectivo')}
                            className={`py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                              paymentMethod === 'efectivo'
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300'
                            }`}
                          >
                            <DollarSign className="w-5 h-5 mx-auto mb-1" />
                            Efectivo
                          </button>
                          <button
                            onClick={() => setPaymentMethod('tarjeta')}
                            className={`py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                              paymentMethod === 'tarjeta'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
                            }`}
                          >
                            <CreditCard className="w-5 h-5 mx-auto mb-1" />
                            Tarjeta
                          </button>
                        </div>

                        {/* Efectivo Input */}
                        {paymentMethod === 'efectivo' && (
                          <div className="space-y-3">
                            <Input
                              type="number"
                              placeholder="Monto recibido"
                              value={amountReceived}
                              onChange={(e) => setAmountReceived(e.target.value)}
                              icon={DollarSign}
                              min={total}
                              step="0.01"
                            />
                            {amountReceived && parseFloat(amountReceived) >= total && (
                              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-gray-700">
                                  <strong>Cambio:</strong> ${cambio.toFixed(2)} COP
                                </p>
                              </div>
                            )}
                            {amountReceived && parseFloat(amountReceived) < total && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                                <p className="text-sm text-red-700">
                                  Monto insuficiente. Faltan ${(total - parseFloat(amountReceived)).toFixed(2)} COP
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {paymentMethod === 'tarjeta' && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-700">
                              ✓ Pago con tarjeta listo para procesar
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Confirm Button */}
                      <Button
                        variant="primary"
                        onClick={handleConfirmSale}
                        disabled={!canConfirmSale()}
                        className="w-full flex items-center justify-center gap-2 py-4 text-base"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Confirmar Venta
                      </Button>
                    </>
                  )}

                  {/* QR Code Preview */}
                  {selectedSeats.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 text-center">
                      <div className="inline-block p-4 bg-white border-2 border-gray-300 rounded-lg">
                        <QrCode className="w-20 h-20 mx-auto text-gray-400" />
                        <p className="text-xs text-gray-500 mt-2">Código QR del ticket</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && lastTicket && (
        <Modal
          isOpen={showSuccessModal}
          onClose={handleReset}
          title="¡Venta Completada!"
        >
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket Generado</h3>
            <p className="text-gray-600 mb-6">La venta se ha registrado correctamente</p>

            {/* Ticket Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2">
                <strong>ID:</strong> {lastTicket.id}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Película:</strong> {lastTicket.movie}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Horario:</strong> Hoy, {lastTicket.horario}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Asientos:</strong> {lastTicket.asientos.join(', ')}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Total:</strong> ${lastTicket.total} COP
              </p>
              <p className="text-sm text-gray-600">
                <strong>Pago:</strong> {lastTicket.paymentMethod}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  console.log('🖨️ Imprimiendo ticket...', lastTicket);
                  alert('Ticket enviado a impresora');
                }}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimir
              </Button>
              <Button
                variant="primary"
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Nueva Venta
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Cash Drawer Modal */}
      {cashDrawerOpen && (
        <Modal
          isOpen={cashDrawerOpen}
          onClose={() => setCashDrawerOpen(false)}
          title="Caja Registradora"
        >
          <div className="text-center py-6">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <p className="text-lg font-semibold text-gray-900 mb-2">Caja Abierta</p>
            <p className="text-gray-600">La caja registradora se ha abierto correctamente</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CajeroVentas;
