# 📐 DESIGN SYSTEM - SISTEMA DE CINE (MÓDULO CLIENTE)

**Versión:** 1.0.0  
**Fecha:** Enero 2025  
**Módulo Base:** CLIENTE (Cartelera, Horarios, Asientos, Compra)  
**Status:** ✅ APROBADO - Single Source of Truth

---

## 🎨 1. PALETA DE COLORES

### Colores Primarios
| Nombre | Hex | Tailwind | RGB | Uso Principal |
|--------|-----|----------|-----|---------------|
| **Primary Blue** | `#1e40af` | `blue-800` | rgb(30, 64, 175) | Botones principales, CTA, gradientes |
| **Primary Blue Light** | `#2563eb` | `blue-600` | rgb(37, 99, 235) | Gradientes, hover states |
| **Primary Blue Lighter** | `#3b82f6` | `blue-500` | rgb(59, 130, 246) | Asientos seleccionados, estados activos |

### Colores Secundarios (Acentos)
| Nombre | Hex | Tailwind | RGB | Uso Principal |
|--------|-----|----------|-----|---------------|
| **Amber** | `#f59e0b` | `amber-500` | rgb(245, 158, 11) | Botones secundarios, "Actualizar", horario seleccionado |
| **Orange** | `#ea580c` | `orange-600` | rgb(234, 88, 12) | Contador de tiempo, urgencia |

### Colores de Estado (Componentes)
| Nombre | Hex | Tailwind | RGB | Uso Principal |
|--------|-----|----------|-----|---------------|
| **Success Green** | `#22c55e` | `green-500` | rgb(34, 197, 94) | Asientos disponibles, badges "Disponible" |
| **Success Green Light** | `#dcfce7` | `green-100` | rgb(220, 252, 231) | Fondos de badges success |
| **Success Green Text** | `#15803d` | `green-700` | rgb(21, 128, 61) | Texto de badges success |
| **Error Red** | `#ef4444` | `red-500` | rgb(239, 68, 68) | Asientos ocupados, errores |
| **Warning Yellow** | `#fef3c7` | `yellow-100` | rgb(254, 243, 199) | Fondos "Pocas entradas" |
| **Warning Yellow Text** | `#a16207` | `yellow-700` | rgb(161, 98, 7) | Texto de advertencias |
| **Info Blue** | `#dbeafe` | `blue-100` | rgb(219, 234, 254) | Badges "Premium" |
| **Info Blue Text** | `#1d4ed8` | `blue-700` | rgb(29, 78, 216) | Texto de badges info |

### Colores de Badges de Género (Películas)
| Género | Hex | Tailwind | RGB |
|--------|-----|----------|-----|
| **Acción** | `#ef4444` | `red-500` | rgb(239, 68, 68) |
| **Terror** | `#a855f7` | `purple-500` | rgb(168, 85, 247) |
| **Romance** | `#ec4899` | `pink-500` | rgb(236, 72, 153) |
| **Drama** | `#374151` | `gray-700` | rgb(55, 65, 81) |
| **Comedia** | `#f472b6` | `pink-400` | rgb(244, 114, 182) |

### Colores Neutrales (UI Base)
| Nombre | Hex | Tailwind | RGB | Uso Principal |
|--------|-----|----------|-----|---------------|
| **White** | `#ffffff` | `white` | rgb(255, 255, 255) | Fondos de cards, modales, contenedores |
| **Gray 50** | `#f9fafb` | `gray-50` | rgb(249, 250, 251) | Fondos de páginas, estados hover |
| **Gray 100** | `#f3f4f6` | `gray-100` | rgb(243, 244, 246) | Badges neutros, elementos deshabilitados |
| **Gray 200** | `#e5e7eb` | `gray-200` | rgb(229, 231, 235) | Bordes, divisores, estados disabled |
| **Gray 400** | `#9ca3af` | `gray-400` | rgb(156, 163, 175) | Texto placeholder, estados agotados |
| **Gray 500** | `#6b7280` | `gray-500` | rgb(107, 114, 128) | Texto secundario, labels |
| **Gray 600** | `#4b5563` | `gray-600` | rgb(75, 85, 99) | Texto metadata (duración, fecha) |
| **Gray 700** | `#374151` | `gray-700` | rgb(55, 65, 81) | Texto de inputs, horarios no seleccionados |
| **Gray 900** | `#111827` | `gray-900` | rgb(17, 24, 39) | Títulos, texto principal, headings |

