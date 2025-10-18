# ✅ CHECKLIST DE VERIFICACIÓN VISUAL

**URL:** http://localhost:5173/  
**Fecha:** Octubre 2025  
**Objetivo:** Verificar que todas las correcciones de estilos se apliquen correctamente

---

## 🎯 Navegación Inicial

### 1. Página de Inicio
- [ ] Al abrir http://localhost:5173/ ¿redirige automáticamente a `/login`?
- [ ] Si hay usuario en localStorage ¿redirige a `/cartelera`?

---

## 🔐 PÁGINAS DE AUTENTICACIÓN

### 2. Login (/login)

**URL:** http://localhost:5173/login

#### Layout General:
- [ ] **Background:** Gradiente de azul claro a violeta claro (primary-light → secondary-light)
- [ ] **Card:** Fondo blanco, centrado, sombra pronunciada
- [ ] **Responsive:** Card se adapta en mobile (full width con padding)

#### Elementos Visuales:
- [ ] **Logo/Título:** "Bienvenido a CineApp" visible con font grande
- [ ] **Subtítulo:** "Inicia sesión para continuar" en gris
- [ ] **Input Email:**
  - [ ] Icon de Mail (sobre) a la izquierda
  - [ ] Placeholder "Correo electrónico"
  - [ ] Border gris, al focus se pone azul (primary)
- [ ] **Input Password:**
  - [ ] Icon de Lock (candado) a la izquierda
  - [ ] Placeholder "Contraseña"
  - [ ] Botón Eye/EyeOff funciona (muestra/oculta password)
