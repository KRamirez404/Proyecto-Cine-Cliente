import { useState, useEffect, useMemo } from 'react';
import { Card, Button, Input, Badge } from '@atoms';
import { Modal } from '@molecules';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Crown,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Award,
  Gift,
  Star,
  Download,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

// VIP Tiers configuration
const VIP_TIERS = {
  gold: { name: 'Gold', emoji: '🥇', color: 'warning', minSpend: 5000, benefits: '10% descuento' },
  platinum: { name: 'Platinum', emoji: '🥈', color: 'info', minSpend: 15000, benefits: '20% descuento + Preventa' },
  diamond: { name: 'Diamond', emoji: '💎', color: 'primary', minSpend: 30000, benefits: '30% descuento + VIP Lounge' },
};

// Initial mock data
const initialVIPs = [
  {
    id: 1,
    nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      telefono: '555-0101',
      nivel: 'diamond',
      vipDesde: '2024-01-15',
      totalGastado: 45000,
      puntosAcumulados: 4500,
      descuentoPersonalizado: 35,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 2,
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '555-0102',
      nivel: 'platinum',
      vipDesde: '2024-03-20',
      totalGastado: 22000,
      puntosAcumulados: 2200,
      descuentoPersonalizado: 25,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 3,
      nombre: 'Juan Pérez',
      email: 'juan.perez@email.com',
      telefono: '555-0103',
      nivel: 'gold',
      vipDesde: '2024-06-10',
      totalGastado: 8500,
      puntosAcumulados: 850,
      descuentoPersonalizado: 15,
      accesoExclusivo: false,
      estado: 'activo',
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      telefono: '555-0104',
      nivel: 'platinum',
      vipDesde: '2024-02-28',
      totalGastado: 18500,
      puntosAcumulados: 1850,
      descuentoPersonalizado: 22,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 5,
      nombre: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      telefono: '555-0105',
      nivel: 'diamond',
      vipDesde: '2023-11-05',
      totalGastado: 52000,
      puntosAcumulados: 5200,
      descuentoPersonalizado: 40,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 6,
      nombre: 'Laura Fernández',
      email: 'laura.fernandez@email.com',
      telefono: '555-0106',
      nivel: 'gold',
      vipDesde: '2024-07-15',
      totalGastado: 6800,
      puntosAcumulados: 680,
      descuentoPersonalizado: 12,
      accesoExclusivo: false,
      estado: 'activo',
    },
    {
      id: 7,
      nombre: 'Diego Torres',
      email: 'diego.torres@email.com',
      telefono: '555-0107',
      nivel: 'platinum',
      vipDesde: '2024-04-12',
      totalGastado: 16200,
      puntosAcumulados: 1620,
      descuentoPersonalizado: 20,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 8,
      nombre: 'Patricia López',
      email: 'patricia.lopez@email.com',
      telefono: '555-0108',
      nivel: 'gold',
      vipDesde: '2024-08-01',
      totalGastado: 5500,
      puntosAcumulados: 550,
      descuentoPersonalizado: 10,
      accesoExclusivo: false,
      estado: 'activo',
    },
    {
      id: 9,
      nombre: 'Fernando Ruiz',
      email: 'fernando.ruiz@email.com',
      telefono: '555-0109',
      nivel: 'diamond',
      vipDesde: '2024-01-20',
      totalGastado: 38000,
      puntosAcumulados: 3800,
      descuentoPersonalizado: 32,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 10,
      nombre: 'Carmen Sánchez',
      email: 'carmen.sanchez@email.com',
      telefono: '555-0110',
      nivel: 'platinum',
      vipDesde: '2024-05-08',
      totalGastado: 19800,
      puntosAcumulados: 1980,
      descuentoPersonalizado: 23,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 11,
      nombre: 'Miguel Castro',
      email: 'miguel.castro@email.com',
      telefono: '555-0111',
      nivel: 'gold',
      vipDesde: '2024-09-02',
      totalGastado: 7200,
      puntosAcumulados: 720,
      descuentoPersonalizado: 13,
      accesoExclusivo: false,
      estado: 'inactivo',
    },
    {
      id: 12,
      nombre: 'Sofía Vargas',
      email: 'sofia.vargas@email.com',
      telefono: '555-0112',
      nivel: 'platinum',
      vipDesde: '2024-03-15',
      totalGastado: 21500,
      puntosAcumulados: 2150,
      descuentoPersonalizado: 24,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 13,
      nombre: 'Javier Morales',
      email: 'javier.morales@email.com',
      telefono: '555-0113',
      nivel: 'diamond',
      vipDesde: '2023-12-10',
      totalGastado: 48500,
      puntosAcumulados: 4850,
      descuentoPersonalizado: 38,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 14,
      nombre: 'Daniela Ramos',
      email: 'daniela.ramos@email.com',
      telefono: '555-0114',
      nivel: 'gold',
      vipDesde: '2024-07-22',
      totalGastado: 6200,
      puntosAcumulados: 620,
      descuentoPersonalizado: 11,
      accesoExclusivo: false,
      estado: 'activo',
    },
    {
      id: 15,
      nombre: 'Ricardo Núñez',
      email: 'ricardo.nunez@email.com',
      telefono: '555-0115',
      nivel: 'platinum',
      vipDesde: '2024-04-28',
      totalGastado: 17300,
      puntosAcumulados: 1730,
      descuentoPersonalizado: 21,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 16,
      nombre: 'Valentina Ortiz',
      email: 'valentina.ortiz@email.com',
      telefono: '555-0116',
      nivel: 'gold',
      vipDesde: '2024-08-18',
      totalGastado: 5800,
      puntosAcumulados: 580,
      descuentoPersonalizado: 10,
      accesoExclusivo: false,
      estado: 'inactivo',
    },
    {
      id: 17,
      nombre: 'Andrés Jiménez',
      email: 'andres.jimenez@email.com',
      telefono: '555-0117',
      nivel: 'diamond',
      vipDesde: '2024-02-05',
      totalGastado: 42000,
      puntosAcumulados: 4200,
      descuentoPersonalizado: 36,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 18,
      nombre: 'Isabella Méndez',
      email: 'isabella.mendez@email.com',
      telefono: '555-0118',
      nivel: 'platinum',
      vipDesde: '2024-05-20',
      totalGastado: 20500,
      puntosAcumulados: 2050,
      descuentoPersonalizado: 23,
      accesoExclusivo: true,
      estado: 'activo',
    },
    {
      id: 19,
      nombre: 'Gabriel Herrera',
      email: 'gabriel.herrera@email.com',
      telefono: '555-0119',
      nivel: 'gold',
      vipDesde: '2024-09-12',
      totalGastado: 6500,
      puntosAcumulados: 650,
      descuentoPersonalizado: 12,
      accesoExclusivo: false,
      estado: 'activo',
    },
    {
      id: 20,
      nombre: 'Camila Díaz',
      email: 'camila.diaz@email.com',
      telefono: '555-0120',
      nivel: 'diamond',
      vipDesde: '2024-01-08',
      totalGastado: 55000,
      puntosAcumulados: 5500,
      descuentoPersonalizado: 42,
      accesoExclusivo: true,
      estado: 'activo',
    },
  ];