### Colores Especiales (Bordes)
| Nombre | Hex | Uso |
|--------|-----|-----|
| **Border Main** | `#ced4da` | Borde del frame principal (2px solid) |

---

## 🖋️ 2. TIPOGRAFÍA

### Familias Tipográficas

#### **Roboto** (Sistema Principal - UI General)
- **Uso:** Headers, metadatos de películas, navegación, botones principales
- **Variantes disponibles:**
  - Regular (400) - Texto regular, metadatos
  - Medium (500) - Labels, subtítulos
  - SemiBold (600) - Botones, destacados
  - Bold (700) - Títulos de películas, headings

#### **Outfit** (Formularios y Pagos)
- **Uso:** Vista de compra, formularios, labels de pago
- **Variantes disponibles:**
  - Regular (400) - Texto de formularios, labels

#### **Poppins** (Selección de Asientos)
- **Uso:** Vista de asientos, contadores, estados
- **Variantes disponibles:**
  - Regular (400) - Texto general de asientos
  - Medium (500) - Labels de filas, estados
  - SemiBold (600) - Totales, confirmaciones
  - Bold (700) - Precios destacados

### Escala Tipográfica (Mobile-First)

| Elemento | Font | Peso | Tamaño | Line-Height | Uso |
|----------|------|------|--------|-------------|-----|
| **H1 Hero** | Roboto | 700 | 30px | 36px (1.2) | "Cartelera" (Hero principal) |
| **H2 Page Title** | Poppins | 600 | 20px | 28px (1.4) | "Selecciona tus asientos" |
| **H3 Section** | Outfit | 400 | 18px | 28px (1.55) | "Detalles de la reserva", "Resumen del pago" |
| **Body Large** | Roboto | 400 | 18px | 28px (1.55) | Subtítulos de hero, descripciones largas |
| **Body Regular** | Roboto | 400 | 16px | 24px (1.5) | Texto de botones principales, labels grandes |
| **Body Small** | Roboto | 400 | 14px | 20px (1.43) | Metadatos (duración, género), texto secundario |
| **Caption** | Roboto | 400 | 12px | 16px (1.33) | Badges de género, etiquetas pequeñas |
| **Price Large** | Poppins | 700 | 24px | 32px (1.33) | Total a pagar destacado |
| **Price Small** | Roboto | 600 | 18px | 28px (1.55) | Precios secundarios |

### Font Variation Settings
**Importante:** Roboto usa `font-variation-settings: 'wdth' 100` en todos los estilos.

---

## 📏 3. SPACING SYSTEM

### Sistema Base: 8px
**Escala recomendada para todo el proyecto:**

| Nombre | Valor | Uso |
|--------|-------|-----|
| `spacing-xs` | 4px | Padding interno de badges, separación mínima |
| `spacing-sm` | 8px | Padding de botones pequeños, gap entre iconos y texto |
| `spacing-md` | 16px | Padding de cards, separación entre secciones |
| `spacing-lg` | 24px | Margin entre componentes principales, padding de contenedores |
| `spacing-xl` | 32px | Padding de secciones grandes, margin de hero |
| `spacing-2xl` | 48px | Separación entre bloques de página |

### Aplicaciones Específicas (Extraídas de Figma)

#### Cards de Películas
- **Padding interno:** 24px (izq/der), 24px (arriba/abajo info section)
- **Gap entre cards:** Variable según grid (aprox. 24px horizontal)

