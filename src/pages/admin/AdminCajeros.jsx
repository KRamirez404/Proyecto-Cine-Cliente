import { useState, useMemo } from 'react';
import { Card, Button, Input, Badge } from '@/components/atoms';
import { Modal } from '@/components/molecules';
import { cajerosService } from '@/services/cajeros.service';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  ToggleLeft, 
  ToggleRight,
  User,
  Mail,
  Phone,
  Lock,
  Clock,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';

/**
 * AdminCajeros - Gestión de Cajeros
 * 
 * Página de administración para gestionar cajeros del sistema.
 * Permite crear, editar, eliminar y cambiar estado de cajeros.
 * 
 * Features:
 * - Tabla de cajeros con información completa
 * - CRUD completo (Create, Read, Update, Delete)
 * - Toggle estado (activo/inactivo)
 * - Búsqueda por nombre o email
 * - Paginación (10 cajeros por página)
 * - Persistencia con localStorage
 * - Responsive (tabla desktop, cards mobile)
 */

// Mock data inicial
const initialCajeros = [
  {
    id: 1,
    nombre: 'María García',
    email: 'maria.garcia@cineapp.com',
    telefono: '+1 (555) 123-4567',
    estado: 'activo',
    horario: 'Mañana (8:00 - 16:00)',
    ultimoAcceso: '2025-10-17 14:30:00',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@cineapp.com',
    telefono: '+1 (555) 234-5678',
    estado: 'activo',
    horario: 'Tarde (14:00 - 22:00)',
    ultimoAcceso: '2025-10-17 10:15:00',
    createdAt: '2024-02-20'
  },
  {
    id: 3,
    nombre: 'Ana Martínez',
    email: 'ana.martinez@cineapp.com',
    telefono: '+1 (555) 345-6789',
    estado: 'activo',
    horario: 'Noche (18:00 - 02:00)',
    ultimoAcceso: '2025-10-16 22:45:00',
    createdAt: '2024-03-10'
  },
  {
    id: 4,
    nombre: 'Luis Hernández',
    email: 'luis.hernandez@cineapp.com',
    telefono: '+1 (555) 456-7890',
    estado: 'inactivo',
    horario: 'Mañana (8:00 - 16:00)',
    ultimoAcceso: '2025-10-10 09:30:00',
    createdAt: '2024-01-25'
  },
  {
    id: 5,
    nombre: 'Patricia López',
    email: 'patricia.lopez@cineapp.com',
    telefono: '+1 (555) 567-8901',
    estado: 'activo',
    horario: 'Tarde (14:00 - 22:00)',
    ultimoAcceso: '2025-10-17 16:20:00',
    createdAt: '2024-04-05'
  },
  {
    id: 6,
    nombre: 'Roberto Sánchez',
    email: 'roberto.sanchez@cineapp.com',
    telefono: '+1 (555) 678-9012',
    estado: 'activo',
    horario: 'Mañana (8:00 - 16:00)',
    ultimoAcceso: '2025-10-17 11:00:00',
    createdAt: '2024-05-12'
  },
  {
    id: 7,
    nombre: 'Elena Ramírez',
    email: 'elena.ramirez@cineapp.com',
    telefono: '+1 (555) 789-0123',
    estado: 'activo',
    horario: 'Noche (18:00 - 02:00)',
    ultimoAcceso: '2025-10-17 19:15:00',
    createdAt: '2024-06-18'
  },
  {
    id: 8,
    nombre: 'Jorge Torres',
    email: 'jorge.torres@cineapp.com',
    telefono: '+1 (555) 890-1234',
    estado: 'inactivo',
    horario: 'Tarde (14:00 - 22:00)',
    ultimoAcceso: '2025-09-28 15:40:00',
    createdAt: '2024-02-14'
  },
  {
    id: 9,
    nombre: 'Sofía Flores',
    email: 'sofia.flores@cineapp.com',
    telefono: '+1 (555) 901-2345',
    estado: 'activo',
    horario: 'Mañana (8:00 - 16:00)',
    ultimoAcceso: '2025-10-17 13:25:00',
    createdAt: '2024-07-22'
  },
  {
    id: 10,
    nombre: 'Miguel Castillo',
    email: 'miguel.castillo@cineapp.com',
    telefono: '+1 (555) 012-3456',
    estado: 'activo',
    horario: 'Tarde (14:00 - 22:00)',
    ultimoAcceso: '2025-10-17 17:50:00',
    createdAt: '2024-08-30'
  },
  {
    id: 11,
    nombre: 'Laura Morales',
    email: 'laura.morales@cineapp.com',
    telefono: '+1 (555) 123-4568',
    estado: 'activo',
    horario: 'Noche (18:00 - 02:00)',
    ultimoAcceso: '2025-10-17 20:10:00',
    createdAt: '2024-09-15'
  },
  {
    id: 12,
    nombre: 'David Ruiz',
    email: 'david.ruiz@cineapp.com',
    telefono: '+1 (555) 234-5679',
    estado: 'inactivo',
    horario: 'Mañana (8:00 - 16:00)',
    ultimoAcceso: '2025-10-05 10:00:00',
    createdAt: '2024-03-20'
  },
  {
    id: 13,
    nombre: 'Carmen Jiménez',
    email: 'carmen.jimenez@cineapp.com',
    telefono: '+1 (555) 345-6780',
    estado: 'activo',
    horario: 'Tarde (14:00 - 22:00)',
    ultimoAcceso: '2025-10-17 18:35:00',
    createdAt: '2024-10-01'
  },
  {
    id: 14,
    nombre: 'Pedro Vargas',
    email: 'pedro.vargas@cineapp.com',
    telefono: '+1 (555) 456-7891',
    estado: 'activo',
    horario: 'Noche (18:00 - 02:00)',
    ultimoAcceso: '2025-10-17 21:00:00',
    createdAt: '2024-04-18'
  },
  {
    id: 15,
    nombre: 'Isabel Mendoza',
    email: 'isabel.mendoza@cineapp.com',
    telefono: '+1 (555) 567-8902',
    estado: 'activo',
    horario: 'Mañana (8:00 - 16:00)',
    ultimoAcceso: '2025-10-17 12:45:00',
    createdAt: '2024-05-25'
  }
];

