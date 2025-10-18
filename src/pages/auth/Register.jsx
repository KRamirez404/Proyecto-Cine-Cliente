import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@atoms';
import { Modal } from '@molecules';
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle, Eye, EyeOff, Shield } from 'lucide-react';

/**
 * Register Page
 * 
 * User registration page for creating new accounts.
 * 
 * Features:
 * - Complete registration form (nombre, email, telefono, password, confirm password)
 * - Real-time validation with visual feedback
 * - Password strength indicator
 * - Password match validation
 * - Show/hide password toggles
 * - Terms and conditions checkbox (required)
 * - Error handling per field
 * - Loading state during registration
 * - Success modal with redirect to login
 * - Mock registration (stores in localStorage for demo)
 * 
 * Validation Rules:
 * - Nombre: min 3 characters
 * - Email: valid format (regex)
 * - Teléfono: 10 digits
 * - Password: min 8 characters, at least 1 uppercase, 1 lowercase, 1 number
 * - Confirm Password: must match password
 * - Terms: must be accepted
 * 
 * @component
 */
const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    
    // Length
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    
    // Uppercase
    if (/[A-Z]/.test(password)) strength += 20;
    
    // Lowercase
    if (/[a-z]/.test(password)) strength += 20;
    
    // Numbers
    if (/[0-9]/.test(password)) strength += 15;
    
    // Special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;

    // Labels and colors
    if (strength < 40) {
      return { strength, label: 'Débil', color: 'bg-error' };
    } else if (strength < 70) {
      return { strength, label: 'Media', color: 'bg-warning' };
    } else {
      return { strength, label: 'Fuerte', color: 'bg-success' };
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  // Handlers
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }));
    if (errors.acceptTerms) {
      setErrors((prev) => ({ ...prev, acceptTerms: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Nombre validation
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Teléfono validation
    const phoneDigits = formData.telefono.replace(/\D/g, '');
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (phoneDigits.length !== 10) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Debe incluir al menos una mayúscula';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Debe incluir al menos una minúscula';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Debe incluir al menos un número';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
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

    // Simulate API call
    setTimeout(() => {
      // Create user object (mock registration)
      const newUser = {
        id: Math.floor(Math.random() * 10000),
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        role: 'customer',
        registeredAt: new Date().toISOString(),
      };

      // Store in localStorage (mock database)
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Success
      setIsLoading(false);
      setShowSuccessModal(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light to-primary-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
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
            Crear Cuenta
          </h1>
          <p className="text-neutral-600">
            Regístrate para empezar a disfrutar del cine
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Nombre Completo
              </label>
              <Input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Juan Pérez"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                error={errors.nombre}
                disabled={isLoading}
                icon={User}
                autoComplete="name"
              />
            </div>

            {/* Email + Teléfono (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Teléfono
                </label>
                <Input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  placeholder="5551234567"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  error={errors.telefono}
                  disabled={isLoading}
                  icon={Phone}
                  autoComplete="tel"
                />
              </div>
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
                  autoComplete="new-password"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-neutral-600">
                      Seguridad de contraseña:
                    </span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.label === 'Débil' ? 'text-error' :
                      passwordStrength.label === 'Media' ? 'text-warning' :
                      'text-success'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Usa al menos 8 caracteres con mayúsculas, minúsculas y números
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  disabled={isLoading}
                  icon={Lock}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                  disabled={isLoading}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleCheckboxChange}
                  disabled={isLoading}
                  className="w-5 h-5 mt-0.5 rounded border-neutral-300 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                  Acepto los{' '}
                  <Link to="/terms" className="text-primary hover:underline font-medium">
                    Términos y Condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">
                    Política de Privacidad
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <div className="mt-2 flex items-center gap-2 text-error text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.acceptTerms}</span>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-info-light border-l-4 border-info rounded-r-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div className="text-sm text-neutral-700">
                <p className="font-medium mb-1">Tu información está segura</p>
                <p className="text-xs text-neutral-600">
                  Utilizamos encriptación de grado bancario para proteger tus datos personales.
                </p>
              </div>
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
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">
                ¿Ya tienes cuenta?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6">
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {}}
          title="¡Registro Exitoso!"
          variant="success"
          showCloseButton={false}
        >
          <div className="text-center py-4">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <p className="text-neutral-700 mb-2">
              Tu cuenta ha sido creada exitosamente
            </p>
            <p className="text-sm text-neutral-500">
              Redirigiendo al inicio de sesión...
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Register;
