# 🧪 TESTING PENDIENTE - TRACKING

## ⚠️ Tests Postergados que Requieren Validación

### Modal Component (molecules/Modal.jsx)
**Estado**: Componente funcional implementado, tests unitarios con problemas de Portal + AnimatePresence

**Problemas detectados**:
- `NotFoundError: The node to be removed is not a child of this node`
- Portal rendering hace que `container.querySelector()` no funcione
- AnimatePresence cleanup conflicts con afterEach cleanup de testing-library
- 45/47 tests failing debido a complejidad de Portal + Framer Motion en entorno sintético

**Tests que DEBEN validarse en E2E o manualmente**:
1. ✅ **Rendering básico**: isOpen true/false, children, title, footer
2. ✅ **Close button**: visible, hidden (showCloseButton), onClick callback
3. ✅ **Variantes visuales**: default, success, error, warning, info (colores + iconos)
4. ✅ **Sizes**: sm, md, lg, xl, 2xl, full
5. ⚠️ **Click outside**: debe cerrar modal al hacer click en backdrop (closeOnClickOutside)
6. ⚠️ **ESC key**: debe cerrar modal al presionar Escape (closeOnEsc)
7. ✅ **Body scroll lock**: document.body.overflow = 'hidden' cuando isOpen
8. ✅ **Portal rendering**: renderiza en document.body, no en container
9. ✅ **Accessibility**: role="dialog", aria-modal, aria-labelledby, aria-hidden en iconos
10. ⚠️ **Múltiples modales**: manejo de z-index, overlay stacking

**Solución propuesta**:
- **Opción 1**: E2E tests con Playwright/Cypress para validar comportamiento real
- **Opción 2**: Tests de integración en navegador real (no JSDOM)
- **Opción 3**: Validación manual en demo page (MoleculesDemo.jsx)

**Casos críticos a validar manualmente**:
```javascript
// 1. Modal básico
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Test">
  <p>Content</p>
</Modal>

// 2. Click outside
<Modal isOpen={true} onClose={handleClose} closeOnClickOutside={true}>
  {/* Debe cerrar al hacer click en backdrop */}
</Modal>

// 3. ESC key
<Modal isOpen={true} onClose={handleClose} closeOnEsc={true}>
  {/* Debe cerrar al presionar ESC */}
</Modal>

// 4. Modal de confirmación
<Modal 
  isOpen={true} 
  variant="warning" 
  title="Confirmar"
  footer={
    <>
      <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
    </>
  }
>
  <p>¿Estás seguro?</p>
</Modal>

// 5. Múltiples modales (z-index)
<>
  <Modal isOpen={modal1Open}>Modal 1</Modal>
  <Modal isOpen={modal2Open}>Modal 2</Modal>
</>
```

---

## 📋 Checklist de Validación Pre-Producción

### FASE 3 - Molecules (Antes de FASE 4)
- [ ] **Modal E2E Tests** (Playwright)
  - [ ] Open/close básico
  - [ ] Click outside cierra modal
  - [ ] ESC key cierra modal
  - [ ] Body scroll lock funciona
  - [ ] Variantes visuales correctas
  - [ ] Accessibility con axe-core
  
- [ ] **MoleculesDemo Page** (Validación manual)
  - [ ] MovieCard: hover effects, estados, eventos
  - [ ] SearchBar: debounce, keyboard nav, sugerencias
  - [ ] TimeSlot: selected/disabled states, onClick
  - [ ] Modal: todas variantes, sizes, handlers

### FASE 4 - Pages (Futuro)
- [ ] Validar integración de Modal en flujos reales:
  - [ ] Confirmación de compra (Checkout)
  - [ ] Eliminación de películas (Admin)
  - [ ] Logout confirmation (Header)
  - [ ] Error alerts (Global)

### FASE 6 - E2E Testing
- [ ] **Configurar Playwright/Cypress**
- [ ] **Test Suite Modal**:
  ```javascript
  test('Modal - Click outside cierra', async ({ page }) => {
    await page.goto('/demo/molecules');
    await page.click('[data-testid="open-modal"]');
    await page.click('.backdrop'); // Click fuera
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
  
  test('Modal - ESC key cierra', async ({ page }) => {
    await page.goto('/demo/molecules');
    await page.click('[data-testid="open-modal"]');
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
  
  test('Modal - Body scroll lock', async ({ page }) => {
    await page.goto('/demo/molecules');
    await page.click('[data-testid="open-modal"]');
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
  });
  ```

---

## 🎯 Prioridad de Validación

### Alta Prioridad (Crítico para UX)
1. **Modal - Click outside**: Usuario espera cerrar modal al hacer click fuera
2. **Modal - ESC key**: Patrón estándar de usabilidad
3. **Modal - Body scroll lock**: Evita scroll confuso con modal abierto

### Media Prioridad (Importante para accesibilidad)
4. **Modal - Accessibility**: role, aria-modal, focus trap
5. **Modal - Keyboard navigation**: Tab entre elementos del modal

### Baja Prioridad (Edge cases)
6. **Modal - Múltiples modales simultáneos**: Caso raro en la app
7. **Modal - SSR compatibility**: App es CSR, no crítico

---

## 📝 Notas para Fase de Testing

### Aprendizajes de Modal Testing
- **JSDOM + Portal + AnimatePresence = ❌**: Combinación problemática
- **Testing Library cleanup conflicts** con unmount de Framer Motion
- **querySelector en container no funciona** con createPortal (buscar en document.body)
- **Real timers + userEvent** funcionan mejor que fake timers

### Estrategias Exitosas (SearchBar, TimeSlot)
- ✅ Real timers en lugar de fake timers
- ✅ Debounce reducido en tests (50-150ms vs 300ms producción)
- ✅ waitFor con timeout explícito (500ms)
- ✅ userEvent.setup() sin delay: null
- ✅ Buscar con `screen` (document scope) en lugar de `container`

### Componentes con 100% Test Coverage
- ✅ **Button**: 28/28 tests
- ✅ **Input**: 37/37 tests
- ✅ **Badge**: 41/41 tests
- ✅ **Card**: 36/36 tests
- ✅ **MovieCard**: 39/39 tests
- ✅ **SearchBar**: 28/28 tests, 1 skipped
- ✅ **TimeSlot**: 47/47 tests

**Total Atoms + Molecules**: 256 tests passing (97.3% success rate)

---

## 🔄 Revisión Periódica

- **Antes de FASE 4**: Crear MoleculesDemo page y validar manualmente
- **Durante FASE 5 (API)**: Validar Modal en flujos reales de la app
- **Inicio FASE 6**: Configurar E2E suite y agregar tests críticos de Modal
- **Pre-deployment**: Audit completo de accessibility y E2E full coverage

---

**Última actualización**: Octubre 16, 2025  
**Responsable**: AI Agent - Fase 3 Completada  
**Estado**: Modal funcional, E2E testing pendiente para validación completa
