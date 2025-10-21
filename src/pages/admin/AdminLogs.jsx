import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Input, Badge } from '@atoms';
import { Modal } from '@molecules';
import {
  Search,
  Download,
  RefreshCw,
  Calendar,
  User,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  LogIn,
  LogOut,
  ShoppingCart,
  Film,
  Users,
  Trash2,
} from 'lucide-react';

// Helper function to generate timestamps
const generateTimestamp = (hoursAgo, minutesAgo = 0) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
};

// Mock log entries
const initialLogs = [
  // Recent logs (today)
  {
    id: 1,
    timestamp: generateTimestamp(0, 5),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'login',
    ip: '192.168.1.100',
    estado: 'success',
    detalles: 'Inicio de sesión exitoso desde panel admin',
  },
  {
    id: 2,
    timestamp: generateTimestamp(0, 10),
    usuario: 'customer@cine.com',
    rol: 'customer',
    accion: 'purchase',
    ip: '192.168.1.101',
    estado: 'success',
    detalles: 'Compra de 2 boletos para Avengers',
  },
  {
    id: 3,
    timestamp: generateTimestamp(0, 15),
    usuario: 'cajero@cine.com',
    rol: 'cajero',
    accion: 'login',
    ip: '192.168.1.102',
    estado: 'success',
    detalles: 'Inicio de sesión desde punto de venta',
  },
  {
    id: 4,
    timestamp: generateTimestamp(0, 20),
    usuario: 'hacker@test.com',
    rol: 'unknown',
    accion: 'login',
    ip: '45.123.45.67',
    estado: 'error',
    detalles: 'Intento de inicio de sesión fallido - Credenciales inválidas',
  },
  {
    id: 5,
    timestamp: generateTimestamp(0, 25),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'movie-add',
    ip: '192.168.1.100',
    estado: 'success',
    detalles: 'Nueva película agregada: Spider-Man No Way Home',
  },
  {
    id: 6,
    timestamp: generateTimestamp(0, 30),
    usuario: 'customer@cine.com',
    rol: 'customer',
    accion: 'seat-select',
    ip: '192.168.1.103',
    estado: 'success',
    detalles: 'Selección de asientos A5, A6 para función 18:00',
  },
  {
    id: 7,
    timestamp: generateTimestamp(0, 35),
    usuario: 'cajero@cine.com',
    rol: 'cajero',
    accion: 'purchase',
    ip: '192.168.1.102',
    estado: 'success',
    detalles: 'Venta en taquilla: 3 boletos para Oppenheimer',
  },
  {
    id: 8,
    timestamp: generateTimestamp(0, 40),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'user-add',
    ip: '192.168.1.100',
    estado: 'success',
    detalles: 'Nuevo cajero agregado: Juan Pérez',
  },
  {
    id: 9,
    timestamp: generateTimestamp(1, 0),
    usuario: 'customer2@cine.com',
    rol: 'customer',
    accion: 'login',
    ip: '192.168.1.104',
    estado: 'success',
    detalles: 'Inicio de sesión exitoso',
  },
  {
    id: 10,
    timestamp: generateTimestamp(1, 15),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'movie-update',
    ip: '192.168.1.100',
    estado: 'success',
    detalles: 'Actualización de horarios para Barbie',
  },
  {
    id: 11,
    timestamp: generateTimestamp(1, 30),
    usuario: 'customer3@cine.com',
    rol: 'customer',
    accion: 'purchase',
    ip: '192.168.1.105',
    estado: 'error',
    detalles: 'Error en pago - Tarjeta rechazada',
  },
  {
    id: 12,
    timestamp: generateTimestamp(2, 0),
    usuario: 'cajero@cine.com',
    rol: 'cajero',
    accion: 'logout',
    ip: '192.168.1.102',
    estado: 'success',
    detalles: 'Cierre de sesión de punto de venta',
  },
  {
    id: 13,
    timestamp: generateTimestamp(2, 30),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'movie-delete',
    ip: '192.168.1.100',
    estado: 'warning',
    detalles: 'Película eliminada: The Flash (baja demanda)',
  },
  {
    id: 14,
    timestamp: generateTimestamp(3, 0),
    usuario: 'customer4@cine.com',
    rol: 'customer',
    accion: 'login',
    ip: '192.168.1.106',
    estado: 'success',
    detalles: 'Inicio de sesión exitoso',
  },
  {
    id: 15,
    timestamp: generateTimestamp(3, 30),
    usuario: 'cajero2@cine.com',
    rol: 'cajero',
    accion: 'login',
    ip: '192.168.1.107',
    estado: 'success',
    detalles: 'Inicio de sesión turno vespertino',
  },
  // Yesterday
  {
    id: 16,
    timestamp: generateTimestamp(24, 0),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'login',
    ip: '192.168.1.100',
    estado: 'success',
    detalles: 'Inicio de sesión matutino',
  },
  {
    id: 17,
    timestamp: generateTimestamp(25, 0),
    usuario: 'customer5@cine.com',
    rol: 'customer',
    accion: 'purchase',
    ip: '192.168.1.108',
    estado: 'success',
    detalles: 'Compra de 4 boletos VIP para Dune 2',
  },
  {
    id: 18,
    timestamp: generateTimestamp(26, 0),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'user-delete',
    ip: '192.168.1.100',
    estado: 'warning',
    detalles: 'Usuario inactivo eliminado: test@test.com',
  },
  {
    id: 19,
    timestamp: generateTimestamp(27, 0),
    usuario: 'unknown',
    rol: 'unknown',
    accion: 'login',
    ip: '103.45.67.89',
    estado: 'error',
    detalles: 'Intento de acceso no autorizado bloqueado',
  },
  {
    id: 20,
    timestamp: generateTimestamp(28, 0),
    usuario: 'cajero@cine.com',
    rol: 'cajero',
    accion: 'purchase',
    ip: '192.168.1.102',
    estado: 'success',
    detalles: 'Venta matutina: 2 boletos para Wonka',
  },
  // Last 7 days
  {
    id: 21,
    timestamp: generateTimestamp(72, 0),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'movie-add',
    ip: '192.168.1.100',
    estado: 'success',
    detalles: 'Nueva película: Killers of the Flower Moon',
  },
  {
    id: 22,
    timestamp: generateTimestamp(96, 0),
    usuario: 'customer6@cine.com',
    rol: 'customer',
    accion: 'purchase',
    ip: '192.168.1.109',
    estado: 'success',
    detalles: 'Compra de 1 boleto para Napoleon',
  },
  {
    id: 23,
    timestamp: generateTimestamp(120, 0),
    usuario: 'cajero@cine.com',
    rol: 'cajero',
    accion: 'login',
    ip: '192.168.1.102',
    estado: 'error',
    detalles: 'Error de contraseña - Reintento exitoso después',
  },
  {
    id: 24,
    timestamp: generateTimestamp(144, 0),
    usuario: 'admin@cine.com',
    rol: 'admin',
    accion: 'movie-update',
    ip: '192.168.1.100',
    estado: 'success',
    detalles: 'Actualización de precios - Promoción fin de semana',
  },
  {
    id: 25,
    timestamp: generateTimestamp(168, 0),
    usuario: 'customer7@cine.com',
    rol: 'customer',
    accion: 'seat-select',
    ip: '192.168.1.110',
    estado: 'success',
    detalles: 'Selección de asientos B3, B4',
  },
  // Additional entries for variety
  ...Array.from({ length: 25 }, (_, i) => ({
    id: 26 + i,
    timestamp: generateTimestamp(200 + i * 12, Math.floor(Math.random() * 60)),
    usuario: ['admin@cine.com', 'customer@cine.com', 'cajero@cine.com'][i % 3],
    rol: ['admin', 'customer', 'cajero'][i % 3],
    accion: ['login', 'logout', 'purchase', 'movie-add', 'movie-update', 'seat-select'][i % 6],
    ip: `192.168.1.${100 + (i % 20)}`,
    estado: ['success', 'success', 'success', 'error', 'warning'][i % 5],
    detalles: `Acción automática de prueba #${i + 1}`,
  })),
];

