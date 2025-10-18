# 🔐 Arquitectura de Autenticación - Sistema de Login Universal

## 📋 Visión General

El sistema implementa un **login único universal** que funciona para todos los tipos de usuarios:

- 👥 **Clientes Normales** - Usuarios que se registran para comprar entradas
- ⭐ **Clientes VIP** - Clientes con beneficios especiales y descuentos
- 👔 **Administradores** - Gestión completa del sistema
- 💰 **Cajeros** - Ventas presenciales en taquilla

### Principio Clave
**Un solo componente de Login → Redirección automática según rol**

---

## 🎯 Flujo de Autenticación

### 1. Login Universal

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "string",      // Nombre de usuario o email
  "contrasena": "string"
}

// Response
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 1,
      "nombre": "Juan Pérez",
      "usuario": "juanperez",
      "email": "juan@example.com",
      "rol": "CLIENTE",           // CLIENTE | CLIENTE_VIP | ADMIN | CAJERO
      "tipo_cliente": "VIP"        // Solo si rol = CLIENTE o CLIENTE_VIP
    }
  }
}
```

### 2. Registro de Clientes (Público)

```javascript
POST /api/auth/register-cliente
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "555-1234",
  "usuario": "juanperez",
  "contrasena": "password123"
}

// Response
{
  "success": true,
  "message": "Cliente registrado exitosamente",
  "data": {
    "id": 10,
    "usuario": "juanperez",
    "rol": "CLIENTE",
    "tipo_cliente": "NORMAL"
  }
}
```

**⚠️ NOTA**: Este endpoint debe ser **público** (sin autenticación requerida)

### 3. Registro de Admin/Cajero (Solo Admin)

```javascript
POST /api/auth/register
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "usuario": "cajero3",
  "contrasena": "password123",
  "nombre": "Cajero Tres",
  "email": "cajero3@cine.com",
  "rol": "CAJERO"    // ADMIN | CAJERO
}
```

---

## 👥 Estructura de Roles

### Roles del Sistema

| Rol | Código | Descripción | Registro |
|-----|--------|-------------|----------|
| **Cliente Normal** | `CLIENTE` | Usuario registrado estándar | Público (auto-registro) |
| **Cliente VIP** | `CLIENTE_VIP` | Cliente con beneficios especiales | Admin otorga upgrade |
| **Cajero** | `CAJERO` | Ventas presenciales | Solo Admin puede crear |
| **Administrador** | `ADMIN` | Gestión completa del sistema | Solo Admin puede crear |

### Tipos de Cliente (Sub-categoría)

```javascript
{
  "rol": "CLIENTE",
  "tipo_cliente": "NORMAL" | "VIP" | "ESTUDIANTE" | "TERCERA_EDAD"
}
```

---

## 🚦 Redirección Post-Login

### Lógica de Redirección

```javascript
// src/utils/redirectByRole.js
export const getRedirectPath = (rol, returnUrl = null) => {
  // Si hay URL de retorno, usarla (para redirección después de login requerido)
  if (returnUrl && rol === 'CLIENTE' || rol === 'CLIENTE_VIP') {
    return returnUrl;
  }

  // Redirección por rol
  switch (rol) {
    case 'ADMIN':
      return '/admin/dashboard';
    
    case 'CAJERO':
      return '/admin/cashier';
    
    case 'CLIENTE':
    case 'CLIENTE_VIP':
      return '/cartelera';
    
    default:
      return '/';
  }
};
```

### Tabla de Rutas por Rol

| Rol | Ruta Inicial | Rutas Permitidas |
|-----|--------------|------------------|
| **CLIENTE** | `/cartelera` | `/cartelera`, `/horarios/:id`, `/asientos/:id`, `/compra`, `/mi-cuenta`, `/historial` |
| **CLIENTE_VIP** | `/cartelera` | Todas de CLIENTE + `/beneficios-vip` |
| **CAJERO** | `/admin/cashier` | `/admin/cashier`, `/admin/ventas`, `/admin/clientes` |
| **ADMIN** | `/admin/dashboard` | Todas las rutas del sistema |

---

## 🛡️ Protección de Rutas

### ProtectedRoute Component

```javascript
// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Cargando...</div>; // O un Spinner component
  }

  if (!user) {
    // No autenticado - redirigir a login con returnUrl
    return <Navigate to={`/login?returnUrl=${location.pathname}`} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    // Usuario autenticado pero sin permisos - redirigir a su dashboard
    return <Navigate to={getRedirectPath(user.rol)} replace />;
  }

  return children;
};
```

### Rutas Protegidas en App.jsx

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { useAuth } from '@hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas de Cliente (Normal + VIP) */}
        <Route
          path="/cartelera"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'CLIENTE_VIP', 'ADMIN']}>
              <Cartelera />
            </ProtectedRoute>
          }
        />
        <Route
          path="/horarios/:movieId"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'CLIENTE_VIP', 'ADMIN']}>
              <Horarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/asientos/:funcionId"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'CLIENTE_VIP', 'ADMIN']}>
              <Asientos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compra"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'CLIENTE_VIP', 'ADMIN']}>
              <Compra />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mi-cuenta"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE', 'CLIENTE_VIP']}>
              <MiCuenta />
            </ProtectedRoute>
          }
        />

        {/* Ruta exclusiva VIP */}
        <Route
          path="/beneficios-vip"
          element={
            <ProtectedRoute allowedRoles={['CLIENTE_VIP', 'ADMIN']}>
              <BeneficiosVIP />
            </ProtectedRoute>
          }
        />

        {/* Rutas de Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/peliculas"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminPeliculas />
            </ProtectedRoute>
          }
        />

        {/* Rutas de Cajero */}
        <Route
          path="/admin/cashier"
          element={
            <ProtectedRoute allowedRoles={['CAJERO', 'ADMIN']}>
              <CajeroVentas />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🎨 Componente de Login Universal

### Login.jsx

```javascript
// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { getRedirectPath } from '@utils/redirectByRole';
import { Button } from '@atoms/Button';
import { Input } from '@atoms/Input';

