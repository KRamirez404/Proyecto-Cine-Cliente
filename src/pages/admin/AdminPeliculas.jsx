import { useState, useEffect, useMemo } from 'react';
import {
  Film,
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  Clock,
  Tag,
  Star,
  Eye,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  Archive,
  Play
} from 'lucide-react';
import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Badge from '../../components/atoms/Badge';
import Modal from '../../components/molecules/Modal';
import { peliculasService } from '@services';

const GENEROS = ['Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 'Fantasía', 'Romance', 'Thriller', 'Animación', 'Musical', 'Historia'];
const CLASIFICACIONES = ['A', 'AA', 'B', 'B15', 'C', 'D'];
const ESTADOS = ['EN_CARTELERA', 'PROXIMAMENTE', 'ARCHIVADA'];

const AdminPeliculas = () => {
  // State Management
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenero, setFilterGenero] = useState('');
  const [filterClasificacion, setFilterClasificacion] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'titulo', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    sinopsis: '',
    duracion: '',
    genero: [],
    director: '',
    reparto: '',
    poster: '',
    trailer: '',
    clasificacion: 'B',
    fechaEstreno: '',
    estado: 'EN_CARTELERA',
    precio: '',
    sala: ''
  });
  const itemsPerPage = 10;

  // Load movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await peliculasService.getAll();
        if (response?.success && Array.isArray(response.data)) {
          // Adaptar claves del backend al frontend si es necesario
          const mapped = response.data.map((movie) => ({
            id: movie.id_pelicula || movie.id,
            titulo: movie.titulo,
            sinopsis: movie.sinopsis || movie.descripcion || '',
            duracion: movie.duracion || 0,
            genero: Array.isArray(movie.genero)
              ? movie.genero
              : movie.genero
              ? String(movie.genero).split(',').map((g) => g.trim())
              : [],
            director: movie.director || '',
            reparto: movie.reparto || '',
            poster: movie.poster_url || movie.poster || null,
            trailer: movie.trailer_url || movie.trailer || '',
            clasificacion: movie.clasificacion || movie.calificacion || 'B',
            fechaEstreno: movie.fecha_estreno || movie.fechaEstreno || '',
            estado: (movie.estado || '').toLowerCase() || 'cartelera',
            precio: movie.precio || movie.precio_base || 0,
            sala: movie.sala || ''
          }));
          setMovies(mapped);
        } else {
          setMovies([]);
        }
      } catch (err) {
        setError('No se pudieron cargar las películas desde el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Stats calculations
  const stats = useMemo(() => {
    return {
      total: movies.length,
      cartelera: movies.filter(m => m.estado === 'cartelera').length,
      proximamente: movies.filter(m => m.estado === 'proximamente').length,
      archivadas: movies.filter(m => m.estado === 'archivada').length
    };
  }, [movies]);

  // Filter movies
  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.titulo.toLowerCase().includes(term) ||
        movie.director?.toLowerCase().includes(term)
      );
    }

    // Genero filter
    if (filterGenero) {
      filtered = filtered.filter(movie => movie.genero.includes(filterGenero));
    }

    // Clasificacion filter
    if (filterClasificacion) {
      filtered = filtered.filter(movie => movie.clasificacion === filterClasificacion);
    }

    // Estado filter
    if (filterEstado) {
      filtered = filtered.filter(movie => movie.estado === filterEstado);
    }

    return filtered;
  }, [movies, searchTerm, filterGenero, filterClasificacion, filterEstado]);

  // Sort movies
  const sortedMovies = useMemo(() => {
    const sorted = [...filteredMovies];
    sorted.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'duracion' || sortConfig.key === 'precio') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      } else if (sortConfig.key === 'fechaEstreno') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredMovies, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedMovies.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedMovies, currentPage]);

  // Handle form change
  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle genero toggle
  const handleGeneroToggle = (genero) => {
    const current = formData.genero || [];
    if (current.includes(genero)) {
      setFormData({ ...formData, genero: current.filter(g => g !== genero) });
    } else {
      setFormData({ ...formData, genero: [...current, genero] });
    }
  };

  // Handle add movie
  const handleAdd = async () => {
    try {
      setSaving(true);
      setError('');
      const payload = {
        titulo: formData.titulo,
        sinopsis: formData.sinopsis,
        duracion: parseInt(formData.duracion, 10),
        genero: Array.isArray(formData.genero)
          ? formData.genero.join(',')
          : formData.genero || '',
        director: formData.director,
        reparto: formData.reparto,
        poster_url: formData.poster,
        trailer_url: formData.trailer,
        clasificacion: formData.clasificacion,
        fecha_estreno: formData.fechaEstreno || null,
        estado: formData.estado?.toUpperCase(),
        precio_base: parseFloat(formData.precio),
        sala: formData.sala
      };

      const response = await peliculasService.create(payload);
      if (response?.success && response.data) {
        const movie = response.data;
        const mapped = {
          id: movie.id_pelicula || movie.id,
          titulo: movie.titulo,
          sinopsis: movie.sinopsis || movie.descripcion || '',
          duracion: movie.duracion || 0,
          genero: Array.isArray(movie.genero)
            ? movie.genero
            : movie.genero
            ? String(movie.genero).split(',').map((g) => g.trim())
            : [],
          director: movie.director || '',
          reparto: movie.reparto || '',
          poster: movie.poster_url || movie.poster || null,
          trailer: movie.trailer_url || movie.trailer || '',
          clasificacion: movie.clasificacion || movie.calificacion || 'B',
          fechaEstreno: movie.fecha_estreno || movie.fechaEstreno || '',
          estado: (movie.estado || '').toLowerCase() || 'cartelera',
          precio: movie.precio || movie.precio_base || 0,
          sala: movie.sala || ''
        };
        setMovies((prev) => [...prev, mapped]);
        setShowAddModal(false);
        resetForm();
      }
    } catch (err) {
      setError('No se pudo crear la película. Revisa los datos.');
    } finally {
      setSaving(false);
    }
  };

  // Handle edit movie
  const handleEdit = async () => {
    if (!selectedMovie) return;
    try {
      setSaving(true);
      setError('');
      const payload = {
        titulo: formData.titulo,
        sinopsis: formData.sinopsis,
        duracion: parseInt(formData.duracion, 10),
        genero: Array.isArray(formData.genero)
          ? formData.genero.join(',')
          : formData.genero || '',
        director: formData.director,
        reparto: formData.reparto,
        poster_url: formData.poster,
        trailer_url: formData.trailer,
        clasificacion: formData.clasificacion,
        fecha_estreno: formData.fechaEstreno || null,
        estado: formData.estado?.toUpperCase(),
        precio_base: parseFloat(formData.precio),
        sala: formData.sala
      };

      const response = await peliculasService.update(selectedMovie.id, payload);
      if (response?.success && response.data) {
        const movie = response.data;
        const mapped = {
          id: movie.id_pelicula || movie.id,
          titulo: movie.titulo,
          sinopsis: movie.sinopsis || movie.descripcion || '',
          duracion: movie.duracion || 0,
          genero: Array.isArray(movie.genero)
            ? movie.genero
            : movie.genero
            ? String(movie.genero).split(',').map((g) => g.trim())
            : [],
          director: movie.director || '',
          reparto: movie.reparto || '',
          poster: movie.poster_url || movie.poster || null,
          trailer: movie.trailer_url || movie.trailer || '',
          clasificacion: movie.clasificacion || movie.calificacion || 'B',
          fechaEstreno: movie.fecha_estreno || movie.fechaEstreno || '',
          estado: (movie.estado || '').toLowerCase() || 'cartelera',
          precio: movie.precio || movie.precio_base || 0,
          sala: movie.sala || ''
        };
        setMovies((prev) => prev.map((m) => (m.id === mapped.id ? mapped : m)));
        setShowEditModal(false);
        setSelectedMovie(null);
        resetForm();
      }
    } catch (err) {
      setError('No se pudo actualizar la película.');
    } finally {
      setSaving(false);
    }
  };

  // Handle delete movie
  const handleDelete = async () => {
    if (!selectedMovie) return;
    try {
      setSaving(true);
      setError('');
      await peliculasService.delete(selectedMovie.id);
      setMovies((prev) => prev.filter((m) => m.id !== selectedMovie.id));
      setShowDeleteModal(false);
      setSelectedMovie(null);
    } catch (err) {
      setError('No se pudo eliminar la película.');
    } finally {
      setSaving(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      titulo: '',
      sinopsis: '',
      duracion: '',
      genero: [],
      director: '',
      reparto: '',
      poster: '',
      trailer: '',
      clasificacion: 'B',
      fechaEstreno: '',
      estado: 'cartelera',
      precio: '',
      sala: ''
    });
  };

  // Open edit modal
  const openEditModal = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      titulo: movie.titulo,
      sinopsis: movie.sinopsis,
      duracion: movie.duracion.toString(),
      genero: movie.genero || [],
      director: movie.director || '',
      reparto: movie.reparto || '',
      poster: movie.poster || '',
      trailer: movie.trailer || '',
      clasificacion: movie.clasificacion,
      fechaEstreno: movie.fechaEstreno || '',
      estado: movie.estado,
      precio: movie.precio.toString(),
      sala: movie.sala || ''
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  // Handle sort
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
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

  // Estado badge color
  const getEstadoBadge = (estado) => {
    switch(estado) {
      case 'cartelera': return 'success';
      case 'proximamente': return 'info';
      case 'archivada': return 'neutral';
      default: return 'neutral';
    }
  };

  // Movie Form Component
  const MovieForm = () => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            type="text"
            label="Título *"
            placeholder="Título de la película"
            value={formData.titulo}
            onChange={(e) => handleFormChange('titulo', e.target.value)}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sinopsis *</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows="4"
            placeholder="Descripción de la película"
            value={formData.sinopsis}
            onChange={(e) => handleFormChange('sinopsis', e.target.value)}
            required
          />
        </div>

        <Input
          type="number"
          label="Duración (minutos) *"
          placeholder="120"
          value={formData.duracion}
          onChange={(e) => handleFormChange('duracion', e.target.value)}
          icon={Clock}
          required
        />

        <Input
          type="number"
          label="Precio *"
          placeholder="70"
          value={formData.precio}
          onChange={(e) => handleFormChange('precio', e.target.value)}
          required
        />

        <Input
          type="text"
          label="Director"
          placeholder="Nombre del director"
          value={formData.director}
          onChange={(e) => handleFormChange('director', e.target.value)}
        />

        <Input
          type="text"
          label="Sala"
          placeholder="Sala 1"
          value={formData.sala}
          onChange={(e) => handleFormChange('sala', e.target.value)}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Géneros</label>
          <div className="flex flex-wrap gap-2">
            {GENEROS.map(genero => (
              <button
                key={genero}
                type="button"
                onClick={() => handleGeneroToggle(genero)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  (formData.genero || []).includes(genero)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genero}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Clasificación *</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            value={formData.clasificacion}
            onChange={(e) => handleFormChange('clasificacion', e.target.value)}
            required
          >
            {CLASIFICACIONES.map(clas => (
              <option key={clas} value={clas}>{clas}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            value={formData.estado}
            onChange={(e) => handleFormChange('estado', e.target.value)}
            required
          >
            <option value="cartelera">En Cartelera</option>
            <option value="proximamente">Próximamente</option>
            <option value="archivada">Archivada</option>
          </select>
        </div>

        <Input
          type="date"
          label="Fecha de Estreno"
          value={formData.fechaEstreno}
          onChange={(e) => handleFormChange('fechaEstreno', e.target.value)}
          icon={Calendar}
        />

        <div className="md:col-span-2">
          <Input
            type="text"
            label="Reparto"
            placeholder="Actor 1, Actor 2, Actor 3"
            value={formData.reparto}
            onChange={(e) => handleFormChange('reparto', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            type="url"
            label="URL del Póster"
            placeholder="https://image.tmdb.org/t/p/w500/..."
            value={formData.poster}
            onChange={(e) => handleFormChange('poster', e.target.value)}
          />
          {formData.poster && (
            <img 
              src={formData.poster} 
              alt="Preview" 
              className="mt-2 w-32 h-48 object-cover rounded-lg border"
              onError={(e) => e.target.style.display = 'none'}
            />
          )}
        </div>

        <div className="md:col-span-2">
          <Input
            type="url"
            label="URL del Trailer (YouTube)"
            placeholder="https://www.youtube.com/embed/..."
            value={formData.trailer}
            onChange={(e) => handleFormChange('trailer', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Películas</h1>
            <p className="text-sm text-gray-600">Administra el catálogo de películas</p>
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Película
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Películas</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">En Cartelera</p>
              <p className="text-2xl font-bold text-green-900 mt-1">{stats.cartelera}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 font-medium">Próximamente</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">{stats.proximamente}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 font-medium">Archivadas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.archivadas}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gray-500 flex items-center justify-center">
              <Archive className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Buscar por título o director..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
              <select
                value={filterGenero}
                onChange={(e) => setFilterGenero(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todos</option>
                {GENEROS.map(genero => (
                  <option key={genero} value={genero}>{genero}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clasificación</label>
              <select
                value={filterClasificacion}
                onChange={(e) => setFilterClasificacion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Todas</option>
                {CLASIFICACIONES.map(clas => (
                  <option key={clas} value={clas}>{clas}</option>
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
                <option value="cartelera">En Cartelera</option>
                <option value="proximamente">Próximamente</option>
                <option value="archivada">Archivada</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Movies Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Póster</th>
                <th 
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('titulo')}
                >
                  <div className="flex items-center gap-2">
                    Título
                    <SortIcon columnKey="titulo" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Géneros</th>
                <th 
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('duracion')}
                >
                  <div className="flex items-center gap-2">
                    Duración
                    <SortIcon columnKey="duracion" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Clasificación</th>
                <th 
                  className="text-left py-3 px-4 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('fechaEstreno')}
                >
                  <div className="flex items-center gap-2">
                    Estreno
                    <SortIcon columnKey="fechaEstreno" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMovies.length > 0 ? (
                paginatedMovies.map((movie) => (
                  <tr key={movie.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <img 
                        src={movie.poster} 
                        alt={movie.titulo}
                        className="w-12 h-16 object-cover rounded shadow-sm"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="64"><rect fill="%23e5e7eb" width="48" height="64"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="10">No Image</text></svg>';
                        }}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{movie.titulo}</p>
                        <p className="text-xs text-gray-500">{movie.director}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {(movie.genero || []).slice(0, 2).map((gen, idx) => (
                          <Badge key={idx} variant="neutral" className="text-xs">
                            {gen}
                          </Badge>
                        ))}
                        {movie.genero && movie.genero.length > 2 && (
                          <Badge variant="neutral" className="text-xs">
                            +{movie.genero.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {movie.duracion} min
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="info">
                        <Star className="w-3 h-3" />
                        {movie.clasificacion}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {movie.fechaEstreno ? new Date(movie.fechaEstreno).toLocaleDateString('es-MX') : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getEstadoBadge(movie.estado)}>
                        {movie.estado === 'cartelera' && <Eye className="w-3 h-3" />}
                        {movie.estado === 'proximamente' && <Calendar className="w-3 h-3" />}
                        {movie.estado === 'archivada' && <Archive className="w-3 h-3" />}
                        {movie.estado === 'cartelera' && 'En Cartelera'}
                        {movie.estado === 'proximamente' && 'Próximamente'}
                        {movie.estado === 'archivada' && 'Archivada'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {movie.trailer && (
                          <a
                            href={movie.trailer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          >
                            <Play className="w-4 h-4" />
                          </a>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(movie)}
                          className="p-1"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(movie)}
                          className="p-1 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-gray-500">
                    No se encontraron películas
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
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sortedMovies.length)} de {sortedMovies.length} películas
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

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          title="Agregar Película"
        >
          <MovieForm />
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleAdd}
              disabled={!formData.titulo || !formData.sinopsis || !formData.duracion || !formData.precio}
              className="flex-1"
            >
              Agregar Película
            </Button>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMovie(null);
            resetForm();
          }}
          title="Editar Película"
        >
          <MovieForm />
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowEditModal(false);
                setSelectedMovie(null);
                resetForm();
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleEdit}
              disabled={!formData.titulo || !formData.sinopsis || !formData.duracion || !formData.precio}
              className="flex-1"
            >
              Guardar Cambios
            </Button>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedMovie && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMovie(null);
          }}
          title="Eliminar Película"
        >
          <div className="py-4">
            <p className="text-gray-700 mb-4">
              ¿Estás seguro de que deseas eliminar la película <strong>{selectedMovie.titulo}</strong>?
            </p>
            <p className="text-sm text-gray-600">
              Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedMovie(null);
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="error"
              onClick={handleDelete}
              className="flex-1"
            >
              Eliminar
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPeliculas;
