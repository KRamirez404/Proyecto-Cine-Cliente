# 🎬 Cómo Usar el Sistema de Login - CineApp

## ✅ **ESTADO ACTUAL: Sistema Funcionando Correctamente**

El sistema ahora funciona correctamente con el flujo de autenticación:

---

## 📋 **FLUJO NORMAL DE USO**

### **1. INICIO - Sin Usuario Logueado**

Cuando abres la aplicación por primera vez:
- ✅ **Ruta Raíz (`/`)**: Redirige a `/cartelera`
- ✅ **Cartelera**: Accesible SIN login (página pública)
- ✅ **Login (`/login`)**: Accesible SIN login
- ✅ **Register (`/register`)**: Accesible SIN login

### **2. HACER LOGIN**

#### **Credenciales Disponibles:**

**👤 Cliente:**
```
Email: customer@cine.com
Password: password123
```
→ Redirige a: `/cartelera`

**👨‍💼 Administrador:**
```
Email: admin@cine.com
Password: admin123
```
→ Redirige a: `/admin/dashboard`

**💵 Cajero:**
```
Email: cajero@cine.com
Password: cajero123
```
→ Redirige a: `/cajero/ventas`

### **3. DESPUÉS DEL LOGIN**

El sistema guarda tu información en `localStorage`:
- ✅ Usuario (nombre, email, role)
- ✅ Token de sesión

La aplicación detecta automáticamente tu rol y:
- ✅ Muestra el layout correspondiente (Customer/Admin/Cajero)
- ✅ Te redirige a la página inicial de tu rol
- ✅ Protege las rutas según tu rol

---

## 🔒 **PROTECCIÓN DE RUTAS**

### **Rutas Públicas** (sin login requerido):
- `/login`
- `/register`
- `/cartelera` (vista pública)
- `/horarios/:movieId` (vista pública)

### **Rutas Protegidas - CLIENTE:**
- `/asientos/:showtimeId` (requiere login como customer)
- `/compra` (requiere login como customer)
- `/confirmacion/:purchaseId` (requiere login como customer)
- `/mis-compras` (requiere login como customer)

### **Rutas Protegidas - ADMIN:**
- `/admin/dashboard` (requiere login como admin)
- `/admin/peliculas` (requiere login como admin)
- `/admin/cajeros` (requiere login como admin) ✅ **NUEVO**
- `/admin/vip` (requiere login como admin)
- `/admin/logs` (requiere login como admin)

### **Rutas Protegidas - CAJERO:**
- `/cajero/ventas` (requiere login como cajero)
- `/cajero/historial` (requiere login como cajero)

---

## 🛠️ **PARA DESARROLLO Y TESTING**

### **Opción 1: Login Normal (RECOMENDADO)**
Usa las credenciales de arriba en `/login`

### **Opción 2: Testing Directo (Sin Login)**

Si necesitas probar páginas protegidas SIN hacer login, edita `src/main.jsx`:

```jsx
// Descomenta estas líneas (líneas 11-15):
const mockUser = {
  name: 'Admin Demo',
  email: 'admin@cineapp.com',
  role: 'admin', // Cambia a 'customer', 'admin', o 'cajero'
};

// Y comenta estas líneas (líneas 8-9):
// const storedUser = localStorage.getItem('user');
// const mockUser = storedUser ? JSON.parse(storedUser) : null;
```

**Roles disponibles para testing:**
- `role: 'customer'` → Acceso a rutas de cliente
- `role: 'admin'` → Acceso a rutas de admin
- `role: 'cajero'` → Acceso a rutas de cajero

---

## 🚨 **SOLUCIÓN A PROBLEMAS COMUNES**

### **Problema: "Pantalla en blanco"**

**Causa:** Usuario logueado con rol incorrecto intentando acceder a ruta protegida.

**Solución:**
1. Abre las DevTools (F12)
2. Ve a "Application" → "Local Storage"
3. Elimina `user` y `token`
4. Recarga la página
5. Haz login nuevamente

### **Problema: "No puedo acceder a /admin/cajeros"**

**Causa:** No estás logueado como admin.

**Solución:**
1. Logout (si estás logueado como customer/cajero)
2. Limpia localStorage (F12 → Application → Clear storage)
3. Ve a `/login`
4. Usa: `admin@cine.com / admin123`