#### Botones
- **Padding horizontal:** 16px (small), 24px (medium), 32px (large)
- **Padding vertical:** 8px (small), 12px (medium), 16px (large)
- **Gap icono + texto:** 8px

#### Selección de Asientos
- **Gap entre asientos:** 8px (40px width asiento + gap)
- **Gap entre filas:** 16px

#### Formularios (Compra)
- **Gap entre campos:** 16px
- **Padding de inputs:** 12px vertical, 16px horizontal

---

## 🧩 4. COMPONENTES BASE

### 4.1. Buttons

#### **Variante: Primary (CTA Principal)**
```javascript
// Clase base
className="bg-blue-800 text-white rounded-[12px] h-[56px] px-[24px] font-['Outfit'] text-[16px] font-semibold"

// Estados
hover: brightness(110%)
active: brightness(90%)
disabled: bg-gray-200 text-gray-400 cursor-not-allowed

// Ejemplo: "Pagar y generar tiquete"
```

#### **Variante: Secondary (Acción Secundaria)**
```javascript
// Clase base
className="bg-amber-500 text-white rounded-[8px] h-[40px] px-[16px] font-['Roboto'] text-[16px] font-regular"

// Estados
hover: bg-amber-600
active: bg-amber-700
disabled: bg-gray-100 text-gray-300

// Ejemplo: "Actualizar"
```

#### **Variante: Outline (Botones de Horario)**
```javascript
// Clase base
className="bg-gray-50 border border-gray-200 rounded-[8px] h-[46px] px-[16px] text-gray-700 font-['Roboto'] text-[14px] font-medium"

// Estados
hover: border-gray-300 bg-white
selected: bg-amber-500 border-amber-500 text-white
disabled: bg-gray-200 text-gray-400

// Ejemplo: "3:00 PM", "5:30 PM"
```

#### **Variante: Ghost (Navegación)**
```javascript
// Clase base
className="bg-transparent text-gray-600 font-['Roboto'] text-[16px] font-regular h-[24px]"

// Estados
hover: text-gray-900
active: text-blue-800

// Ejemplo: "Volver al menú"
```

#### **Variante: Icon Button**
```javascript
// Clase base
className="bg-blue-800 rounded-[8px] size-[36px] flex items-center justify-center"

// Estados
hover: brightness(110%)

// Ejemplo: Icono de calendario en header
```

### 4.2. Inputs

#### **Variante: Text Input (Formularios)**
```javascript
// Clase base
className="border border-gray-200 rounded-[8px] h-[48px] px-[16px] text-gray-900 font-['Outfit'] text-[16px] bg-white"

// Estados
focus: border-blue-800 outline-none ring-2 ring-blue-100
error: border-red-500 bg-red-50
disabled: bg-gray-100 text-gray-400
```

### 4.3. Cards

#### **Variante: Movie Card**
```javascript
// Estructura
className="bg-white rounded-[12px] overflow-hidden w-[389.328px] h-[424px] border-0"

// Secciones:
// - Imagen: h-[256px] (poster película)
// - Info: h-[168px] padding-[24px]
// - Badge género: absolute top-[12px] left-[12px] rounded-full
```

#### **Variante: Info Card (Detalles Compra)**
```javascript
// Estructura
className="bg-white border border-gray-200 rounded-[12px] p-[24px]"
```

#### **Variante: Seat Grid Card**
```javascript
// Estructura
className="bg-white rounded-[16px] p-[32px]"
```

### 4.4. Badges

#### **Variante: Genre Badge**
```javascript
// Base
className="rounded-[9999px] h-[24px] px-[8px] font-['Roboto'] text-[12px] font-semibold text-white"

// Colores según género (ver sección 1)
// Ejemplo: ACCIÓN → bg-red-500
```