- [ ] **Checkbox "Recordarme":** Styled, no es el checkbox default del browser
- [ ] **Botón "Iniciar Sesión":**
  - [ ] Color azul primary (#1e40af)
  - [ ] Al hover: se oscurece (primary-dark)
  - [ ] Width completo (w-full)
  - [ ] Texto blanco centrado

#### Sección de Credenciales Demo:
- [ ] **Info Box:** Fondo azul claro (bg-info-light #dbeafe)
- [ ] **Icon Info:** Círculo con 'i' visible
- [ ] **Texto:** Lista de 3 credenciales demo visible
- [ ] **Formato:** Bullets o lista ordenada

#### Footer Links:
- [ ] **"¿No tienes cuenta? Regístrate":** Link visible, color primary
- [ ] **"¿Olvidaste tu contraseña?":** Link visible, color primary
- [ ] **"Términos" y "Privacidad":** Links pequeños en gris

#### Estados de Error (probar):
- [ ] Enviar form vacío → mensajes de error rojos debajo de inputs
- [ ] Email inválido → mensaje "Correo electrónico inválido"
- [ ] Error de login → Banner rojo arriba con mensaje de error

---

### 3. Register (/register)

**URL:** http://localhost:5173/register

#### Layout General:
- [ ] **Background:** Gradiente INVERSO (secondary-light → primary-light)
- [ ] **Card:** Blanco, centrado, sombra
- [ ] **Responsive:** Se adapta en mobile

#### Elementos Visuales:
- [ ] **Título:** "Crear Cuenta Nueva"
- [ ] **Subtítulo:** "Únete a CineApp"

#### Form Fields:
- [ ] **Input Nombre:**
  - [ ] Icon User a la izquierda
  - [ ] Placeholder "Nombre completo"
  - [ ] Border + focus states
- [ ] **Grid 2 Columnas** (desktop):
  - [ ] Email e input lado a lado
  - [ ] Teléfono a la derecha
- [ ] **Input Email:** Icon Mail
- [ ] **Input Teléfono:** Icon Phone
- [ ] **Input Password:** Icon Lock + Eye toggle
- [ ] **Input Confirmar Password:** Icon Lock + Eye toggle independiente

#### Password Strength Indicator (CRÍTICO):
- [ ] **Barra de progreso visible** debajo de input password
- [ ] **Al escribir contraseña débil:**
  - [ ] Barra ROJA (bg-error)
  - [ ] Label "Débil" en rojo
  - [ ] Progress < 40%
- [ ] **Al escribir contraseña media:**
  - [ ] Barra AMARILLA (bg-warning)
  - [ ] Label "Media" en amarillo
  - [ ] Progress 40-70%
- [ ] **Al escribir contraseña fuerte:**
  - [ ] Barra VERDE (bg-success)
  - [ ] Label "Fuerte" en verde
  - [ ] Progress > 70%
- [ ] **Helper text:** "Usa al menos 8 caracteres con mayúsculas, minúsculas y números"

#### Security Notice:
- [ ] **Box azul claro** (bg-info-light)
- [ ] **Icon Shield** (escudo)
- [ ] **Texto:** "Tu información está segura"
- [ ] **Subtexto:** Mención de encriptación/SSL

#### Checkbox + Botón:
- [ ] **Checkbox "Acepto términos":** Styled checkbox
- [ ] **Link "términos y condiciones":** Color primary
- [ ] **Botón "Crear Cuenta":**
  - [ ] Color primary
  - [ ] Hover: primary-dark
  - [ ] Width completo

#### Footer:
- [ ] **"¿Ya tienes cuenta? Inicia sesión":** Link a /login

---

## 🎬 PÁGINAS DE CLIENTE

### 4. Cartelera (/cartelera)

**URL:** http://localhost:5173/cartelera (requiere login)

**Login primero con:** customer@cine.com / password123

#### Header:
- [ ] **Header sticky:** Blanco con sombra
- [ ] **Logo "CineApp"** a la izquierda
- [ ] **Nav links:** Inicio, Cartelera, Mis Compras
- [ ] **User menu:** Avatar con nombre, dropdown (cerrar sesión)

#### Hero Section:
- [ ] **Título grande:** "Películas en Cartelera"
- [ ] **Subtítulo:** Texto descriptivo
- [ ] **Search bar:** Input con icon Search, placeholder "Buscar películas..."

#### Filters Bar:
- [ ] **Pills de género:** (Acción, Comedia, Drama, Ciencia Ficción, Terror, Animación)
  - [ ] Color gris neutral cuando no seleccionado
  - [ ] Color primary cuando seleccionado
  - [ ] Hover effect
- [ ] **Select ordenar:** Dropdown funcional

#### Movie Grid:
- [ ] **Grid responsive:**
  - [ ] Mobile: 1 columna
  - [ ] Tablet: 2 columnas
  - [ ] Desktop: 3-4 columnas
- [ ] **Movie Cards:**
  - [ ] Poster image (o placeholder gris con icon Film)
  - [ ] Título película visible
  - [ ] **Badge género:** Color correspondiente (ej: Acción → rojo, Comedia → amarillo)
  - [ ] **Rating:** Estrellas amarillas + número
  - [ ] Duración con icon Clock
  - [ ] Idioma con badge
  - [ ] **Botón "Ver Horarios":** Color primary, hover effect
  - [ ] **Card hover:** Sombra se eleva (shadow-lg → shadow-xl)

#### Stats Footer:
- [ ] **"Películas en cartelera:"** Badge con número
- [ ] **"Próximos estrenos:"** Badge con número
- [ ] Centrado y visible

#### Footer:
- [ ] Footer con links (Acerca, Términos, Privacidad, Contacto)
- [ ] Fondo neutral-50, texto neutral-600

---

### 5. Horarios (/horarios/:movieId)

**Navegar:** Click en "Ver Horarios" de cualquier película

#### Movie Header:
- [ ] **Poster + título** película visible
- [ ] **Rating** con estrellas
- [ ] **Badges:** Género, idioma, duración
- [ ] **Sinopsis** texto descriptivo
- [ ] Responsive: poster arriba en mobile, lado izquierdo en desktop

#### Date Filter:
- [ ] **Pills de fechas:** (Hoy, Mañana, Pasado Mañana, + días)
  - [ ] Fecha seleccionada: fondo primary, texto blanco
  - [ ] No seleccionada: fondo neutral-100
  - [ ] Hover effect

#### TimeSlot Grid:
- [ ] **Agrupación por secciones:** "Mañana", "Tarde", "Noche"
  - [ ] Headers con fondo neutral-100
- [ ] **TimeSlot Cards:**
  - [ ] Hora grande y visible
  - [ ] **Badge formato:** "2D", "3D", "IMAX", "4DX" con colores info
  - [ ] **Precio:** Verde (success color)
  - [ ] **Asientos disponibles:** Badge con número
  - [ ] Botón "Seleccionar"
  - [ ] Hover: borde primary

#### Sidebar (Desktop):
- [ ] **Sticky sidebar** a la derecha
- [ ] **Resumen selección:**
  - [ ] Película
  - [ ] Fecha
  - [ ] Horario
  - [ ] Precio
- [ ] **Botón "Continuar":** Primary, deshabilitado hasta seleccionar

#### Stats Footer:
- [ ] **"Funciones disponibles:"** Badge
- [ ] **"Salas activas:"** Badge

---

### 6. Asientos (/asientos/:showtimeId)

**Navegar:** Click en "Seleccionar" de un horario

#### Screen Visual:
- [ ] **"PANTALLA"** en la parte superior
- [ ] Borde redondeado gris representando pantalla

#### Seat Map:
- [ ] **Grid 10 filas x 12 asientos:**
  - [ ] Letras de fila (A-J) a la izquierda
  - [ ] Números de asiento (1-12) arriba
- [ ] **Colores de asientos:**
  - [ ] **Verde** (success) → Disponible
  - [ ] **Azul** (primary) → Seleccionado por ti
  - [ ] **Gris** (neutral-300) → Ocupado
  - [ ] **Hover en disponible:** Borde azul

#### Leyenda:
- [ ] 3 items con cuadros de color + label
- [ ] Disponible (verde), Seleccionado (azul), Ocupado (gris)

#### Sidebar Resumen:
- [ ] **Sticky a la derecha**
- [ ] **Película + horario** visible
- [ ] **Asientos seleccionados:** Lista con badges primary
- [ ] **Precio total:** Grande en verde (success)
- [ ] **Botón "Continuar al pago":** Primary, deshabilitado si no hay selección

#### Stats Footer:
- [ ] **"Asientos disponibles:"** Badge success
- [ ] **"Asientos ocupados:"** Badge error

---

### 7. Compra (/compra)

**Navegar:** Click en "Continuar al pago" después de seleccionar asientos

#### Resumen Compra Card:
- [ ] **Película + poster** visible
- [ ] **Horario, sala, asientos** listados
- [ ] **Precio subtotal** visible

#### Form Datos:
- [ ] **Título:** "Datos del Comprador"
- [ ] **Inputs:**
  - [ ] Nombre completo (pre-llenado si logged in)
  - [ ] Email (pre-llenado)
  - [ ] Teléfono
  - [ ] Todos con borders + focus states

#### Método de Pago:
- [ ] **Cards de pago:**
  - [ ] **Tarjeta Crédito/Débito:** Icon CreditCard
  - [ ] **PayPal:** Icon (o texto)
  - [ ] **Efectivo en taquilla:** Icon DollarSign
- [ ] **Card seleccionada:** Border primary grueso
- [ ] **Hover:** Border primary suave

#### Form Tarjeta (si seleccionada):
- [ ] **Input Número Tarjeta:** Máscara **** **** **** ****
- [ ] **Input Nombre Tarjeta**
- [ ] **Grid 2 cols:** Fecha expiración + CVV

#### Security Notice:
- [ ] **Box azul claro** con icon Shield
- [ ] Texto sobre seguridad SSL

#### Sidebar Resumen:
- [ ] **Precio subtotal**
- [ ] **Cargos servicio**
- [ ] **Total:** Grande y bold
- [ ] **Botón "Confirmar Compra":** Primary, grande

#### Modales de Confirmación:
- [ ] **Modal advertencia:** Fondo warning-light, icon AlertTriangle
- [ ] **Botones:** "Cancelar" (outline) + "Confirmar" (primary)

---

### 8. Confirmación (/confirmacion/:purchaseId)

**Navegar:** Después de confirmar compra

#### Success Header:
- [ ] **CheckCircle icon GRANDE** verde (success)
- [ ] **Título:** "¡Compra Exitosa!"
- [ ] **Subtítulo:** Mensaje de confirmación
- [ ] Fondo success-light

#### Ticket Card:
- [ ] **Card destacada** con sombra
- [ ] **Película + poster**
- [ ] **Detalles:**
  - [ ] Fecha y hora
  - [ ] Sala
  - [ ] Asientos con badges primary
  - [ ] Formato (2D/3D)
  - [ ] Idioma
- [ ] **QR Code:** Placeholder o cuadro gris

#### Información Adicional:
- [ ] **ID Compra:** Código alfanumérico
- [ ] **Email confirmación:** Dirección email
- [ ] **Box info:** Instrucciones para canje

#### Action Buttons:
- [ ] **"Descargar Ticket":** Outline variant, icon Download
- [ ] **"Imprimir":** Outline, icon Printer
- [ ] **"Ver Mis Compras":** Primary
- [ ] **"Volver al Inicio":** Outline

#### Print Styles (opcional verificar):
- [ ] Al hacer print preview: layout limpio sin header/footer app

---

### 9. Mis Compras (/mis-compras)

**URL:** http://localhost:5173/mis-compras

#### Stats Cards:
- [ ] **3 cards horizontales:**
  - [ ] Total Compras (info color)
  - [ ] Próximas Funciones (success)
  - [ ] Historial (neutral)
- [ ] Icons: ShoppingBag, Calendar, History
- [ ] Números grandes y visibles

#### Filter Bar:
- [ ] **Search input:** Placeholder "Buscar por película..."
- [ ] **Select estado:** Todas, Confirmadas, Canceladas, Pendientes
- [ ] **Date range:** Inputs de fecha inicio/fin
- [ ] **Botón "Limpiar filtros"**

#### View Toggle:
- [ ] **Botones Cards/Table:**
  - [ ] Icon LayoutGrid (cards)
  - [ ] Icon Table (tabla)
  - [ ] Activo: primary, inactivo: neutral

#### Cards View:
- [ ] **Grid responsive** de purchase cards
- [ ] **Purchase Card:**
  - [ ] Poster película
  - [ ] Título + fecha
  - [ ] **Badge estado:**
    - [ ] Confirmado → Verde (success)
    - [ ] Cancelado → Rojo (error)
    - [ ] Pendiente → Amarillo (warning)
  - [ ] Asientos listados
  - [ ] Precio total
  - [ ] Botones: "Ver Detalles", "Descargar", "Cancelar"

#### Table View:
- [ ] **Tabla completa:**
  - [ ] Headers: ID, Película, Fecha, Asientos, Total, Estado, Acciones
  - [ ] Rows striped (zebra pattern)
  - [ ] Hover row: fondo neutral-50
  - [ ] Badges de estado coloreados
  - [ ] Action buttons: Eye, Download, Trash

#### Modal Detalle:
- [ ] Al click "Ver Detalles" → Modal con info completa
- [ ] Header con título película
- [ ] Todos los detalles visibles
- [ ] QR code
- [ ] Botón cerrar (X)

#### Modal Cancelar:
- [ ] Background warning-light
- [ ] Icon AlertTriangle
- [ ] Texto advertencia
- [ ] Botones: "No, Volver" + "Sí, Cancelar" (danger)

#### Empty State (si no hay compras):
- [ ] Icon ShoppingBag grande gris
- [ ] Texto "No tienes compras aún"
- [ ] Botón "Explorar Cartelera"

---

## 🎨 VERIFICACIÓN DE DESIGN SYSTEM

### Colores:
- [ ] **Primary (#1e40af):** Botones principales, links, accents
- [ ] **Primary Dark (#1e3a8a):** Hover states de botones
- [ ] **Primary Light (#3b82f6):** Backgrounds suaves, gradientes
- [ ] **Secondary (#7c3aed):** Botones secundarios, accents alternativos
- [ ] **Secondary Light (#a78bfa):** Gradientes
- [ ] **Success (#22c55e):** Confirmaciones, precios, estado positivo
- [ ] **Error (#ef4444):** Errores, cancelaciones
- [ ] **Error Light (#fee2e2):** Backgrounds de error
- [ ] **Warning (#f59e0b):** Advertencias, estados pendientes
- [ ] **Info (#3b82f6):** Información, tips
- [ ] **Info Light (#dbeafe):** Backgrounds info
- [ ] **Neutral 50-900:** Fondos, bordes, textos

### Tipografía:
- [ ] **Roboto:** Texto body en todo el sitio
- [ ] **Poppins:** Títulos principales (h1, h2)
- [ ] **Outfit:** (si se usa) Elementos especiales
- [ ] **Pesos:** 300 (light), 400 (regular), 500 (medium), 700 (bold)
- [ ] **Tamaños consistentes:** text-sm, base, lg, xl, 2xl, 3xl

### Spacing:
- [ ] Padding/margins múltiplos de 4px u 8px
- [ ] Consistencia en cards (p-6 común)
- [ ] Gaps en grids (gap-4, gap-6, gap-8)

### Borders & Shadows:
- [ ] **Border radius:** rounded-lg (12px) común en cards
- [ ] **Shadows:** shadow-md en cards, shadow-lg en modales
- [ ] **Hover shadows:** elevación de shadow-md a shadow-xl

### Animaciones:
- [ ] **Transitions:** duration-200 o duration-300 común
- [ ] **Hover effects:** suaves, no abruptos
- [ ] **Modal enter/exit:** fade in/out
- [ ] **Loading states:** spinners giran suavemente

---

## 📱 RESPONSIVE DESIGN

### Mobile (< 640px):
- [ ] **Nav:** Colapsa a hamburger menu
- [ ] **Grids:** 1 columna
- [ ] **Forms:** Inputs full width
- [ ] **Sidebars:** Se mueven abajo del content
- [ ] **Tables:** Scroll horizontal o cards

### Tablet (640px - 1024px):
- [ ] **Grids:** 2 columnas
- [ ] **Sidebars:** Pueden estar sticky o abajo
- [ ] **Forms:** 2 columnas en algunos casos

### Desktop (> 1024px):
- [ ] **Grids:** 3-4 columnas
- [ ] **Sidebars:** Sticky a la derecha
- [ ] **Max width:** Contenido no excede max-w-7xl
- [ ] **Spacing:** Generoso padding

---

## ⚡ INTERACCIONES Y ESTADOS

### Hover States:
- [ ] **Botones:** Cambio de color (primary → primary-dark)
- [ ] **Cards:** Elevación de sombra
- [ ] **Links:** Underline o cambio de color
- [ ] **Inputs:** Border color change

### Focus States:
- [ ] **Inputs:** Ring azul (ring-primary) visible
- [ ] **Botones:** Ring visible al usar teclado
- [ ] **Links:** Outline visible

### Loading States:
- [ ] **Botones:** Spinner + texto "Cargando..." + disabled
- [ ] **Forms:** Inputs disabled durante submit
- [ ] **Pages:** Skeleton loaders (opcional)

### Error States:
- [ ] **Inputs:** Border rojo + mensaje abajo
- [ ] **Banners:** Fondo error-light + texto error-dark
- [ ] **Icons:** AlertCircle o X en rojo

### Success States:
- [ ] **Modales:** Fondo success-light + CheckCircle verde
- [ ] **Banners:** Fondo success-light
- [ ] **Badges:** Verde con texto blanco

---

## 🧪 PRUEBAS FUNCIONALES RÁPIDAS

### Login Flow:
1. [ ] Ir a /login
2. [ ] Probar email inválido → error
3. [ ] Probar password corto → error
4. [ ] Login con customer@cine.com / password123 → redirect a /cartelera
5. [ ] Verificar que aparece nombre usuario en header

### Customer Journey:
1. [ ] En Cartelera, filtrar por género → funciona
2. [ ] Click "Ver Horarios" → lleva a /horarios/:id
3. [ ] Seleccionar fecha y horario → lleva a /asientos
4. [ ] Seleccionar 2 asientos → precio se actualiza
5. [ ] Click "Continuar al pago" → lleva a /compra
6. [ ] Llenar datos y seleccionar método pago
7. [ ] Confirmar compra → modal de confirmación
8. [ ] Ver ticket en /confirmacion

### Register Flow:
1. [ ] Ir a /register
2. [ ] Escribir contraseña débil → barra roja
3. [ ] Escribir contraseña fuerte → barra verde
4. [ ] Confirmar password diferente → error
5. [ ] Registrar usuario → modal success → redirect a /login

---

## ✅ CHECKLIST FINAL

Al terminar esta verificación, debes confirmar:

- [ ] ✅ **Todos los colores** se ven correctamente
- [ ] ✅ **Fuentes Google Fonts** cargan (Roboto visible)
- [ ] ✅ **Gradientes** en login/register funcionan
- [ ] ✅ **Hover effects** suaves en botones y cards
- [ ] ✅ **Modales** aparecen con estilos correctos
- [ ] ✅ **Forms** tienen validación visual
- [ ] ✅ **Badges** con colores según estado
- [ ] ✅ **Icons** de lucide-react renderizando
- [ ] ✅ **Responsive** funciona en mobile/tablet/desktop
- [ ] ✅ **Navigation** entre páginas fluida

---

## 🐛 SI ENCUENTRAS PROBLEMAS

**Documenta aquí cualquier issue visual:**

### Problema 1:
- **Página:** _______
- **Elemento:** _______
- **Issue:** _______
- **Screenshot:** (opcional)

### Problema 2:
- **Página:** _______
- **Elemento:** _______
- **Issue:** _______

---

## 📊 RESULTADO ESPERADO

Si todo está correcto, deberías ver:

✅ **8 páginas** con estilos perfectos  
✅ **Colores coherentes** en toda la app  
✅ **Typography profesional** (Roboto + Poppins)  
✅ **Animaciones suaves** en hover/focus  
✅ **Responsive design** funcional  
✅ **Design system** aplicado consistentemente  

**APLICACIÓN LISTA VISUALMENTE PARA CONTINUAR CON ADMIN PAGES!** 🎉

---

**Genera:** Octubre 2025  
**Version:** 1.0 - Visual Verification Checklist  
**Status:** 🔍 **PENDING VERIFICATION**