/**
 * AdminVIP - Gestión de Clientes VIP
 * 
 * Funcionalidades:
 * - Lista de clientes VIP con información completa
 * - Filtros por nivel (Gold/Platinum/Diamond), estado, gasto mínimo
 * - Modal para upgrade de cliente normal a VIP
 * - Modal para ver/editar beneficios personalizados
 * - SearchBar por nombre o email
 * - Stats: Total VIPs, Revenue, Avg Spending, New VIPs
 * - Progress bars para siguiente tier
 * - Sorting por columnas
 * - Export to CSV
 * - Badges con colores por nivel VIP
 * - Mock CRUD con localStorage
 * - Responsive design
 */
const AdminVIP = () => {
  // State
  const [vips, setVips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNivel, setFilterNivel] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [filterGastoMin, setFilterGastoMin] = useState('');
  const [sortField, setSortField] = useState('totalGastado');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Modals
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showBenefitsModal, setShowBenefitsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVIP, setSelectedVIP] = useState(null);

  // Form data for upgrade
  const [upgradeForm, setUpgradeForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    nivel: 'gold',
    descuentoPersonalizado: 10,
    accesoExclusivo: false,
  });

  // Form data for benefits
  const [benefitsForm, setBenefitsForm] = useState({
    descuentoPersonalizado: 0,
    accesoExclusivo: false,
    puntosAcumulados: 0,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('adminVIP');
    if (stored) {
      setVips(JSON.parse(stored));
    } else {
      setVips(initialVIPs);
      localStorage.setItem('adminVIP', JSON.stringify(initialVIPs));
    }
  }, []);

  // Save to localStorage when vips change
  useEffect(() => {
    if (vips.length > 0) {
      localStorage.setItem('adminVIP', JSON.stringify(vips));
    }
  }, [vips]);

  // Filtered and sorted VIPs
  const filteredVIPs = useMemo(() => {
    let filtered = vips.filter((vip) => {
      const matchSearch =
        vip.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vip.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchNivel = filterNivel === 'todos' || vip.nivel === filterNivel;
      const matchEstado = filterEstado === 'todos' || vip.estado === filterEstado;
      const matchGasto = !filterGastoMin || vip.totalGastado >= parseInt(filterGastoMin);

      return matchSearch && matchNivel && matchEstado && matchGasto;
    });

    // Sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortField === 'totalGastado' || sortField === 'puntosAcumulados') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (sortField === 'vipDesde') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      }

      // String comparison
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return filtered;
  }, [vips, searchTerm, filterNivel, filterEstado, filterGastoMin, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredVIPs.length / itemsPerPage);
  const paginatedVIPs = filteredVIPs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats calculations
  const stats = useMemo(() => {
    const totalVIPs = vips.filter((v) => v.estado === 'activo').length;
    const totalRevenue = vips.reduce((sum, v) => sum + v.totalGastado, 0);
    const avgSpending = totalVIPs > 0 ? totalRevenue / totalVIPs : 0;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newVIPs = vips.filter((v) => {
      const vipDate = new Date(v.vipDesde);
      return vipDate.getMonth() === currentMonth && vipDate.getFullYear() === currentYear;
    }).length;

    return {
      totalVIPs,
      totalRevenue,
      avgSpending,
      newVIPs,
    };
  }, [vips]);

  // Handlers
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleUpgrade = () => {
    const newVIP = {
      id: Math.max(...vips.map((v) => v.id), 0) + 1,
      nombre: upgradeForm.nombre,
      email: upgradeForm.email,
      telefono: upgradeForm.telefono,
      nivel: upgradeForm.nivel,
      vipDesde: new Date().toISOString().split('T')[0],
      totalGastado: VIP_TIERS[upgradeForm.nivel].minSpend,
      puntosAcumulados: VIP_TIERS[upgradeForm.nivel].minSpend / 10,
      descuentoPersonalizado: upgradeForm.descuentoPersonalizado,
      accesoExclusivo: upgradeForm.accesoExclusivo,
      estado: 'activo',
    };

    setVips([...vips, newVIP]);
    setShowUpgradeModal(false);
    resetUpgradeForm();
  };

  const handleEditBenefits = () => {
    setVips(
      vips.map((vip) =>
        vip.id === selectedVIP.id
          ? {
              ...vip,
              descuentoPersonalizado: benefitsForm.descuentoPersonalizado,
              accesoExclusivo: benefitsForm.accesoExclusivo,
              puntosAcumulados: benefitsForm.puntosAcumulados,
            }
          : vip
      )
    );
    setShowBenefitsModal(false);
    setSelectedVIP(null);
  };

  const handleDelete = () => {
    setVips(vips.filter((vip) => vip.id !== selectedVIP.id));
    setShowDeleteModal(false);
    setSelectedVIP(null);
  };

  const handleExportCSV = () => {
    alert('Generando reporte CSV... (Funcionalidad pendiente de implementación)');
  };

  const resetUpgradeForm = () => {
    setUpgradeForm({
      nombre: '',
      email: '',
      telefono: '',
      nivel: 'gold',
      descuentoPersonalizado: 10,
      accesoExclusivo: false,
    });
  };

  const openBenefitsModal = (vip) => {
    setSelectedVIP(vip);
    setBenefitsForm({
      descuentoPersonalizado: vip.descuentoPersonalizado,
      accesoExclusivo: vip.accesoExclusivo,
      puntosAcumulados: vip.puntosAcumulados,
    });
    setShowBenefitsModal(true);
  };

  const openDeleteModal = (vip) => {
    setSelectedVIP(vip);
    setShowDeleteModal(true);
  };

  // Progress bar for next tier
  const getProgressToNextTier = (vip) => {
    const tiers = ['gold', 'platinum', 'diamond'];
    const currentIndex = tiers.indexOf(vip.nivel);
    
    if (currentIndex === tiers.length - 1) {
      return { progress: 100, nextTier: null, remaining: 0 };
    }

    const nextTier = tiers[currentIndex + 1];
    const currentMin = VIP_TIERS[vip.nivel].minSpend;
    const nextMin = VIP_TIERS[nextTier].minSpend;
    const progress = ((vip.totalGastado - currentMin) / (nextMin - currentMin)) * 100;
    const remaining = Math.max(0, nextMin - vip.totalGastado);

    return {
      progress: Math.min(100, Math.max(0, progress)),
      nextTier: VIP_TIERS[nextTier].name,
      remaining,
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-2">
            <Crown className="w-8 h-8 text-warning" />
            Clientes VIP
          </h1>
          <p className="text-neutral-600 mt-1">
            Gestiona los clientes VIP y sus beneficios exclusivos
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleExportCSV}
            icon={Download}
          >
            Exportar CSV
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowUpgradeModal(true)}
            icon={Plus}
          >
            Upgrade a VIP
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total VIPs</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {stats.totalVIPs}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Revenue Total</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Gasto Promedio</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {formatCurrency(stats.avgSpending)}
              </p>
            </div>
            <div className="w-12 h-12 bg-info-light rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-info" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Nuevos VIPs (mes)</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">
                {stats.newVIPs}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <Input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>

          {/* Filter Nivel */}
          <div>
            <select
              value={filterNivel}
              onChange={(e) => setFilterNivel(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
            >
              <option value="todos">Todos los niveles</option>
              <option value="gold">🥇 Gold</option>
              <option value="platinum">🥈 Platinum</option>
              <option value="diamond">💎 Diamond</option>
            </select>
          </div>

          {/* Filter Estado */}
          <div>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>

          {/* Filter Gasto Mínimo */}
          <div>
            <Input
              type="number"
              placeholder="Gasto mínimo..."
              value={filterGastoMin}
              onChange={(e) => setFilterGastoMin(e.target.value)}
              icon={DollarSign}
            />
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
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('nombre')}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Cliente
                    {sortField === 'nombre' &&
                      (sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Nivel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('vipDesde')}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    VIP Desde
                    {sortField === 'vipDesde' &&
                      (sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('totalGastado')}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Total Gastado
                    {sortField === 'totalGastado' &&
                      (sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Progreso
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
              {paginatedVIPs.map((vip) => {
                const progress = getProgressToNextTier(vip);
                return (
                  <tr key={vip.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      #{vip.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {vip.nombre}
                        </div>
                        <div className="text-sm text-neutral-500">{vip.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={VIP_TIERS[vip.nivel].color} size="md">
                        {VIP_TIERS[vip.nivel].emoji} {VIP_TIERS[vip.nivel].name}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {formatDate(vip.vipDesde)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-success">
                      {formatCurrency(vip.totalGastado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {progress.nextTier ? (
                        <div className="w-32">
                          <div className="flex justify-between text-xs text-neutral-600 mb-1">
                            <span>{progress.nextTier}</span>
                            <span>{Math.round(progress.progress)}%</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${progress.progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-neutral-500 mt-1">
                            Faltan {formatCurrency(progress.remaining)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-neutral-500">Nivel máximo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={vip.estado === 'activo' ? 'success' : 'neutral'}
                        size="sm"
                      >
                        {vip.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openBenefitsModal(vip)}
                          className="text-info hover:text-info-dark transition-colors"
                          title="Editar beneficios"
                        >
                          <Gift className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(vip)}
                          className="text-error hover:text-error-dark transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
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
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredVIPs.length)} de{' '}
              {filteredVIPs.length} VIPs
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
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

      {/* Modal: Upgrade to VIP */}
      {showUpgradeModal && (
        <Modal
          isOpen={showUpgradeModal}
          onClose={() => {
            setShowUpgradeModal(false);
            resetUpgradeForm();
          }}
          title="Upgrade a VIP"
          variant="primary"
        >
          <div className="space-y-4">
            <Input
              label="Nombre Completo"
              type="text"
              value={upgradeForm.nombre}
              onChange={(e) =>
                setUpgradeForm({ ...upgradeForm, nombre: e.target.value })
              }
              placeholder="Juan Pérez"
            />
            <Input
              label="Email"
              type="email"
              value={upgradeForm.email}
              onChange={(e) =>
                setUpgradeForm({ ...upgradeForm, email: e.target.value })
              }
              placeholder="juan@example.com"
            />
            <Input
              label="Teléfono"
              type="tel"
              value={upgradeForm.telefono}
              onChange={(e) =>
                setUpgradeForm({ ...upgradeForm, telefono: e.target.value })
              }
              placeholder="555-1234"
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nivel VIP
              </label>
              <select
                value={upgradeForm.nivel}
                onChange={(e) =>
                  setUpgradeForm({ ...upgradeForm, nivel: e.target.value })
                }
                className="w-full h-11 px-4 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary-light transition-all"
              >
                <option value="gold">🥇 Gold - {formatCurrency(5000)}</option>
                <option value="platinum">🥈 Platinum - {formatCurrency(15000)}</option>
                <option value="diamond">💎 Diamond - {formatCurrency(30000)}</option>
              </select>
            </div>
            <Input
              label="Descuento Personalizado (%)"
              type="number"
              value={upgradeForm.descuentoPersonalizado}
              onChange={(e) =>
                setUpgradeForm({
                  ...upgradeForm,
                  descuentoPersonalizado: parseInt(e.target.value) || 0,
                })
              }
              placeholder="10"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={upgradeForm.accesoExclusivo}
                onChange={(e) =>
                  setUpgradeForm({
                    ...upgradeForm,
                    accesoExclusivo: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral-700">
                Acceso a funciones exclusivas
              </span>
            </label>
          </div>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => {
                setShowUpgradeModal(false);
                resetUpgradeForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleUpgrade}
              disabled={!upgradeForm.nombre || !upgradeForm.email}
            >
              Crear VIP
            </Button>
          </div>
        </Modal>
      )}

      {/* Modal: Edit Benefits */}
      {showBenefitsModal && selectedVIP && (
        <Modal
          isOpen={showBenefitsModal}
          onClose={() => {
            setShowBenefitsModal(false);
            setSelectedVIP(null);
          }}
          title={`Beneficios de ${selectedVIP.nombre}`}
          variant="info"
        >
          <div className="space-y-4">
            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">Nivel Actual:</span>
                <Badge variant={VIP_TIERS[selectedVIP.nivel].color} size="md">
                  {VIP_TIERS[selectedVIP.nivel].emoji}{' '}
                  {VIP_TIERS[selectedVIP.nivel].name}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Total Gastado:</span>
                <span className="text-sm font-semibold text-success">
                  {formatCurrency(selectedVIP.totalGastado)}
                </span>
              </div>
            </div>

            <Input
              label="Descuento Personalizado (%)"
              type="number"
              value={benefitsForm.descuentoPersonalizado}
              onChange={(e) =>
                setBenefitsForm({
                  ...benefitsForm,
                  descuentoPersonalizado: parseInt(e.target.value) || 0,
                })
              }
              icon={Award}
            />

            <Input
              label="Puntos Acumulados"
              type="number"
              value={benefitsForm.puntosAcumulados}
              onChange={(e) =>
                setBenefitsForm({
                  ...benefitsForm,
                  puntosAcumulados: parseInt(e.target.value) || 0,
                })
              }
              icon={Star}
            />

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={benefitsForm.accesoExclusivo}
                onChange={(e) =>
                  setBenefitsForm({
                    ...benefitsForm,
                    accesoExclusivo: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-neutral-700">
                Acceso a VIP Lounge y funciones exclusivas
              </span>
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => {
                setShowBenefitsModal(false);
                setSelectedVIP(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleEditBenefits}
            >
              Guardar Cambios
            </Button>
          </div>
        </Modal>
      )}

      {/* Modal: Delete Confirmation */}
      {showDeleteModal && selectedVIP && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedVIP(null);
          }}
          title="Confirmar Eliminación"
          variant="error"
        >
          <p className="text-neutral-700">
            ¿Estás seguro de que deseas eliminar a{' '}
            <strong>{selectedVIP.nombre}</strong> de la lista de VIPs?
          </p>
          <p className="text-sm text-neutral-600 mt-2">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedVIP(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="error"
              size="md"
              className="flex-1"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminVIP;
