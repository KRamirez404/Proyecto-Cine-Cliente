# 📋 Requerimientos para el Backend - Login Universal

## 🎯 Objetivo

Habilitar un **sistema de login universal** donde clientes, cajeros y administradores usen el mismo formulario de login y se redirijan automáticamente según su rol.

---

## ✅ Lo que YA existe en el backend

Según el análisis del repositorio `Proyecto-Cine-Backend`:

- ✅ Autenticación JWT implementada
- ✅ Endpoint `POST /api/auth/login` funcional
- ✅ Endpoint `POST /api/auth/register` (solo Admin)
- ✅ Roles existentes: `ADMIN`, `CAJERO`
- ✅ Módulo de clientes (`/api/clientes`)
- ✅ Sistema de ventas con tipos de cliente (ADULTO, NIÑO, ESTUDIANTE, TERCERA_EDAD)

---

## ⚠️ Lo que NECESITA modificarse/agregarse

### 1. **Agregar roles CLIENTE y CLIENTE_VIP**

**Modificación en tabla `usuarios`**:

```sql
-- Actualizar enum de roles
ALTER TABLE usuarios 
MODIFY COLUMN rol ENUM('ADMIN', 'CAJERO', 'CLIENTE', 'CLIENTE_VIP') NOT NULL;

-- Agregar campo tipo_cliente (opcional, para categorizar)
ALTER TABLE usuarios 
ADD COLUMN tipo_cliente ENUM('NORMAL', 'VIP', 'ESTUDIANTE', 'TERCERA_EDAD') DEFAULT 'NORMAL';
```

### 2. **Crear endpoint de registro público para clientes**

**Nuevo endpoint**: `POST /api/auth/register-cliente`

**Características**:
- ❌ **SIN autenticación** (público)
- ✅ Crea usuario con rol `CLIENTE`
- ✅ Hash de contraseña automático
- ✅ Validación de email único
- ✅ Validación de usuario único