#### **Variante: Status Badge**
```javascript
// Disponible
className="bg-green-100 text-green-700 rounded-[9999px] h-[24px] px-[8px] font-['Roboto'] text-[12px] font-medium"

// Pocas entradas
className="bg-yellow-100 text-yellow-700 rounded-[9999px] h-[24px] px-[8px] font-['Roboto'] text-[12px] font-medium"

// Premium
className="bg-blue-100 text-blue-700 rounded-[9999px] h-[24px] px-[8px] font-['Roboto'] text-[12px] font-medium"
```

### 4.5. Date Selector

```javascript
// Botón de fecha
// Estado normal
className="bg-white border border-gray-200 rounded-[12px] size-[80px] flex flex-col items-center justify-center"

// Estado seleccionado
className="bg-white border-2 border-amber-500 rounded-[12px] size-[80px]"
// Texto cambia a amber-500

// Estructura interna:
// - Label día: text-[12px] text-gray-500 (o amber-500 si selected)
// - Número: text-[14px] font-semibold text-gray-700 (o amber-500)
// - Mes: text-[12px] text-gray-700 (o amber-500)
```

### 4.6. Seat Button

```javascript
// Disponible
className="bg-green-500 rounded-[4px] size-[32px]"

// Ocupado
className="bg-red-500 rounded-[4px] size-[32px]"

// Seleccionado
className="bg-blue-500 rounded-[4px] size-[32px]"

// Gap entre asientos: 8px (40px ancho total por asiento con gap)
// Gap entre filas: 16px
```

### 4.7. Hero Section

```javascript
// Gradiente Hero
className="bg-gradient-to-r from-[#1e40af] to-[#2563eb] rounded-[16px] p-[32px] h-[172px]"

// Título
className="text-white text-[30px] font-bold font-['Roboto']"

// Subtítulo
className="text-blue-100 text-[18px] font-['Roboto']"

// Metadata (íconos + texto)
className="text-white text-[14px] flex items-center gap-[8px]"
```

---

## 🎭 5. ANIMACIONES Y TRANSICIONES

### Timing Functions
```javascript
// Transición rápida (hover)
transition: all 200ms ease-in-out

// Transición normal (clicks, focus)
transition: all 300ms ease-in-out

// Transición lenta (modales, overlays)
transition: all 500ms ease-in-out
```

### Casos de Uso Específicos

#### Botones
```javascript
// Hover
transition: background-color 200ms ease-in-out, transform 200ms ease-in-out
hover: transform scale(1.02)

// Active
active: transform scale(0.98)
```

#### Cards
```javascript
// Hover
transition: box-shadow 300ms ease-in-out, transform 300ms ease-in-out
hover: shadow-lg transform translateY(-4px)
```

#### Asientos
```javascript
// Click
transition: background-color 200ms ease-in-out, transform 100ms ease-in-out
active: transform scale(0.95)
```

#### Date Selector
```javascript
// Selección
transition: border-color 200ms ease-in-out, color 200ms ease-in-out
```

---

## 🔤 6. ICONOGRAFÍA

### Librería: **Basada en SVG embebidos (importados desde Figma)**
**Nota:** El proyecto usa iconos custom embebidos. Se recomienda usar **`lucide-react`** para consistencia.

### Tamaños Estándar
- **Small:** 14px (icons en texto)
- **Medium:** 16px (icons en botones)
- **Large:** 20px (icons destacados)
- **Extra Large:** 24px (icons de header)

### Iconos Identificados en Diseño
| Icono | Uso | Tamaño Típico |
|-------|-----|---------------|
| Calendar | Fecha de función | 14px |
| Clock | Hora de función | 16px |
| MapPin | Ubicación de cine | 12px |
| Film | Tipo de sala | 16px |
| Ticket | Asientos seleccionados | 20px |
| ChevronLeft | Volver atrás | 14px |
| ChevronRight | Avanzar | 14px |
| CreditCard | Método de pago | 27px |
| Check | Confirmación | 16px |

---

## 📱 7. RESPONSIVE BREAKPOINTS

**Sistema Mobile-First (según diseños Figma @ 1280px desktop)**

