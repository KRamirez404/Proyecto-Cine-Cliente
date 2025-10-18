/**
 * DESIGN TOKENS - Sistema de Cine
 * Single Source of Truth para todo el proyecto
 * 
 * ⚠️ IMPORTANTE: Todos los componentes DEBEN importar colores, spacing,
 * tipografías y otros valores desde este archivo. NO hardcodear valores.
 * 
 * Uso:
 * import { COLORS, SPACING, TYPOGRAPHY, ANIMATIONS } from '@/design/tokens';
 */

// ═══════════════════════════════════════════════════════════
// 🎨 COLORES
// ═══════════════════════════════════════════════════════════

export const COLORS = {
  // Primarios
  primary: {
    DEFAULT: '#1e40af', // blue-800 - Botones principales, CTAs
    dark: '#1e3a8a',    // blue-900 - Hover states
    light: '#3b82f6',   // blue-500 - Gradientes, hover states
    lighter: '#60a5fa', // blue-400 - Asientos seleccionados
  },

  // Secundarios (Acentos)
  secondary: {
    DEFAULT: '#7c3aed', // violet-600 - Botones secundarios
    light: '#a78bfa',   // violet-400 - Secondary light
    lighter: '#c4b5fd', // violet-300 - Secondary lighter
  },
  accent: {
    DEFAULT: '#f59e0b',  // amber-500 - Botones secundarios, precios
    orange: '#ea580c',   // orange-600 - Urgencia, contador de tiempo
  },

  // Estados
  success: {
    DEFAULT: '#22c55e',  // green-500 - Asientos disponibles
    light: '#dcfce7',    // green-100 - Fondos success
    dark: '#15803d',     // green-700 - Texto success
  },
  error: {
    DEFAULT: '#ef4444',  // red-500 - Asientos ocupados, errores
    light: '#fee2e2',    // red-100 - Fondos error
    dark: '#dc2626',     // red-600 - Texto error
  },
  warning: {
    DEFAULT: '#f59e0b',  // amber-500 - Warnings
    light: '#fef3c7',    // yellow-100 - Fondos warning
    dark: '#a16207',     // yellow-700 - Texto warning
  },
  info: {
    DEFAULT: '#3b82f6',  // blue-500 - Info
    light: '#dbeafe',    // blue-100 - Fondos info
    dark: '#1d4ed8',     // blue-700 - Texto info
  },

  // Badges de Género (Películas)
  genre: {
    action: '#ef4444',   // red-500
    horror: '#a855f7',   // purple-500
    romance: '#ec4899',  // pink-500
    drama: '#374151',    // gray-700
    comedy: '#f472b6',   // pink-400
  },

  // Neutrales (UI Base)
  neutral: {
    white: '#ffffff',
    50: '#f9fafb',       // Fondos de páginas
    100: '#f3f4f6',      // Badges neutros, hover
    200: '#e5e7eb',      // Bordes, divisores
    400: '#9ca3af',      // Placeholder, disabled
    500: '#6b7280',      // Texto secundario
    600: '#4b5563',      // Texto metadata
    700: '#374151',      // Texto de inputs
    900: '#111827',      // Títulos, headings
  },

  // Especiales
  border: {
    main: '#ced4da',     // Borde del frame principal
  },
};

// ═══════════════════════════════════════════════════════════
// 🖋️ TIPOGRAFÍA
// ═══════════════════════════════════════════════════════════

export const TYPOGRAPHY = {
  // Familias de fuentes
  fontFamily: {
    roboto: ['Roboto', 'sans-serif'],  // Sistema principal
    outfit: ['Outfit', 'sans-serif'],  // Formularios (opcional)
    poppins: ['Poppins', 'sans-serif'], // Números destacados
  },

  // Pesos de fuente
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Escala tipográfica
  fontSize: {
    h1: {
      size: '30px',
      lineHeight: '36px', // 1.2
      fontFamily: 'Roboto',
      fontWeight: 700,
    },
    h2: {
      size: '20px',
      lineHeight: '28px', // 1.4
      fontFamily: 'Poppins',
      fontWeight: 600,
    },
    h3: {
      size: '18px',
      lineHeight: '28px', // 1.55
      fontFamily: 'Outfit',
      fontWeight: 400,
    },
    bodyLarge: {
      size: '18px',
      lineHeight: '28px', // 1.55
      fontFamily: 'Roboto',
      fontWeight: 400,
    },
    bodyRegular: {
      size: '16px',
      lineHeight: '24px', // 1.5
      fontFamily: 'Roboto',
      fontWeight: 400,
    },
    bodySmall: {
      size: '14px',
      lineHeight: '20px', // 1.43
      fontFamily: 'Roboto',
      fontWeight: 400,
    },
    caption: {
      size: '12px',
      lineHeight: '16px', // 1.33
      fontFamily: 'Roboto',
      fontWeight: 400,
    },
    priceLarge: {
      size: '24px',
      lineHeight: '32px', // 1.33
      fontFamily: 'Poppins',
      fontWeight: 700,
    },
    priceSmall: {
      size: '18px',
      lineHeight: '28px', // 1.55
      fontFamily: 'Roboto',
      fontWeight: 600,
    },
  },

  // Font variation settings (Roboto)
  fontVariationSettings: "'wdth' 100",
};

