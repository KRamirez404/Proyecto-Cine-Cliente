import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS, ANIMATIONS, BREAKPOINTS } from './src/design/tokens.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════
      // COLORES EXTENDIDOS (desde tokens)
      // ═══════════════════════════════════════════════════════
      colors: {
        // Primarios
        primary: {
          DEFAULT: COLORS.primary.DEFAULT,
          dark: COLORS.primary.dark,
          light: COLORS.primary.light,
          lighter: COLORS.primary.lighter,
        },
        
        // Secundarios
        secondary: {
          DEFAULT: COLORS.secondary.DEFAULT,
          light: COLORS.secondary.light,
          lighter: COLORS.secondary.lighter,
        },
        accent: {
          DEFAULT: COLORS.accent.DEFAULT,
          orange: COLORS.accent.orange,
        },

        // Estados
        success: {
          DEFAULT: COLORS.success.DEFAULT,
          light: COLORS.success.light,
          dark: COLORS.success.dark,
        },
        error: {
          DEFAULT: COLORS.error.DEFAULT,
          light: COLORS.error.light,
          dark: COLORS.error.dark,
        },
        warning: {
          DEFAULT: COLORS.warning.DEFAULT,
          light: COLORS.warning.light,
          dark: COLORS.warning.dark,
        },
        info: {
          DEFAULT: COLORS.info.DEFAULT,
          light: COLORS.info.light,
          dark: COLORS.info.dark,
        },

        // Géneros (badges de películas)
        genre: {
          action: COLORS.genre.action,
          horror: COLORS.genre.horror,
          romance: COLORS.genre.romance,
          drama: COLORS.genre.drama,
          comedy: COLORS.genre.comedy,
        },

        // Neutrales (ya existen en Tailwind, pero personalizados)
        neutral: COLORS.neutral,
      },

      // ═══════════════════════════════════════════════════════
      // TIPOGRAFÍA
      // ═══════════════════════════════════════════════════════
      fontFamily: {
        roboto: TYPOGRAPHY.fontFamily.roboto,
        outfit: TYPOGRAPHY.fontFamily.outfit,
        poppins: TYPOGRAPHY.fontFamily.poppins,
      },

      // ═══════════════════════════════════════════════════════
      // SPACING PERSONALIZADO
      // ═══════════════════════════════════════════════════════
      spacing: {
        xs: SPACING.xs,
        sm: SPACING.sm,
        md: SPACING.md,
        lg: SPACING.lg,
        xl: SPACING.xl,
        '2xl': SPACING['2xl'],
      },

      // ═══════════════════════════════════════════════════════
      // BORDER RADIUS
      // ═══════════════════════════════════════════════════════
      borderRadius: {
        sm: BORDER_RADIUS.sm,
        md: BORDER_RADIUS.md,
        lg: BORDER_RADIUS.lg,
        xl: BORDER_RADIUS.xl,
        full: BORDER_RADIUS.full,
      },

      // ═══════════════════════════════════════════════════════
      // SHADOWS
      // ═══════════════════════════════════════════════════════
      boxShadow: {
        card: SHADOWS.card,
        'card-hover': SHADOWS.cardHover,
      },

      // ═══════════════════════════════════════════════════════
      // ANIMACIONES
      // ═══════════════════════════════════════════════════════
      transitionDuration: {
        fast: ANIMATIONS.duration.fast,
        normal: ANIMATIONS.duration.normal,
        slow: ANIMATIONS.duration.slow,
      },

      transitionTimingFunction: {
        DEFAULT: ANIMATIONS.easing.default,
      },

      // ═══════════════════════════════════════════════════════
      // BREAKPOINTS (Mobile-First)
      // ═══════════════════════════════════════════════════════
      screens: {
        sm: BREAKPOINTS.sm,
        md: BREAKPOINTS.md,
        lg: BREAKPOINTS.lg,
        xl: BREAKPOINTS.xl,
        '2xl': BREAKPOINTS['2xl'],
      },
    },
  },
  plugins: [],
}