export const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login(formData);
      
      // Obtener URL de retorno o redirección por rol
      const returnUrl = searchParams.get('returnUrl');
      const redirectPath = getRedirectPath(response.data.usuario.rol, returnUrl);
      
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="bg-white p-8 rounded-xl shadow-card max-w-md w-full">
        <h1 className="text-h2 font-bold text-primary mb-2">Iniciar Sesión</h1>
        <p className="text-body text-neutral-600 mb-6">
          Accede como cliente, cajero o administrador
        </p>

        {error && (
          <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Usuario o Email"
            type="text"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
            placeholder="Ingresa tu usuario"
            required
          />

          <Input
            label="Contraseña"
            type="password"
            value={formData.contrasena}
            onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
            placeholder="Ingresa tu contraseña"
            required
          />

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-small text-neutral-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => navigate('/registro')}
              className="text-primary font-medium hover:underline"
            >
              Regístrate como cliente
            </button>
          </p>
        </div>

        {/* Credenciales de prueba (solo desarrollo) */}
        {import.meta.env.DEV && (
          <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
            <p className="text-caption font-medium text-neutral-700 mb-2">
              Credenciales de prueba:
            </p>
            <div className="space-y-1 text-caption text-neutral-600">
              <p>Admin: admin / admin123</p>
              <p>Cajero: cajero1 / cajero123</p>
              <p>Cliente: cliente1 / cliente123</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 📱 Componente de Registro (Clientes)

### Registro.jsx

```javascript
// src/pages/Registro.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@services/auth.service';
import { Button } from '@atoms/Button';
import { Input } from '@atoms/Input';

export const Registro = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    usuario: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (formData.contrasena !== formData.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await authService.registerCliente({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        usuario: formData.usuario,
        contrasena: formData.contrasena
      });

      // Mostrar mensaje de éxito y redirigir a login
      alert('Registro exitoso. Ya puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-8">
      <div className="bg-white p-8 rounded-xl shadow-card max-w-md w-full">
        <h1 className="text-h2 font-bold text-primary mb-2">Crear Cuenta</h1>
        <p className="text-body text-neutral-600 mb-6">
          Regístrate para comprar tus entradas
        </p>

        {error && (
          <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre Completo"
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Teléfono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            required
          />

          <Input
            label="Usuario"
            type="text"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            value={formData.contrasena}
            onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
            required
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            value={formData.confirmarContrasena}
            onChange={(e) => setFormData({ ...formData, confirmarContrasena: e.target.value })}
            required
          />

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-small text-neutral-600">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary font-medium hover:underline"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
```

---

## 🔧 Hook de Autenticación

### useAuth.js

```javascript
// src/hooks/useAuth.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@services/auth.service';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      login: async (credentials) => {
        set({ loading: true });
        try {
          const response = await authService.login(credentials);
          set({
            user: response.data.usuario,
            token: response.data.token,
            loading: false
          });
          return response;
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({ user: null, token: null });
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token })
    }
  )
);

export const useAuth = () => {
  const { user, token, loading, login, logout, setUser } = useAuthStore();
  return { user, token, loading, login, logout, setUser };
};
```

---

## 🎨 Header Adaptativo

### Header.jsx (adaptado por rol)

```javascript
// src/components/organisms/Header.jsx
import { useAuth } from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import { User, LogOut, Crown, LayoutDashboard } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-h3 font-bold text-primary">
          🎬 CineApp
        </Link>

        <nav className="flex items-center gap-6">
          {user ? (
            <>
              {/* Mostrar según rol */}
              {(user.rol === 'CLIENTE' || user.rol === 'CLIENTE_VIP') && (
                <>
                  <Link to="/cartelera" className="text-body hover:text-primary">
                    Cartelera
                  </Link>
                  <Link to="/mi-cuenta" className="flex items-center gap-2 text-body hover:text-primary">
                    <User size={18} />
                    {user.nombre}
                    {user.rol === 'CLIENTE_VIP' && <Crown size={16} className="text-accent" />}
                  </Link>
                </>
              )}

              {(user.rol === 'ADMIN' || user.rol === 'CAJERO') && (
                <Link to={user.rol === 'ADMIN' ? '/admin/dashboard' : '/admin/cashier'} 
                      className="flex items-center gap-2 text-body hover:text-primary">
                  <LayoutDashboard size={18} />
                  Panel {user.rol === 'ADMIN' ? 'Admin' : 'Cajero'}
                </Link>
              )}

              <button
                onClick={logout}
                className="flex items-center gap-2 text-body hover:text-error"
              >
                <LogOut size={18} />
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-body hover:text-primary">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
```

---

## 🔌 Servicios de Autenticación

### auth.service.js (actualizado)

```javascript
// src/services/auth.service.js
import apiClient from './api';

export const authService = {
  // Login universal
  async login(credentials) {
    const response = await apiClient.post('/api/auth/login', credentials);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
    return response;
  },

  // Registro de cliente (público)
  async registerCliente(clienteData) {
    return apiClient.post('/api/auth/register-cliente', clienteData);
  },

  // Obtener usuario actual
  async getMe() {
    return apiClient.get('/api/auth/me');
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar si está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Obtener rol del usuario actual
  getUserRole() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).rol : null;
  }
};
```

---

## ⚙️ Modificaciones Necesarias en el Backend

### Endpoints que se requieren agregar:

```javascript
// 1. Registro público de clientes
POST /api/auth/register-cliente (SIN autenticación)
Body: { nombre, email, telefono, usuario, contrasena }
Response: { success, data: { usuario con rol CLIENTE } }

// 2. Modificar tabla de usuarios para incluir rol CLIENTE
ALTER TABLE usuarios ADD COLUMN tipo_cliente ENUM('NORMAL', 'VIP', 'ESTUDIANTE', 'TERCERA_EDAD');

// 3. Actualizar enum de roles
ALTER TABLE usuarios MODIFY COLUMN rol ENUM('ADMIN', 'CAJERO', 'CLIENTE', 'CLIENTE_VIP');
```

### Lógica de negocio adicional:

1. **Upgrade a VIP**: Endpoint para que admin pueda convertir cliente normal a VIP
2. **Login unificado**: El endpoint `/api/auth/login` debe aceptar tanto usuarios admin/cajero como clientes
3. **Validaciones**: Email único, usuario único

---

## 📊 Matriz de Permisos

| Funcionalidad | CLIENTE | CLIENTE_VIP | CAJERO | ADMIN |
|---------------|---------|-------------|--------|-------|
| Ver cartelera | ✅ | ✅ | ✅ | ✅ |
| Comprar entradas | ✅ | ✅ | ❌ | ✅ |
| Descuentos especiales | ❌ | ✅ | ❌ | ✅ |
| Ver historial personal | ✅ | ✅ | ❌ | ✅ |
| Vender en taquilla | ❌ | ❌ | ✅ | ✅ |
| CRUD películas | ❌ | ❌ | ❌ | ✅ |
| CRUD cajeros | ❌ | ❌ | ❌ | ✅ |
| Ver reportes | ❌ | ❌ | ❌ | ✅ |

---

## ✅ Checklist de Implementación

### Backend (modificaciones necesarias)
- [ ] Agregar rol `CLIENTE` y `CLIENTE_VIP` al enum de roles
- [ ] Crear endpoint `POST /api/auth/register-cliente` (público)
- [ ] Modificar `/api/auth/login` para aceptar clientes
- [ ] Agregar campo `tipo_cliente` a tabla usuarios/clientes
- [ ] Endpoint para upgrade a VIP (solo admin)
- [ ] Middleware para verificar roles en rutas protegidas

### Frontend
- [ ] Componente `Login.jsx` universal
- [ ] Componente `Registro.jsx` (solo clientes)
- [ ] Hook `useAuth` con Zustand + persist
- [ ] Componente `ProtectedRoute`
- [ ] Utilidad `getRedirectPath`
- [ ] Service `auth.service.js` con todos los métodos
- [ ] Header adaptativo según rol
- [ ] Configurar rutas protegidas en App.jsx
- [ ] Página "Mi Cuenta" para clientes
- [ ] Página "Beneficios VIP"

---

## 🚀 Próximos Pasos

1. **Coordinar con backend**: Confirmar que endpoints de registro de cliente existan
2. **Construir componentes de autenticación**: Login, Registro, ProtectedRoute
3. **Implementar useAuth hook**: Con Zustand y persistencia
4. **Crear servicios de auth**: auth.service.js completo
5. **Configurar rutas**: App.jsx con protección por roles
6. **Testing**: Probar flujos de cada tipo de usuario

---

**Última Actualización**: Enero 2025  
**Estado**: Arquitectura definida - Lista para implementación
