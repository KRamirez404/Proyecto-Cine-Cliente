import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge, Input, Card } from '@atoms';
import { Modal } from '@molecules';
import {
  Calendar,
  Clock,
  MapPin,
  Film,
  Armchair,
  DollarSign,
  Search,
  Download,
  Eye,
  Filter,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';

/**
 * Mis Compras Page
 * 
 * Displays customer's purchase history with filtering, search, and detail view.
 * 
 * Features:
 * - View toggle: Table view vs Cards view
 * - Filters: Date range, Movie dropdown, Status badges
 * - Search by reservation code
 * - Pagination (10 per page)
 * - Click to view detail modal
 * - Empty state
 * - Export to CSV button
 * - Stats summary
 * - Mock purchase data (5 samples)
 * 
 * Mock Data:
 * - 5 sample purchases with different dates, movies, statuses
 * - States: confirmed, cancelled, pending
 * - Realistic data structure matching Compra page output
 * 
 * @component
 */
const MisCompras = () => {
  const navigate = useNavigate();

  // Helper para formatear moneda colombiana
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get logged user
  const getLoggedUser = () => {
    try {
      const userStr = localStorage.getItem('currentUser');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const loggedUser = getLoggedUser();

  // Get user purchases from localStorage
  const getUserPurchases = () => {
    try {
      const purchases = JSON.parse(localStorage.getItem('userPurchases') || '[]');
      // Filter by logged user if exists
      if (loggedUser) {
        return purchases.filter(p => p.userId === loggedUser.id);
      }
      return [];
    } catch {
      return [];
    }
  };

  // View mode
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Get user's real purchases from localStorage
  const userRealPurchases = getUserPurchases();

  // Mock purchases data (fallback for demo purposes) - wrapped in useMemo to avoid re-creation
  const mockPurchases = useMemo(() => [
    {
      id: 'ABC123XYZ',
      showtime: {
        movieTitle: 'Avengers: Endgame',
        date: '2025-02-15',
        time: '19:30',
        sala: 'Sala 3',
        format: '3D',
        price: 12.0,
      },
      seats: ['C5', 'C6'],
      totalPrice: 24.0,
      customerInfo: {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        telefono: '5551234567',
      },
      metodoPago: 'tarjeta',
      fecha: '2025-01-20T14:30:00Z',
      estado: 'confirmed',
    },
    {
      id: 'DEF456ABC',
      showtime: {
        movieTitle: 'The Batman',
        date: '2025-02-10',
        time: '21:00',
        sala: 'Sala 5',
        format: 'IMAX',
        price: 15.0,
      },
      seats: ['F8'],
      totalPrice: 15.0,
      customerInfo: {
        nombre: 'María García',
        email: 'maria@example.com',
        telefono: '5559876543',
      },
      metodoPago: 'efectivo',
      fecha: '2025-01-15T10:00:00Z',
      estado: 'confirmed',
    },
    {
      id: 'GHI789DEF',
      showtime: {
        movieTitle: 'Avatar: The Way of Water',
        date: '2025-02-05',
        time: '16:45',
        sala: 'Sala 1',
        format: '3D',
        price: 12.0,
      },
      seats: ['A1', 'A2', 'A3'],
      totalPrice: 36.0,
      customerInfo: {
        nombre: 'Carlos López',
        email: 'carlos@example.com',
        telefono: '5552468135',
      },
      metodoPago: 'tarjeta',
      fecha: '2025-01-10T18:45:00Z',
      estado: 'cancelled',
    },
    {
      id: 'JKL012GHI',
      showtime: {
        movieTitle: 'Top Gun: Maverick',
        date: '2025-03-01',
        time: '14:00',
        sala: 'Sala 2',
        format: '2D',
        price: 10.0,
      },
      seats: ['D5', 'D6', 'D7', 'D8'],
      totalPrice: 40.0,
      customerInfo: {
        nombre: 'Ana Martínez',
        email: 'ana@example.com',
        telefono: '5553692581',
      },
      metodoPago: 'tarjeta',
      fecha: '2025-01-25T12:00:00Z',
      estado: 'confirmed',
    },
    {
      id: 'MNO345JKL',
      showtime: {
        movieTitle: 'Spider-Man: No Way Home',
        date: '2025-02-20',
        time: '18:15',
        sala: 'Sala 4',
        format: '3D',
        price: 12.0,
      },
      seats: ['B3', 'B4'],
      totalPrice: 24.0,
      customerInfo: {
        nombre: 'Luis Hernández',
        email: 'luis@example.com',
        telefono: '5557418529',
      },
      metodoPago: 'efectivo',
      fecha: '2025-01-18T16:20:00Z',
      estado: 'pending',
    },
  ], []); // mockPurchases useMemo - empty deps since data is static

  // Combine real user purchases with mock purchases (real purchases first)
  const allPurchases = useMemo(() => {
    // If user has real purchases, show only those
    if (userRealPurchases.length > 0) {
      return userRealPurchases;
    }
    // Otherwise, show mock purchases for demo
    return mockPurchases;
  }, [userRealPurchases, mockPurchases]);

  // Get available movies for filter dropdown
  const availableMovies = useMemo(() => {
    const movies = new Set(allPurchases.map((p) => p.showtime.movieTitle));
    return Array.from(movies).sort();
  }, [allPurchases]);

  // Filter purchases
  const filteredPurchases = useMemo(() => {
    return allPurchases.filter((purchase) => {
      // Search by reservation code
      if (
        searchQuery &&
        !purchase.id.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by movie
      if (selectedMovie !== 'all' && purchase.showtime.movieTitle !== selectedMovie) {
        return false;
      }

      // Filter by status
      if (selectedStatus !== 'all' && purchase.estado !== selectedStatus) {
        return false;
      }

      // Filter by date range
      if (dateFrom && new Date(purchase.fecha) < new Date(dateFrom)) {
        return false;
      }
      if (dateTo && new Date(purchase.fecha) > new Date(dateTo)) {
        return false;
      }

      return true;
    });
  }, [allPurchases, searchQuery, selectedMovie, selectedStatus, dateFrom, dateTo]);

  // Pagination
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const paginatedPurchases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPurchases.slice(start, start + itemsPerPage);
  }, [filteredPurchases, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMovie, selectedStatus, dateFrom, dateTo]);

  // Stats
  const stats = useMemo(() => {
    const confirmed = allPurchases.filter((p) => p.estado === 'confirmed');
    const totalSpent = confirmed.reduce((sum, p) => sum + p.totalPrice, 0);
    const nextShowtime = confirmed
      .filter((p) => new Date(p.showtime.date) > new Date())
      .sort((a, b) => new Date(a.showtime.date) - new Date(b.showtime.date))[0];

    return {
      totalPurchases: allPurchases.length,
      totalSpent,
      nextShowtime,
    };
  }, [allPurchases]);

  // Handlers
  const handleViewDetail = (purchase) => {
    setSelectedPurchase(purchase);
    setShowDetailModal(true);
  };

  const handleGoToConfirmacion = (purchase) => {
    navigate(`/confirmacion/${purchase.id}`, { state: { purchase } });
  };

  const handleExportCSV = () => {
    // Mock CSV export
    alert(`Exportando ${filteredPurchases.length} compras a CSV (mock)`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedMovie('all');
    setSelectedStatus('all');
    setDateFrom('');
    setDateTo('');
  };

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Status badge helper
  const getStatusBadge = (estado) => {
    const variants = {
      confirmed: 'success',
      cancelled: 'error',
      pending: 'warning',
    };
    const labels = {
      confirmed: 'Confirmado',
      cancelled: 'Cancelado',
      pending: 'Pendiente',
    };
    return (
      <Badge variant={variants[estado]} size="sm">
        {labels[estado]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            Mis Compras
          </h1>
          <p className="text-neutral-600">
            Historial de tus reservas y próximas funciones
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Compras</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {stats.totalPurchases}
                </p>
              </div>
              <FileText className="w-10 h-10 text-primary" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Gastado</p>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(stats.totalSpent)}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-success" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Próxima Función</p>
                <p className="text-lg font-bold text-neutral-900">
                  {stats.nextShowtime
                    ? formatDate(stats.nextShowtime.showtime.date)
                    : 'N/A'}
                </p>
                {stats.nextShowtime && (
                  <p className="text-xs text-neutral-500 truncate">
                    {stats.nextShowtime.showtime.movieTitle}
                  </p>
                )}
              </div>
              <Calendar className="w-10 h-10 text-info" />
            </div>
          </Card>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-neutral-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search by code */}
            <div className="lg:col-span-2">
              <Input
                type="text"
                placeholder="Buscar por código de reserva..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>

            {/* Movie filter */}
            <select
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todas las películas</option>
              {availableMovies.map((movie) => (
                <option key={movie} value={movie}>
                  {movie}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="confirmed">Confirmado</option>
              <option value="pending">Pendiente</option>
              <option value="cancelled">Cancelado</option>
            </select>

            {/* Clear filters button */}
            <Button variant="outline" size="md" onClick={handleClearFilters}>
              Limpiar Filtros
            </Button>
          </div>

          {/* Date range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Desde</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-600 mb-1">Hasta</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* View Toggle + Export */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'cards' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Tarjetas
            </Button>
            <Button
              variant={viewMode === 'table' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="w-4 h-4 mr-2" />
              Tabla
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar a CSV
          </Button>
        </div>

        {/* Results info */}
        <p className="text-sm text-neutral-600 mb-4">
          Mostrando {paginatedPurchases.length} de {filteredPurchases.length}{' '}
          compras
        </p>

        {/* Empty State */}
        {filteredPurchases.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
            <FileText className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No se encontraron compras
            </h3>
            <p className="text-neutral-600 mb-6">
              No tienes compras que coincidan con los filtros seleccionados
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="outline" onClick={handleClearFilters}>
                Limpiar Filtros
              </Button>
              <Link to="/cartelera">
                <Button variant="primary">Comprar Boletos</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Cards View */}
        {viewMode === 'cards' && filteredPurchases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedPurchases.map((purchase) => (
              <Card
                key={purchase.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleViewDetail(purchase)}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">
                      Código de Reserva
                    </p>
                    <p className="text-lg font-bold text-primary font-mono">
                      {purchase.id}
                    </p>
                  </div>
                  {getStatusBadge(purchase.estado)}
                </div>

                {/* Movie */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-neutral-600 mb-1">
                    <Film className="w-4 h-4" />
                    <p className="text-xs font-semibold uppercase">Película</p>
                  </div>
                  <p className="text-lg font-bold text-neutral-900">
                    {purchase.showtime.movieTitle}
                  </p>
                </div>

                {/* Date/Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-neutral-600 mb-1">
                      <Calendar className="w-3 h-3" />
                      <p className="text-xs">Fecha</p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatDate(purchase.showtime.date)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-neutral-600 mb-1">
                      <Clock className="w-3 h-3" />
                      <p className="text-xs">Hora</p>
                    </div>
                    <p className="text-sm font-medium">{purchase.showtime.time}</p>
                  </div>
                </div>

                {/* Seats + Price */}
                <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <Armchair className="w-4 h-4 text-neutral-600" />
                    <span className="text-sm text-neutral-600">
                      {purchase.seats.length} asiento
                      {purchase.seats.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-success">
                    {formatCurrency(purchase.totalPrice)}
                  </p>
                </div>

                {/* Action */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGoToConfirmacion(purchase);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalles
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && filteredPurchases.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Película
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Asientos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {paginatedPurchases.map((purchase) => (
                    <tr
                      key={purchase.id}
                      className="hover:bg-neutral-50 cursor-pointer"
                      onClick={() => handleViewDetail(purchase)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono font-semibold text-primary">
                          {purchase.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-neutral-900">
                          {purchase.showtime.movieTitle}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-neutral-900">
                            {formatDate(purchase.showtime.date)}
                          </div>
                          <div className="text-neutral-500">
                            {purchase.showtime.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-neutral-600">
                          {purchase.seats.length}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-success">
                          {formatCurrency(purchase.totalPrice)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(purchase.estado)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGoToConfirmacion(purchase);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedPurchase && (
          <Modal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            title="Detalle de Compra"
            variant="info"
          >
            <div className="space-y-4">
              {/* Reservation Code */}
              <div className="text-center pb-4 border-b border-neutral-200">
                <p className="text-xs text-neutral-600 mb-1">Código de Reserva</p>
                <p className="text-2xl font-bold text-primary font-mono">
                  {selectedPurchase.id}
                </p>
              </div>

              {/* Movie */}
              <div>
                <p className="text-xs text-neutral-600 mb-1">Película</p>
                <p className="text-lg font-bold">{selectedPurchase.showtime.movieTitle}</p>
              </div>

              {/* Date/Time/Sala/Format */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Fecha</p>
                  <p className="text-sm font-medium">
                    {formatDate(selectedPurchase.showtime.date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Hora</p>
                  <p className="text-sm font-medium">{selectedPurchase.showtime.time}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Sala</p>
                  <p className="text-sm font-medium">{selectedPurchase.showtime.sala}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Formato</p>
                  <Badge variant="info">{selectedPurchase.showtime.format}</Badge>
                </div>
              </div>

              {/* Seats */}
              <div>
                <p className="text-xs text-neutral-600 mb-2">Asientos</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPurchase.seats.map((seat) => (
                    <Badge key={seat} variant="primary">
                      {seat}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-xs text-neutral-600 mb-1">Método de Pago</p>
                <p className="text-sm font-medium capitalize">
                  {selectedPurchase.metodoPago}
                </p>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Total Pagado</span>
                  <span className="text-2xl font-bold text-success">
                    {formatCurrency(selectedPurchase.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Estado</span>
                {getStatusBadge(selectedPurchase.estado)}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  setShowDetailModal(false);
                  handleGoToConfirmacion(selectedPurchase);
                }}
              >
                Ver Ticket Completo
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDetailModal(false)}
              >
                Cerrar
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MisCompras;
