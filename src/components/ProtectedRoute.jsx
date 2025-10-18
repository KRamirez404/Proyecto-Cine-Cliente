import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * ProtectedRoute
 * 
 * Componente para proteger rutas que requieren autenticación
 * y verificación de roles específicos.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente a renderizar si está autorizado
 * @param {Object|null} props.user - Usuario autenticado (null si no está autenticado)
 * @param {string[]} props.allowedRoles - Roles permitidos para acceder a la ruta
 * @param {string} props.redirectTo - Ruta a la que redirigir si no está autorizado
 */
const ProtectedRoute = ({ 
  children, 
  user, 
  allowedRoles = [], 
  redirectTo = '/login' 
}) => {
  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si hay roles específicos y el usuario no tiene el rol adecuado
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirigir según el rol del usuario
    const roleRedirects = {
      customer: '/',
      admin: '/admin/dashboard',
      cajero: '/cajero/ventas',
    };

    return <Navigate to={roleRedirects[user.role] || '/'} replace />;
  }

  // Usuario autorizado, renderizar children
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(['customer', 'admin', 'cajero']),
  }),
  allowedRoles: PropTypes.arrayOf(
    PropTypes.oneOf(['customer', 'admin', 'cajero'])
  ),
  redirectTo: PropTypes.string,
};

export default ProtectedRoute;