**Request**:
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
```

**Response esperado**:
```javascript
{
  "success": true,
  "message": "Cliente registrado exitosamente",
  "data": {
    "id": 10,
    "usuario": "juanperez",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "CLIENTE",
    "tipo_cliente": "NORMAL",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Validaciones necesarias**:
- Email único (no repetido)
- Usuario único (no repetido)
- Contraseña mínimo 6 caracteres
- Teléfono formato válido
- Nombre no vacío

### 3. **Modificar endpoint de login para aceptar clientes**

**Endpoint**: `POST /api/auth/login` (ya existe, necesita actualización)

**Cambios necesarios**:
- ✅ Aceptar login de usuarios con rol `CLIENTE` o `CLIENTE_VIP`
- ✅ Retornar rol en el response
- ✅ Retornar `tipo_cliente` si el rol es CLIENTE/CLIENTE_VIP

**Response actual**:
```javascript
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 1,
      "nombre": "Administrador",
      "usuario": "admin",
      "rol": "ADMIN"
    }
  }
}
```

**Response esperado (con tipo_cliente)**:
```javascript
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": 10,
      "nombre": "Juan Pérez",
      "usuario": "juanperez",
      "email": "juan@example.com",
      "rol": "CLIENTE",              // o CLIENTE_VIP
      "tipo_cliente": "NORMAL"       // Solo si rol = CLIENTE o CLIENTE_VIP
    }
  }
}
```

### 4. **Endpoint para upgrade a VIP (Solo Admin)**

**Nuevo endpoint**: `PATCH /api/usuarios/:id/upgrade-vip`

**Características**:
- ✅ Solo accesible por ADMIN
- ✅ Cambia rol de `CLIENTE` a `CLIENTE_VIP`

```javascript
PATCH /api/usuarios/10/upgrade-vip
Authorization: Bearer {admin-token}

// Response
{
  "success": true,
  "message": "Cliente actualizado a VIP exitosamente",
  "data": {
    "id": 10,
    "nombre": "Juan Pérez",
    "rol": "CLIENTE_VIP",
    "tipo_cliente": "VIP"
  }
}
```

### 5. **Endpoint para downgrade de VIP (Solo Admin)**

**Nuevo endpoint**: `PATCH /api/usuarios/:id/downgrade-vip`

```javascript
PATCH /api/usuarios/10/downgrade-vip
Authorization: Bearer {admin-token}

// Response
{
  "success": true,
  "message": "Cliente actualizado a NORMAL",
  "data": {
    "id": 10,
    "rol": "CLIENTE",
    "tipo_cliente": "NORMAL"
  }
}
```

---

## 🔒 Protección de Rutas

### Middleware de autorización (probablemente ya existe)

El middleware debe validar roles en cada ruta:

```javascript
// Ejemplo de middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'No autenticado' });
    }

    if (roles.length && !roles.includes(req.user.rol)) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }

    next();
  };
};

// Uso en rutas
router.get('/api/peliculas', authorize(['ADMIN', 'CAJERO', 'CLIENTE', 'CLIENTE_VIP']), getPeliculas);
router.post('/api/peliculas', authorize(['ADMIN']), createPelicula);
router.post('/api/ventas', authorize(['CAJERO', 'ADMIN']), createVenta);
router.post('/api/reservas', authorize(['CLIENTE', 'CLIENTE_VIP', 'ADMIN']), createReserva);
```

---

## 📊 Tabla de Permisos por Endpoint

| Endpoint | CLIENTE | CLIENTE_VIP | CAJERO | ADMIN |
|----------|---------|-------------|--------|-------|
| `POST /api/auth/register-cliente` | ✅ (público) | ✅ (público) | ✅ (público) | ✅ (público) |
| `POST /api/auth/login` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/peliculas` | ✅ | ✅ | ✅ | ✅ |
| `POST /api/peliculas` | ❌ | ❌ | ❌ | ✅ |
| `GET /api/funciones` | ✅ | ✅ | ✅ | ✅ |
| `POST /api/reservas` | ✅ | ✅ | ❌ | ✅ |
| `POST /api/ventas` | ❌ | ❌ | ✅ | ✅ |
| `GET /api/reportes/*` | ❌ | ❌ | ❌ | ✅ |
| `PATCH /api/usuarios/:id/upgrade-vip` | ❌ | ❌ | ❌ | ✅ |
| `POST /api/auth/register` (admin/cajero) | ❌ | ❌ | ❌ | ✅ |

---

## 🧪 Testing Requerido

### 1. Registro de Cliente
```bash
curl -X POST http://localhost:3000/api/auth/register-cliente \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Cliente",
    "email": "test@example.com",
    "telefono": "555-9999",
    "usuario": "testcliente",
    "contrasena": "test123"
  }'
```

**Resultado esperado**: `201 Created` con usuario creado (rol: CLIENTE)

### 2. Login de Cliente
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "testcliente",
    "contrasena": "test123"
  }'
```

**Resultado esperado**: `200 OK` con token JWT y rol: CLIENTE

### 3. Upgrade a VIP
```bash
curl -X PATCH http://localhost:3000/api/usuarios/10/upgrade-vip \
  -H "Authorization: Bearer {admin-token}"
```

**Resultado esperado**: Usuario con rol: CLIENTE_VIP

### 4. Acceso a Reservas (Cliente)
```bash
curl -X POST http://localhost:3000/api/reservas \
  -H "Authorization: Bearer {cliente-token}" \
  -H "Content-Type: application/json" \
  -d '{
    "funcion_id": 1,
    "asientos": [1, 2]
  }'
```

**Resultado esperado**: `201 Created` - Reserva creada exitosamente

---

## 📝 Checklist de Implementación Backend

### Base de Datos
- [ ] Modificar enum de rol: agregar `CLIENTE`, `CLIENTE_VIP`
- [ ] Agregar campo `tipo_cliente` a tabla usuarios (opcional)
- [ ] Crear índice único en `email` (si no existe)
- [ ] Crear índice único en `usuario` (si no existe)

### Endpoints Nuevos
- [ ] `POST /api/auth/register-cliente` (público)
- [ ] `PATCH /api/usuarios/:id/upgrade-vip` (solo admin)
- [ ] `PATCH /api/usuarios/:id/downgrade-vip` (solo admin)

### Endpoints Modificados
- [ ] `POST /api/auth/login` - Retornar `tipo_cliente` si aplica
- [ ] `GET /api/auth/me` - Incluir `tipo_cliente` en response

### Middleware/Autorizacion
- [ ] Actualizar middleware de autorización para incluir CLIENTE/CLIENTE_VIP
- [ ] Proteger rutas según tabla de permisos
- [ ] Permitir acceso público a `/api/auth/register-cliente`

### Validaciones
- [ ] Email único en registro de cliente
- [ ] Usuario único en registro de cliente
- [ ] Contraseña mínimo 6 caracteres
- [ ] Teléfono formato válido
- [ ] Solo admin puede upgrade/downgrade VIP

### Testing
- [ ] Test de registro de cliente exitoso
- [ ] Test de login de cliente exitoso
- [ ] Test de upgrade a VIP (solo admin)
- [ ] Test de acceso denegado (cliente intenta CRUD películas)
- [ ] Test de acceso permitido (cliente crea reserva)

---

## 🚀 Prioridad de Implementación

### Alta Prioridad (Bloqueante para frontend)
1. ✅ Agregar roles CLIENTE/CLIENTE_VIP a base de datos
2. ✅ Crear endpoint `POST /api/auth/register-cliente` (público)
3. ✅ Modificar `POST /api/auth/login` para aceptar clientes
4. ✅ Actualizar middleware de autorización

### Media Prioridad
5. ✅ Endpoint de upgrade/downgrade a VIP
6. ✅ Proteger rutas según tabla de permisos
7. ✅ Testing de endpoints nuevos

### Baja Prioridad (Mejoras futuras)
8. ⏳ Recuperación de contraseña
9. ⏳ Verificación de email
10. ⏳ Login con redes sociales

---

## 📞 Coordinación Backend-Frontend

### Flujo de Comunicación

1. **Backend implementa cambios** → Actualiza Swagger con nuevos endpoints
2. **Frontend valida con Postman** → Prueba registro y login de cliente
3. **Frontend construye componentes** → Login.jsx, Registro.jsx
4. **Testing integrado** → Probar flujo completo cliente → compra

### Endpoints Críticos para Validar

```bash
# 1. Health check
GET http://localhost:3000/health

# 2. Registro cliente (público)
POST http://localhost:3000/api/auth/register-cliente

# 3. Login universal
POST http://localhost:3000/api/auth/login

# 4. Usuario actual
GET http://localhost:3000/api/auth/me
Authorization: Bearer {token}

# 5. Películas (cliente autenticado)
GET http://localhost:3000/api/peliculas
Authorization: Bearer {cliente-token}
```

---

## ✅ Confirmación de Completitud

Una vez implementado todo lo anterior, el backend estará listo para soportar:

- ✅ Registro público de clientes
- ✅ Login universal (admin, cajero, cliente)
- ✅ Roles diferenciados (CLIENTE, CLIENTE_VIP, CAJERO, ADMIN)
- ✅ Protección de rutas por rol
- ✅ Gestión de clientes VIP por admin

---

**Última Actualización**: Enero 2025  
**Autor**: Frontend Team  
**Destinatario**: Backend Team  
**Estado**: Requerimientos Definidos - Pendiente Implementación Backend