// ═══════════════════════════════════════════════════════════
// 📏 SPACING (Sistema base 8px)
// ═══════════════════════════════════════════════════════════

export const SPACING = {
  xs: '4px',   // Padding interno de badges, separación mínima
  sm: '8px',   // Padding de botones pequeños, gap icono + texto
  md: '16px',  // Padding de cards, separación entre secciones
  lg: '24px',  // Margin entre componentes, padding de contenedores
  xl: '32px',  // Padding de secciones grandes, margin de hero
  '2xl': '48px', // Separación entre bloques de página
};

// ═══════════════════════════════════════════════════════════
// 📐 BORDER RADIUS
// ═══════════════════════════════════════════════════════════

export const BORDER_RADIUS = {
  sm: '4px',    // Asientos, elementos pequeños
  md: '8px',    // Botones estándar
  lg: '12px',   // Cards principales, botones grandes
  xl: '16px',   // Cards especiales (seat grid)
  full: '9999px', // Badges, círculos
};

// ═══════════════════════════════════════════════════════════
// 🎭 ANIMACIONES
// ═══════════════════════════════════════════════════════════

export const ANIMATIONS = {
  // Duraciones
  duration: {
    fast: '200ms',   // Hover, estados rápidos
    normal: '300ms', // Clicks, focus, interacciones generales
    slow: '500ms',   // Modales, overlays, transiciones complejas
  },

  // Easing functions
  easing: {
    default: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
    linear: 'linear',
  },

  // Transiciones predefinidas
  transitions: {
    fast: 'all 200ms ease-in-out',
    normal: 'all 300ms ease-in-out',
    slow: 'all 500ms ease-in-out',
  },

  // Framer Motion variants
  framerMotion: {
    button: {
      hover: { scale: 1.02, transition: { duration: 0.2 } },
      tap: { scale: 0.98, transition: { duration: 0.1 } },
    },
    card: {
      hover: {
        y: -4,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3 },
      },
    },
    seat: {
      tap: { scale: 0.95, transition: { duration: 0.1 } },
    },
  },
};

// ═══════════════════════════════════════════════════════════
// 📦 SHADOWS
// ═══════════════════════════════════════════════════════════

export const SHADOWS = {
  card: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cardHover: '0 8px 16px rgba(0, 0, 0, 0.15)',
  none: 'none',
};

// ═══════════════════════════════════════════════════════════
// 📱 BREAKPOINTS
// ═══════════════════════════════════════════════════════════

export const BREAKPOINTS = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape / Desktop small
  xl: '1280px',  // Desktop (base Figma)
  '2xl': '1536px', // Desktop large
};

// ═══════════════════════════════════════════════════════════
// 🎯 COMPONENTES (Valores específicos)
// ═══════════════════════════════════════════════════════════

export const COMPONENTS = {
  // Botones
  button: {
    height: {
      small: '40px',
      medium: '48px',
      large: '56px',
    },
    paddingX: {
      small: '16px',
      medium: '24px',
      large: '32px',
    },
    paddingY: {
      small: '8px',
      medium: '12px',
      large: '16px',
    },
  },

  // Inputs
  input: {
    height: '48px',
    paddingX: '16px',
    paddingY: '12px',
  },

  // Cards de Películas
  movieCard: {
    width: '389.328px',
    height: '424px',
    imageHeight: '256px',
    infoHeight: '168px',
    padding: '24px',
  },

  // Selección de Asientos
  seat: {
    size: '32px',
    gap: '8px', // Gap horizontal entre asientos
    rowGap: '16px', // Gap vertical entre filas
  },

  // Date Selector
  dateButton: {
    size: '80px',
  },

  // Hero Section
  hero: {
    height: '172px',
    padding: '32px',
    borderRadius: '16px',
  },
};

// ═══════════════════════════════════════════════════════════
// 🔤 ICONOS
// ═══════════════════════════════════════════════════════════

export const ICONS = {
  size: {
    small: '14px',
    medium: '16px',
    large: '20px',
    xlarge: '24px',
  },
};

// ═══════════════════════════════════════════════════════════
// 📋 EXPORT DEFAULT (Para uso rápido)
// ═══════════════════════════════════════════════════════════

export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  ANIMATIONS,
  SHADOWS,
  BREAKPOINTS,
  COMPONENTS,
  ICONS,
};
