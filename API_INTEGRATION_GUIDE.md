# 🔌 Guía de Integración API Backend

## 📋 Información General del Backend

**Repositorio**: https://github.com/JUNIORRDSR/Proyecto-Cine-Backend  
**Estado**: ✅ PRODUCTION READY (90% completado)  
**Stack**: Node.js + Express + MySQL + Sequelize  
**Autenticación**: JWT (Bearer Token)  
**Base URL**: `http://localhost:3000` (desarrollo)

---

## 🎯 Módulos del Backend Disponibles

### 1. 🔐 Autenticación (`/api/auth`)
- Login de usuarios (Admin/Cajero)
- Registro de usuarios (solo Admin)
- Obtener usuario actual
- JWT con expiración de 8 horas

### 2. 🎬 Películas (`/api/peliculas`)
- CRUD completo de películas
- Filtros por estado (EN_CARTELERA, RETIRADA)
- Soft delete
- Campos: título, director, duración, género, clasificación, sinopsis, fecha estreno

### 3. 🎭 Funciones (`/api/funciones`)
- CRUD completo de funciones
- Asociación con películas y salas
- Horarios y precios
- Estados: PROGRAMADA, EN_CURSO, FINALIZADA, CANCELADA
- Filtros por película y fecha

### 4. 🏢 Salas (`/api/salas`)
- CRUD completo de salas
- Tipos: REGULAR, VIP, IMAX, 3D
- Capacidad configurable
- Estados: ACTIVA, INACTIVA, MANTENIMIENTO

### 5. 💺 Asientos (`/api/asientos`)
- CRUD completo de asientos
- Tipos: REGULAR, VIP, PREFERENCIAL
- Identificación por fila y número
- Estados: DISPONIBLE, OCUPADO, MANTENIMIENTO

### 6. 🎟️ Reservas (`/api/reservas`)
- Creación de reservas
- Confirmación y cancelación
- Tiempo de expiración (15 min)
- Estados: PENDIENTE, CONFIRMADA, CANCELADA, EXPIRADA
- Validación de disponibilidad

### 7. 💰 Ventas/Boletas (`/api/ventas`)
- Registro de ventas
- Generación de boletos (PDF)
- Códigos únicos de boleto
- Tipos de cliente: ADULTO, NIÑO, ESTUDIANTE, TERCERA_EDAD

### 8. 👤 Clientes (`/api/clientes`)
- CRUD completo de clientes
- Información de contacto
- Historial de compras

### 9. 📊 Reportes (`/api/reportes`)
- Estadísticas generales
- Reporte de ventas
- Películas más populares
- Ocupación de salas
- Ingresos por período

### 10. 🤖 Chatbot (`/api/chatbot`)
- Consultas básicas
- Información de cartelera
- Horarios de funciones
- Recomendaciones

---

## 🔑 Autenticación JWT

### Login Universal (Todos los roles)

**Este endpoint sirve para TODOS los usuarios**: clientes, cajeros y administradores.

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "usuario": "admin",      // o email
  "contrasena": "admin123"
}

// Response
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 1,
      "nombre": "Administrador",
      "usuario": "admin",
      "email": "admin@cine.com",
      "rol": "ADMIN"  // CLIENTE | CLIENTE_VIP | CAJERO | ADMIN
    }
  }
}
```

### Registro de Cliente (Público - Sin autenticación)

⚠️ **IMPORTANTE**: Este endpoint debe ser **público** para que cualquier usuario pueda registrarse.

```javascript
POST /api/auth/register-cliente
Content-Type: application/json
// NO requiere Authorization header

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
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "CLIENTE",
    "tipo_cliente": "NORMAL"
  }
}
```

### Registro de Admin/Cajero (Solo Admin)

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

### Usar Token en Requests
```javascript
GET /api/peliculas
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Obtener Usuario Actual
```javascript
GET /api/auth/me
Authorization: Bearer {token}

// Response
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Administrador",
    "usuario": "admin",
    "rol": "ADMIN",
    "createdAt": "2025-01-15T00:00:00.000Z"
  }
}
```

---

## 📊 Endpoints Críticos para el Frontend

### 1. Cartelera (Home)
```javascript
// Obtener películas en cartelera
GET /api/peliculas?estado=EN_CARTELERA
Authorization: Bearer {token}

// Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titulo": "Avatar: El camino del agua",
      "descripcion": "Secuela de Avatar...",
      "duracion_minutos": 192,
      "genero": "Ciencia Ficción",
      "clasificacion": "PG-13",
      "idioma": "Español",
      "director": "James Cameron",
      "reparto": "Sam Worthington, Zoe Saldana",
      "fecha_estreno": "2022-12-16",
      "estado": "EN_CARTELERA"
    }
  ]
}
```

