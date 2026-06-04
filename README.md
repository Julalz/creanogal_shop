# Creanogal — Carpintería, cocinas y reformas en Las Palmas

Sitio web de **Creanogal (Grupo Nogal)**: presentación de servicios (cocinas, carpintería, reformas y Quooker), portfolio de proyectos, formulario de contacto y una base de tienda online.

Construido con **Next.js 15 (App Router) + React 19**.

---

## 1. Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Lenguaje | TypeScript |
| Estilos | CSS plano por componente + tokens globales (CSS variables) |
| Email | Nodemailer (formulario de contacto) |
| Fuente | Filson Soft (principal) y Gilroy (heredada) |

---

## 2. Puesta en marcha

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:3000)
npm run dev
```

Variables de entorno: copia `.env.example` a `.env` y rellena las credenciales SMTP (ver sección 7).

### Scripts disponibles

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo Next.js |
| `npm run build` | Build de producción de Next.js |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Linter |

---

## 3. Estructura del proyecto

```
src/
├── app/                      # Rutas (App Router)
│   ├── page.tsx              # Home
│   ├── layout.tsx            # Layout raíz (Header, Footer, CookieConsent)
│   ├── globals.css           # Importa los estilos base de /styles
│   ├── cocinas/              # Página de Cocinas (slider)
│   ├── carpinteria/          # Página de Carpintería (galería editorial)
│   ├── reformas/             # Página de Reformas (proceso + showcase)
│   ├── quooker/              # Página de Quooker
│   ├── nosotros/             # Sobre nosotros
│   ├── proyectos/            # Portfolio
│   │   ├── page.tsx          # Índice de proyectos
│   │   └── [slug]/page.tsx   # Detalle de un proyecto (galería + lightbox)
│   ├── contacto/             # Formulario de contacto
│   ├── aviso-legal/ ...      # Páginas legales (plantilla legal.css)
│   ├── (shop)/               # Tienda: productos, carrito, checkout, buscar, categorías
│   ├── (account)/            # Cuenta de usuario y pedidos
│   ├── (auth)/               # Login y registro
│   └── api/                  # API routes: contacto, cart, products, checkout
├── components/               # Componentes por dominio (home, layout, cocinas, proyectos, contacto, product, cart...)
├── lib/                      # Datos y contenido (proyectos, cocinas, carpinteria, reformas, nosotros...)
├── store/ y hooks/           # Estado del carrito (base)
├── types/                    # Tipos (product, cart)
└── styles/                   # Tokens y base: variables, fonts, reset, typography, buttons, layout
```

---

## 4. Mapa de rutas

### Sitio principal (marketing + portfolio) — ✅ implementado

| Ruta | Descripción |
|------|-------------|
| `/` | Home: hero, cita, proyectos destacados, sobre nosotros, servicios |
| `/cocinas` | Cocinas a medida + slider de imágenes |
| `/carpinteria` | Carpintería: hero, manifiesto, galería masonry, bloques |
| `/reformas` | Reformas: hero dividido, estadísticas, proceso, showcase |
| `/quooker` | Ventajas y catálogo Quooker |
| `/nosotros` | Filosofía y compromiso (bloques con imagen) |
| `/proyectos` | Índice de proyectos (tarjetas) |
| `/proyectos/[slug]` | Detalle de proyecto con galería y visor (lightbox) |
| `/contacto` | Contacto rápido + formulario (envía email) |
| `/aviso-legal`, `/politica-cookies`, `/gestion-cookies`, `/politica-privacidad`, `/accesibilidad` | Páginas legales |

### Tienda y cuenta — 🚧 base / scaffolding

| Ruta | Estado |
|------|--------|
| `/productos`, `/productos/[slug]` | Catálogo con productos de ejemplo |
| `/categorias/[slug]` | Categorías |
| `/buscar` | Búsqueda |
| `/carrito`, `/checkout` | Placeholder (pendientes de implementar) |
| `/cuenta`, `/cuenta/pedidos` | Placeholder |
| `/login`, `/registro` | Placeholder |

### API routes

| Endpoint | Método | Estado |
|----------|--------|--------|
| `/api/contacto` | POST | ✅ Envía email con Nodemailer |
| `/api/products` | GET | 🚧 Devuelve `[]` |
| `/api/cart` | — | 🚧 Base |
| `/api/checkout` | POST | 🚧 Base |

---

## 5. Flujo del sitio (visitante)

1. **Home (`/`)** — El visitante llega y ve el hero, una cita, los **proyectos destacados** (3 primeros de `PROYECTOS`, enlazan a su detalle) y la sección de **servicios** (cada tarjeta enlaza a su página).
2. **Servicios** — Desde la home o el menú navega a `/cocinas`, `/carpinteria` o `/reformas`, cada una con su diseño propio y un CTA hacia `/contacto`.
3. **Portfolio** — En `/proyectos` ve las tarjetas; al hacer clic entra en `/proyectos/[slug]`, con la galería de fotos y un **visor a pantalla completa** (flechas, teclado, contador).
4. **Contacto** — En `/contacto` puede usar accesos rápidos (teléfono, WhatsApp, email) o rellenar el formulario.

> Los bloques de marketing del footer (`CtaSection` + `FeaturesStrip`) se ocultan en páginas que ya tienen su propio CTA o son legales. La lista de rutas está en `src/components/layout/FooterFeatures.tsx` (`HIDDEN_ON`).

---

## 6. Flujo del formulario de contacto

1. El usuario rellena `ContactForm` (`src/components/contacto/ContactForm.tsx`): nombre, email, teléfono, servicio y mensaje.
2. Validación en cliente (nombre, email y mensaje obligatorios) y estado de envío (`enviando` → `éxito`/`error`).
3. `POST /api/contacto` (`src/app/api/contacto/route.ts`):
   - Valida los datos en servidor.
   - Crea el **transporter** de Nodemailer con las credenciales SMTP.
   - Envía el correo (texto + HTML) con `replyTo` al email del cliente.
4. La UI muestra confirmación o el mensaje de error devuelto por la API.

---

## 7. Variables de entorno (SMTP)

Define estas variables en tu archivo `.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tucorreo@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion
CONTACT_TO=creanogal@gmail.com
```

> Gmail requiere una **contraseña de aplicación** (con verificación en 2 pasos activada).

---

## 8. Cómo añadir contenido

### Añadir un proyecto al portfolio
1. Crea la carpeta `public/images/proyectos/<n>/` con sus imágenes numeradas (`1.jpeg`, `2.jpeg`...).
2. Añade una entrada a `PROYECTOS` en `src/lib/proyectos-content.ts` (slug, título, categoría, ubicación, año, descripción).
3. Aparecerá automáticamente en `/proyectos` y, si es de los 3 primeros, en la home.

### Añadir imágenes a un slider/galería
- **Cocinas:** edita `COCINAS_SLIDES` en `src/lib/cocinas-content.ts`.
- **Carpintería:** edita `CARPINTERIA_IMAGES` en `src/lib/carpinteria-content.ts`.
- **Reformas:** edita `REFORMAS_IMAGES` en `src/lib/reformas-content.ts`.

> Usa nombres de archivo sin espacios ni caracteres especiales para evitar problemas en las URLs.

---

## 9. Sistema de diseño

Tokens en `src/styles/variables.css`: paleta (negro, dorado `--color-gold`, off-white), tipografía (Filson Soft), espaciados, `--radius-img` (redondeo de imágenes), etc. Clases utilitarias comunes: `.container`, `.heading-serif`, `.label-caps`, `.section--dark/.section--white`, `.btn--gold/.btn--ghost/.btn--outline-dark`.
