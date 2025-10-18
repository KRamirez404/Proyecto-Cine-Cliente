import { Outlet, Link, useLocation } from 'react-router-dom';
import { Header } from '@organisms';
import PropTypes from 'prop-types';
import { 
  LayoutDashboard, 
  Film, 
  Users, 
  Crown, 
  FileText,
  ChevronRight 
} from 'lucide-react';

/**
 * AdminLayout
 * 
 * Layout para páginas de administrador.
 * Incluye Header + Sidebar con navegación de admin + Outlet.
 */
const AdminLayout = ({ user, notifications = 0, onLogout }) => {
  const location = useLocation();

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/peliculas', label: 'Películas', icon: Film },
    { path: '/admin/cajeros', label: 'Cajeros', icon: Users },
    { path: '/admin/vip', label: 'Clientes VIP', icon: Crown },
    { path: '/admin/logs', label: 'Log de Accesos', icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header
        user={user}
        notifications={notifications}
        onLogout={onLogout}
      />

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-5rem)] sticky top-20">
          <nav className="p-4">
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Administración
              </h2>
            </div>

            <ul className="space-y-1">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                        ${active 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-neutral-700 hover:bg-neutral-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1 font-medium">{link.label}</span>
                      {active && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-info-light rounded-lg p-4">
              <p className="text-xs font-semibold text-info mb-1">💡 Tip</p>
              <p className="text-xs text-info">
                Usa los filtros para encontrar información rápidamente
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(['customer', 'admin', 'cajero']),
  }),
  notifications: PropTypes.number,
  onLogout: PropTypes.func,
};

export default AdminLayout;