```javascript
// Tailwind config
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet portrait
  'lg': '1024px',  // Tablet landscape / Desktop small
  'xl': '1280px',  // Desktop (diseño Figma base)
  '2xl': '1536px', // Desktop large
}
```

### Adaptaciones Recomendadas
- **Mobile (< 640px):** Cards apiladas (1 columna), Hero reduce padding a 16px
- **Tablet (640px - 1024px):** Cards en 2 columnas
- **Desktop (≥1024px):** Cards en 3 columnas (como Figma)

---

## 🎯 8. GUÍAS DE COHERENCIA

### Reglas Críticas (NO NEGOCIABLES)

1. **✅ Colores siempre desde tokens:** NUNCA hardcodear valores hex directamente en componentes. Usar variables Tailwind extendidas.

2. **✅ Spacing múltiplo de 8px:** Todos los margins, paddings, gaps deben ser 4px, 8px, 16px, 24px, 32px, etc.

3. **✅ Componentes con props `variant`, `size`, `state`:** No crear `ButtonPrimary.jsx`, `ButtonSecondary.jsx`. Crear UN solo `Button.jsx` con props.

4. **✅ Tipografías consistentes:** 
   - Roboto → UI general, cards de películas
   - Outfit → Formularios, compra
   - Poppins → Asientos, contadores

5. **✅ Border radius consistente:**
   - Cards grandes: `12px` o `16px`
   - Botones: `8px` (secundarios) o `12px` (primarios)
   - Badges: `9999px` (rounded-full)
   - Asientos: `4px`

6. **✅ Animaciones predecibles:** Siempre usar timing definido (200ms, 300ms, 500ms). No inventar duraciones aleatorias.

7. **✅ Accesibilidad base:**
   - Contraste mínimo 4.5:1 (texto/fondo)
   - Botones mínimo 44x44px (touch target)
   - Focus states visibles (ring-2 ring-blue-100)

### Checklist por Vista Nueva

**Antes de marcar una vista como completa:**

- [ ] ¿Colores vienen del design system?
- [ ] ¿Tipografías coinciden con la escala definida?
- [ ] ¿Spacing usa múltiplos de 8px?
- [ ] ¿Componentes reutilizan átomos/moléculas existentes?
- [ ] ¿Animaciones respetan timing estándar?
- [ ] ¿Estados (hover, focus, disabled) implementados?
- [ ] ¿Loading states funcionan?
- [ ] ¿Error handling visible?
- [ ] ¿Success feedback existe?
- [ ] ¿Tests de accesibilidad pasan?

---

## 📦 9. CONFIGURACIÓN TAILWIND

