import { useState, useEffect, useMemo } from 'react';
import {
  Receipt,
  Download,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  Eye,
  Printer,
  Calendar,
  DollarSign,
  CreditCard,
  TrendingUp,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Film
} from 'lucide-react';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Badge from '../../components/atoms/Badge';
import Modal from '../../components/molecules/Modal';

// Generate mock sales if localStorage is empty
const generateMockSales = () => {
  const movies = ['Oppenheimer', 'Barbie', 'Dune: Part Two', 'Spider-Man', 'Guardians of the Galaxy'];
  const cajeros = ['Cajero 1', 'Cajero 2', 'Cajero 3'];
  const paymentMethods = ['Efectivo', 'Tarjeta'];
  const estados = ['completada', 'completada', 'completada', 'completada', 'completada', 'completada', 'completada', 'completada', 'completada', 'cancelada', 'pendiente'];
  
  const sales = [];
  const now = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setHours(date.getHours() - Math.floor(Math.random() * 168)); // Last 7 days
    
    const numSeats = Math.floor(Math.random() * 4) + 1;
    const pricePerSeat = [65, 70, 75, 85, 95][Math.floor(Math.random() * 5)];
    const total = numSeats * pricePerSeat;
    
    sales.push({
      id: `TKT-${1000000 + i}`,
      timestamp: date.toISOString(),
      movie: movies[Math.floor(Math.random() * movies.length)],
      sala: `Sala ${Math.floor(Math.random() * 7) + 1}`,
      horario: ['10:00', '13:30', '17:00', '20:30'][Math.floor(Math.random() * 4)],
      asientos: Array.from({ length: numSeats }, () => 
        `${['A','B','C','D','E','F','G','H'][Math.floor(Math.random() * 8)]}${Math.floor(Math.random() * 10) + 1}`
      ).sort(),
      total: total,
      paymentMethod: paymentMethods[Math.floor(Math.random() * 2)],
      customer: Math.random() > 0.5 ? `Cliente ${i + 1}` : 'Cliente General',
      cajero: cajeros[Math.floor(Math.random() * 3)],
      estado: estados[Math.floor(Math.random() * estados.length)]
    });
  }
  
  return sales.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