const AdminCajeros = () => {
  // State
  const [cajeros, setCajeros] = useState(() => {
    const stored = localStorage.getItem('adminCajeros');
    return stored ? JSON.parse(stored) : initialCajeros;
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cajerosPerPage = 10;
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCajero, setSelectedCajero] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    horario: 'Mañana (8:00 - 16:00)'
  });
  
  const [formErrors, setFormErrors] = useState({});

  // Filtered cajeros
  const filteredCajeros = useMemo(() => {
    return cajeros.filter(cajero => {
      const matchesSearch = 
        cajero.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cajero.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [cajeros, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredCajeros.length / cajerosPerPage);
  const paginatedCajeros = filteredCajeros.slice(
    (currentPage - 1) * cajerosPerPage,
    currentPage * cajerosPerPage
  );

  // Stats
  const stats = {
    total: cajeros.length,
    activos: cajeros.filter(c => c.estado === 'activo').length,
    inactivos: cajeros.filter(c => c.estado === 'inactivo').length
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.telefono.trim()) {
      errors.telefono = 'El teléfono es requerido';
    }
    
    if (!isEditModalOpen && !formData.password.trim()) {
      errors.password = 'La contraseña es requerida';
    } else if (!isEditModalOpen && formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      password: '',
      horario: 'Mañana (8:00 - 16:00)'
    });
    setFormErrors({});
  };

  // CRUD Operations
  const handleAddCajero = async () => {
    if (!validateForm()) return;

    try {
      // Enviar al backend (sin teléfono en el payload)
      const response = await cajerosService.createCajero({
        nombre: formData.nombre,
        usuario: formData.email.split('@')[0],
        password: formData.password,
        horario: formData.horario,
      });

      // Tomamos el cajero creado desde la respuesta si viene, si no usamos datos locales
      const created = response?.data?.cajero || response?.data || {
        id: Date.now(),
        nombre: formData.nombre,
        email: formData.email,
        horario: formData.horario,
      };

      const newCajero = {
        id: created.id || Date.now(),
        nombre: created.nombre,
        email: created.email,
        telefono: formData.telefono,
        horario: created.horario || formData.horario,
        estado: created.estado || 'activo',
        ultimoAcceso:
          created.ultimoAcceso ||
          new Date().toISOString().replace('T', ' ').substring(0, 19),
        createdAt: created.createdAt || new Date().toISOString().split('T')[0],
      };

      const updatedCajeros = [...cajeros, newCajero];
      setCajeros(updatedCajeros);
      localStorage.setItem('adminCajeros', JSON.stringify(updatedCajeros));

      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error al registrar cajero:', error);
      // Aquí podrías mostrar un toast/notificación si tienes sistema de alerts
    }
  };

  const handleEditCajero = () => {
    if (!validateForm()) return;
    
    const updatedCajeros = cajeros.map(c =>
      c.id === selectedCajero.id
        ? {
            ...c,
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            horario: formData.horario
          }
        : c
    );
    
    setCajeros(updatedCajeros);
    localStorage.setItem('adminCajeros', JSON.stringify(updatedCajeros));
    
    setIsEditModalOpen(false);
    setSelectedCajero(null);
    resetForm();
  };

  const handleDeleteCajero = () => {
    const updatedCajeros = cajeros.filter(c => c.id !== selectedCajero.id);
    setCajeros(updatedCajeros);
    localStorage.setItem('adminCajeros', JSON.stringify(updatedCajeros));
    
    setIsDeleteModalOpen(false);
    setSelectedCajero(null);
  };

  const handleToggleEstado = (cajero) => {
    const updatedCajeros = cajeros.map(c =>
      c.id === cajero.id
        ? { ...c, estado: c.estado === 'activo' ? 'inactivo' : 'activo' }
        : c
    );
    
    setCajeros(updatedCajeros);
    localStorage.setItem('adminCajeros', JSON.stringify(updatedCajeros));
  };

  // Open modals
  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (cajero) => {
    setSelectedCajero(cajero);
    setFormData({
      nombre: cajero.nombre,
      email: cajero.email,
      telefono: cajero.telefono,
      password: '',
      horario: cajero.horario
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (cajero) => {
    setSelectedCajero(cajero);
    setIsDeleteModalOpen(true);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Gestión de Cajeros
          </h1>
          <p className="text-neutral-600 mt-1">
            Administra los cajeros del sistema de punto de venta
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={openAddModal}
          className="w-full md:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Agregar Cajero
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Total Cajeros</p>
              <p className="text-3xl font-bold text-neutral-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Activos</p>
              <p className="text-3xl font-bold text-success">{stats.activos}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
              <ToggleRight className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Inactivos</p>
              <p className="text-3xl font-bold text-neutral-500">{stats.inactivos}</p>
            </div>
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
              <ToggleLeft className="w-6 h-6 text-neutral-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <Input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          icon={Search}
          iconPosition="left"
          className="w-full"
        />
      </Card>

      {/* Cajeros Table - Desktop */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Cajero
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Último Acceso
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {paginatedCajeros.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-neutral-500">
                      <User className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                      <p className="text-lg font-medium">No se encontraron cajeros</p>
                      <p className="text-sm mt-1">
                        {searchQuery ? 'Intenta con otra búsqueda' : 'Agrega tu primer cajero'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedCajeros.map((cajero) => (
                    <tr key={cajero.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                        #{cajero.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              {cajero.nombre}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {cajero.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {cajero.telefono}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-neutral-600">
                          <Clock className="w-4 h-4 mr-1 text-neutral-400" />
                          {cajero.horario}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={cajero.estado === 'activo' ? 'success' : 'neutral'}
                          size="sm"
                        >
                          {cajero.estado === 'activo' ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {formatDate(cajero.ultimoAcceso)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleEstado(cajero)}
                            className="text-neutral-600 hover:text-primary transition-colors"
                            title={cajero.estado === 'activo' ? 'Desactivar' : 'Activar'}
                          >
                            {cajero.estado === 'activo' ? (
                              <ToggleRight className="w-5 h-5" />
                            ) : (
                              <ToggleLeft className="w-5 h-5" />
                            )}
                          </button>
                          <button
                            onClick={() => openEditModal(cajero)}
                            className="text-neutral-600 hover:text-info transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(cajero)}
                            className="text-neutral-600 hover:text-error transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Cajeros Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {paginatedCajeros.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-neutral-500">
              <User className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p className="text-lg font-medium">No se encontraron cajeros</p>
              <p className="text-sm mt-1">
                {searchQuery ? 'Intenta con otra búsqueda' : 'Agrega tu primer cajero'}
              </p>
            </div>
          </Card>
        ) : (
          paginatedCajeros.map((cajero) => (
            <Card key={cajero.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{cajero.nombre}</p>
                    <p className="text-sm text-neutral-600">#{cajero.id}</p>
                  </div>
                </div>
                <Badge
                  variant={cajero.estado === 'activo' ? 'success' : 'neutral'}
                  size="sm"
                >
                  {cajero.estado === 'activo' ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-neutral-600">
                  <Mail className="w-4 h-4 mr-2 text-neutral-400" />
                  {cajero.email}
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <Phone className="w-4 h-4 mr-2 text-neutral-400" />
                  {cajero.telefono}
                </div>
                <div className="flex items-center text-sm text-neutral-600">
                  <Clock className="w-4 h-4 mr-2 text-neutral-400" />
                  {cajero.horario}
                </div>
                <div className="text-xs text-neutral-500 mt-2">
                  Último acceso: {formatDate(cajero.ultimoAcceso)}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleEstado(cajero)}
                  className="flex-1"
                >
                  {cajero.estado === 'activo' ? (
                    <>
                      <ToggleLeft className="w-4 h-4 mr-1" />
                      Desactivar
                    </>
                  ) : (
                    <>
                      <ToggleRight className="w-4 h-4 mr-1" />
                      Activar
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(cajero)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDeleteModal(cajero)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            Mostrando {(currentPage - 1) * cajerosPerPage + 1} a{' '}
            {Math.min(currentPage * cajerosPerPage, filteredCajeros.length)} de{' '}
            {filteredCajeros.length} cajeros
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'primary' : 'outline'}
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Agregar Nuevo Cajero"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Nombre Completo *
            </label>
            <Input
              type="text"
              placeholder="Juan Pérez"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              icon={User}
              iconPosition="left"
              error={formErrors.nombre}
            />
            {formErrors.nombre && (
              <p className="text-xs text-error mt-1">{formErrors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email *
            </label>
            <Input
              type="email"
              placeholder="juan.perez@cineapp.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={Mail}
              iconPosition="left"
              error={formErrors.email}
            />
            {formErrors.email && (
              <p className="text-xs text-error mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Teléfono *
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              icon={Phone}
              iconPosition="left"
              error={formErrors.telefono}
            />
            {formErrors.telefono && (
              <p className="text-xs text-error mt-1">{formErrors.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Contraseña *
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              icon={Lock}
              iconPosition="left"
              error={formErrors.password}
            />
            {formErrors.password && (
              <p className="text-xs text-error mt-1">{formErrors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Horario de Trabajo *
            </label>
            <select
              value={formData.horario}
              onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-900"
            >
              <option value="Mañana (8:00 - 16:00)">Mañana (8:00 - 16:00)</option>
              <option value="Tarde (14:00 - 22:00)">Tarde (14:00 - 22:00)</option>
              <option value="Noche (18:00 - 02:00)">Noche (18:00 - 02:00)</option>
              <option value="Completo (8:00 - 22:00)">Completo (8:00 - 22:00)</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setIsAddModalOpen(false);
                resetForm();
              }}
              className="flex-1"
            >
              <X className="w-5 h-5 mr-2" />
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleAddCajero}
              className="flex-1"
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar Cajero
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCajero(null);
          resetForm();
        }}
        title="Editar Cajero"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Nombre Completo *
            </label>
            <Input
              type="text"
              placeholder="Juan Pérez"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              icon={User}
              iconPosition="left"
              error={formErrors.nombre}
            />
            {formErrors.nombre && (
              <p className="text-xs text-error mt-1">{formErrors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email *
            </label>
            <Input
              type="email"
              placeholder="juan.perez@cineapp.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              icon={Mail}
              iconPosition="left"
              error={formErrors.email}
            />
            {formErrors.email && (
              <p className="text-xs text-error mt-1">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Teléfono *
            </label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              icon={Phone}
              iconPosition="left"
              error={formErrors.telefono}
            />
            {formErrors.telefono && (
              <p className="text-xs text-error mt-1">{formErrors.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Horario de Trabajo *
            </label>
            <select
              value={formData.horario}
              onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-neutral-900"
            >
              <option value="Mañana (8:00 - 16:00)">Mañana (8:00 - 16:00)</option>
              <option value="Tarde (14:00 - 22:00)">Tarde (14:00 - 22:00)</option>
              <option value="Noche (18:00 - 02:00)">Noche (18:00 - 02:00)</option>
              <option value="Completo (8:00 - 22:00)">Completo (8:00 - 22:00)</option>
            </select>
          </div>

          <div className="bg-info/10 border border-info/30 rounded-lg p-3 mt-4">
            <p className="text-sm text-info">
              <strong>Nota:</strong> Para cambiar la contraseña, el cajero debe solicitarlo mediante el proceso de recuperación.
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedCajero(null);
                resetForm();
              }}
              className="flex-1"
            >
              <X className="w-5 h-5 mr-2" />
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleEditCajero}
              className="flex-1"
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCajero(null);
        }}
        title="Eliminar Cajero"
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-error" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            ¿Estás seguro?
          </h3>
          <p className="text-neutral-600 mb-6">
            Estás a punto de eliminar a <strong>{selectedCajero?.nombre}</strong>.
            Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedCajero(null);
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="error"
              size="md"
              onClick={handleDeleteCajero}
              className="flex-1"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCajeros;
