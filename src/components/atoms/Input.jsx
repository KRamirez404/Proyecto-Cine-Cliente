import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Input Component - Átomo base del Design System
 * 
 * Componente de input reutilizable con validación, estados y feedback visual.
 * Sigue el design system establecido en FASE 0.
 * 
 * @component
 * @example
 * // Input básico
 * <Input label="Nombre" placeholder="Ingresa tu nombre" />
 * 
 * @example
 * // Input con validación
 * <Input 
 *   label="Email" 
 *   type="email" 
 *   error="Email inválido"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * 
 * @example
 * // Input con icono
 * <Input label="Buscar" icon={Search} placeholder="Buscar película..." />
 */
const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  id,
  name,
  autoComplete,
  maxLength,
  min,
  max,
  pattern,
  ariaLabel,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Generar ID único si no se proporciona
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  // Determinar tipo de input (manejar password toggle)
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Clases base
  const baseClasses = 'w-full px-4 py-2.5 text-base rounded-lg border-2 transition-all duration-200 focus:outline-none';
  
  // Estados visuales
  const stateClasses = error
    ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
    : success
    ? 'border-success focus:border-success focus:ring-2 focus:ring-success/20'
    : 'border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20';

  // Estado disabled
  const disabledClasses = disabled
    ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed'
    : 'bg-white text-neutral-900';

  // Padding ajustado si hay iconos
  const paddingClasses = Icon && iconPosition === 'left' ? 'pl-11' : Icon && iconPosition === 'right' ? 'pr-11' : '';

  // Padding adicional si es password (para el botón toggle)
  const passwordPadding = type === 'password' ? 'pr-11' : '';

  // Combinar clases
  const inputClasses = `
    ${baseClasses}
    ${stateClasses}
    ${disabledClasses}
    ${paddingClasses}
    ${passwordPadding}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Handlers
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium mb-1.5 ${
            error ? 'text-error' : success ? 'text-success' : 'text-neutral-700'
          } ${disabled ? 'text-neutral-500' : ''}`}
        >
          {label}
          {required && <span className="text-error ml-1" aria-label="obligatorio">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon Left */}
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon
              className={`h-5 w-5 ${
                error ? 'text-error' : success ? 'text-success' : isFocused ? 'text-primary' : 'text-neutral-400'
              }`}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          min={min}
          max={max}
          pattern={pattern}
          className={inputClasses}
          aria-label={ariaLabel || label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {/* Icon Right */}
        {Icon && iconPosition === 'right' && !error && !success && type !== 'password' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon
              className={`h-5 w-5 ${
                isFocused ? 'text-primary' : 'text-neutral-400'
              }`}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Password Toggle */}
        {type === 'password' && !disabled && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 focus:outline-none focus:text-primary transition-colors"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}

        {/* Error Icon */}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <AlertCircle className="h-5 w-5 text-error" aria-hidden="true" />
          </div>
        )}

        {/* Success Icon */}
        {success && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {(helperText || error) && (
        <p
          id={error ? `${inputId}-error` : `${inputId}-helper`}
          className={`mt-1.5 text-sm ${
            error ? 'text-error' : success ? 'text-success' : 'text-neutral-600'
          }`}
          role={error ? 'alert' : undefined}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /** Etiqueta del input */
  label: PropTypes.string,
  
  /** Tipo de input HTML */
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time']),
  
  /** Texto placeholder */
  placeholder: PropTypes.string,
  
  /** Valor del input (controlled) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  /** Función onChange */
  onChange: PropTypes.func,
  
  /** Función onBlur */
  onBlur: PropTypes.func,
  
  /** Función onFocus */
  onFocus: PropTypes.func,
  
  /** Mensaje de error (activa estado error) */
  error: PropTypes.string,
  
  /** Estado de éxito (muestra icono check) */
  success: PropTypes.bool,
  
  /** Texto de ayuda debajo del input */
  helperText: PropTypes.string,
  
  /** Estado deshabilitado */
  disabled: PropTypes.bool,
  
  /** Campo obligatorio */
  required: PropTypes.bool,
  
  /** Input ocupa todo el ancho */
  fullWidth: PropTypes.bool,
  
  /** Icono (componente de lucide-react) */
  icon: PropTypes.elementType,
  
  /** Posición del icono */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  
  /** Clases CSS adicionales */
  className: PropTypes.string,
  
  /** ID del input */
  id: PropTypes.string,
  
  /** Nombre del input */
  name: PropTypes.string,
  
  /** Atributo autocomplete */
  autoComplete: PropTypes.string,
  
  /** Longitud máxima */
  maxLength: PropTypes.number,
  
  /** Valor mínimo (para type="number") */
  min: PropTypes.number,
  
  /** Valor máximo (para type="number") */
  max: PropTypes.number,
  
  /** Patrón de validación regex */
  pattern: PropTypes.string,
  
  /** Etiqueta ARIA */
  ariaLabel: PropTypes.string,
};

export default Input;
