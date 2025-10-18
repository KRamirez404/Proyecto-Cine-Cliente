import { useState } from 'react';
import { MovieCard, SearchBar, TimeSlot, Modal } from '@molecules';
import { Button, Badge } from '@atoms';

/**
 * MoleculesDemo Page
 * 
 * Página de demostración de todos los componentes Molecule del Design System.
 * Útil para testing manual, validación visual y documentación.
 */
const MoleculesDemo = () => {
  // MovieCard state
  const [selectedMovie, setSelectedMovie] = useState(null);

  // SearchBar state
  const [searchValue, setSearchValue] = useState('');
  const [searchSuggestions] = useState([
    'Avengers: Endgame',
    'Avatar 2',
    'The Batman',
    'Top Gun: Maverick',
    'Spider-Man',
  ]);

  // TimeSlot state
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Modal states
  const [modalBasic, setModalBasic] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalWarning, setModalWarning] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalSizes, setModalSizes] = useState({ sm: false, md: false, lg: false, xl: false });

  // Sample movie data
  const sampleMovies = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      genres: ['Acción', 'Aventura', 'Sci-Fi'],
      duration: 181,
      rating: 8.4,
      posterUrl: 'https://via.placeholder.com/300x450/667eea/ffffff?text=Avengers',
      releaseDate: '2019-04-26',
      description: 'Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos.',
      isAvailable: true,
    },
    {
      id: 2,
      title: 'The Batman (Próximamente)',
      genres: ['Acción', 'Crimen', 'Drama'],
      duration: 176,
      rating: 7.9,
      posterUrl: 'https://via.placeholder.com/300x450/764ba2/ffffff?text=Batman',
      releaseDate: '2025-11-15',
      description: 'Bruce Wayne lucha contra la corrupción en Gotham City mientras enfrenta a un asesino enigmático.',
      isAvailable: false,
    },
  ];

  // Sample time slots
  const sampleSlots = [
    { id: 1, time: '14:00', sala: 'Sala 1', format: '2D', price: 8.50, available: true },
    { id: 2, time: '16:30', sala: 'Sala 2', format: '3D', price: 12.00, available: true },
    { id: 3, time: '19:00', sala: 'Sala 1', format: 'IMAX', price: 15.00, available: true },
    { id: 4, time: '21:30', sala: 'Sala 3', format: '4D', price: 18.00, available: false },
    { id: 5, time: '23:00', sala: 'Sala 2', format: 'VIP', price: 20.00, available: true },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Molecules Demo
          </h1>
          <p className="text-neutral-600">
            Demostración interactiva de componentes Molecule del Design System
          </p>
        </div>

        {/* MovieCard Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">MovieCard</h2>
            <p className="text-neutral-600 mb-4">
              Componente para mostrar películas en la cartelera. Combina Card + Badge + Button + Image.
            </p>
            <div className="flex gap-2">
              <Badge variant="primary">Card</Badge>
              <Badge variant="secondary">Badge</Badge>
              <Badge variant="info">Button</Badge>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Estados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  {...movie}
                  onClick={(m) => setSelectedMovie(m)}
                  onViewSchedule={() => alert(`Ver horarios de: ${movie.title}`)}
                />
              ))}
            </div>

            {selectedMovie && (
              <div className="mt-6 p-4 bg-primary-light rounded-lg">
                <p className="text-sm font-medium text-primary">
                  ✓ onClick ejecutado: {selectedMovie.title}
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
              <h4 className="font-semibold mb-2">Características:</h4>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>✓ Hover effect: imagen scale + card shadow elevation</li>
                <li>✓ Badges de géneros (muestra primeros 3, cuenta resto)</li>
                <li>✓ Rating con estrella + decimales</li>
                <li>✓ Duración formateada (Xh Xm)</li>
                <li>✓ Fecha en español (mes abreviado)</li>
                <li>✓ Botón adaptativo: "Ver Horarios" o "Próximamente"</li>
                <li>✓ Line-clamp para títulos largos</li>
                <li>✓ Lazy loading de imágenes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SearchBar Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">SearchBar</h2>
            <p className="text-neutral-600 mb-4">
              Barra de búsqueda con autocomplete y debounce. Combina Input + Dropdown + Animations.
            </p>
            <div className="flex gap-2">
              <Badge variant="primary">Input</Badge>
              <Badge variant="warning">Framer Motion</Badge>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Interactivo</h3>
            
            <div className="max-w-2xl">
              <SearchBar
                placeholder="Busca una película..."
                value={searchValue}
                onChange={setSearchValue}
                onSearch={(query) => alert(`Buscando: ${query}`)}
                onSelect={(suggestion) => {
                  setSearchValue(suggestion);
                  alert(`Seleccionado: ${suggestion}`);
                }}
                suggestions={searchSuggestions.filter(s => 
                  s.toLowerCase().includes(searchValue.toLowerCase())
                )}
                debounceMs={300}
              />
            </div>

            <div className="mt-6 space-y-3">
              <div className="p-4 bg-neutral-100 rounded-lg">
                <p className="text-sm font-medium mb-2">Estado actual:</p>
                <code className="text-xs bg-white px-2 py-1 rounded">
                  value: "{searchValue}"
                </code>
              </div>

              <div className="p-4 bg-neutral-100 rounded-lg">
                <h4 className="font-semibold mb-2">Características:</h4>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>✓ Debounce de 300ms (configurable)</li>
                  <li>✓ Dropdown animado con Framer Motion</li>
                  <li>✓ Navegación por teclado (↑ ↓ Enter Esc)</li>
                  <li>✓ Click outside para cerrar</li>
                  <li>✓ Clear button (X) cuando hay texto</li>
                  <li>✓ Loading state support</li>
                  <li>✓ ARIA attributes completos</li>
                </ul>
              </div>

              <div className="p-4 bg-info-light rounded-lg">
                <p className="text-sm text-info font-medium">
                  💡 Tip: Escribe para ver sugerencias, usa flechas ↑↓ para navegar, Enter para seleccionar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TimeSlot Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">TimeSlot</h2>
            <p className="text-neutral-600 mb-4">
              Selector de horario para funciones de cine. Combina Button + Badge + Icons.
            </p>
            <div className="flex gap-2">
              <Badge variant="primary">Button</Badge>
              <Badge variant="secondary">Badge</Badge>
              <Badge variant="success">Lucide Icons</Badge>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Formatos y Estados</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleSlots.map((slot) => (
                <TimeSlot
                  key={slot.id}
                  {...slot}
                  selected={selectedSlot === slot.id}
                  onClick={(data) => setSelectedSlot(data.id)}
                />
              ))}
            </div>

            {selectedSlot && (
              <div className="mt-6 p-4 bg-success-light rounded-lg">
                <p className="text-sm font-medium text-success">
                  ✓ Slot seleccionado: ID {selectedSlot}
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
              <h4 className="font-semibold mb-2">Características:</h4>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>✓ Color-coding por formato (2D, 3D, IMAX, 4D, VIP)</li>
                <li>✓ Estado selected con ring + indicator dot</li>
                <li>✓ Estado not available con overlay "Agotado"</li>
                <li>✓ Button variants automáticos por estado</li>
                <li>✓ Precio formateado ($XX.XX)</li>
                <li>✓ Iconos contextuales (Clock, MapPin, Film)</li>
                <li>✓ Size variants (sm, md, lg)</li>
                <li>✓ showDetails toggle para vista compacta</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-warning-light rounded-lg">
              <p className="text-sm text-warning font-medium">
                ⚠️ Nota: El slot de las 21:30 está agotado (not available)
              </p>
            </div>
          </div>
        </section>

        {/* Modal Section */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Modal</h2>
            <p className="text-neutral-600 mb-4">
              Modal/Dialog con Portal rendering y animaciones. Combina Card + Button + Overlay + AnimatePresence.
            </p>
            <div className="flex gap-2">
              <Badge variant="primary">Card</Badge>
              <Badge variant="secondary">Button</Badge>
              <Badge variant="warning">Portal</Badge>
              <Badge variant="info">Framer Motion</Badge>
            </div>
            <div className="mt-3 p-3 bg-error-light rounded-lg">
              <p className="text-sm text-error font-medium">
                ⚠️ TESTING CRÍTICO: Este componente requiere validación manual. Los tests unitarios están pendientes (ver TESTING_PENDIENTE.md)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {/* Variantes */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Variantes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <Button variant="outline" onClick={() => setModalBasic(true)}>
                  Default
                </Button>
                <Button variant="primary" onClick={() => setModalSuccess(true)}>
                  Success
                </Button>
                <Button variant="error" onClick={() => setModalError(true)}>
                  Error
                </Button>
                <Button variant="warning" onClick={() => setModalWarning(true)}>
                  Warning
                </Button>
                <Button variant="info" onClick={() => setModalInfo(true)}>
                  Info
                </Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Tamaños</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button variant="outline" size="sm" onClick={() => setModalSizes({ ...modalSizes, sm: true })}>
                  Small
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalSizes({ ...modalSizes, md: true })}>
                  Medium
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalSizes({ ...modalSizes, lg: true })}>
                  Large
                </Button>
                <Button variant="outline" size="sm" onClick={() => setModalSizes({ ...modalSizes, xl: true })}>
                  Extra Large
                </Button>
              </div>
            </div>

            {/* Características */}
            <div className="p-4 bg-neutral-100 rounded-lg">
              <h4 className="font-semibold mb-2">Características a validar:</h4>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>✓ Portal rendering en document.body</li>
                <li>✓ Click outside cierra modal (closeOnClickOutside)</li>
                <li>✓ ESC key cierra modal (closeOnEsc)</li>
                <li>✓ Body scroll lock cuando abierto</li>
                <li>✓ Backdrop blur animado</li>
                <li>✓ Animaciones entrada/salida (Framer Motion)</li>
                <li>✓ Focus trap (teclado)</li>
                <li>✓ ARIA: role="dialog", aria-modal, aria-labelledby</li>
                <li>✓ 5 variantes con iconos contextuales</li>
                <li>✓ 6 tamaños (sm, md, lg, xl, 2xl, full)</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-info-light rounded-lg">
              <h4 className="font-semibold text-info mb-2">Tests a realizar:</h4>
              <ol className="text-sm text-info space-y-1 list-decimal list-inside">
                <li>Abrir cada variante, verificar color de header + icono correcto</li>
                <li>Click fuera del modal → debe cerrarse</li>
                <li>Presionar ESC → debe cerrarse</li>
                <li>Verificar que body no hace scroll con modal abierto</li>
                <li>Abrir diferentes tamaños, verificar ancho correcto</li>
                <li>Navegar con Tab, verificar que no sale del modal</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Modals (Hidden until triggered) */}
        {/* Basic Modal */}
        <Modal
          isOpen={modalBasic}
          onClose={() => setModalBasic(false)}
          title="Modal Básico"
        >
          <p className="text-neutral-700">
            Este es un modal básico sin variante específica. 
            Puedes cerrarlo haciendo click fuera, presionando ESC, o en el botón X.
          </p>
        </Modal>

        {/* Success Modal */}
        <Modal
          isOpen={modalSuccess}
          onClose={() => setModalSuccess(false)}
          title="¡Operación Exitosa!"
          variant="success"
          footer={
            <Button variant="primary" onClick={() => setModalSuccess(false)}>
              Entendido
            </Button>
          }
        >
          <p className="text-neutral-700">
            La operación se completó correctamente. Este es un modal de tipo <strong>success</strong> con ícono CheckCircle.
          </p>
        </Modal>

        {/* Error Modal */}
        <Modal
          isOpen={modalError}
          onClose={() => setModalError(false)}
          title="Error en la Operación"
          variant="error"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setModalError(false)}>
                Cancelar
              </Button>
              <Button variant="error" onClick={() => setModalError(false)}>
                Reintentar
              </Button>
            </div>
          }
        >
          <p className="text-neutral-700">
            Ocurrió un error al procesar tu solicitud. Este es un modal de tipo <strong>error</strong> con ícono AlertCircle.
          </p>
        </Modal>

        {/* Warning Modal */}
        <Modal
          isOpen={modalWarning}
          onClose={() => setModalWarning(false)}
          title="Confirmar Eliminación"
          variant="warning"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setModalWarning(false)}>
                Cancelar
              </Button>
              <Button variant="warning" onClick={() => {
                alert('Elemento eliminado');
                setModalWarning(false);
              }}>
                Eliminar
              </Button>
            </div>
          }
        >
          <p className="text-neutral-700">
            ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
            Este es un modal de tipo <strong>warning</strong> con ícono AlertTriangle.
          </p>
        </Modal>

        {/* Info Modal */}
        <Modal
          isOpen={modalInfo}
          onClose={() => setModalInfo(false)}
          title="Información Importante"
          variant="info"
          footer={
            <Button variant="info" onClick={() => setModalInfo(false)}>
              Cerrar
            </Button>
          }
        >
          <p className="text-neutral-700 mb-3">
            Este es un modal informativo con ícono Info. Características del componente:
          </p>
          <ul className="text-sm text-neutral-700 space-y-1 list-disc list-inside">
            <li>Portal rendering con createPortal</li>
            <li>Animaciones con AnimatePresence</li>
            <li>Backdrop blur + overlay semi-transparente</li>
            <li>ESC key handler + Click outside</li>
            <li>Body scroll prevention</li>
          </ul>
        </Modal>

        {/* Size Modals */}
        <Modal
          isOpen={modalSizes.sm}
          onClose={() => setModalSizes({ ...modalSizes, sm: false })}
          title="Modal Small"
          size="sm"
        >
          <p className="text-neutral-700">Este modal tiene tamaño <strong>small (max-w-sm)</strong>.</p>
        </Modal>

        <Modal
          isOpen={modalSizes.md}
          onClose={() => setModalSizes({ ...modalSizes, md: false })}
          title="Modal Medium"
          size="md"
        >
          <p className="text-neutral-700">Este modal tiene tamaño <strong>medium (max-w-md)</strong> - tamaño por defecto.</p>
        </Modal>

        <Modal
          isOpen={modalSizes.lg}
          onClose={() => setModalSizes({ ...modalSizes, lg: false })}
          title="Modal Large"
          size="lg"
        >
          <p className="text-neutral-700">Este modal tiene tamaño <strong>large (max-w-lg)</strong>.</p>
        </Modal>

        <Modal
          isOpen={modalSizes.xl}
          onClose={() => setModalSizes({ ...modalSizes, xl: false })}
          title="Modal Extra Large"
          size="xl"
        >
          <p className="text-neutral-700">Este modal tiene tamaño <strong>extra large (max-w-xl)</strong>.</p>
        </Modal>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 text-center text-neutral-500 text-sm">
          <p>Molecules Demo Page - Design System v1.0</p>
          <p className="mt-1">Octubre 2025 - FASE 3 Completada</p>
        </div>
      </div>
    </div>
  );
};

export default MoleculesDemo;
