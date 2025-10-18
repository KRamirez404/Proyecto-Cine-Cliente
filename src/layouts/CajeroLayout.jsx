import { Outlet } from 'react-router-dom';
import { Header } from '@organisms';
import PropTypes from 'prop-types';

/**
 * CajeroLayout
 * 
 * Layout para páginas de cajero (Ventas, Historial).
 * Incluye Header con navegación simplificada para cajero.
 */
const CajeroLayout = ({ user, notifications = 0, onLogout }) => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header
        user={user}
        notifications={notifications}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="pt-20 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-neutral-500">
          <p>&copy; 2025 CineApp - Sistema de Punto de Venta</p>
        </div>
      </footer>
    </div>
  );
};

CajeroLayout.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(['customer', 'admin', 'cajero']),
  }),
  notifications: PropTypes.number,
  onLogout: PropTypes.func,
};

export default CajeroLayout;
