import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@atoms';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SearchBar Component - Molecule del Design System
 * 
 * Barra de búsqueda que combina Input + Button + Dropdown de sugerencias.
 * Implementa autocomplete, debounce, y navegación por teclado.
 * 
 * @component
 * @example
 * <SearchBar
 *   placeholder="Buscar películas..."
 *   suggestions={['Avatar', 'Matrix', 'Inception']}
 *   onSearch={(value) => console.log('Buscando:', value)}
 *   onSelect={(suggestion) => console.log('Seleccionado:', suggestion)}
 * />
 */
const SearchBar = ({
  placeholder = 'Buscar películas...',
  value: controlledValue,
  suggestions = [],
  isLoading = false,
  debounceMs = 300,
  onSearch,
  onSelect,
  onChange,
  onClear,
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Valor controlado o interno
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isControlled = controlledValue !== undefined;

  // Debounce para búsqueda
  useEffect(() => {
    if (!value.trim()) {
      setShowSuggestions(false);
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
      if (suggestions.length > 0) {
        setShowSuggestions(true);
      }
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, debounceMs, onSearch, suggestions.length]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }

    setSelectedIndex(-1);
  };

  // Handle clear
  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (onClear) {
      onClear();
    }
    
    if (onChange) {
      onChange('');
    }

    inputRef.current?.focus();
  };

  // Handle suggestion select
  const handleSuggestionClick = (suggestion) => {
    if (!isControlled) {
      setInternalValue(suggestion);
    }
    
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (onSelect) {
      onSelect(suggestion);
    }
    
    if (onChange) {
      onChange(suggestion);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && value.trim() && onSearch) {
        onSearch(value);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (value.trim() && onSearch) {
          onSearch(value);
          setShowSuggestions(false);
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      
      default:
        break;
    }
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (value.trim() && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          icon={Search}
          iconPosition="left"
          ariaLabel="Buscar películas"
          {...props}
        />
        
        {/* Clear Button */}
        {value.trim() && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-200 transition-colors z-10"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            id="search-suggestions"
            ref={suggestionsRef}
            role="listbox"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-300 rounded-lg shadow-card max-h-64 overflow-y-auto z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center text-neutral-500">
                <span>Buscando...</span>
              </div>
            ) : (
              <>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    role="option"
                    aria-selected={index === selectedIndex}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full px-4 py-3 text-left hover:bg-neutral-100 transition-colors ${
                      index === selectedIndex ? 'bg-primary-light text-primary' : 'text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

SearchBar.propTypes = {
  /** Placeholder del input */
  placeholder: PropTypes.string,
  
  /** Valor controlado (opcional) */
  value: PropTypes.string,
  
  /** Array de sugerencias de autocomplete */
  suggestions: PropTypes.arrayOf(PropTypes.string),
  
  /** Estado de carga de sugerencias */
  isLoading: PropTypes.bool,
  
  /** Tiempo de debounce en ms */
  debounceMs: PropTypes.number,
  
  /** Callback cuando se busca (debounced) */
  onSearch: PropTypes.func,
  
  /** Callback cuando se selecciona una sugerencia */
  onSelect: PropTypes.func,
  
  /** Callback cuando cambia el valor */
  onChange: PropTypes.func,
  
  /** Callback cuando se limpia el input */
  onClear: PropTypes.func,
  
  /** Clases CSS adicionales */
  className: PropTypes.string,
};

export default SearchBar;
