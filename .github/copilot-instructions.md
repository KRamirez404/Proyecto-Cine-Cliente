# Cinema Client Project - AI Agent Instructions

## Project Overview
Frontend application for a cinema ticket booking system with admin and customer interfaces.

**Current Status:** ✅ **FASE 1 COMPLETADA** - Proyecto Inicializado y Configurado  
**Ready for:** FASE 2 - Construcción de Componentes Base (Atoms)

### FASE 0 Summary (Completed)
- ✓ Design System extracted from Figma (4 customer views)
- ✓ Color palette documented (35+ colors)
- ✓ Typography system defined (Roboto, Poppins, Outfit)
- ✓ Spacing system established (8px base)
- ✓ Component library identified (7 base components)
- ✓ Design tokens created (`design/tokens.js`)
- ✓ Tailwind config extended (`tailwind.config.js`)
- ✓ Coherence audit completed (85% consistency achieved)

## Architecture Vision

### Tech Stack
- **Framework**: React 18+ with JavaScript (not TypeScript)
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: Zustand for global state
- **Styling**: TailwindCSS with custom design system
- **HTTP Client**: Axios with interceptors
- **Animations**: Framer Motion for consistent transitions
- **Testing**: Vitest + React Testing Library

### Module Structure
The application has 3 main modules:

1. **Authentication Module** - Login and registration flows
2. **Customer Module** - Movie browsing, seat selection, checkout, chatbot
3. **Admin Module** - Dashboard, movie management, cashier management, VIP customers, access logs

### Folder Architecture
```
/components/
  /atoms/        # Reusable primitives (Button, Input, Badge)
  /molecules/    # Composed components (Card, Form, Modal)
  /organisms/    # Complex components (Header, Sidebar, Grid)
  /templates/    # Full page layouts
/pages/          # Route-level components
/hooks/          # Custom React hooks (useAuth, useFetch)
/services/       # API calls and business logic
/contexts/       # React Context providers
/utils/          # Helper functions, constants
/design/         # Design system tokens (tokens.js)
```

## Design System Approach

### Critical Workflow
**BEFORE writing any UI code:**
1. Extract design system from Figma (colors, typography, spacing, components)
2. Create centralized design tokens in `/design/tokens.js`
3. Configure `tailwind.config.js` with custom theme
4. Build atomic components following extracted patterns
5. Apply consistent variants via props, not duplicate components

### Consistency Rules
- **All colors** come from design tokens - no hardcoded hex values
- **Spacing** uses 8px base scale (xs=4px, sm=8px, md=16px, lg=24px, xl=32px)
- **Components** use `variant`, `size`, `state` props for modifications
- **Animations** follow standard timing: fast=200ms, normal=300ms, slow=500ms
- **Icons** from `lucide-react` only

### Component Pattern
```jsx
// Good: Single component with variants
<Button variant="primary" size="md" state="loading">Submit</Button>

// Bad: Multiple component files for each style
<PrimaryButton />, <SecondaryButton />, <TertiaryButton />
```

## API Integration

### Backend Communication
- **Authentication**: JWT tokens stored securely
- **Axios Setup**: Interceptors for auth headers and error handling
- **Error States**: Visual feedback for all error scenarios
- **Loading States**: Skeleton loaders and spinners per design system

### Expected Patterns
```javascript
// services/api.js - centralized configuration
// services/auth.service.js - authentication logic
// services/movies.service.js - movie CRUD operations
// hooks/useAuth.js - auth state and methods
// hooks/useFetch.js - generic data fetching with states
```

## Development Workflow

### Phase Sequence
1. **Setup**: Vite project + dependencies + folder structure
2. **Design System**: Extract from Figma, create tokens, configure Tailwind
3. **Atomic Components**: Button, Input, Select, Badge, etc.
4. **Molecules**: Cards, Forms, Modals with composed atoms
5. **Pages**: Build views reusing components, maintain consistency
6. **API Integration**: Connect services, add authentication
7. **Testing**: Unit tests per component, integration tests
8. **Optimization**: Code splitting, lazy loading, performance

### View Completeness Checklist
A view is complete when:
- ✓ Visual design matches Figma reference
- ✓ Components use design system tokens
- ✓ All interactive states are implemented (hover, focus, active, disabled)
- ✓ Loading states show appropriate feedback
- ✓ Error handling is visible to users
- ✓ Success feedback implemented (toasts, confirmations)
- ✓ Animations follow timing guidelines
- ✓ Tests pass (unit + interaction)
- ✓ Accessibility validated (ARIA labels, keyboard navigation, contrast)

## Testing Strategy
- **Unit Tests**: Every component in `/components/atoms/` and `/components/molecules/`
- **Integration Tests**: User flows (login → browse → select seats → checkout)
- **Visual Regression**: Compare against Figma screenshots
- **Accessibility**: Check WCAG compliance with automated tools

## Key Patterns to Follow

### State Management
```javascript
// Zustand stores in /stores/
// Example: stores/authStore.js, stores/cartStore.js
// Keep stores focused and modular
```

### Component Composition
```javascript
// Prefer composition over large monolithic components
// Example: MovieCard uses atoms (Badge, Button) + molecules (ImageContainer)
```

### Error Boundaries
```javascript
// Wrap route components with error boundaries
// Show user-friendly fallback UI
```

### Mobile-First Responsive
```javascript
// TailwindCSS mobile-first classes
// Example: <div className="flex flex-col md:flex-row">
```

## Project-Specific Conventions

### Naming
- **Components**: PascalCase (`MovieCard.jsx`)
- **Utilities**: camelCase (`formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.js`)
- **CSS Classes**: Tailwind utility classes, no custom CSS files

### File Organization
- One component per file
- Colocate tests: `Button.jsx` + `Button.test.jsx`
- Index files for cleaner imports: `/atoms/index.js` exports all atoms

### API Calls
- Always handle errors with user-facing messages
- Use loading states during async operations
- Validate API responses before using data

## Critical Notes

### Design Coherence Priority
This project emphasizes visual consistency. Every new component or view must:
1. Reuse existing atoms/molecules when possible
2. Follow the design system tokens strictly
3. Document any necessary deviations with justification

### No TypeScript
This is a JavaScript project. Do not add TypeScript files or type annotations.

### Authentication Flow
All protected routes check JWT token validity. Expired tokens redirect to login with return URL preservation.

### Seat Selection Logic
The seat selector is a complex 2D grid with real-time availability. Pay special attention to state synchronization and optimistic UI updates.

## Questions to Ask When Unclear

- **Design ambiguity**: "Which Figma frame should I reference for this component?"
- **State management**: "Should this state be local, context, or Zustand?"
- **API contract**: "What's the expected request/response format for this endpoint?"
- **Responsiveness**: "What breakpoints should this component adapt at?"

## Deployment Target
- **Platform**: Vercel or Netlify
- **Environment Variables**: `.env.example` template in root
- **Build Command**: `npm run build`
- **Preview Deployments**: Auto-deploy from PRs

---

**Version**: 1.1 - Post FASE 0  
**Last Updated**: Enero 2025  
**Status**: ✅ **Design System Ready** - Proceeding to FASE 1 (Setup Inicial)

## Key Files Created

- `DESIGN_SYSTEM.md` - Complete design system documentation (727 lines)
- `AUDITORIA_COHERENCIA.md` - Visual coherence audit (467 lines)
- `FASE0_COMPLETADA.md` - Executive summary of Phase 0
- `design/tokens.js` - Design tokens (colors, typography, spacing, etc.)
- `tailwind.config.js` - Extended Tailwind configuration
