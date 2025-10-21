import { useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Button, Badge } from '@atoms';
import {
  CheckCircle,
  Download,
  Mail,
  Share2,
  Printer,
  Calendar,
  Clock,
  MapPin,
  Film,
  Armchair,
  DollarSign,
  ChevronLeft,
} from 'lucide-react';

/**
 * Confirmacion Page
 * 
 * Displays purchase confirmation with ticket details, QR code, and action buttons.
 * Receives purchase data from Compra page via useLocation state.
 * 
 * Features:
 * - Success header with CheckCircle icon
 * - Ticket card with all purchase details
 * - Reservation code in large text
 * - Movie, showtime, sala, format, seats information
 * - QR code placeholder (ready for integration)
 * - Action buttons: Download PDF, Send Email, Share, Print
 * - Print-friendly styles (@media print)
 * - Link to Mis Compras page
 * 
 * State Flow:
 * - Receives purchase object from Compra page:
 *   { id, showtime, seats, totalPrice, customerInfo, metodoPago, fecha, estado }
 * - Redirects to /mis-compras if no purchase data
 * - Displays all information in ticket format
 * 
 * @component
 */
const Confirmacion = () => {
  const { purchaseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Helper para formatear moneda colombiana
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get purchase data from location state
  const { purchase } = location.state || {};

  // Redirect if no purchase data
  useEffect(() => {
    if (!purchase) {
      navigate('/mis-compras', { replace: true });
    }
  }, [purchase, navigate]);

  // Action handlers
  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation with library like jsPDF
    alert('PDF descargado exitosamente (mock)');
  };

  const handleSendEmail = () => {
    // TODO: Implement email sending via API
    alert(`Confirmación enviada a ${purchase?.customerInfo?.email} (mock)`);
  };

  const handleShare = async () => {
    // Web Share API if available, otherwise fallback
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Reserva de Cine',
          text: `Reserva ${purchaseId} - ${purchase?.showtime?.movieTitle}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Don't render if no purchase data (will redirect)
  if (!purchase) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <Link
          to="/cartelera"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6 print:hidden"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Volver a Cartelera</span>
        </Link>

        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
            ¡Compra Confirmada!
          </h1>
          <p className="text-neutral-600 text-lg">
            Tu reserva ha sido procesada exitosamente
          </p>
        </div>

        {/* Ticket Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-6 md:p-8 mb-6 print:shadow-none print:border-2">
          {/* Reservation Code */}
          <div className="text-center mb-8 pb-6 border-b-2 border-dashed border-neutral-300">
            <p className="text-sm text-neutral-600 mb-2 uppercase tracking-wide">
              Código de Reserva
            </p>
            <p className="text-3xl md:text-4xl font-bold text-primary tracking-wider font-mono">
              {purchaseId}
            </p>
            <p className="text-xs text-neutral-500 mt-2">
              Presenta este código en la entrada
            </p>
          </div>

          {/* Movie + Showtime Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Movie */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-600 mb-2">
                <Film className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Película
                </h3>
              </div>
              <p className="text-xl font-bold text-neutral-900">
                {purchase.showtime.movieTitle}
              </p>
            </div>

            {/* Format */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-600 mb-2">
                <Film className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Formato
                </h3>
              </div>
              <Badge variant="info" size="lg">
                {purchase.showtime.format}
              </Badge>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-600 mb-2">
                <Calendar className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Fecha
                </h3>
              </div>
              <p className="text-lg text-neutral-900">
                {formatDate(purchase.showtime.date)}
              </p>
            </div>

            {/* Time */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-600 mb-2">
                <Clock className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Hora
                </h3>
              </div>
              <p className="text-lg text-neutral-900">{purchase.showtime.time}</p>
            </div>

            {/* Sala */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-600 mb-2">
                <MapPin className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Sala
                </h3>
              </div>
              <p className="text-lg text-neutral-900">{purchase.showtime.sala}</p>
            </div>

            {/* Payment Method */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-neutral-600 mb-2">
                <DollarSign className="w-4 h-4" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Método de Pago
                </h3>
              </div>
              <p className="text-lg text-neutral-900 capitalize">
                {purchase.metodoPago}
              </p>
            </div>
          </div>

          {/* Seats */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-neutral-600 mb-3">
              <Armchair className="w-4 h-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Asientos Seleccionados
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {purchase.seats.sort().map((seat) => (
                <Badge key={seat} variant="primary" size="lg">
                  {seat}
                </Badge>
              ))}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="text-center mb-8 py-6 bg-neutral-50 rounded-xl">
            <div className="w-48 h-48 mx-auto bg-white border-2 border-neutral-300 rounded-xl flex flex-col items-center justify-center">
              <div className="text-6xl mb-2">📱</div>
              <p className="text-neutral-500 text-sm font-mono">{purchaseId}</p>
              <p className="text-neutral-400 text-xs mt-1">QR Code</p>
            </div>
            <p className="text-xs text-neutral-500 mt-3">
              Escanea este código en la entrada del cine
            </p>
          </div>

          {/* Customer Info */}
          <div className="mb-8 p-4 bg-neutral-50 rounded-xl">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 mb-3">
              Información del Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-neutral-600">Nombre:</span>{' '}
                <span className="font-medium">{purchase.customerInfo.nombre}</span>
              </div>
              <div>
                <span className="text-neutral-600">Email:</span>{' '}
                <span className="font-medium">{purchase.customerInfo.email}</span>
              </div>
              <div>
                <span className="text-neutral-600">Teléfono:</span>{' '}
                <span className="font-medium">{purchase.customerInfo.telefono}</span>
              </div>
              <div>
                <span className="text-neutral-600">Fecha de compra:</span>{' '}
                <span className="font-medium">
                  {new Date(purchase.fecha).toLocaleString('es-ES')}
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-neutral-200 pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-600">Total Pagado</p>
                <p className="text-xs text-neutral-500">
                  {purchase.seats.length} asiento{purchase.seats.length > 1 ? 's' : ''} ×{' '}
                  {formatCurrency(purchase.showtime.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-success">
                  {formatCurrency(purchase.totalPrice)}
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-6 p-4 bg-warning-light border-l-4 border-warning rounded-r-lg">
            <p className="text-sm text-neutral-700">
              <strong>Importante:</strong> Llega al menos 15 minutos antes de la función.
              Presenta tu código de reserva o QR en la entrada.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 print:hidden">
          <Button
            variant="outline"
            size="md"
            onClick={handleDownloadPDF}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Descargar</span> PDF
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={handleSendEmail}
            className="w-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Enviar</span> Email
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={handleShare}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={handlePrint}
            className="w-full"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center print:hidden">
          <Link
            to="/mis-compras"
            className="text-primary hover:text-primary-dark font-medium hover:underline"
          >
            Ver Todas Mis Compras →
          </Link>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <Link
            to="/cartelera"
            className="text-primary hover:text-primary-dark font-medium hover:underline"
          >
            Comprar Más Boletos
          </Link>
        </div>

        {/* Print Styles */}
        <style>{`
          @media print {
            body {
              background: white;
            }
            .print\\:hidden {
              display: none !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            .print\\:border-2 {
              border-width: 2px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Confirmacion;
