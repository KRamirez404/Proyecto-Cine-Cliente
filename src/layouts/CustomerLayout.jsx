import { Outlet } from 'react-router-dom';
import { Header } from '@organisms';
import PropTypes from 'prop-types';

/**
 * CustomerLayout
 * 
 * Layout para páginas de cliente (Cartelera, Horarios, Compra, etc.).
 * Incluye Header completo con búsqueda y navegación.
 */
const CustomerLayout = ({ user, notifications = 0, onLogout, onSearch }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header con navegación completa */}
      <Header
        user={user}
        notifications={notifications}
        onLogout={onLogout}
        onSearch={onSearch}
        searchSuggestions={[]}
        isSearching={false}
      />

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-neutral-900 mb-3">Sobre CineApp</h3>
              <p className="text-sm text-neutral-600">
                Tu plataforma de reservas de cine. Disfruta de las mejores películas con la comodidad de reservar online.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-neutral-900 mb-3">Enlaces</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><a href="/cartelera" className="hover:text-primary transition-colors">Cartelera</a></li>
                <li><a href="/horarios" className="hover:text-primary transition-colors">Horarios</a></li>
                <li><a href="/mis-compras" className="hover:text-primary transition-colors">Mis Compras</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-neutral-900 mb-3">Contacto</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>Email: contacto@cineapp.com</li>
                <li>Tel: (123) 456-7890</li>
                <li>Dirección: Av. Principal 123</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center text-sm text-neutral-500">
            <p>&copy; 2025 CineApp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

CustomerLayout.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(['customer', 'admin', 'cajero']),
  }),
  notifications: PropTypes.number,
  onLogout: PropTypes.func,
  onSearch: PropTypes.func,
};

export default CustomerLayout;
