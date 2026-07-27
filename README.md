# CarShip Pro

> Plataforma profesional para agencia de autos usados. Stock dinámico desde Google Sheets, ISR automático y 3 propuestas visuales listas para elegir.

---

## Tabla de Contenidos

1. [Stack tecnológico](#stack-tecnológico)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Las 3 propuestas de diseño](#las-3-propuestas-de-diseño)
4. [Configuración de Google Sheets](#configuración-de-google-sheets)
5. [Manejo de imágenes](#manejo-de-imágenes)
6. [ISR — Auto-actualización](#isr--auto-actualización)
7. [WhatsApp Integration](#whatsapp-integration)
8. [Vehículos Vendidos](#vehículos-vendidos)
9. [Cómo correr el proyecto](#cómo-correr-el-proyecto)
10. [Variables de entorno](#variables-de-entorno)
11. [Estructura del Spreadsheet](#estructura-del-spreadsheet)
12. [Roadmap](#roadmap)

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **Next.js** | 14.x | Framework (App Router) |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.x | Estilos utilitarios |
| **Framer Motion** | 11.x | Animaciones (Design C) |
| **googleapis** | 140.x | Google Sheets API |
| **lucide-react** | 0.400 | Iconografía |

---

## Estructura del proyecto

```
carship-pro/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Selector de diseño (home)
│   │   ├── design-a/page.tsx        # Modern Dealer
│   │   ├── design-b/page.tsx        # High-Conversion
│   │   ├── design-c/page.tsx        # Luxury Showcase
│   │   └── api/vehicles/route.ts    # API endpoint con ISR
│   ├── components/
│   │   ├── design-a/                # Componentes Modern Dealer
│   │   ├── design-b/                # Componentes High-Conversion
│   │   └── design-c/                # Componentes Luxury Showcase
│   ├── lib/
│   │   ├── google-sheets.ts         # Integración Google Sheets
│   │   ├── mock-data.ts             # Datos de prueba (12 vehículos)
│   │   └── utils.ts                 # Helpers (precio, km, WhatsApp)
│   └── types/
│       └── vehicle.ts               # Tipos TypeScript
├── .env.example                     # Variables de entorno de ejemplo
├── .gitignore
└── README.md
```

---

## Las 3 propuestas de diseño

El proyecto incluye 3 propuestas visuales completas e independientes. Accedé desde `/` (selector) o directamente por URL.

---

### `/design-a` — Modern Dealer

**Inspiración:** Tesla, Rivian, Kavak  
**Paleta:** Blanco · Slate-900 · Azul `#2563EB`

- Layout limpio con mucho espacio en blanco
- Tipografía sans-serif robusta (Inter)
- Cards con hover lift y zoom de imagen
- Filtros colapsables en panel lateral
- Modal de detalle con specs completos
- Botón WhatsApp con mensaje predefinido
- Sección "Sobre nosotros" con estadísticas

---

### `/design-b` — High-Conversion

**Inspiración:** Landing pages de alta conversión  
**Paleta:** Negro `#0A0A0A` · Amarillo `#FACC15` · Naranja `#F97316`

- Dark mode total
- **Botón flotante de WhatsApp** con mensajes rápidos predefinidos
- Filtros horizontales agresivos siempre visibles
- Badges de urgencia (disponibles hoy, en línea ahora)
- Grid de 4 columnas en desktop para mostrar más stock
- Sección de financiación con CTAs
- Vehículos vendidos separados al final (grayscale + dimmed)

---

### `/design-c` — Luxury Showcase

**Inspiración:** Rolls-Royce, Ferrari, portafolios de lujo  
**Paleta:** Negro `#080808` · Oro `#C9A96E` · Champagne `#E8D5A3`

- Tipografía display (Playfair Display serif) para títulos
- **Animaciones reveal** con IntersectionObserver
- Hero cinematográfico full-screen con overlay gradiente
- Tarjeta "destacado" panorámica 21:9 para el primer vehículo
- Vehículos vendidos como galería histórica en escala de grises
- Líneas doradas como elementos de diseño
- Modal minimalista de detalle
- Navegación fixed con glassmorphism al scroll

---

## Configuración de Google Sheets

### 1. Crear la Spreadsheet

- Abrí [Google Sheets](https://sheets.google.com)
- Nombrá la primera hoja (pestaña) como `Stock`
- Usá este encabezado en la **fila 1**:

```
ID | Marca | Modelo | Año | Precio | Moneda | KM | Tipo | Imagen URL | Estado | Color | Transmisión | Combustible | Puertas | Descripción | Condición | Destacado
```

### 2. Crear una Service Account en Google Cloud

1. Ir a [console.cloud.google.com](https://console.cloud.google.com)
2. Crear un proyecto nuevo (o usar uno existente)
3. Ir a **APIs & Services → Biblioteca**
4. Buscar y habilitar **Google Sheets API**
5. Ir a **APIs & Services → Credenciales**
6. Click en **"+ Crear credenciales" → Cuenta de servicio**
7. Darle un nombre y completar el flujo
8. En la cuenta creada, ir a **Claves → Agregar clave → JSON**
9. Descargar el archivo — contiene el `client_email` y `private_key`

### 3. Compartir el Spreadsheet con la Service Account

- En Google Sheets, click en **Compartir**
- Pegar el `client_email` del JSON descargado
- Dar permiso de **Lector**

### 4. Configurar variables de entorno

```bash
cp .env.example .env.local
```

```env
GOOGLE_SHEETS_ID=         # ID del spreadsheet (está en la URL)
GOOGLE_CLIENT_EMAIL=      # client_email del JSON
GOOGLE_PRIVATE_KEY=       # private_key del JSON
GOOGLE_SHEETS_TAB=Stock   # Nombre de la pestaña
```

> **Tip para la `private_key`:** En el `.env.local` los saltos de línea deben escribirse como `\n` literal:
> ```
> GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQ...\n-----END RSA PRIVATE KEY-----"
> ```

---

## Manejo de imágenes

### Opción A — Google Drive _(recomendada para el dueño)_

1. Subir la foto del auto a Google Drive
2. Click derecho → **Compartir** → "Cualquier persona con el enlace" (Lector)
3. Copiar el enlace: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
4. Pegarlo en la columna **Imagen URL** del Spreadsheet

El sistema convierte la URL automáticamente al formato correcto para mostrarla en la web.

### Opción B — Cloudinary

1. Crear cuenta en [cloudinary.com](https://cloudinary.com) (plan gratuito disponible)
2. Subir las imágenes al Media Library
3. Copiar la URL `https://res.cloudinary.com/...` y pegarla en la columna **Imagen URL**

### Opción C — Cualquier URL pública

Cualquier URL HTTPS que apunte a una imagen JPG, PNG o WebP funciona directamente.

---

## ISR — Auto-actualización

El proyecto usa **Incremental Static Regeneration (ISR)** de Next.js con un intervalo de 5 minutos:

```typescript
export const revalidate = 300; // segundos
```

Esto significa que cuando el dueño actualiza un precio o cambia el estado de un vehículo en el Spreadsheet, **la web se actualiza sola dentro de los próximos 5 minutos** sin necesidad de redeploy ni intervención técnica.

Para ajustar el intervalo, modificar `revalidate` en cada `page.tsx` y en `src/app/api/vehicles/route.ts`.

---

## WhatsApp Integration

Cada botón de consulta genera un mensaje predefinido con los datos del vehículo:

```
¡Hola! 👋 Me interesa el *Toyota Corolla SEG Hybrid 2023* que vi en el sitio web.
¿Podés darme más información y el precio final? Gracias!
```

Configurar el número en `.env.local`:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=543493459503
```

El formato es: código de país + código de área + número, sin `+`, espacios ni guiones.

| País / Zona | Ejemplo |
|---|---|
| Argentina — Sunchales (número del sitio) | `543493459503` |
| Argentina — Buenos Aires | `5491155550000` |

---

## Vehículos Vendidos

Cuando la columna **Estado** del Spreadsheet contiene el valor `Vendido`:

| Diseño | Comportamiento |
|---|---|
| **Design A** | Tarjeta en `grayscale` con `opacity-60`. Botón reemplazado por "No disponible". |
| **Design B** | Tarjeta al 50% de opacidad y grayscale, agrupada en sección separada al final del stock. |
| **Design C** | Galería histórica ultra-discreta al final, en escala de grises muy tenue. |

Para **ocultar completamente** los vendidos, cambiar `status: 'all'` por `status: 'Disponible'` en el componente de grilla de cada diseño.

---

## Cómo correr el proyecto

**Requisitos:** Node.js 18+ y npm

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Servidor de desarrollo
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

```bash
# Build de producción
npm run build
npm run start
```

> Sin credenciales de Google Sheets, el proyecto carga automáticamente 12 vehículos de ejemplo y funciona de forma completa.

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

---

## Estructura del Spreadsheet

| Columna | Ejemplo | Notas |
|---|---|---|
| ID | `1` | Único por fila |
| Marca | `Toyota` | |
| Modelo | `Corolla SEG Hybrid` | |
| Año | `2023` | Número entero |
| Precio | `32000` | Solo números, sin símbolos |
| Moneda | `USD` | `USD` o `ARS` |
| KM | `5000` | Solo números |
| Tipo | `Auto` | `Auto` / `Moto` / `Camioneta` / `Pickup` / `SUV` |
| Imagen URL | `https://drive.google.com/...` | URL completa |
| Estado | `Disponible` | `Disponible` / `Reservado` / `Vendido` |
| Color | `Blanco Perla` | Opcional |
| Transmisión | `Automático` | `Manual` / `Automático` |
| Combustible | `Híbrido` | `Nafta` / `Diesel` / `Eléctrico` / `Híbrido` / `GNC` |
| Puertas | `4` | Número |
| Descripción | `Toyota Corolla...` | Texto libre |
| Condición | `Excelente` | `Excelente` / `Muy Bueno` / `Bueno` |
| Destacado | `Si` | `Si` / `No` |

> Los encabezados son case-insensitive y el sistema normaliza acentos, por lo que `Descripción` y `descripcion` son equivalentes.

---

## Roadmap

- [ ] Página individual de vehículo (`/stock/[id]`) con URL compartible
- [ ] Comparador de autos (seleccionar 2-3 y ver specs lado a lado)
- [ ] Formulario de "Vender tu auto" con envío por email/WhatsApp
- [ ] Panel de administración simple para gestionar stock sin tocar el Spreadsheet
- [ ] SEO dinámico con metadata por vehículo para Google
- [ ] Galería de múltiples imágenes por vehículo (URLs separadas por coma en el Spreadsheet)
- [ ] Integración Cloudinary para redimensionado automático de imágenes
- [ ] Toggle modo oscuro/claro en Design A

---

*Next.js 14 · Google Sheets API · Tailwind CSS*