### **Problema: "El login no funciona"**

**Verificar:**
- ✅ Email y contraseña correctos (ver lista arriba)
- ✅ No hay errores en consola (F12)
- ✅ El servidor está corriendo (`npm run dev`)

---

## 📊 **RUTAS DISPONIBLES POR ROL**

| Ruta | Público | Cliente | Admin | Cajero |
|------|---------|---------|-------|--------|
| `/login` | ✅ | ✅ | ✅ | ✅ |
| `/register` | ✅ | ✅ | ✅ | ✅ |
| `/cartelera` | ✅ | ✅ | ❌ | ❌ |
| `/horarios/:id` | ✅ | ✅ | ❌ | ❌ |
| `/asientos/:id` | ❌ | ✅ | ❌ | ❌ |
| `/compra` | ❌ | ✅ | ❌ | ❌ |
| `/confirmacion/:id` | ❌ | ✅ | ❌ | ❌ |
| `/mis-compras` | ❌ | ✅ | ❌ | ❌ |
| `/admin/dashboard` | ❌ | ❌ | ✅ | ❌ |
| `/admin/peliculas` | ❌ | ❌ | ✅ | ❌ |
| `/admin/cajeros` | ❌ | ❌ | ✅ | ❌ |
| `/admin/vip` | ❌ | ❌ | ✅ | ❌ |
| `/admin/logs` | ❌ | ❌ | ✅ | ❌ |
| `/cajero/ventas` | ❌ | ❌ | ❌ | ✅ |
| `/cajero/historial` | ❌ | ❌ | ❌ | ✅ |

---

## 🔄 **LOGOUT (Próximamente)**

Actualmente NO hay botón de logout implementado. Para hacer logout manual:

1. Abre DevTools (F12)
2. Ve a "Application" → "Local Storage" → `http://localhost:5173`
3. Elimina `user` y `token`
4. Recarga la página

---

## 📝 **CÓMO FUNCIONA EL SISTEMA**

### **Archivo: `src/main.jsx`**
```jsx
// Lee el usuario del localStorage (guardado por Login.jsx)
const storedUser = localStorage.getItem('user');
const mockUser = storedUser ? JSON.parse(storedUser) : null;

// Pasa el usuario al router
const router = createRouter(mockUser);
```

### **Archivo: `src/pages/auth/Login.jsx`**
```jsx
// Cuando login es exitoso:
localStorage.setItem('user', JSON.stringify(userData));
localStorage.setItem('token', `mock-token-${userData.id}`);

// Luego redirige según rol:
window.location.href = redirectMap[user.role];
```

### **Archivo: `src/router/index.jsx`**
```jsx
// Rutas públicas (sin protección):
{
  path: 'login',
  element: user ? <Navigate to="/" /> : <Login />,
}

// Rutas protegidas (con ProtectedRoute):
{
  path: 'asientos/:showtimeId',
  element: (
    <ProtectedRoute user={user} allowedRoles={['customer']}>
      <Asientos />
    </ProtectedRoute>
  ),
}
```

### **Componente: `src/components/ProtectedRoute.jsx`**
```jsx
// Verifica si:
// 1. El usuario está logueado
// 2. El usuario tiene el rol permitido
// Si no, redirige a /login
```

---

## ✅ **ESTADO ACTUAL DEL PROYECTO**

### **Páginas Completadas:**
- ✅ 6 páginas Customer
- ✅ 2 páginas Auth (Login, Register)
- ✅ 3 páginas Admin (Dashboard, Películas, **Cajeros**)

### **Páginas Pendientes:**
- ⏳ 2 páginas Admin (VIP, Logs)
- ⏳ 2 páginas Cajero (Ventas POS, Historial)

---

## 🎯 **PRÓXIMOS PASOS**

1. ✅ Sistema de login funcionando
2. ✅ AdminCajeros completado
3. ⏳ Crear AdminVIP
4. ⏳ Crear AdminLogs
5. ⏳ Crear CajeroVentas (POS)
6. ⏳ Crear CajeroHistorial

---

**Última actualización:** Octubre 17, 2025  
**Versión:** 1.0.0 (Frontend en desarrollo)
