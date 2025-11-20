
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

// Mock Movies Data
const initialMovies = [
  {
    id: 1,
    titulo: 'Oppenheimer',
    sinopsis: 'La historia del científico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.',
    duracion: 180,
    genero: ['Drama', 'Historia', 'Thriller'],
    director: 'Christopher Nolan',
    reparto: 'Cillian Murphy, Emily Blunt, Matt Damon',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    trailer: 'https://www.youtube.com/embed/uYPbbksJxIg',
    clasificacion: 'B15',
    fechaEstreno: '2023-07-21',
    estado: 'cartelera',
    precio: 85,
    sala: 'Sala VIP 1'
  },
  {
    id: 2,
    titulo: 'Barbie',
    sinopsis: 'Barbie y Ken están teniendo el tiempo de sus vidas en el colorido y aparentemente perfecto mundo de Barbie Land.',
    duracion: 114,
    genero: ['Comedia', 'Aventura', 'Fantasía'],
    director: 'Greta Gerwig',
    reparto: 'Margot Robbie, Ryan Gosling, Will Ferrell',
    poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    trailer: 'https://www.youtube.com/embed/pBk4NYhWNMM',
    clasificacion: 'B',
    fechaEstreno: '2023-07-21',
    estado: 'cartelera',
    precio: 70,
    sala: 'Sala 2'
  },
  {
    id: 3,
    titulo: 'Dune: Part Two',
    sinopsis: 'Paul Atreides se une a Chani y los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.',
    duracion: 166,
    genero: ['Ciencia Ficción', 'Aventura'],
    director: 'Denis Villeneuve',
    reparto: 'Timothée Chalamet, Zendaya, Rebecca Ferguson',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    trailer: 'https://www.youtube.com/embed/Way9Dexny3w',
    clasificacion: 'B15',
    fechaEstreno: '2024-03-01',
    estado: 'cartelera',
    precio: 95,
    sala: 'Sala IMAX'
  },
  {
    id: 4,
    titulo: 'Spider-Man: Across the Spider-Verse',
    sinopsis: 'Miles Morales regresa para la próxima aventura del Spider-Verse.',
    duracion: 140,
    genero: ['Animación', 'Acción', 'Aventura'],
    director: 'Joaquim Dos Santos',
    reparto: 'Shameik Moore, Hailee Steinfeld, Oscar Isaac',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    trailer: 'https://www.youtube.com/embed/cqGjhVJWtEg',
    clasificacion: 'B',
    fechaEstreno: '2023-06-02',
    estado: 'cartelera',
    precio: 75,
    sala: 'Sala 3'
  },
  {
    id: 5,
    titulo: 'Guardians of the Galaxy Vol. 3',
    sinopsis: 'Los Guardianes de la Galaxia emprenden una misión peligrosa para salvar a uno de los suyos.',
    duracion: 150,
    genero: ['Acción', 'Aventura', 'Comedia'],
    director: 'James Gunn',
    reparto: 'Chris Pratt, Zoe Saldana, Dave Bautista',
    poster: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    trailer: 'https://www.youtube.com/embed/u3V5KDHRQvk',
    clasificacion: 'B15',
    fechaEstreno: '2023-05-05',
    estado: 'archivada',
    precio: 70,
    sala: 'Sala 4'
  },
  {
    id: 6,
    titulo: 'The Flash',
    sinopsis: 'Barry Allen viaja en el tiempo para prevenir el asesinato de su madre.',
    duracion: 144,
    genero: ['Acción', 'Aventura', 'Ciencia Ficción'],
    director: 'Andy Muschietti',
    reparto: 'Ezra Miller, Michael Keaton, Ben Affleck',
    poster: 'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
    trailer: 'https://www.youtube.com/embed/hebWYacbdvc',
    clasificacion: 'B15',
    fechaEstreno: '2023-06-16',
    estado: 'archivada',
    precio: 65,
    sala: 'Sala 5'
  },
  {
    id: 7,
    titulo: 'Indiana Jones and the Dial of Destiny',
    sinopsis: 'El arqueólogo Indiana Jones se enfrenta a su última aventura.',
    duracion: 154,
    genero: ['Acción', 'Aventura'],
    director: 'James Mangold',
    reparto: 'Harrison Ford, Phoebe Waller-Bridge, Mads Mikkelsen',
    poster: 'https://image.tmdb.org/t/p/w500/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg',
    trailer: 'https://www.youtube.com/embed/ZMysDI7De88',
    clasificacion: 'B15',
    fechaEstreno: '2023-06-30',
    estado: 'archivada',
    precio: 70,
    sala: 'Sala 6'
  },
  {
    id: 8,
    titulo: 'Mission: Impossible - Dead Reckoning',
    sinopsis: 'Ethan Hunt y su equipo se embarcan en su misión más peligrosa.',
    duracion: 163,
    genero: ['Acción', 'Thriller'],
    director: 'Christopher McQuarrie',
    reparto: 'Tom Cruise, Hayley Atwell, Ving Rhames',
    poster: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    trailer: 'https://www.youtube.com/embed/avz06PDqDbM',
    clasificacion: 'B15',
    fechaEstreno: '2023-07-12',
    estado: 'archivada',
    precio: 75,
    sala: 'Sala 7'
  },
  {
    id: 9,
    titulo: 'Avatar: The Way of Water',
    sinopsis: 'Jake Sully vive con su nueva familia formada en el planeta de Pandora.',
    duracion: 192,
    genero: ['Ciencia Ficción', 'Aventura', 'Acción'],
    director: 'James Cameron',
    reparto: 'Sam Worthington, Zoe Saldana, Sigourney Weaver',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    trailer: 'https://www.youtube.com/embed/d9MyW72ELq0',
    clasificacion: 'B',
    fechaEstreno: '2022-12-16',
    estado: 'archivada',
    precio: 95,
    sala: 'Sala IMAX'
  },
  {
    id: 10,
    titulo: 'The Marvels',
    sinopsis: 'Carol Danvers, Kamala Khan y Monica Rambeau unen fuerzas.',
    duracion: 105,
    genero: ['Acción', 'Aventura', 'Ciencia Ficción'],
    director: 'Nia DaCosta',
    reparto: 'Brie Larson, Teyonah Parris, Iman Vellani',
    poster: 'https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdkKvh8Yj8xJ8d.jpg',
    trailer: 'https://www.youtube.com/embed/wS_qbDztgVY',
    clasificacion: 'B',
    fechaEstreno: '2023-11-10',
    estado: 'proximamente',
    precio: 80,
    sala: 'Sala 3'
  },
  {
    id: 11,
    titulo: 'Wonka',
    sinopsis: 'La historia de cómo Willy Wonka se convirtió en el famoso chocolatero.',
    duracion: 116,
    genero: ['Fantasía', 'Comedia', 'Musical'],
    director: 'Paul King',
    reparto: 'Timothée Chalamet, Olivia Colman, Hugh Grant',
    poster: 'https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg',
    trailer: 'https://www.youtube.com/embed/wYol5URChVY',
    clasificacion: 'A',
    fechaEstreno: '2023-12-15',
    estado: 'proximamente',
    precio: 70,
    sala: 'Sala 2'
  },
  {
    id: 12,
    titulo: 'Aquaman and the Lost Kingdom',
    sinopsis: 'Black Manta busca vengarse de Aquaman por la muerte de su padre.',
    duracion: 124,
    genero: ['Acción', 'Aventura', 'Fantasía'],
    director: 'James Wan',
    reparto: 'Jason Momoa, Patrick Wilson, Amber Heard',
    poster: 'https://image.tmdb.org/t/p/w500/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg',
    trailer: 'https://www.youtube.com/embed/UGc5Tzz19UY',
    clasificacion: 'B15',
    fechaEstreno: '2023-12-22',
    estado: 'proximamente',
    precio: 75,
    sala: 'Sala 4'
  }
];

