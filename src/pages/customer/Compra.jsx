import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Input, Button, Badge } from '@atoms';
import { Modal } from '@molecules';
import { 
  ChevronLeft, 
  Film, 
  Clock, 
  MapPin, 
  Armchair, 
  DollarSign,
  CreditCard,
  Banknote,
  Shield,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

/**
 * Compra Page (Checkout)
 * 
 * Formulario de checkout con resumen de compra.
 * Incluye validación, método de pago, términos y condiciones.
 * Modal de confirmación antes de procesar.
 */
const Compra = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from navigation state (from Asientos page)
  const { showtime, seats, totalPrice } = location.state || {};

  // Redirect if no data
  useEffect(() => {
    if (!showtime || !seats || seats.length === 0) {
      navigate('/cartelera');
    }
  }, [showtime, seats, navigate]);

  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    metodoPago: 'tarjeta',
    aceptaTerminos: false,
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // UI state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle input change
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Teléfono
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\D/g, ''))) {
      newErrors.telefono = 'Teléfono inválido (10 dígitos)';
    }

    // Términos
    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  // Confirm purchase
  const handleConfirmPurchase = async () => {
    setShowConfirmModal(false);
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock purchase ID
    const purchaseId = Math.random().toString(36).substr(2, 9).toUpperCase();

    setIsProcessing(false);
    setShowSuccessModal(true);

    // Navigate to confirmation after 2 seconds
    setTimeout(() => {
      navigate(`/confirmacion/${purchaseId}`, {
        state: {
          purchase: {
            id: purchaseId,
            showtime,
            seats,
            totalPrice,
            customerInfo: {
              nombre: formData.nombre,
              email: formData.email,
              telefono: formData.telefono,
            },
            metodoPago: formData.metodoPago,
            fecha: new Date().toISOString(),
            estado: 'confirmed',
          },
        },
      });
    }, 2000);
  };

  if (!showtime || !seats) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <Link 
        to={`/asientos/${showtime.id}`} 
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Volver a Selección de Asientos</span>
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Finalizar Compra
        </h1>
        <p className="text-neutral-600">
          Completa tus datos para confirmar tu reserva
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Datos Personales
              </h2>

              <div className="space-y-4">
                <div>
                  <Input
                    label="Nombre Completo"
                    name="nombre"
                    placeholder="Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    error={errors.nombre}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    required
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Te enviaremos la confirmación a este email
                  </p>
                </div>

                <div>
                  <Input
                    label="Teléfono"
                    type="tel"
                    name="telefono"
                    placeholder="5512345678"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    error={errors.telefono}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Método de Pago
              </h2>

              <div className="space-y-3">
                {/* Tarjeta */}
                <label className={`
                  flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${formData.metodoPago === 'tarjeta' 
                    ? 'border-primary bg-primary-light' 
                    : 'border-neutral-200 hover:border-primary hover:bg-neutral-50'
                  }
                `}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={formData.metodoPago === 'tarjeta'}
                    onChange={(e) => handleInputChange('metodoPago', e.target.value)}
                    className="w-5 h-5 text-primary"
                  />
                  <CreditCard className={`w-6 h-6 ${formData.metodoPago === 'tarjeta' ? 'text-primary' : 'text-neutral-500'}`} />
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">Tarjeta de Crédito/Débito</p>
                    <p className="text-sm text-neutral-600">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                {/* Efectivo */}
                <label className={`
                  flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${formData.metodoPago === 'efectivo' 
                    ? 'border-primary bg-primary-light' 
                    : 'border-neutral-200 hover:border-primary hover:bg-neutral-50'
                  }
                `}>
                  <input
                    type="radio"
                    name="metodoPago"
                    value="efectivo"
                    checked={formData.metodoPago === 'efectivo'}
                    onChange={(e) => handleInputChange('metodoPago', e.target.value)}
                    className="w-5 h-5 text-primary"
                  />
                  <Banknote className={`w-6 h-6 ${formData.metodoPago === 'efectivo' ? 'text-primary' : 'text-neutral-500'}`} />
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">Pago en Efectivo</p>
                    <p className="text-sm text-neutral-600">En taquilla antes de la función</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Términos y Condiciones
              </h2>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.aceptaTerminos}
                  onChange={(e) => handleInputChange('aceptaTerminos', e.target.checked)}
                  className="w-5 h-5 text-primary mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm text-neutral-700">
                    Acepto los <a href="#" className="text-primary font-medium hover:underline">términos y condiciones</a> de compra y la <a href="#" className="text-primary font-medium hover:underline">política de privacidad</a>.
                  </p>
                  {errors.aceptaTerminos && (
                    <p className="text-sm text-error mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.aceptaTerminos}
                    </p>
                  )}
                </div>
              </label>

              <div className="mt-4 p-4 bg-info-light rounded-lg border border-info">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-info flex-shrink-0" />
                  <div className="text-sm text-info">
                    <p className="font-semibold mb-1">Compra Segura</p>
                    <p>Tus datos están protegidos con encriptación SSL de 256 bits.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Confirmar Compra →
            </Button>
          </form>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Resumen de Compra
            </h3>

            {/* Movie Info */}
            <div className="mb-4 pb-4 border-b border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Film className="w-4 h-4 text-primary" />
                {showtime.movieTitle}
              </h4>
              <div className="space-y-1 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(showtime.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} - {showtime.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{showtime.sala}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4" />
                  <Badge variant="info" size="sm">{showtime.format}</Badge>
                </div>
              </div>
            </div>

            {/* Seats */}
            <div className="mb-4 pb-4 border-b border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                <Armchair className="w-4 h-4 text-primary" />
                Asientos ({seats.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {seats.sort().map(seat => (
                  <Badge key={seat} variant="primary" size="sm">
                    {seat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Precio por asiento</span>
                <span className="font-medium text-neutral-900">${showtime.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Cantidad de asientos</span>
                <span className="font-medium text-neutral-900">× {seats.length}</span>
              </div>
              {formData.metodoPago === 'efectivo' && (
                <div className="flex justify-between text-sm text-warning">
                  <span>Cargo por pago en efectivo</span>
                  <span className="font-medium">$0.00</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="pt-4 border-t-2 border-neutral-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-neutral-900">Total</span>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-success" />
                  <span className="text-3xl font-bold text-success">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
              <p className="text-xs text-neutral-600 text-center">
                Al confirmar tu compra recibirás un correo con tus boletos electrónicos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Compra"
        variant="warning"
        footer={
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmModal(false)}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
            >
              Sí, Confirmar Compra
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-neutral-700">
            ¿Estás seguro de que deseas confirmar esta compra?
          </p>
          <div className="bg-neutral-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Película:</span>
              <span className="font-semibold text-neutral-900">{showtime.movieTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Asientos:</span>
              <span className="font-semibold text-neutral-900">{seats.length} asiento{seats.length > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Total:</span>
              <span className="font-bold text-primary text-lg">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Processing/Success Modal */}
      <Modal
        isOpen={isProcessing || showSuccessModal}
        onClose={() => {}}
        title={isProcessing ? "Procesando Compra..." : "¡Compra Exitosa!"}
        variant={showSuccessModal ? "success" : "default"}
        showCloseButton={false}
      >
        {isProcessing ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-neutral-700">Procesando tu compra, por favor espera...</p>
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <p className="text-neutral-700 mb-2">
              Tu compra ha sido confirmada exitosamente.
            </p>
            <p className="text-sm text-neutral-600">
              Redirigiendo a tu confirmación...
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Compra;
