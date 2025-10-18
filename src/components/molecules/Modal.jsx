import { createPortal } from 'react-dom';
import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button } from '@atoms';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

/**
 * Modal Component - Molecule del Design System
 * 
 * Modal/Dialog con overlay, portal rendering y focus management.
 * Combina Card + Button + Overlay + Animations.
 * 
 * @component
 * @example
 * <Modal
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirmar acción"
 *   variant="confirm"
 * >
 *   <p>¿Estás seguro de que deseas continuar?</p>
 * </Modal>
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  variant = 'default',
  size = 'md',
  closeOnClickOutside = true,
  closeOnEsc = true,
  showCloseButton = true,
  showIcon = true,
  className = '',
  ...props
}) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key handler
  const handleEsc = useCallback((e) => {
    if (closeOnEsc && e.key === 'Escape' && isOpen) {
      onClose?.();
    }
  }, [closeOnEsc, isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [handleEsc]);

  // Click outside handler
  const handleOverlayClick = (e) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Get icon by variant
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-success" aria-hidden="true" />;
      case 'error':
        return <AlertCircle className="h-6 w-6 text-error" aria-hidden="true" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-warning" aria-hidden="true" />;
      case 'info':
        return <Info className="h-6 w-6 text-info" aria-hidden="true" />;
      default:
        return null;
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      case '2xl':
        return 'max-w-2xl';
      case 'full':
        return 'max-w-full mx-4';
      default:
        return 'max-w-md';
    }
  };

  // Get header color by variant
  const getHeaderColor = () => {
    switch (variant) {
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-info';
      default:
        return 'text-neutral-900';
    }
  };

  // Modal content
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full ${getSizeClasses()} z-10`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            {...props}
          >
            <Card variant="elevated" padding="none" className={`overflow-hidden ${className}`}>
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between gap-4 p-6 border-b border-neutral-200">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {showIcon && variant !== 'default' && (
                      <div className="flex-shrink-0">
                        {getIcon()}
                      </div>
                    )}
                    {title && (
                      <h2
                        id="modal-title"
                        className={`text-xl font-semibold ${getHeaderColor()} truncate`}
                      >
                        {title}
                      </h2>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-shrink-0 p-1.5 rounded-lg text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label="Cerrar modal"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="p-6">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
                  {footer}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Render in portal
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
};

Modal.propTypes = {
  /** Si el modal está abierto */
  isOpen: PropTypes.bool.isRequired,
  /** Callback cuando se cierra el modal */
  onClose: PropTypes.func,
  /** Título del modal */
  title: PropTypes.string,
  /** Contenido del modal */
  children: PropTypes.node,
  /** Contenido del footer (típicamente botones) */
  footer: PropTypes.node,
  /** Variante visual del modal */
  variant: PropTypes.oneOf(['default', 'success', 'error', 'warning', 'info']),
  /** Tamaño del modal */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  /** Si se cierra al hacer click fuera */
  closeOnClickOutside: PropTypes.bool,
  /** Si se cierra con ESC */
  closeOnEsc: PropTypes.bool,
  /** Si muestra el botón de cerrar */
  showCloseButton: PropTypes.bool,
  /** Si muestra el ícono según variante */
  showIcon: PropTypes.bool,
  /** Clases CSS adicionales */
  className: PropTypes.string,
};

export default Modal;