/**
 * AdminLogs - Registro de Accesos del Sistema
 * 
 * Funcionalidades:
 * - Tabla de logs con timestamp, usuario, rol, acción, IP, estado, detalles
 * - Filtros avanzados: date range, usuario, tipo acción, estado
 * - SearchBar por usuario o IP
 * - Paginación (20 logs por página)
 * - Badges de acción con colores
 * - Auto-refresh toggle (simula real-time)
 * - Export CSV
 * - Stats cards: Total Hoy, Logins OK, Logins Fallidos, Acciones Admin
 * - Filtros rápidos: Hoy, 7 días, 30 días, Custom
 * - Color rows por estado (success=green, warning=yellow, error=red)
 * - Mock CRUD con localStorage
 */
const AdminLogs = () => {
  // State
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDateRange, setFilterDateRange] = useState('today'); // today, 7days, 30days, custom
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterUser, setFilterUser] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const logsPerPage = 20;

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('adminLogs');
    if (stored) {
      setLogs(JSON.parse(stored));
    } else {
      setLogs(initialLogs);
      localStorage.setItem('adminLogs', JSON.stringify(initialLogs));
    }
  }, []);

  // Save to localStorage when logs change
  useEffect(() => {
    if (logs.length > 0) {
      localStorage.setItem('adminLogs', JSON.stringify(logs));
    }
  }, [logs]);

  // Auto-refresh simulation
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new log entry
      const newLog = {
        id: Math.max(...logs.map((l) => l.id), 0) + 1,
        timestamp: new Date().toISOString(),
        usuario: ['admin@cine.com', 'customer@cine.com', 'cajero@cine.com'][
          Math.floor(Math.random() * 3)
        ],
        rol: ['admin', 'customer', 'cajero'][Math.floor(Math.random() * 3)],
        accion: ['login', 'logout', 'purchase', 'seat-select'][Math.floor(Math.random() * 4)],
        ip: `192.168.1.${100 + Math.floor(Math.random() * 20)}`,
        estado: ['success', 'success', 'success', 'error'][Math.floor(Math.random() * 4)],
        detalles: 'Acción en tiempo real simulada',
      };

      setLogs((prev) => [newLog, ...prev]);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, logs]);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    // Get date range
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let from, to;
    switch (filterDateRange) {
      case 'today':
        from = today;
        to = new Date();
        break;
      case '7days': {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        from = sevenDaysAgo;
        to = new Date();
        break;
      }
      case '30days': {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        from = thirtyDaysAgo;
        to = new Date();
        break;
      }
      case 'custom':
        from = filterDateFrom ? new Date(filterDateFrom) : new Date(0);
        to = filterDateTo ? new Date(filterDateTo) : new Date();
        break;
      default:
        from = new Date(0);
        to = new Date();
    }

    return logs.filter((log) => {
      const logDate = new Date(log.timestamp);

      // Date range filter
      if (logDate < from || logDate > to) return false;

      // Search filter
      const matchSearch =
        log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.includes(searchTerm);

      // User filter
      const matchUser = filterUser === 'all' || log.usuario === filterUser;

      // Action filter
      const matchAction = filterAction === 'all' || log.accion === filterAction;

      // Status filter
      const matchStatus = filterStatus === 'all' || log.estado === filterStatus;

      return matchSearch && matchUser && matchAction && matchStatus;
    });
  }, [logs, searchTerm, filterDateRange, filterDateFrom, filterDateTo, filterUser, filterAction, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  // Stats calculations
  const stats = useMemo(() => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const logsToday = logs.filter((log) => new Date(log.timestamp) >= todayStart);

    const totalToday = logsToday.length;
    const loginsSuccess = logs.filter(
      (log) => log.accion === 'login' && log.estado === 'success'
    ).length;
    const loginsFailed = logs.filter(
      (log) => log.accion === 'login' && log.estado === 'error'
    ).length;
    const adminActions = logs.filter((log) => log.rol === 'admin').length;

    return {
      totalToday,
      loginsSuccess,
      loginsFailed,
      adminActions,
    };
  }, [logs]);

  // Get unique users for filter dropdown
  const uniqueUsers = useMemo(() => {
    return [...new Set(logs.map((log) => log.usuario))].sort();
  }, [logs]);

  // Handlers
  const handleExportCSV = () => {
    alert('Generando reporte CSV... (Funcionalidad pendiente de implementación)');
  };

  const openDetailsModal = (log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Get action badge variant
  const getActionBadgeVariant = (action) => {
    const variants = {
      login: 'info',
      logout: 'neutral',
      purchase: 'success',
      cancel: 'error',
      'movie-add': 'primary',
      'movie-update': 'primary',
      'movie-delete': 'warning',
      'user-add': 'primary',
      'user-delete': 'warning',
      'seat-select': 'info',
    };
    return variants[action] || 'neutral';
  };

  // Get action icon
  const getActionIcon = (action) => {
    const icons = {
      login: LogIn,
      logout: LogOut,
      purchase: ShoppingCart,
      'movie-add': Film,
      'movie-update': Film,
      'movie-delete': Trash2,
      'user-add': Users,
      'user-delete': Users,
      'seat-select': Activity,
    };
    return icons[action] || Activity;
  };

  // Get row background color
  const getRowBgColor = (estado) => {
    switch (estado) {
      case 'success':
        return 'bg-success-light bg-opacity-10';
      case 'warning':
        return 'bg-warning-light bg-opacity-10';
      case 'error':
        return 'bg-error-light bg-opacity-10';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            Registro de Accesos
          </h1>
          <p className="text-neutral-600 mt-1">
            Monitoreo de actividad del sistema en tiempo real
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={autoRefresh ? 'primary' : 'outline'}
            size="md"
            onClick={() => setAutoRefresh(!autoRefresh)}
            icon={RefreshCw}
            className={autoRefresh ? 'animate-pulse' : ''}
          >
            {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
          </Button>
          <Button variant="outline" size="md" onClick={handleExportCSV} icon={Download}>
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Accesos Hoy</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">{stats.totalToday}</p>
            </div>
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Logins Exitosos</p>
              <p className="text-3xl font-bold text-success mt-1">{stats.loginsSuccess}</p>
            </div>
            <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Logins Fallidos</p>
              <p className="text-3xl font-bold text-error mt-1">{stats.loginsFailed}</p>
            </div>
            <div className="w-12 h-12 bg-error-light rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-error" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Acciones Admin</p>
              <p className="text-3xl font-bold text-warning mt-1">{stats.adminActions}</p>
            </div>
            <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        {/* Quick Date Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={filterDateRange === 'today' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterDateRange('today')}
          >
            Hoy
          </Button>
          <Button
            variant={filterDateRange === '7days' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterDateRange('7days')}
          >
            Últimos 7 días
          </Button>
          <Button
            variant={filterDateRange === '30days' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterDateRange('30days')}
          >
            Últimos 30 días
          </Button>
          <Button
            variant={filterDateRange === 'custom' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterDateRange('custom')}
          >
            Personalizado
          </Button>
        </div>

        {/* Custom Date Range */}
        {filterDateRange === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-4 bg-neutral-50 rounded-lg">
            <Input
              label="Fecha Desde"
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              icon={Calendar}
            />
            <Input
              label="Fecha Hasta"
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              icon={Calendar}
            />
          </div>
        )}

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <Input
              type="text"
              placeholder="Buscar por usuario o IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>

          {/* Filter User */}
          <div>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
            >
              <option value="all">Todos los usuarios</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Action */}
          <div>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
            >
              <option value="all">Todas las acciones</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="purchase">Compra</option>
              <option value="movie-add">Agregar Película</option>
              <option value="movie-update">Actualizar Película</option>
              <option value="movie-delete">Eliminar Película</option>
              <option value="user-add">Agregar Usuario</option>
              <option value="seat-select">Selección Asientos</option>
            </select>
          </div>

          {/* Filter Status */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
            >
              <option value="all">Todos los estados</option>
              <option value="success">✓ Exitoso</option>
              <option value="warning">⚠ Advertencia</option>
              <option value="error">✗ Error</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Acción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {paginatedLogs.map((log) => {
                const ActionIcon = getActionIcon(log.accion);
                return (
                  <tr
                    key={log.id}
                    className={`hover:bg-neutral-50 transition-colors ${getRowBgColor(
                      log.estado
                    )}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-neutral-400" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-neutral-400" />
                        <span className="text-sm font-medium text-neutral-900">
                          {log.usuario}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          log.rol === 'admin'
                            ? 'warning'
                            : log.rol === 'cajero'
                            ? 'info'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {log.rol}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getActionBadgeVariant(log.accion)} size="md">
                        <ActionIcon className="w-4 h-4 mr-1" />
                        {log.accion}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-neutral-400" />
                        {log.ip}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          log.estado === 'success'
                            ? 'success'
                            : log.estado === 'warning'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                      >
                        {log.estado === 'success' ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : log.estado === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        {log.estado}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetailsModal(log)}
                      >
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
            <div className="text-sm text-neutral-600">
              Mostrando {(currentPage - 1) * logsPerPage + 1} a{' '}
              {Math.min(currentPage * logsPerPage, filteredLogs.length)} de{' '}
              {filteredLogs.length} logs
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modal: Log Details */}
      {showDetailsModal && selectedLog && (
        <Modal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedLog(null);
          }}
          title="Detalles del Log"
          variant="info"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-600">Timestamp</p>
                <p className="text-sm font-medium text-neutral-900">
                  {formatTimestamp(selectedLog.timestamp)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Usuario</p>
                <p className="text-sm font-medium text-neutral-900">{selectedLog.usuario}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Rol</p>
                <Badge
                  variant={
                    selectedLog.rol === 'admin'
                      ? 'warning'
                      : selectedLog.rol === 'cajero'
                      ? 'info'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {selectedLog.rol}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Acción</p>
                <Badge variant={getActionBadgeVariant(selectedLog.accion)} size="sm">
                  {selectedLog.accion}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Dirección IP</p>
                <p className="text-sm font-medium text-neutral-900">{selectedLog.ip}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Estado</p>
                <Badge
                  variant={
                    selectedLog.estado === 'success'
                      ? 'success'
                      : selectedLog.estado === 'warning'
                      ? 'warning'
                      : 'error'
                  }
                  size="sm"
                >
                  {selectedLog.estado}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral-600 mb-2">Detalles</p>
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-900">{selectedLog.detalles}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedLog(null);
              }}
            >
              Cerrar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminLogs;
