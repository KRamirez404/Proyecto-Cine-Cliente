import { useState } from 'react';
import { Card } from '@atoms';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Film,
  DollarSign,
  Activity,
  ShoppingBag,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Plus,
  FileText,
  Settings,
} from 'lucide-react';

/**
 * AdminDashboard Component
 * 
 * Dashboard principal para administradores con:
 * - KPI cards (ventas, usuarios, películas, boletos)
 * - Charts placeholders (ventas por día, películas populares)
 * - Lista de actividades recientes
 * - Quick action buttons
 * 
 * @component
 */
const AdminDashboard = () => {
  // Estado para período de tiempo seleccionado
  const [timePeriod, setTimePeriod] = useState('month'); // 'week', 'month', 'year'

  // ═══════════════════════════════════════════════════════
  // MOCK DATA - KPIs
  // ═══════════════════════════════════════════════════════
  const kpis = [
    {
      id: 1,
      label: 'Ventas Este Mes',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'success',
      description: 'vs mes anterior',
    },
    {
      id: 2,
      label: 'Usuarios Activos',
      value: '2,543',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'info',
      description: 'usuarios registrados',
    },
    {
      id: 3,
      label: 'Películas en Cartelera',
      value: '18',
      change: '+2',
      trend: 'neutral',
      icon: Film,
      color: 'primary',
      description: 'títulos disponibles',
    },
    {
      id: 4,
      label: 'Boletos Vendidos Hoy',
      value: '156',
      change: '-5%',
      trend: 'down',
      icon: ShoppingBag,
      color: 'warning',
      description: 'vs promedio diario',
    },
  ];

  // ═══════════════════════════════════════════════════════
  // MOCK DATA - Recent Activities
  // ═══════════════════════════════════════════════════════
  const recentActivities = [
    {
      id: 1,
      time: '10:30 AM',
      user: 'Juan Pérez',
      action: 'Compró 2 boletos',
      movie: 'Avengers Endgame',
      type: 'purchase',
      amount: '$24.00',
    },
    {
      id: 2,
      time: '10:15 AM',
      user: 'María García',
      action: 'Compró 4 boletos',
      movie: 'Dune: Part Two',
      type: 'purchase',
      amount: '$48.00',
    },
    {
      id: 3,
      time: '09:45 AM',
      user: 'Admin',
      action: 'Agregó nueva película',
      movie: 'The Batman',
      type: 'movie-add',
      amount: null,
    },
    {
      id: 4,
      time: '09:30 AM',
      user: 'Carlos López',
      action: 'Compró 1 boleto',
      movie: 'Oppenheimer',
      type: 'purchase',
      amount: '$12.00',
    },
    {
      id: 5,
      time: '09:00 AM',
      user: 'Admin',
      action: 'Actualizó horarios',
      movie: 'Spider-Man: No Way Home',
      type: 'movie-update',
      amount: null,
    },
    {
      id: 6,
      time: '08:45 AM',
      user: 'Ana Martínez',
      action: 'Compró 3 boletos',
      movie: 'Barbie',
      type: 'purchase',
      amount: '$36.00',
    },
    {
      id: 7,
      time: '08:30 AM',
      user: 'Luis Rodríguez',
      action: 'Canceló reserva',
      movie: 'The Flash',
      type: 'cancel',
      amount: '-$24.00',
    },
    {
      id: 8,
      time: '08:15 AM',
      user: 'Admin',
      action: 'Agregó cajero',
      movie: 'Nuevo usuario: Pedro Sánchez',
      type: 'user-add',
      amount: null,
    },
  ];

  // ═══════════════════════════════════════════════════════
  // MOCK DATA - Top Movies (para el chart)
  // ═══════════════════════════════════════════════════════
  const topMovies = [
    { id: 1, title: 'Avengers Endgame', tickets: 342, revenue: '$4,104' },
    { id: 2, title: 'Dune: Part Two', tickets: 298, revenue: '$3,576' },
    { id: 3, title: 'Oppenheimer', tickets: 256, revenue: '$3,072' },
    { id: 4, title: 'Barbie', tickets: 234, revenue: '$2,808' },
    { id: 5, title: 'Spider-Man: No Way Home', tickets: 198, revenue: '$2,376' },
  ];

  // ═══════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════
  
  /**
   * Obtiene el color del badge según el trend
   */
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'bg-success text-white';
      case 'down':
        return 'bg-error text-white';
      case 'neutral':
        return 'bg-info text-white';
      default:
        return 'bg-neutral-200 text-neutral-700';
    }
  };

  /**
   * Obtiene el icon del trend
   */
  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  /**
   * Obtiene el color del tipo de actividad
   */
  const getActivityColor = (type) => {
    switch (type) {
      case 'purchase':
        return 'text-success';
      case 'cancel':
        return 'text-error';
      case 'movie-add':
      case 'movie-update':
        return 'text-primary';
      case 'user-add':
        return 'text-info';
      default:
        return 'text-neutral-600';
    }
  };

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className="space-y-6">
      {/* ==================== HEADER ==================== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-1">
            Resumen general del sistema de cine
          </p>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setTimePeriod('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timePeriod === 'week'
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setTimePeriod('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timePeriod === 'month'
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setTimePeriod('year')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timePeriod === 'year'
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Año
          </button>
        </div>
      </div>

      {/* ==================== KPI CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header con icon y badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    kpi.color === 'success'
                      ? 'bg-success-light'
                      : kpi.color === 'info'
                      ? 'bg-info-light'
                      : kpi.color === 'primary'
                      ? 'bg-primary-light'
                      : 'bg-warning-light'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      kpi.color === 'success'
                        ? 'text-success-dark'
                        : kpi.color === 'info'
                        ? 'text-info-dark'
                        : kpi.color === 'primary'
                        ? 'text-primary-dark'
                        : 'text-warning-dark'
                    }`}
                  />
                </div>

                {/* Badge de cambio */}
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getTrendColor(
                    kpi.trend
                  )}`}
                >
                  {getTrendIcon(kpi.trend)}
                  <span>{kpi.change}</span>
                </div>
              </div>

              {/* Valor principal */}
              <p className="text-sm text-neutral-600 mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-neutral-900 mb-1">
                {kpi.value}
              </p>
              <p className="text-xs text-neutral-500">{kpi.description}</p>
            </Card>
          );
        })}
      </div>

      {/* ==================== CHARTS ROW ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Ventas por Día */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              Ventas por Día
            </h3>
            <button className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1">
              Ver detalle
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-neutral-300">
            <TrendingUp className="w-12 h-12 text-neutral-400 mb-3" />
            <p className="text-neutral-500 font-medium mb-1">
              Chart de Ventas
            </p>
            <p className="text-sm text-neutral-400">
              (Integrar librería de charts)
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              Sugerencias: Chart.js, Recharts, Victory
            </p>
          </div>

          {/* Stats debajo del chart */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-neutral-200">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Promedio Diario</p>
              <p className="text-lg font-bold text-neutral-900">$1,523</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Mejor Día</p>
              <p className="text-lg font-bold text-success">$2,845</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Total Mes</p>
              <p className="text-lg font-bold text-primary">$45,231</p>
            </div>
          </div>
        </Card>

        {/* Chart 2: Películas Más Populares */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              Películas Más Populares
            </h3>
            <button className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1">
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Lista de películas */}
          <div className="space-y-3">
            {topMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Ranking badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0
                        ? 'bg-success text-white'
                        : index === 1
                        ? 'bg-info text-white'
                        : index === 2
                        ? 'bg-warning text-white'
                        : 'bg-neutral-300 text-neutral-700'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Movie info */}
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">
                      {movie.title}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {movie.tickets} boletos vendidos
                    </p>
                  </div>
                </div>

                {/* Revenue */}
                <div className="text-right">
                  <p className="font-bold text-neutral-900">{movie.revenue}</p>
                  <div className="flex items-center gap-1 text-xs text-warning">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Top {index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar total */}
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-neutral-600">Total de Top 5</span>
              <span className="font-bold text-neutral-900">$15,936</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                style={{ width: '72%' }}
              ></div>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              72% de las ventas totales
            </p>
          </div>
        </Card>
      </div>

      {/* ==================== RECENT ACTIVITIES ==================== */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-neutral-900">
              Actividad Reciente
            </h3>
          </div>
          <button className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1">
            Ver todo el log
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Activities list */}
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between pb-3 ${
                index !== recentActivities.length - 1
                  ? 'border-b border-neutral-200'
                  : ''
              }`}
            >
              {/* Left side: time + action */}
              <div className="flex items-center gap-4">
                {/* Time badge */}
                <div className="flex items-center gap-1 text-xs text-neutral-500 min-w-[70px]">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>

                {/* Activity icon */}
                <Activity className={`w-5 h-5 ${getActivityColor(activity.type)}`} />

                {/* Description */}
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {activity.action} - <span className="font-medium">{activity.movie}</span>
                  </p>
                </div>
              </div>

              {/* Right side: amount */}
              {activity.amount && (
                <div
                  className={`text-sm font-bold ${
                    activity.type === 'cancel'
                      ? 'text-error'
                      : 'text-success'
                  }`}
                >
                  {activity.amount}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-neutral-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-xs text-neutral-500">Compras Hoy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-info">3</p>
            <p className="text-xs text-neutral-500">Películas Agregadas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">1</p>
            <p className="text-xs text-neutral-500">Cancelaciones</p>
          </div>
        </div>
      </Card>

      {/* ==================== QUICK ACTIONS ==================== */}
      <Card className="p-6 bg-gradient-to-br from-primary-light to-secondary-light">
        <h3 className="text-lg font-semibold text-white mb-4">
          Acciones Rápidas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Acción 1: Agregar Película */}
          <button className="bg-white rounded-lg p-4 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                <Plus className="w-5 h-5 text-primary-dark group-hover:text-white" />
              </div>
              <Film className="w-5 h-5 text-primary" />
            </div>
            <p className="font-semibold text-neutral-900 mb-1">
              Agregar Película
            </p>
            <p className="text-xs text-neutral-600">
              Añadir nuevo título a la cartelera
            </p>
          </button>

          {/* Acción 2: Ver Reportes */}
          <button className="bg-white rounded-lg p-4 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-info-light rounded-lg flex items-center justify-center group-hover:bg-info transition-colors">
                <FileText className="w-5 h-5 text-info-dark group-hover:text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-info" />
            </div>
            <p className="font-semibold text-neutral-900 mb-1">Ver Reportes</p>
            <p className="text-xs text-neutral-600">
              Análisis y métricas detalladas
            </p>
          </button>

          {/* Acción 3: Gestionar Usuarios */}
          <button className="bg-white rounded-lg p-4 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary-light rounded-lg flex items-center justify-center group-hover:bg-secondary transition-colors">
                <Users className="w-5 h-5 text-secondary group-hover:text-white" />
              </div>
              <Settings className="w-5 h-5 text-secondary" />
            </div>
            <p className="font-semibold text-neutral-900 mb-1">
              Gestionar Usuarios
            </p>
            <p className="text-xs text-neutral-600">
              Administrar clientes y cajeros
            </p>
          </button>

          {/* Acción 4: Programar Funciones */}
          <button className="bg-white rounded-lg p-4 hover:shadow-lg transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning-light rounded-lg flex items-center justify-center group-hover:bg-warning transition-colors">
                <Calendar className="w-5 h-5 text-warning-dark group-hover:text-white" />
              </div>
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <p className="font-semibold text-neutral-900 mb-1">
              Programar Funciones
            </p>
            <p className="text-xs text-neutral-600">
              Configurar horarios y salas
            </p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
