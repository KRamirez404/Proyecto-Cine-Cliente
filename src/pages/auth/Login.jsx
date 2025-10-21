import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@atoms';
import { Modal, TermsModal } from '@molecules';
import { Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

/**
 * Login Page
 * 
 * Authentication page for users to access the system.
 * 
 * Features:
 * - Email + password form with validation
 * - Remember me checkbox (stores preference in localStorage)
 * - Show/hide password toggle
 * - Forgot password link (TODO: implement flow)
 * - Error handling with visual feedback
 * - Loading state during authentication
 * - Success modal before redirect
 * - Mock authentication for development
 * - Redirect to appropriate page based on user role:
 *   * customer → /cartelera
 *   * admin → /admin/dashboard
 *   * cajero → /cajero/ventas
 * 
 * Mock Users (for development):
 * - customer@cine.com / password123 (role: customer)
 * - admin@cine.com / admin123 (role: admin)
 * - cajero@cine.com / cajero123 (role: cajero)
 * 
 * @component
 */
const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsType, setTermsType] = useState('terms'); // 'terms' or 'privacy'

  // Mock users database
  const mockUsers = [
    {
      email: 'customer@cine.com',
      password: 'password123',
      role: 'customer',
      name: 'Cliente Demo',
    },
    {
      email: 'admin@cine.com',
      password: 'admin123',
      role: 'admin',
      name: 'Administrador Demo',
    },
    {
      email: 'cajero@cine.com',
      password: 'cajero123',
      role: 'cajero',
      name: 'Cajero Demo',
    },
  ];

  // Handlers
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Clear general login error
    if (loginError) {
      setLoginError('');
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError('');

    // Simulate API call
    setTimeout(() => {
      // Find user in mock database
      const user = mockUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Success - store user data
        const userData = {
          id: Math.floor(Math.random() * 1000),
          name: user.name,
          email: user.email,
          role: user.role,
        };

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', `mock-token-${userData.id}`);
        
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }

        // Show success modal
        setIsLoading(false);
        setShowSuccessModal(true);

        // Redirect after 1.5 seconds
        setTimeout(() => {
          const redirectMap = {
            customer: '/cartelera',
            admin: '/admin/dashboard',
            cajero: '/cajero/ventas',
          };
          
          // Reload page to update user context
          window.location.href = redirectMap[user.role] || '/';
        }, 1500);
      } else {
        // Error - invalid credentials
        setIsLoading(false);
        setLoginError('Email o contraseña incorrectos');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-secondary-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Bienvenido a CineApp
          </h1>
          <p className="text-neutral-600">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* General Error */}
          {loginError && (
            <div className="mb-6 p-4 bg-error-light border-l-4 border-error rounded-r-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-error">{loginError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                disabled={isLoading}
                icon={Mail}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  disabled={isLoading}
                  icon={Lock}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                  disabled={isLoading}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-neutral-700">
                  Recordarme
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
              state={isLoading ? 'loading' : 'default'}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">
                ¿No tienes cuenta?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6">
            <Link to="/register">
              <Button variant="outline" size="lg" className="w-full">
                Crear Cuenta Nueva
              </Button>
            </Link>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-info-light rounded-lg">
            <p className="text-xs font-semibold text-info mb-2">
              Credenciales de prueba:
            </p>
            <div className="space-y-1 text-xs text-neutral-600">
              <div>
                <strong>Cliente:</strong> customer@cine.com / password123
              </div>
              <div>
                <strong>Admin:</strong> admin@cine.com / admin123
              </div>
              <div>
                <strong>Cajero:</strong> cajero@cine.com / cajero123
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-neutral-600">
          <p>
            Al iniciar sesión, aceptas nuestros{' '}
            <button
              type="button"
              onClick={() => {
                setTermsType('terms');
                setShowTermsModal(true);
              }}
              className="text-primary hover:underline font-medium"
            >
              Términos y Condiciones
            </button>{' '}
            y{' '}
            <button
              type="button"
              onClick={() => {
                setTermsType('privacy');
                setShowTermsModal(true);
              }}
              className="text-primary hover:underline font-medium"
            >
              Política de Privacidad
            </button>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {}}
          title="¡Inicio de Sesión Exitoso!"
          variant="success"
          showCloseButton={false}
        >
          <div className="text-center py-4">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <p className="text-neutral-700 mb-2">
              Has iniciado sesión correctamente
            </p>
            <p className="text-sm text-neutral-500">
              Redirigiendo...
            </p>
          </div>
        </Modal>
      )}

      {/* Terms and Privacy Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        type={termsType}
      />
    </div>
  );
};

export default Login;