### 2. Horarios de Funciones
```javascript
// Obtener funciones por película
GET /api/funciones?pelicula_id=1
Authorization: Bearer {token}

// Obtener funciones por fecha
GET /api/funciones?fecha=2025-01-15
Authorization: Bearer {token}

// Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "pelicula_id": 1,
      "sala_id": 1,
      "fecha": "2025-01-15",
      "hora_inicio": "15:30:00",
      "hora_fin": "18:00:00",
      "precio": 12.00,
      "estado": "PROGRAMADA",
      "pelicula": {
        "titulo": "Avatar",
        "duracion_minutos": 192
      },
      "sala": {
        "nombre": "Sala 1",
        "tipo": "2D",
        "capacidad": 100
      }
    }
  ]
}
```

### 3. Selección de Asientos
```javascript
// Obtener asientos de una función
GET /api/asientos?funcion_id=1
Authorization: Bearer {token}

// Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sala_id": 1,
      "fila": "A",
      "numero": 1,
      "tipo": "REGULAR",
      "estado": "DISPONIBLE"
    },
    {
      "id": 2,
      "sala_id": 1,
      "fila": "A",
      "numero": 2,
      "tipo": "VIP",
      "estado": "OCUPADO"
    }
  ]
}
```

### 4. Crear Reserva
```javascript
POST /api/reservas
Authorization: Bearer {token}
Content-Type: application/json

{
  "funcion_id": 1,
  "cliente_id": 5,
  "asientos": [1, 2, 3], // IDs de asientos
  "tipo_cliente": "ADULTO"
}

// Response
{
  "success": true,
  "data": {
    "id": 10,
    "funcion_id": 1,
    "cliente_id": 5,
    "estado": "PENDIENTE",
    "total": 36.00,
    "expira_en": "2025-01-15T15:45:00Z",
    "asientos": [
      { "fila": "A", "numero": 1 },
      { "fila": "A", "numero": 2 },
      { "fila": "A", "numero": 3 }
    ]
  }
}
```

### 5. Confirmar Compra (Generar Boleta)
```javascript
POST /api/ventas
Authorization: Bearer {token}
Content-Type: application/json

{
  "reserva_id": 10,
  "metodo_pago": "TARJETA",
  "monto": 36.00
}

// Response
{
  "success": true,
  "data": {
    "id": 15,
    "reserva_id": 10,
    "codigo_boleto": "BOL-2025-01-15-ABCD1234",
    "monto": 36.00,
    "metodo_pago": "TARJETA",
    "pdf_url": "/public/tickets/BOL-2025-01-15-ABCD1234.pdf",
    "estado": "CONFIRMADA"
  }
}
```

### 6. Chatbot
```javascript
POST /api/chatbot/consulta
Authorization: Bearer {token}
Content-Type: application/json

{
  "mensaje": "¿Qué películas hay disponibles hoy?"
}

// Response
{
  "success": true,
  "data": {
    "respuesta": "Hoy tenemos 3 películas en cartelera: Avatar, The Batman, y Top Gun Maverick.",
    "peliculas": [
      { "id": 1, "titulo": "Avatar" },
      { "id": 2, "titulo": "The Batman" }
    ]
  }
}
```

### 7. Estadísticas (Admin Dashboard)
```javascript
GET /api/reportes/estadisticas
Authorization: Bearer {token-admin}

// Response
{
  "success": true,
  "data": {
    "totalVentas": 1500,
    "ventasHoy": 250,
    "peliculasActivas": 5,
    "funcionesHoy": 12,
    "ocupacionPromedio": 75.5
  }
}
```

---

## 🔐 Roles y Permisos

⚠️ **IMPORTANTE**: El sistema usa **login universal** - un solo formulario para todos los roles.  
Ver arquitectura completa en [`AUTH_ARCHITECTURE.md`](./AUTH_ARCHITECTURE.md)

### Roles del Sistema

| Rol | Descripción | Registro | Ruta Inicial |
|-----|-------------|----------|--------------|
| **CLIENTE** | Usuario registrado normal | Público (auto-registro) | `/cartelera` |
| **CLIENTE_VIP** | Cliente con beneficios especiales | Admin upgrade | `/cartelera` |
| **CAJERO** | Ventas presenciales | Solo Admin | `/admin/cashier` |
| **ADMIN** | Gestión completa | Solo Admin | `/admin/dashboard` |

### ADMIN
- ✅ Todas las operaciones del sistema
- ✅ CRUD películas, cajeros, funciones, salas
- ✅ Acceso a reportes completos
- ✅ Gestión de usuarios (crear cajeros, upgrade a VIP)
- ✅ Configuración del sistema

### CAJERO
- ✅ Consultar cartelera
- ✅ Realizar ventas presenciales en taquilla
- ✅ Gestionar reservas y confirmaciones
- ✅ CRUD clientes básico
- ❌ No accede a reportes ni configuración

### CLIENTE (Usuario Normal)
- ✅ Ver cartelera y horarios
- ✅ Reservar/comprar boletas online
- ✅ Consultar historial personal
- ✅ Interactuar con chatbot
- ✅ Gestionar perfil personal
- ❌ No tiene descuentos especiales

### CLIENTE_VIP (Usuario Premium)
- ✅ Todo lo de CLIENTE
- ✅ Descuentos especiales en entradas
- ✅ Acceso a funciones exclusivas
- ✅ Prioridad en reservas
- ✅ Beneficios acumulables

---

