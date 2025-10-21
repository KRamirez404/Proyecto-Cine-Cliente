# 🎬 Sistema de Cine - Frontend Cliente# React + Vite



[![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)](https://react.dev)This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

[![Vite](https://img.shields.io/badge/Vite-7.1.10-646cff?logo=vite)](https://vitejs.dev)

[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-38bdf8?logo=tailwindcss)](https://tailwindcss.com)Currently, two official plugins are available:



Aplicación frontend para sistema de reserva de entradas de cine con interfaces de cliente y administrador.- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 📋 Estado del Proyecto

## React Compiler

**Progreso**: FASE 1 Completada ✅  

**Próxima**: FASE 2 - Construcción de Componentes BaseThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).



### Fases Completadas## Expanding the ESLint configuration



- ✅ **FASE 0**: Design System extraído del MÓDULO CLIENTE (Figma)If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- ✅ **FASE 1**: Setup Inicial del Proyecto (Vite + React + TailwindCSS)

### Próximas Fases

- 🔜 **FASE 2**: Componentes Base (Atoms)
- 🔜 **FASE 3**: Componentes Complejos (Molecules + Organisms)
- 🔜 **FASE 4**: Páginas (Cartelera, Horarios, Asientos, Compra)
- 🔜 **FASE 5**: Integración API Backend
- 🔜 **FASE 6**: Testing Integral
- 🔜 **FASE 7**: Deployment

## 🚀 Tecnologías

### Core
- **React 19.1.1** - Framework principal
- **Vite 7.1.10** - Build tool
- **JavaScript** - Lenguaje (NO TypeScript)

### Routing & State
- **React Router DOM 6.28.0** - Navegación
- **Zustand 5.0.2** - Estado global

### HTTP & Data
- **Axios 1.7.9** - Cliente HTTP
- **Backend API**: Node.js + Express + MySQL

### Styling
- **TailwindCSS 3.4.15** - Framework CSS
- **@tailwindcss/postcss** - PostCSS plugin
- **Design Tokens** - Sistema de diseño centralizado
- **Google Fonts** - Roboto, Poppins, Outfit

### Animations
- **Framer Motion 11.12.0** - Animaciones consistentes (200ms/300ms/500ms)

### Icons
- **Lucide React 0.468.0** - Biblioteca de iconos

### Testing
- **Vitest 2.1.6** - Test runner
- **React Testing Library 16.0.1** - Component testing
- **jsdom 25.0.1** - DOM simulation

## 📦 Instalación

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/JUNIORRDSR/Proyecto-Cine-Cliente.git
cd Proyecto-Cine-Cliente

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## 🎨 Design System

### Paleta de Colores

- **Primary**: `#1e40af` (blue-800) - Botones principales, highlights
- **Accent**: `#f59e0b` (amber-500) - Selecciones, CTAs
- **Success**: `#22c55e` (green-500) - Confirmaciones
- **Error**: `#ef4444` (red-500) - Errores, validaciones
- **Neutral**: 9 tonos (50-900) - Fondos, textos

### Tipografía

- **Roboto**: UI principal (400, 500, 600, 700)
- **Poppins**: Números destacados
- **Outfit**: Formularios

### Spacing System

Base 8px: `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px)

### Componentes Base Diseñados

1. **Button** - 4 variantes (primary, secondary, outline, ghost)
2. **Input** - Estados completos
3. **Badge** - 7 colores de género + estados
4. **Card** - 3 tipos (movie, booking, payment)
5. **DateSelector** - Scroll horizontal
6. **SeatButton** - Grid interactivo
7. **HeroSection** - Gradiente inmersivo

Ver documentación completa en [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/          # Componentes básicos (Button, Input, Badge)
│   ├── molecules/      # Componentes compuestos (MovieCard, DateSelector)
│   ├── organisms/      # Componentes complejos (Header, MovieGrid, SeatMap)
│   └── templates/      # Layouts de página completos
├── pages/              # Vistas por ruta
│   ├── Cartelera/
│   ├── Horarios/
│   ├── Asientos/
│   ├── Compra/
│   └── Admin/
├── hooks/              # Custom hooks (useAuth, useFetch)
├── services/           # API calls
│   ├── api.js
│   ├── auth.service.js
│   ├── movies.service.js
│   └── reservas.service.js
├── contexts/           # React Context providers
├── utils/              # Helpers y constantes
├── design/             # Design System tokens
│   └── tokens.js
└── test/               # Testing setup
```

## 🔌 Integración con Backend

### API Backend

- **Repositorio**: [Proyecto-Cine-Backend](https://github.com/JUNIORRDSR/Proyecto-Cine-Backend)
- **Base URL**: `http://localhost:3000`
- **Autenticación**: JWT Bearer Token
- **Estado**: ✅ Production Ready (90% completado)

### Endpoints Principales

- `POST /api/auth/login` - Login de usuarios
- `GET /api/peliculas` - Listar películas
- `GET /api/funciones` - Obtener funciones/horarios
- `GET /api/asientos` - Consultar asientos
- `POST /api/reservas` - Crear reserva
- `POST /api/ventas` - Confirmar compra

Ver guía completa en [`API_INTEGRATION_GUIDE.md`](./API_INTEGRATION_GUIDE.md)

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor con hot reload (puerto 5173)

# Build
npm run build            # Build de producción

# Testing
npm test                 # Tests en modo watch
npm run test:ui          # Tests con interfaz UI
npm run test:coverage    # Reporte de cobertura

# Linting
npm run lint             # Ejecutar ESLint

# Preview
npm run preview          # Preview del build de producción
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Con interfaz UI
npm run test:ui

# Con cobertura
npm run test:coverage
```

### Estructura de Tests

```
src/
├── components/
│   └── atoms/
│       ├── Button.jsx
│       └── Button.test.jsx
```

## 🎯 Módulos del Sistema

### Cliente (Usuario Final)

1. **Cartelera** - Visualización de películas disponibles
2. **Horarios** - Selección de función y horario
3. **Asientos** - Selector interactivo de asientos
4. **Compra** - Proceso de pago y confirmación
5. **Chatbot** - Asistente virtual para recomendaciones

### Admin (Administrador)

1. **Dashboard** - KPIs y estadísticas
2. **Gestión de Películas** - CRUD de películas
3. **Gestión de Cajeros** - CRUD de usuarios cajero
4. **Clientes VIP** - Listado y gestión
5. **Log de Accesos** - Historial de actividades

## 🔐 Autenticación

### Login Universal

El sistema implementa un **login único** que funciona para todos los usuarios:

- 👥 **Clientes Normales** - Registro público, compras online
- ⭐ **Clientes VIP** - Beneficios especiales y descuentos
- 💰 **Cajeros** - Ventas en taquilla
- 👔 **Administradores** - Gestión completa del sistema

**Flujo**: Un solo formulario → Autenticación → Redirección automática según rol

Ver arquitectura completa en [`AUTH_ARCHITECTURE.md`](./AUTH_ARCHITECTURE.md)

### JWT Token

```javascript
// Login universal
const response = await axios.post('/api/auth/login', {
  usuario: 'admin',      // o cliente o cajero
  contrasena: 'admin123'
});

localStorage.setItem('token', response.data.token);

// Requests autenticados
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### Registro de Clientes (Público)

```javascript
// Cualquier persona puede registrarse como cliente
const response = await axios.post('/api/auth/register-cliente', {
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  telefono: '555-1234',
  usuario: 'juanperez',
  contrasena: 'password123'
});
// No requiere autenticación previa
```

### Redirección por Rol

| Rol | Ruta Inicial | Permisos |
|-----|--------------|----------|
| **CLIENTE** | `/cartelera` | Compras online, historial |
| **CLIENTE_VIP** | `/cartelera` | Todo de CLIENTE + descuentos |
| **CAJERO** | `/admin/cashier` | Ventas presenciales |
| **ADMIN** | `/admin/dashboard` | Gestión completa |

## 📚 Documentación

Toda la documentación técnica del proyecto se encuentra en la carpeta [`/docs`](./docs/):

### 📋 Documentación Principal
- **[docs/README.md](./docs/README.md)** - Índice completo de toda la documentación

### 🎯 Fases del Proyecto
- **[docs/FASE0_COMPLETADA.md](./docs/FASE0_COMPLETADA.md)** - Design System establecido
- **[docs/FASE1_COMPLETADA.md](./docs/FASE1_COMPLETADA.md)** - Setup inicial
- **[docs/FASE2_COMPLETADA.md](./docs/FASE2_COMPLETADA.md)** - Componentes atoms
- **[docs/FASE3_COMPLETADA.md](./docs/FASE3_COMPLETADA.md)** - Molecules y organisms
- **[docs/FASE4_COMPLETADA.md](./docs/FASE4_COMPLETADA.md)** - Páginas customer y auth

### 🎨 Design System
- **[docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md)** - Sistema de diseño completo (727 líneas)
- **[docs/AUDITORIA_COHERENCIA.md](./docs/AUDITORIA_COHERENCIA.md)** - Auditoría visual (467 líneas)
- **[docs/CHECKLIST_VISUAL_VERIFICACION.md](./docs/CHECKLIST_VISUAL_VERIFICACION.md)** - Checklist de coherencia

### 🔐 Autenticación
- **[docs/COMO_USAR_LOGIN.md](./docs/COMO_USAR_LOGIN.md)** - Guía completa del sistema de login
- **[docs/AUTH_PAGES_COMPLETADAS.md](./docs/AUTH_PAGES_COMPLETADAS.md)** - Páginas de autenticación
- **[docs/LOGIN_TEST_RESULTS.md](./docs/LOGIN_TEST_RESULTS.md)** - Resultados de pruebas de login

### 🔧 Correcciones y Fixes
- **[docs/TAILWIND_CSS_FIX.md](./docs/TAILWIND_CSS_FIX.md)** - Solución TailwindCSS
- **[docs/FIX_INPUT_ICON_PROPS.md](./docs/FIX_INPUT_ICON_PROPS.md)** - Fix de props de iconos
- **[docs/CORRECCIONES_VISUALES.md](./docs/CORRECCIONES_VISUALES.md)** - Ajustes visuales

### 🔌 Backend
- **[docs/BACKEND_REQUIREMENTS.md](./docs/BACKEND_REQUIREMENTS.md)** - Requerimientos del backend

## 🌐 Variables de Entorno

```env
# .env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
VITE_APP_NAME=Sistema de Cine
VITE_APP_VERSION=1.0.0
```

## 🚀 Deployment

### Build de Producción

```bash
npm run build
```

Los archivos compilados estarán en `/dist`

### Plataformas Recomendadas

- **Vercel** - Deploy automático desde GitHub
- **Netlify** - Integración continua
- **Railway** - Full-stack deployment

Ver guía en `docs/DEPLOYMENT.md` (próximamente)

## 🐛 Troubleshooting

### Error: "Cannot find module '@design'"

Verifica que el alias esté configurado en `vite.config.js`:

```javascript
resolve: {
  alias: {
    '@design': path.resolve(__dirname, './src/design')
  }
}
```

### Error: TailwindCSS no aplica estilos

Verifica que `postcss.config.js` use `@tailwindcss/postcss`:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de un trabajo académico.

## 👤 Autor

**JUNIORRDSR**

- GitHub: [@JUNIORRDSR](https://github.com/JUNIORRDSR)
- Backend: [Proyecto-Cine-Backend](https://github.com/JUNIORRDSR/Proyecto-Cine-Backend)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

**Estado**: ✅ FASE 1 Completada - Servidor corriendo en http://localhost:5173
