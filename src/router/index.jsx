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
import AdminCajeros from '@pages/admin/AdminCajeros';
import AdminVIP from '@pages/admin/AdminVIP';
import AdminLogs from '@pages/admin/AdminLogs';
import AdminPeliculas from '@pages/admin/AdminPeliculas';

// Import cajero pages
import CajeroVentas from '@pages/cajero/CajeroVentas';
import CajeroHistorial from '@pages/cajero/CajeroHistorial';
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

/**
 * 🚪 LOGOUT HANDLER - LIMPIEZA COMPLETA DE SESIÓN
 * 
 * Limpia TODA la información de sesión del navegador:
 * - localStorage: Datos persistentes (currentUser, etc)
 * - sessionStorage: Datos de sesión temporal
 * - Cookies: Si existen cookies de autenticación
 * - Cache: Limpia cache del navegador (opcional)
 * 
 * Luego redirige al login sin posibilidad de volver atrás.
 */
const handleLogout = () => {
  try {
    // 1️⃣ Limpiar localStorage (datos persistentes)
    localStorage.removeItem('currentUser');
    // Opcional: Mantener historial de compras
    // localStorage.removeItem('userPurchases'); 
    
    // 2️⃣ Limpiar sessionStorage completo (datos de sesión temporal)
    sessionStorage.clear();
    
    // 3️⃣ Limpiar todas las cookies (si existen)
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      // Eliminar cookie para dominio actual y todos los paths
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    });
    
    // 4️⃣ Limpiar cache del navegador (si está disponible)
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    
    console.log('✅ Sesión cerrada exitosamente - Cache completo limpiado');
    
    // 5️⃣ Redirigir usando replace (no permite volver atrás con back button)
    window.location.replace('/login');
    
  } catch (error) {
    console.error('❌ Error al cerrar sesión:', error);
    // Fallback: intentar redirección de todas formas
    window.location.href = '/login';
  }
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
          onLogout={handleLogout}
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
          element: <Asientos />,
        },
        {
          path: 'compra',
          element: <Compra />,
        },
        {
          path: 'confirmacion/:purchaseId',
          element: <Confirmacion />,
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
            onLogout={handleLogout}
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
          element: <AdminPeliculas />,
        },
        {
          path: 'cajeros',
          element: <AdminCajeros />,
        },
        {
          path: 'vip',
          element: <AdminVIP />,
        },
        {
          path: 'logs',
          element: <AdminLogs />,
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
            onLogout={handleLogout}
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
          element: <CajeroVentas />,
        },
        {
          path: 'historial',
          element: <CajeroHistorial />,
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
