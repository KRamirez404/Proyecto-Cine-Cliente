import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  PublicLayout, 
  CustomerLayout, 
  AdminLayout, 
  CajeroLayout 
} from '@/layouts';

// Import demo pages (temporal)
import AtomsDemo from '@pages/AtomsDemo';
import MoleculesDemo from '@pages/MoleculesDemo';

// Import auth pages
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';

// Import customer pages
import Cartelera from '@pages/customer/Cartelera';
import Horarios from '@pages/customer/Horarios';
import Asientos from '@pages/customer/Asientos';
import Compra from '@pages/customer/Compra';
import Confirmacion from '@pages/customer/Confirmacion';
import MisCompras from '@pages/customer/MisCompras';

// Import admin pages
import AdminDashboard from '@pages/admin/AdminDashboard';
// etc...

/**
 * Router Configuration
 * 
 * Estructura de rutas de la aplicación con protección por roles.
 * 
 * Roles:
 * - customer: Clientes que compran boletos
 * - admin: Administradores del sistema
 * - cajero: Cajeros de punto de venta
 */

// Mock user for development - REPLACE with real auth store
const mockUser = {
  name: 'Usuario Demo',
  email: 'demo@cineapp.com',
  role: 'customer', // Change to 'admin' or 'cajero' for testing
};

const createRouter = (user = null) => {
  return createBrowserRouter([
    // ==================
    // PUBLIC ROUTES
    // ==================
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/cartelera" replace />,
        },
        // TODO: Uncomment when Login/Register pages are created
        // {
        {
          path: 'login',
          element: user ? <Navigate to="/" replace /> : <Login />,
        },
        {
          path: 'register',
          element: user ? <Navigate to="/" replace /> : <Register />,
        },
      ],
    },

    // ==================
    // CUSTOMER ROUTES
    // ==================
    {
      path: '/',
      element: (
        <CustomerLayout 
          user={user} 
          notifications={3}
          onLogout={() => console.log('Logout')}
          onSearch={(query) => console.log('Search:', query)}
        />
      ),
      children: [
        {
          path: 'cartelera',
          element: <Cartelera />,
        },
        {
          path: 'horarios/:movieId',
          element: <Horarios />,
        },
        {
          path: 'asientos/:showtimeId',
          element: (
            <ProtectedRoute user={user} allowedRoles={['customer']}>
              <Asientos />
            </ProtectedRoute>
          ),
        },
        {
          path: 'compra',
          element: (
            <ProtectedRoute user={user} allowedRoles={['customer']}>
              <Compra />
            </ProtectedRoute>
          ),
        },
        {
          path: 'confirmacion/:purchaseId',
          element: (
            <ProtectedRoute user={user} allowedRoles={['customer']}>
              <Confirmacion />
            </ProtectedRoute>
          ),
        },
        {
          path: 'mis-compras',
          element: (
            <ProtectedRoute user={user} allowedRoles={['customer']}>
              <MisCompras />
            </ProtectedRoute>
          ),
        },
      ],
    },

    // ==================
    // ADMIN ROUTES
    // ==================
    {
      path: '/admin',
      element: (
        <ProtectedRoute user={user} allowedRoles={['admin']}>
          <AdminLayout 
            user={user}
            notifications={5}
            onLogout={() => console.log('Logout')}
          />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/admin/dashboard" replace />,
        },
        {
          path: 'dashboard',
          element: <AdminDashboard />,
        },
        {
          path: 'peliculas',
          element: <div className=""><h1 className="text-3xl font-bold mb-4">Gestión de Películas</h1><p className="text-neutral-600">TODO: CRUD de películas con MovieGrid</p></div>,
        },
        {
          path: 'cajeros',
          element: <div className=""><h1 className="text-3xl font-bold mb-4">Gestión de Cajeros</h1><p className="text-neutral-600">TODO: CRUD de cajeros con tabla</p></div>,
        },
        {
          path: 'vip',
          element: <div className=""><h1 className="text-3xl font-bold mb-4">Clientes VIP</h1><p className="text-neutral-600">TODO: Listado y gestión de clientes VIP</p></div>,
        },
        {
          path: 'logs',
          element: <div className=""><h1 className="text-3xl font-bold mb-4">Log de Accesos</h1><p className="text-neutral-600">TODO: Tabla de logs con filtros</p></div>,
        },
      ],
    },

    // ==================
    // CAJERO ROUTES
    // ==================
    {
      path: '/cajero',
      element: (
        <ProtectedRoute user={user} allowedRoles={['cajero']}>
          <CajeroLayout 
            user={user}
            notifications={2}
            onLogout={() => console.log('Logout')}
          />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/cajero/ventas" replace />,
        },
        {
          path: 'ventas',
          element: <div className=""><h1 className="text-3xl font-bold mb-4">Punto de Venta</h1><p className="text-neutral-600">TODO: POS con TimeSlot + seat selection</p></div>,
        },
        {
          path: 'historial',
          element: <div className=""><h1 className="text-3xl font-bold mb-4">Historial de Ventas</h1><p className="text-neutral-600">TODO: Tabla de transacciones</p></div>,
        },
      ],
    },

    // ==================
    // DEMO ROUTES (Remove in production)
    // ==================
    {
      path: '/demo',
      children: [
        {
          path: 'atoms',
          element: <AtomsDemo />,
        },
        {
          path: 'molecules',
          element: <MoleculesDemo />,
        },
      ],
    },

    // ==================
    // 404 NOT FOUND
    // ==================
    {
      path: '*',
      element: (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
            <p className="text-xl text-neutral-600 mb-8">Página no encontrada</p>
            <a 
              href="/" 
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      ),
    },
  ]);
};

export default createRouter;