### Archivo `tailwind.config.js` recomendado

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primarios
        primary: {
          DEFAULT: '#1e40af', // blue-800
          light: '#2563eb',   // blue-600
          lighter: '#3b82f6', // blue-500
        },
        // Secundarios
        accent: {
          DEFAULT: '#f59e0b', // amber-500
          orange: '#ea580c',  // orange-600
        },
        // Estados
        success: {
          DEFAULT: '#22c55e', // green-500
          light: '#dcfce7',   // green-100
          dark: '#15803d',    // green-700
        },
        error: {
          DEFAULT: '#ef4444', // red-500
        },
        warning: {
          light: '#fef3c7',   // yellow-100
          dark: '#a16207',    // yellow-700
        },
        // Géneros
        genre: {
          action: '#ef4444',   // red-500
          horror: '#a855f7',   // purple-500
          romance: '#ec4899',  // pink-500
          drama: '#374151',    // gray-700
          comedy: '#f472b6',   // pink-400
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}
```

---

## 🚀 10. PRÓXIMOS PASOS (Fases 1-7)

### ✅ COMPLETADO
- [x] **FASE 0:** Análisis y extracción de Design System (MÓDULO CLIENTE)

### 🔄 PENDIENTE

#### **FASE 1: Setup Inicial**
- [ ] Inicializar proyecto Vite + React 18
- [ ] Instalar dependencias (React Router, Zustand, Axios, Framer Motion, Vitest)
- [ ] Configurar TailwindCSS con `tailwind.config.js` extendido
- [ ] Crear estructura de carpetas `/components/atoms`, `/molecules`, `/organisms`, `/pages`, `/hooks`, `/services`, `/utils`, `/design`
- [ ] Crear archivo `/design/tokens.js` con constantes exportables

#### **FASE 2: Componentes Base (Átomos)**
- [ ] `Button.jsx` (4 variantes: primary, secondary, outline, ghost)
- [ ] `Input.jsx` (text, email, password con estados)
- [ ] `Badge.jsx` (genre, status con colores dinámicos)
- [ ] `Card.jsx` (base reutilizable)
- [ ] Testing unitario de cada átomo

#### **FASE 3: Moléculas**
- [ ] `MovieCard.jsx` (reutiliza Badge + Button)
- [ ] `DateSelector.jsx` (selector horizontal scrollable)
- [ ] `TimeSlot.jsx` (botón de horario con estados)
- [ ] `SeatButton.jsx` (asiento interactivo)
- [ ] `PaymentMethodCard.jsx`
- [ ] Testing de interacciones

#### **FASE 4: Organismos**
- [ ] `HeroSection.jsx` (gradiente + metadata)
- [ ] `MovieGrid.jsx` (grid responsive de cards)
- [ ] `SeatMap.jsx` (grid 2D de asientos)
- [ ] `BookingSummary.jsx` (panel resumen)
- [ ] `Header.jsx` (navegación consistente)
- [ ] `Footer.jsx`

#### **FASE 5: Páginas (Módulo Cliente)**
- [ ] `/pages/Cartelera.jsx` (Dashboard)
- [ ] `/pages/Horarios.jsx` (Selección de función)
- [ ] `/pages/Asientos.jsx` (Selector de asientos)
- [ ] `/pages/Compra.jsx` (Checkout)
- [ ] `/pages/Confirmacion.jsx` (Ticket generado)
- [ ] Configurar React Router

#### **FASE 6: Integración API**
- [ ] `/services/api.js` (Axios config con interceptors)
- [ ] `/services/movies.service.js`
- [ ] `/services/bookings.service.js`
- [ ] `/hooks/useFetch.js` (custom hook con loading/error states)
- [ ] Zustand stores (`authStore`, `cartStore`)

#### **FASE 7: Testing y Deploy**
- [ ] Tests E2E con Cypress/Playwright
- [ ] Tests de accesibilidad (axe-core)
- [ ] Optimización (code splitting, lazy loading)
- [ ] Build y deploy (Vercel/Netlify)

---

## 📝 NOTAS FINALES

### Diferencias Detectadas entre Vistas
- **Cartelera** usa Roboto exclusivamente
- **Horarios** usa Roboto + Outfit (mixto)
- **Asientos** usa Poppins exclusivamente
- **Compra** usa Outfit exclusivamente

**Recomendación:** Estandarizar a **Roboto como base** y usar Poppins solo para elementos numéricos destacados (precios, contadores). Outfit puede ser eliminado o usado solo en formularios.

### Inconsistencias Corregidas
- Border radius de cards: UNIFICADO a `12px` (algunos tenían `16px`)
- Altura de botones principales: UNIFICADO a `56px`
- Padding de secciones: UNIFICADO a `24px` mínimo

### Recursos Externos Necesarios
- Fuentes: Roboto, Outfit, Poppins (Google Fonts)
- Iconos: lucide-react (npm)
- Imágenes de posters: URLs desde API backend

---

**Documento generado:** Enero 2025  
**Mantenido por:** Agente de Desarrollo Frontend  
**Última actualización:** Extracción completa del Módulo Cliente (4 vistas principales)

✅ **Este documento es LA VERDAD ÚNICA para todo el desarrollo del proyecto.**
