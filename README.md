# CarShip Pro

Plataforma profesional para agencia de autos usados, construida con Next.js 14 (App Router), TypeScript y Tailwind CSS. Consume stock dinámicamente desde Google Sheets con ISR automático.

---

## Tabla de Contenidos

1. [Stack tecnológico](#stack)
2. [Estructura del proyecto](#estructura)
3. [Las 3 propuestas de diseño](#diseños)
4. [Configuración de Google Sheets](#google-sheets)
5. [Manejo de imágenes](#imágenes)
6. [ISR — Auto-actualización](#isr)
7. [WhatsApp Integration](#whatsapp)
8. [Vehículos Vendidos](#vendidos)
9. [Cómo correr el proyecto](#inicio)
10. [Variables de entorno](#variables)
11. [Estructura del Spreadsheet](#spreadsheet)
12. [Roadmap / Próximos pasos](#roadmap)

---

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| **Next.js** | 14.x | Framework (App Router) |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.x | Estilos utilitarios |
| **Framer Motion** | 11.x | Animaciones (Design C) |
| **googleapis** | 140.x | Google Sheets API |
| **lucide-react** | 0.400 | Iconografía |

---

## Estructura

```
carship-pro/
├── src/
│   ├── app/
│   │   ├── page.tsx                # Selector de diseño (home)
│   │   ├── design-a/page.tsx       # Modern Dealer
│   │   ├── design-b/page.tsx       # High-Conversion
│   │   ├── design-c/page.tsx       # Luxury Showcase
│   │   └── api/vehicles/route.ts   # API endpoint con ISR
│   ├── components/
│   │   ├── design-a/               # Componentes Modern Dealer
│   │   ├── design-b/               # Componentes High-Conversion
│   │   └── design-c/               # Componentes Luxury Showcase
│   ├── lib/
│   │   ├── google-sheets.ts        # Integración Google Sheets
│   │   ├── mock-data.ts            # Datos de prueba (12 vehículos)
│   │   └── utils.ts                # Helpers (precio, km, WhatsApp)
│   └── types/
│       └── vehicle.ts              # Tipos TypeScript
├── .env.example                    # Variables de entorno de ejemplo
└── README.md
```

---

## Diseños

El proyecto incluye 3 propuestas visuales completas. Accedé desde `/` (selector) o directamente:

### `/design-a` — Modern Dealer
- **Inspiración:** Tesla, Rivian, Kavak
- **Paleta:** Blanco, Slate-900, Azul (#2563EB)
- **Características:**
  - Layout limpio con mucho espacio en blanco
  - Tipografía sans-serif robusta (Inter)
  - Cards con hover lift y zoom de imagen
  - Filtros colapsables en panel
  - Modal de detalle con specs completos
  - Botón WhatsApp con mensaje predefinido
  - Sección "Sobre nosotros" con stats

### `/design-b` — High-Conversion
- **Inspiración:** Landing pages de alta conversión
- **Paleta:** Negro (#0A0A0A), Amarillo (#FACC15), Naranja (#F97316)
- **Características:**
  - Dark mode total
  - **Botón flotante de WhatsApp** con mensajes rápidos predefinidos
  - Filtros horizontales agresivos siempre visibles
  - Badges de urgencia (disponibles hoy, en línea ahora)
  - Grid de 4 columnas en desktop para mostrar más stock
  - Sección de financiación con CTAs
  - Vehículos vendidos separados al final (grayscale + dimmed)

### `/design-c` — Luxury Showcase
- **Inspiración:** Rolls-Royce, Ferrari, portafolios de lujo
- **Paleta:** Negro (#080808), Oro (#C9A96E), Champagne (#E8D5A3)
- **Características:**
  - Tipografía display (Playfair Display serif) para títulos
  - **Animaciones reveal** con IntersectionObserver (sin dependencia pesada)
  - Hero cinematográfico full-screen con overlay gradiente
  - Tarjeta "destacado" panorámica 21:9 para el primer vehículo
  - Vehículos vendidos como galería en escala de grises muy sutil
  - Líneas doradas como elementos de diseño
  - Modal minimalista de detalle
  - Navegación fixed con glassmorphism al scroll

---

## Google Sheets

### Configuración paso a paso

#### 1. Crear la Spreadsheet
- Abrí [Google Sheets](https://sheets.google.com)
- Nombrá la primera hoja (pestaña) como `Stock`
- Usá este encabezado en la **fila 1** (exactamente así):

```
ID | Marca | Modelo | Año | Precio | Moneda | KM | Tipo | Imagen URL | Estado | Color | Transmisión | Combustible | Puertas | Descripción | Condición | Destacado
```

#### 2. Crear Service Account en Google Cloud
1. Ir a [console.cloud.google.com](https://console.cloud.google.com)
2. Crear un proyecto nuevo (o usar uno existente)
3. Ir a **APIs & Services → Biblioteca**
4. Buscar y habilitar **Google Sheets API**
5. Ir a **APIs & Services → Credenciales**
6. Click en **"+ Crear credenciales" → Cuenta de servicio**
7. Darle un nombre y completar el flujo
8. En la cuenta de servicio creada, ir a **Claves → Agregar clave → JSON**
9. Descargar el archivo JSON — contiene el `client_email` y `private_key`

#### 3. Compartir el Spreadsheet con la Service Account
- En Google Sheets, click en **Compartir**
- Pegar el `client_email` del JSON descargado
- Dar permiso de **"Lector"**

#### 4. Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Completar las variables:
GOOGLE_SHEETS_ID=         # ID del spreadsheet (en la URL)
GOOGLE_CLIENT_EMAIL=      # client_email del JSON
GOOGLE_PRIVATE_KEY=       # private_key del JSON (entre comillas, con \n)
GOOGLE_SHEETS_TAB=Stock   # Nombre de la pestaña
```

> **Tip para la private_key:** En el JSON, la clave viene con saltos de línea reales. En el `.env.local` usá `\n` literal:
> ```
> GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQ...\n-----END RSA PRIVATE KEY-----"
> ```

---

## Imágenes

### Opción A: Google Drive (recomendado para el dueño)
1. Subir la foto del auto a Google Drive
2. Click derecho → **Compartir** → Cambiar a "Cualquier persona con el enlace" (Lector)
3. Copiar el enlace: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
4. Pegar esa URL en la columna **Imagen URL** del Spreadsheet
5. El sistema convierte automáticamente a URL directa: `https://drive.google.com/uc?export=view&id=FILE_ID`

### Opción B: Cloudinary (para mayor control)
1. Crear cuenta en [cloudinary.com](https://cloudinary.com) (plan gratuito disponible)
2. Subir las imágenes al Media Library
3. Copiar la URL `https://res.cloudinary.com/...`
4. Pegar en la columna **Imagen URL**

### Opción C: Cualquier URL pública
Cualquier URL HTTPS que devuelva una imagen JPG/PNG/WebP funciona.

---

## ISR — Auto-actualización

El proyecto usa **Incremental Static Regeneration (ISR)** de Next.js:

```typescript
export const revalidate = 300; // 5 minutos
```

Esto significa:
- La primera visita genera la página estáticamente (rápido)
- Después de 5 minutos, la próxima visita regenera la página en background
- **El dueño puede actualizar el precio en el Spreadsheet y en menos de 5 minutos la web se actualiza sola**, sin necesidad de redeploy

Para cambiar el intervalo, modificar `revalidate` en cada `page.tsx` y en `src/app/api/vehicles/route.ts`.

---

## WhatsApp

El botón de WhatsApp envía un mensaje predefinido con los datos del vehículo:

```
¡Hola! 👋 Me interesa el *Toyota Corolla SEG Hybrid 2023* que vi en el sitio web. ¿Podés darme más información y el precio final? Gracias!
```

Configurar el número en `.env.local`:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=5491112345678
```

Formato: código de país + código de área + número, sin `+`, espacios ni guiones.

**Ejemplos:**
- Argentina Buenos Aires: `5491112345678` (54 + 9 + 11 + 1234-5678)
- Argentina interior: `5493515550000` (54 + 9 + 351 + 555-0000)

---

## Vendidos

Cuando en la columna **Estado** del Spreadsheet se coloca `Vendido`:

- **Design A:** La tarjeta se muestra con `opacity-60` y filtro `grayscale`. El botón muestra "No disponible".
- **Design B:** La tarjeta se muestra al 50% de opacidad y grayscale, separada del stock disponible en una sección propia al final.
- **Design C:** Los vehículos vendidos aparecen en una galería "Historial" ultra-discreta al final, en escala de grises muy tenues.

Para **ocultar completamente** los vendidos, modificar el filtro en cada componente Grid (cambiar `status: 'all'` por `status: 'Disponible'`).

---

## Inicio

### Prerequisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar/acceder al proyecto
cd carship-pro

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Correr en desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) para ver el selector de diseño.

| Ruta | Descripción |
|---|---|
| `/` | Selector de diseño |
| `/design-a` | Modern Dealer |
| `/design-b` | High-Conversion |
| `/design-c` | Luxury Showcase |
| `/api/vehicles` | API REST del stock |

### Build para producción

```bash
npm run build
npm run start
```

---

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `GOOGLE_SHEETS_ID` | Para Sheets | ID del spreadsheet |
| `GOOGLE_CLIENT_EMAIL` | Para Sheets | Email de la service account |
| `GOOGLE_PRIVATE_KEY` | Para Sheets | Clave privada RSA |
| `GOOGLE_SHEETS_TAB` | Opcional | Nombre de la pestaña (default: `Stock`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recomendada | Número de WhatsApp |
| `NEXT_PUBLIC_SITE_NAME` | Opcional | Nombre del sitio |

> Sin credenciales de Google Sheets, el proyecto carga automáticamente 12 vehículos de ejemplo (mock data) y funciona completamente.

---

## Spreadsheet

### Estructura recomendada de columnas

| Columna | Ejemplo | Notas |
|---|---|---|
| ID | `1` | Único por fila |
| Marca | `Toyota` | |
| Modelo | `Corolla SEG Hybrid` | |
| Año | `2023` | Número |
| Precio | `32000` | Solo números, sin símbolos |
| Moneda | `USD` | `USD` o `ARS` |
| KM | `5000` | Solo números |
| Tipo | `Auto` | Auto / Moto / Camioneta / Pickup / SUV |
| Imagen URL | `https://drive.google.com/...` | URL completa |
| Estado | `Disponible` | Disponible / Reservado / Vendido |
| Color | `Blanco Perla` | Opcional |
| Transmisión | `Automático` | Manual / Automático |
| Combustible | `Híbrido` | Nafta / Diesel / Eléctrico / Híbrido / GNC |
| Puertas | `4` | Número |
| Descripción | `Toyota Corolla...` | Texto libre |
| Condición | `Excelente` | Excelente / Muy Bueno / Bueno |
| Destacado | `Si` | Si / No |

> Los headers son case-insensitive y el sistema normaliza acentos, por lo que `Descripción` y `descripcion` son equivalentes.

---

## Roadmap

### Próximas mejoras sugeridas

- [ ] **Página individual de vehículo** (`/stock/[id]`) con URL compartible
- [ ] **Comparador de autos** (seleccionar 2-3 y ver specs lado a lado)
- [ ] **Formulario de "Vender tu auto"** con envío por email/WhatsApp
- [ ] **Panel de administración** simple para gestionar estado sin tocar el Spreadsheet
- [ ] **SEO dinámico** con metadata por vehículo para Google
- [ ] **Galería de imágenes múltiple** por vehículo (varias fotos en el Spreadsheet separadas por coma)
- [ ] **Integración Cloudinary** para resize automático de imágenes
- [ ] **Modo oscuro/claro** toggle en Design A
- [ ] **Búsqueda por voz** con Web Speech API

---

*Generado con Next.js 14 + Google Sheets API + Tailwind CSS*
#   c a r s h i p - m v p  
 