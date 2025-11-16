# 🔌 Conexión Backend - Frontend

Este documento explica cómo está configurada la conexión entre el frontend y el backend.

## ✅ Configuración Completada

### 1. Servicios de API
Se han creado los siguientes servicios en `src/services/`:

- **`api.js`** - Cliente axios configurado con interceptores
- **`auth.service.js`** - Servicios de autenticación
- **`peliculas.service.js`** - Servicios de películas
- **`funciones.service.js`** - Servicios de funciones/horarios
- **`reservas.service.js`** - Servicios de reservas
- **`ventas.service.js`** - Servicios de ventas

### 2. Configuración de Vite
- Proxy configurado en `vite.config.js` para redirigir `/api/*` a `http://localhost:3000`
- Puerto del frontend: `5173`
- Puerto del backend: `3000`

### 3. CORS en Backend
- Configurado para permitir peticiones desde `http://localhost:5173`
- Headers permitidos: `Content-Type`, `Authorization`, `X-Requested-With`
- Métodos permitidos: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`

## 🚀 Cómo Usar

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto frontend:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
VITE_JWT_TOKEN_KEY=cinema_token
```

### Ejemplo de Uso en Componentes

#### Autenticación

```javascript
import { authService } from '@services';

// Login
const handleLogin = async (email, password) => {
  try {
    const response = await authService.login({ email, password });
    if (response.success) {
      // El token y usuario ya están guardados en localStorage
      navigate('/cartelera');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
  }
};

// Verificar autenticación
if (authService.isAuthenticated()) {
  const user = authService.getCurrentUser();
  console.log('Usuario autenticado:', user);
}

// Logout
authService.logout();
```

#### Películas

```javascript
import { peliculasService } from '@services';

// Obtener todas las películas
const fetchPeliculas = async () => {
  try {
    const response = await peliculasService.getAll({ estado: 'EN_CARTELERA' });
    if (response.success) {
      setPeliculas(response.data);
    }
  } catch (error) {
    console.error('Error al obtener películas:', error.message);
  }
};

// Obtener una película por ID
const fetchPelicula = async (id) => {
  try {
    const response = await peliculasService.getById(id);
    if (response.success) {
      setPelicula(response.data);
    }
  } catch (error) {
    console.error('Error al obtener película:', error.message);
  }
};
```

#### Funciones (Horarios)

```javascript
import { funcionesService } from '@services';

// Obtener funciones de una película
const fetchFunciones = async (peliculaId, fecha) => {
  try {
    const response = await funcionesService.getAll({
      pelicula_id: peliculaId,
      fecha: fecha
    });
    if (response.success) {
      setFunciones(response.data);
    }
  } catch (error) {
    console.error('Error al obtener funciones:', error.message);
  }
};

// Obtener asientos disponibles
const fetchAsientos = async (funcionId) => {
  try {
    const response = await funcionesService.getAsientos(funcionId);
    if (response.success) {
      setAsientos(response.data);
    }
  } catch (error) {
    console.error('Error al obtener asientos:', error.message);
  }
};
```

#### Reservas

```javascript
import { reservasService } from '@services';

// Crear una reserva
const crearReserva = async (funcionId, sillaIds) => {
  try {
    const response = await reservasService.create({
      funcion_id: funcionId,
      silla_ids: sillaIds
    });
    if (response.success) {
      console.log('Reserva creada:', response.data);
    }
  } catch (error) {
    console.error('Error al crear reserva:', error.message);
  }
};
```

#### Ventas

```javascript
import { ventasService } from '@services';

// Crear una venta
const crearVenta = async (reservaId, metodoPago) => {
  try {
    const response = await ventasService.create({
      reserva_id: reservaId,
      metodo_pago: metodoPago
    });
    if (response.success) {
      console.log('Venta creada:', response.data);
    }
  } catch (error) {
    console.error('Error al crear venta:', error.message);
  }
};
```

## 🔐 Manejo de Autenticación

El cliente axios está configurado para:

1. **Agregar automáticamente el token** a todas las peticiones desde `localStorage`
2. **Manejar errores 401** redirigiendo automáticamente a `/login`
3. **Limpiar el localStorage** cuando el token expira

## 📝 Notas Importantes

1. **Token JWT**: Se guarda automáticamente en `localStorage` después del login
2. **Interceptores**: Los interceptores manejan automáticamente la autenticación y errores
3. **Proxy en desarrollo**: En desarrollo, Vite redirige `/api/*` al backend automáticamente
4. **Producción**: En producción, asegúrate de configurar `VITE_API_URL` con la URL del backend

## 🧪 Probar la Conexión

1. Inicia el backend:
   ```bash
   cd Proyecto-Cine-Backend
   npm run dev
   ```

2. Inicia el frontend:
   ```bash
   cd Proyecto-Cine-Cliente
   npm run dev
   ```

3. Verifica que el backend esté corriendo:
   - Abre: `http://localhost:3000/health`
   - Deberías ver: `{"success":true,"message":"Server is running",...}`

4. Verifica que el frontend esté corriendo:
   - Abre: `http://localhost:5173`
   - Deberías ver la aplicación React

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con el servidor"
- Verifica que el backend esté corriendo en el puerto 3000
- Verifica que no haya errores en la consola del backend

### Error: "CORS policy"
- Verifica que el backend tenga CORS configurado correctamente
- Verifica que el frontend esté en `http://localhost:5173`

### Error: "401 Unauthorized"
- Verifica que el token esté guardado en `localStorage`
- Verifica que el token no haya expirado
- Intenta hacer login nuevamente

## 📚 Documentación del Backend

- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health