const GENEROS = ['Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 'Fantasía', 'Romance', 'Thriller', 'Animación', 'Musical', 'Historia'];
const CLASIFICACIONES = ['A', 'AA', 'B', 'B15', 'C', 'D'];
const ESTADOS = ['cartelera', 'proximamente', 'archivada'];

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
    estado: 'cartelera',
    precio: '',
    sala: ''
  });
  const itemsPerPage = 10;

  // Load movies from localStorage
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('adminPeliculas') || '[]');
    if (savedMovies.length > 0) {
      setMovies(savedMovies);
    } else {
      setMovies(initialMovies);
      localStorage.setItem('adminPeliculas', JSON.stringify(initialMovies));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('adminPeliculas', JSON.stringify(movies));
    }
  }, [movies]);

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
  const handleAdd = () => {
    const newMovie = {
      id: Date.now(),
      ...formData,
      duracion: parseInt(formData.duracion),
      precio: parseFloat(formData.precio)
    };
    setMovies([...movies, newMovie]);
    setShowAddModal(false);
    resetForm();
  };

  // Handle edit movie
  const handleEdit = () => {
    setMovies(movies.map(m => 
      m.id === selectedMovie.id 
        ? { ...selectedMovie, ...formData, duracion: parseInt(formData.duracion), precio: parseFloat(formData.precio) }
        : m
    ));
    setShowEditModal(false);
    setSelectedMovie(null);
    resetForm();
  };

  // Handle delete movie
  const handleDelete = () => {
    setMovies(movies.filter(m => m.id !== selectedMovie.id));
    setShowDeleteModal(false);
    setSelectedMovie(null);
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