const CajeroHistorial = () => {
  // State Management
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('today');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filterMovie, setFilterMovie] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [filterCajero, setFilterCajero] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const itemsPerPage = 15;

  // Load sales from localStorage
  useEffect(() => {
    const savedSales = JSON.parse(localStorage.getItem('cajeroVentas') || '[]');
    if (savedSales.length > 0) {
      setSales(savedSales);
    } else {
      const mockSales = generateMockSales();
      setSales(mockSales);
      localStorage.setItem('cajeroVentas', JSON.stringify(mockSales));
    }
  }, []);

  // Get unique values for filters
  const uniqueMovies = useMemo(() => [...new Set(sales.map(s => s.movie))], [sales]);
  const uniqueCajeros = useMemo(() => [...new Set(sales.map(s => s.cajero))], [sales]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return `Hoy, ${date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter sales
  const filteredSales = useMemo(() => {
    let filtered = [...sales];

    // Date range filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateRange === 'today') {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        saleDate.setHours(0, 0, 0, 0);
        return saleDate.getTime() === today.getTime();
      });
    } else if (dateRange === '7days') {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      filtered = filtered.filter(sale => new Date(sale.timestamp) >= sevenDaysAgo);
    } else if (dateRange === '30days') {
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(sale => new Date(sale.timestamp) >= thirtyDaysAgo);
    } else if (dateRange === 'custom' && dateFrom && dateTo) {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);
      to.setHours(23, 59, 59, 999);
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= from && saleDate <= to;
      });
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sale =>
        sale.id.toLowerCase().includes(term) ||
        sale.customer.toLowerCase().includes(term)
      );
    }

    // Movie filter
    if (filterMovie) {
      filtered = filtered.filter(sale => sale.movie === filterMovie);
    }

    // Payment filter
    if (filterPayment) {
      filtered = filtered.filter(sale => sale.paymentMethod === filterPayment);
    }

    // Cajero filter
    if (filterCajero) {
      filtered = filtered.filter(sale => sale.cajero === filterCajero);
    }

    // Estado filter
    if (filterEstado) {
      filtered = filtered.filter(sale => sale.estado === filterEstado);
    }

    return filtered;
  }, [sales, searchTerm, dateRange, dateFrom, dateTo, filterMovie, filterPayment, filterCajero, filterEstado]);

  // Sort sales
  const sortedSales = useMemo(() => {
    const sorted = [...filteredSales];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'timestamp') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (sortConfig.key === 'total') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredSales, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedSales.length / itemsPerPage);
  const paginatedSales = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedSales.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedSales, currentPage]);

  // Stats calculations
  const stats = useMemo(() => {
    const completadas = filteredSales.filter(s => s.estado === 'completada');
    const totalAmount = completadas.reduce((sum, sale) => sum + sale.total, 0);
    const efectivoAmount = completadas.filter(s => s.paymentMethod === 'Efectivo').reduce((sum, s) => sum + s.total, 0);
    const tarjetaAmount = completadas.filter(s => s.paymentMethod === 'Tarjeta').reduce((sum, s) => sum + s.total, 0);
    const avgAmount = completadas.length > 0 ? totalAmount / completadas.length : 0;

    return {
      totalSales: completadas.length,
      totalAmount,
      efectivoAmount,
      tarjetaAmount,
      avgAmount
    };
  }, [filteredSales]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['ID', 'Fecha', 'Película', 'Sala', 'Horario', 'Asientos', 'Total', 'Método Pago', 'Cliente', 'Cajero', 'Estado'],
      ...sortedSales.map(sale => [
        sale.id,
        new Date(sale.timestamp).toLocaleString('es-MX'),
        sale.movie,
        sale.sala,
        sale.horario,
        sale.asientos.join(', '),
        sale.total,
        sale.paymentMethod,
        sale.customer,
        sale.cajero,
        sale.estado
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial-ventas-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle view detail
  const handleViewDetail = (sale) => {
    setSelectedSale(sale);
    setShowDetailModal(true);
  };

  // Handle reprint
  const handleReprint = (sale) => {
    console.log('🖨️ Reimprimiendo ticket:', sale);
    alert(`Reimprimiendo ticket ${sale.id}`);
  };

  // SortIcon component
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-primary-600" />
      : <ChevronDown className="w-4 h-4 text-primary-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Historial de Ventas</h1>
            <p className="text-sm text-gray-600">Consulta y exporta el registro de transacciones</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exportar Excel
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Ventas</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.totalSales}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Monto Total</p>
              <p className="text-2xl font-bold text-green-900 mt-1">${stats.totalAmount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-700 font-medium">Efectivo / Tarjeta</p>
              <p className="text-lg font-bold text-amber-900 mt-1">
                ${stats.efectivoAmount.toLocaleString()} / ${stats.tarjetaAmount.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Promedio por Venta</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">${stats.avgAmount.toFixed(0)}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </Button>

          <div className="flex items-center gap-2">
            {/* Quick Date Filters */}
            <div className="flex gap-2">
              {['today', '7days', '30days', 'custom'].map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    dateRange === range
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range === 'today' && 'Hoy'}
                  {range === '7days' && '7 días'}
                  {range === '30days' && '30 días'}
                  {range === 'custom' && 'Personalizado'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="space-y-4 pt-4 border-t">
            {/* Custom Date Range */}
            {dateRange === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Desde"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  icon={Calendar}
                />
                <Input
                  type="date"
                  label="Hasta"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  icon={Calendar}
                />
              </div>
            )}

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Película</label>
                <select
                  value={filterMovie}
                  onChange={(e) => setFilterMovie(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todas</option>
                  {uniqueMovies.map(movie => (
                    <option key={movie} value={movie}>{movie}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Método Pago</label>
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todos</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cajero</label>
                <select
                  value={filterCajero}
                  onChange={(e) => setFilterCajero(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todos</option>
                  {uniqueCajeros.map(cajero => (
                    <option key={cajero} value={cajero}>{cajero}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todos</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <Input
              type="text"
              placeholder="Buscar por ID de ticket o nombre de cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
        )}
      </Card>

      {/* Chart Placeholder */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Ventas por Hora</h2>
        </div>
        <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Gráfico de ventas por hora</p>
            <p className="text-xs text-gray-400 mt-1">Integración con Chart.js pendiente</p>
          </div>
        </div>
      </Card>

      {/* Sales Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th 
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center gap-2">
                    Fecha y Hora
                    <SortIcon columnKey="timestamp" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('movie')}
                >
                  <div className="flex items-center gap-2">
                    Película
                    <SortIcon columnKey="movie" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Asientos</th>
                <th 
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center gap-2">
                    Total
                    <SortIcon columnKey="total" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Método Pago</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Cajero</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSales.length > 0 ? (
                paginatedSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {formatTimestamp(sale.timestamp)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Film className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sale.movie}</p>
                          <p className="text-xs text-gray-500">{sale.sala} - {sale.horario}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {sale.asientos.join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">${sale.total}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={sale.paymentMethod === 'Efectivo' ? 'success' : 'info'}>
                        {sale.paymentMethod === 'Efectivo' ? <DollarSign className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                        {sale.paymentMethod}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{sale.cajero}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={
                          (sale.estado || 'completada') === 'completada' ? 'success' :
                          sale.estado === 'cancelada' ? 'error' :
                          'warning'
                        }
                      >
                        {(sale.estado || 'completada') === 'completada' && <CheckCircle className="w-3 h-3" />}
                        {sale.estado === 'cancelada' && <XCircle className="w-3 h-3" />}
                        {sale.estado === 'pendiente' && <Clock className="w-3 h-3" />}
                        {((sale.estado || 'completada').charAt(0).toUpperCase() + (sale.estado || 'completada').slice(1))}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(sale)}
                          className="p-1"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReprint(sale)}
                          className="p-1"
                        >
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    No se encontraron ventas con los filtros aplicados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sortedSales.length)} de {sortedSales.length} ventas
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedSale && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Detalle de Venta"
        >
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ID Transacción:</span>
                <span className="text-sm font-semibold text-gray-900">{selectedSale.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fecha:</span>
                <span className="text-sm text-gray-900">{formatTimestamp(selectedSale.timestamp)}</span>
              </div>
              <div className="border-t pt-3">
                <span className="text-sm text-gray-600">Película:</span>
                <p className="text-sm font-medium text-gray-900 mt-1">{selectedSale.movie}</p>
                <p className="text-xs text-gray-500">{selectedSale.sala} - {selectedSale.horario}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Asientos:</span>
                <span className="text-sm text-gray-900">{selectedSale.asientos.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cantidad:</span>
                <span className="text-sm text-gray-900">{selectedSale.asientos.length} asiento(s)</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-lg font-bold text-primary-600">${selectedSale.total} COP</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Método de Pago:</span>
                <Badge variant={selectedSale.paymentMethod === 'Efectivo' ? 'success' : 'info'}>
                  {selectedSale.paymentMethod}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cliente:</span>
                <span className="text-sm text-gray-900">{selectedSale.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cajero:</span>
                <span className="text-sm text-gray-900">{selectedSale.cajero}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estado:</span>
                <Badge 
                  variant={
                    (selectedSale.estado || 'completada') === 'completada' ? 'success' :
                    selectedSale.estado === 'cancelada' ? 'error' :
                    'warning'
                  }
                >
                  {((selectedSale.estado || 'completada').charAt(0).toUpperCase() + (selectedSale.estado || 'completada').slice(1))}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleReprint(selectedSale)}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Reimprimir
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowDetailModal(false)}
                className="flex-1"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CajeroHistorial;