## 📝 Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token faltante/inválido |
| 403 | Forbidden - Permisos insuficientes |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error |

---

## 🛠️ Implementación en el Frontend

### Estructura de Servicios Propuesta

```javascript
// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado - redirigir a login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

```javascript
// src/services/auth.service.js
import apiClient from './api';

export const authService = {
  async login(credentials) {
    const response = await apiClient.post('/api/auth/login', credentials);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
    return response;
  },

  async getMe() {
    return apiClient.get('/api/auth/me');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
```

```javascript
// src/services/movies.service.js
import apiClient from './api';

export const moviesService = {
  async getAll(estado = 'EN_CARTELERA') {
    return apiClient.get('/api/peliculas', { params: { estado } });
  },

  async getById(id) {
    return apiClient.get(`/api/peliculas/${id}`);
  }
};
```

```javascript
// src/services/funciones.service.js
import apiClient from './api';

export const funcionesService = {
  async getByPelicula(peliculaId) {
    return apiClient.get('/api/funciones', { params: { pelicula_id: peliculaId } });
  },

  async getByFecha(fecha) {
    return apiClient.get('/api/funciones', { params: { fecha } });
  }
};
```

```javascript
// src/services/reservas.service.js
import apiClient from './api';

export const reservasService = {
  async create(reservaData) {
    return apiClient.post('/api/reservas', reservaData);
  },

  async confirm(reservaId) {
    return apiClient.post(`/api/reservas/${reservaId}/confirmar`);
  },

  async cancel(reservaId) {
    return apiClient.post(`/api/reservas/${reservaId}/cancelar`);
  }
};
```

### Custom Hooks Propuestos

```javascript
// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { authService } from '@services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data.usuario);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
};
```

```javascript
// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

export const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFn();
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Error al cargar datos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
};
```

### Zustand Store para Carrito/Reserva

```javascript
// src/stores/cartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  selectedSeats: [],
  funcion: null,
  pelicula: null,
  total: 0,

  setFuncion: (funcion) => set({ funcion }),
  setPelicula: (pelicula) => set({ pelicula }),
  
  addSeat: (seat) => set((state) => ({
    selectedSeats: [...state.selectedSeats, seat],
    total: state.total + (seat.precio || 12)
  })),

  removeSeat: (seatId) => set((state) => ({
    selectedSeats: state.selectedSeats.filter(s => s.id !== seatId),
    total: state.total - (state.selectedSeats.find(s => s.id === seatId)?.precio || 12)
  })),

  clearCart: () => set({
    selectedSeats: [],
    funcion: null,
    pelicula: null,
    total: 0
  })
}));
```

---

## 🔄 Flujo de Navegación Propuesto

### Módulo Cliente
1. **Login** → Obtener token JWT
2. **Home (Cartelera)** → `GET /api/peliculas?estado=EN_CARTELERA`
3. **Click en película** → Navegar a `/horarios/:movieId`
4. **Horarios** → `GET /api/funciones?pelicula_id={id}`
5. **Seleccionar función** → Navegar a `/asientos/:funcionId`
6. **Asientos** → `GET /api/asientos?funcion_id={id}` + `POST /api/reservas`
7. **Proceso de Compra** → `POST /api/ventas`
8. **Confirmación** → Mostrar boleta PDF + código

### Módulo Admin
1. **Login Admin** → Token con rol ADMIN
2. **Dashboard** → `GET /api/reportes/estadisticas`
3. **Gestión Películas** → CRUD en `/api/peliculas`
4. **Gestión Cajeros** → CRUD en `/api/usuarios`
5. **Clientes VIP** → `GET /api/clientes?tipo=VIP`
6. **Log de Accesos** → `GET /api/reportes/log-actividades`

---

## 🌐 Variables de Entorno

Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
VITE_JWT_TOKEN_KEY=cinema_token
```

---

## 📚 Documentación del Backend

- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **Guías completas**: Ver repositorio backend

---

## ✅ Checklist de Integración

- [ ] Configurar Axios con interceptores (auth, errors)
- [ ] Crear servicios por módulo (auth, movies, funciones, reservas)
- [ ] Implementar custom hooks (useAuth, useFetch)
- [ ] Configurar Zustand stores (auth, cart)
- [ ] Manejar estados de loading globalmente
- [ ] Implementar error boundaries
- [ ] Agregar toasts para feedback de acciones
- [ ] Validar expiración de token (redirect a login)
- [ ] Implementar refresh de datos después de mutaciones
- [ ] Testing de integración con endpoints

---

## 🚀 Próximos Pasos

1. **FASE 2**: Construir componentes base (Button, Input, Card)
2. **FASE 3**: Construir componentes complejos (MovieCard, SeatSelector)
3. **FASE 4**: Construir páginas (Cartelera, Horarios, Asientos, Compra)
4. **FASE 5**: **INTEGRACIÓN API** (este documento)
5. **FASE 6**: Testing integral
6. **FASE 7**: Deployment

---

**Última Actualización**: Enero 2025  
**Backend Version**: 90% Completado  
**Frontend Version**: FASE 1 Completada - Listo para FASE 2
