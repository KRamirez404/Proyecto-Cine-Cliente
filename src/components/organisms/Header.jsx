import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SearchBar } from '@molecules';
import { Button } from '@atoms';
import { Menu, X, User, LogOut, Bell, Film } from 'lucide-react';

/**
 * Header Component - Organism del Design System
 * 
 * Header principal de la aplicación con navegación, búsqueda y menú de usuario.
 * Adaptativo según rol (customer/admin/cajero).
 * 
 * @component
 * @example
 * <Header
 *   user={{ name: 'Juan', role: 'customer' }}
 *   onSearch={(query) => navigate(`/search?q=${query}`)}
 *   onLogout={() => handleLogout()}
 * />
 */
const Header = ({
  user = null,
  notifications = 0,
  onSearch,
  onLogout,
  searchSuggestions = [],
  isSearching = false,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Navigation links by role
  const getNavigationLinks = () => {
    if (!user) {
      return [
        { to: '/', label: 'Inicio' },
        { to: '/cartelera', label: 'Cartelera' },
      ];
    }

    if (user.role === 'admin') {
      return [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/peliculas', label: 'Películas' },
        { to: '/admin/cajeros', label: 'Cajeros' },
        { to: '/admin/vip', label: 'Clientes VIP' },
        { to: '/admin/logs', label: 'Log de Accesos' },
      ];
    }

    if (user.role === 'cajero') {
      return [
        { to: '/cajero', label: 'Ventas' },
        { to: '/cajero/historial', label: 'Historial' },
      ];
    }

    // customer
    return [
      { to: '/', label: 'Inicio' },
      { to: '/cartelera', label: 'Cartelera' },
      { to: '/mis-compras', label: 'Mis Compras' },
    ];
  };

  const navigationLinks = getNavigationLinks();

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`sticky top-0 z-40 bg-white border-b border-neutral-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Film className="h-6 w-6" />
            <span>CineApp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop only for customer/guest) */}
          {(!user || user.role === 'customer') && (
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <SearchBar
                placeholder="Buscar películas..."
                onSearch={onSearch}
                suggestions={searchSuggestions}
                isLoading={isSearching}
              />
            </div>
          )}

          {/* Right side: User menu or Auth buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications */}
                {notifications > 0 && (
                  <button className="relative p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-200">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {notifications > 9 ? '9+' : notifications}
                    </span>
                  </button>
                )}

                {/* User menu (Desktop) */}
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.name}</span>
                  </button>

                  {/* Dropdown menu */}
                  {userMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />

                      {/* Menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 py-2 z-20">
                        <div className="px-4 py-2 border-b border-neutral-200">
                          <p className="text-sm font-medium text-neutral-900">{user.name}</p>
                          <p className="text-xs text-neutral-500">{user.email}</p>
                        </div>

                        <Link
                          to="/perfil"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          Mi Perfil
                        </Link>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onLogout?.();
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-error-light transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Cerrar Sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Auth buttons (Guest) */}
                <Link to="/login" className="hidden md:block">
                  <Button variant="outline" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/registro" className="hidden md:block">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-30 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Menu panel */}
            <div className="absolute top-16 left-0 right-0 bg-white border-b border-neutral-200 shadow-lg z-40 md:hidden">
              <div className="container mx-auto px-4 py-4 space-y-4">
                {/* Search (Mobile) */}
                {(!user || user.role === 'customer') && (
                  <SearchBar
                    placeholder="Buscar películas..."
                    onSearch={(query) => {
                      onSearch?.(query);
                      closeMobileMenu();
                    }}
                    suggestions={searchSuggestions}
                    isLoading={isSearching}
                  />
                )}

                {/* Navigation links */}
                <nav className="flex flex-col gap-1">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={closeMobileMenu}
                      className="px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* User section (Mobile) */}
                {user ? (
                  <div className="border-t border-neutral-200 pt-4 space-y-2">
                    <div className="px-4 py-2">
                      <p className="font-medium text-neutral-900">{user.name}</p>
                      <p className="text-sm text-neutral-500">{user.email}</p>
                    </div>

                    <Link
                      to="/perfil"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Mi Perfil
                    </Link>

                    <button
                      onClick={() => {
                        closeMobileMenu();
                        onLogout?.();
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-error hover:bg-error-light rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-neutral-200 pt-4 space-y-2">
                    <Link to="/login" onClick={closeMobileMenu}>
                      <Button variant="outline" size="md" className="w-full">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/registro" onClick={closeMobileMenu}>
                      <Button variant="primary" size="md" className="w-full">
                        Registrarse
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  /** Usuario actual (null si guest) */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    role: PropTypes.oneOf(['customer', 'admin', 'cajero']).isRequired,
  }),
  /** Número de notificaciones sin leer */
  notifications: PropTypes.number,
  /** Callback de búsqueda */
  onSearch: PropTypes.func,
  /** Callback de logout */
  onLogout: PropTypes.func,
  /** Sugerencias de búsqueda */
  searchSuggestions: PropTypes.arrayOf(PropTypes.string),
  /** Si está buscando */
  isSearching: PropTypes.bool,
  /** Clases CSS adicionales */
  className: PropTypes.string,
};

export default Header;
