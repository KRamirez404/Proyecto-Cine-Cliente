import { useState } from 'react';
import { Button, Input, Badge, Card } from '@atoms';
import { Play, Search, Mail, User, Heart, Star, ShoppingCart } from 'lucide-react';

/**
 * AtomsDemo - Página de demostración de componentes atómicos
 * 
 * Muestra todos los componentes base con sus variantes, tamaños y estados.
 * Útil para testing visual y documentación del design system.
 */
const AtomsDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Componentes Atómicos
          </h1>
          <p className="text-lg text-neutral-600">
            Design System - FASE 2 Completada ✅
          </p>
        </div>

        {/* Button Component */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">Button</h2>
            <p className="text-neutral-600">
              Componente de botón con múltiples variantes, tamaños y estados
            </p>
          </div>

          {/* Variantes */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Variantes</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
          </Card>

          {/* Tamaños */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tamaños</h3>
            <div className="flex flex-wrap items-end gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>

          {/* Estados */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Estados</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button isLoading>Loading...</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card>

          {/* Con iconos */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Con Iconos</h3>
            <div className="flex flex-wrap gap-4">
              <Button icon={Play}>Reproducir</Button>
              <Button icon={Heart} variant="outline">Me gusta</Button>
              <Button icon={ShoppingCart} variant="success" iconPosition="right">
                Comprar
              </Button>
              <Button icon={Star} variant="ghost" size="sm">
                Favorito
              </Button>
            </div>
          </Card>

          {/* Full width */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Full Width</h3>
            <Button fullWidth variant="primary">Botón de ancho completo</Button>
          </Card>
        </section>

        {/* Input Component */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">Input</h2>
            <p className="text-neutral-600">
              Componente de input con validación y estados visuales
            </p>
          </div>

          {/* Básico */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Básico</h3>
            <div className="space-y-4 max-w-md">
              <Input
                label="Nombre completo"
                placeholder="Ingresa tu nombre"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="Búsqueda"
                placeholder="Buscar película..."
                icon={Search}
              />
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                icon={Mail}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
          </Card>

          {/* Estados */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Estados</h3>
            <div className="space-y-4 max-w-md">
              <Input
                label="Campo normal"
                placeholder="Normal"
              />
              <Input
                label="Con error"
                placeholder="Campo inválido"
                error="Este campo es obligatorio"
              />
              <Input
                label="Validado correctamente"
                placeholder="Campo válido"
                value="usuario@correo.com"
                success
              />
              <Input
                label="Campo deshabilitado"
                placeholder="Deshabilitado"
                value="No editable"
                disabled
              />
            </div>
          </Card>

          {/* Tipos especiales */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tipos</h3>
            <div className="space-y-4 max-w-md">
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <Input
                label="Número de teléfono"
                type="tel"
                placeholder="555-1234"
              />
              <Input
                label="Cantidad de boletos"
                type="number"
                min={1}
                max={10}
                placeholder="1"
              />
            </div>
          </Card>

          {/* Con helper text */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Con Ayuda</h3>
            <div className="space-y-4 max-w-md">
              <Input
                label="Usuario"
                placeholder="usuario123"
                helperText="Debe tener al menos 6 caracteres"
                required
              />
              <Input
                label="Email corporativo"
                type="email"
                placeholder="nombre@empresa.com"
                helperText="Solo se aceptan correos de la empresa"
                icon={Mail}
              />
            </div>
          </Card>
        </section>

        {/* Badge Component */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">Badge</h2>
            <p className="text-neutral-600">
              Componente de etiqueta para géneros, estados y categorías
            </p>
          </div>

          {/* Géneros de películas */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Géneros de Películas</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accion">Acción</Badge>
              <Badge variant="comedia">Comedia</Badge>
              <Badge variant="drama">Drama</Badge>
              <Badge variant="terror">Terror</Badge>
              <Badge variant="scifi">Sci-Fi</Badge>
              <Badge variant="romance">Romance</Badge>
              <Badge variant="infantil">Infantil</Badge>
            </div>
          </Card>

          {/* Estados de asientos */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Estados de Asientos</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="disponible">Disponible</Badge>
              <Badge variant="ocupado">Ocupado</Badge>
              <Badge variant="seleccionado">Seleccionado</Badge>
              <Badge variant="vip">VIP</Badge>
            </div>
          </Card>

          {/* Estados generales */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Estados Generales</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="reservado">Reservado</Badge>
              <Badge variant="confirmado">Confirmado</Badge>
              <Badge variant="cancelado">Cancelado</Badge>
              <Badge variant="default">Por defecto</Badge>
            </div>
          </Card>

          {/* Tamaños */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tamaños</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm" variant="primary">Small</Badge>
              <Badge size="md" variant="primary">Medium</Badge>
              <Badge size="lg" variant="primary">Large</Badge>
            </div>
          </Card>

          {/* Clickeable */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Clickeable (Filtros)</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accion" onClick={() => alert('Acción seleccionado')}>
                Acción
              </Badge>
              <Badge variant="comedia" onClick={() => alert('Comedia seleccionado')}>
                Comedia
              </Badge>
              <Badge variant="drama" onClick={() => alert('Drama seleccionado')}>
                Drama
              </Badge>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              Haz click en los badges para probar interactividad
            </p>
          </Card>

          {/* Sin rounded (cuadrados) */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Sin Bordes Redondeados</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary" rounded={false}>Rectangular</Badge>
              <Badge variant="success" rounded={false}>Éxito</Badge>
              <Badge variant="error" rounded={false}>Error</Badge>
            </div>
          </Card>
        </section>

        {/* Card Component */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-1">Card</h2>
            <p className="text-neutral-600">
              Componente de contenedor reutilizable para crear layouts
            </p>
          </div>

          {/* Variantes */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Variantes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="flat">
                <h4 className="font-semibold text-neutral-900 mb-2">Flat</h4>
                <p className="text-sm text-neutral-600">Sin sombra, fondo sólido</p>
              </Card>
              <Card variant="elevated">
                <h4 className="font-semibold text-neutral-900 mb-2">Elevated</h4>
                <p className="text-sm text-neutral-600">Con sombra (default)</p>
              </Card>
              <Card variant="outlined">
                <h4 className="font-semibold text-neutral-900 mb-2">Outlined</h4>
                <p className="text-sm text-neutral-600">Con borde, sin sombra</p>
              </Card>
              <Card variant="ghost">
                <h4 className="font-semibold text-neutral-900 mb-2">Ghost</h4>
                <p className="text-sm text-neutral-600">Fondo transparente</p>
              </Card>
            </div>
          </div>

          {/* Padding */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Padding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card padding="none" variant="outlined">
                <div className="p-4 bg-primary-50">None</div>
              </Card>
              <Card padding="sm" variant="outlined">
                <div className="bg-primary-50">Small</div>
              </Card>
              <Card padding="md" variant="outlined">
                <div className="bg-primary-50">Medium</div>
              </Card>
              <Card padding="lg" variant="outlined">
                <div className="bg-primary-50">Large</div>
              </Card>
              <Card padding="xl" variant="outlined">
                <div className="bg-primary-50">XL</div>
              </Card>
            </div>
          </div>

          {/* Hoverable */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Hoverable (Interactivo)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card hoverable>
                <h4 className="font-semibold text-neutral-900 mb-2">Pasa el mouse</h4>
                <p className="text-sm text-neutral-600">
                  Se eleva al hacer hover
                </p>
              </Card>
              <Card hoverable onClick={() => alert('Card clickeada!')}>
                <h4 className="font-semibold text-neutral-900 mb-2">Clickeable</h4>
                <p className="text-sm text-neutral-600">
                  Haz click para probar
                </p>
              </Card>
              <Card hoverable variant="outlined">
                <h4 className="font-semibold text-neutral-900 mb-2">Outlined Hover</h4>
                <p className="text-sm text-neutral-600">
                  Combinación de estilos
                </p>
              </Card>
            </div>
          </div>

          {/* Ejemplo de uso real */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Ejemplo de Uso Real</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card de película simulada */}
              <Card hoverable padding="none">
                <div className="aspect-[2/3] bg-gradient-to-br from-primary to-secondary rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-neutral-900">Película de Ejemplo</h4>
                  <div className="flex gap-2">
                    <Badge variant="accion" size="sm">Acción</Badge>
                    <Badge variant="scifi" size="sm">Sci-Fi</Badge>
                  </div>
                  <p className="text-sm text-neutral-600">Descripción de la película...</p>
                  <Button fullWidth size="sm">Ver horarios</Button>
                </div>
              </Card>

              {/* Card de perfil simulada */}
              <Card variant="outlined">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Usuario Demo</h4>
                    <Badge variant="vip" size="sm">VIP</Badge>
                  </div>
                </div>
                <p className="text-sm text-neutral-600 mb-4">
                  Cliente frecuente con beneficios exclusivos
                </p>
                <Button variant="outline" fullWidth size="sm">Ver perfil</Button>
              </Card>

              {/* Card de estadística simulada */}
              <Card variant="flat" className="bg-gradient-to-br from-success to-success-dark text-white">
                <h4 className="text-sm font-medium opacity-90 mb-1">Ventas del día</h4>
                <p className="text-3xl font-bold mb-2">$12,450</p>
                <p className="text-sm opacity-80">+15% vs ayer</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-neutral-200">
          <p className="text-neutral-600">
            ✅ <strong>FASE 2 Completada</strong> - Componentes Atómicos Funcionales
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            Button • Input • Badge • Card
          </p>
        </div>
      </div>
    </div>
  );
};

export default AtomsDemo;
