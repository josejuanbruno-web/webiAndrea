# iAndrea — Landing page

## Qué es esto

Landing page de una sola página (SPA) para **iAndrea**, un producto de voz/agente IA para automatizar
llamadas telefónicas (recepción, reservas, soporte, ventas), operado por **Comunica Soluciones S.L.**
(dominio matriz `comunica.com`). Dominio de producción previsto: `iandrea.ai` (ver `robots.txt` /
`sitemap.xml`, aún apuntan ahí aunque no esté desplegado todavía).

Origen: plantilla generada con **Lovable** (`vite_react_shadcn_ts`, `lovable-tagger` en devDependencies).
Stack: Vite + React 18 + TypeScript + Tailwind + shadcn/ui (Radix) + react-router-dom + react-hook-form + zod.

- `src/pages/Index.tsx` → orquesta: `Navbar`, `Hero`, `Industries`, `Benefits`, `ContactForm`, `CTA`, `Footer`.
- `src/pages/AvisoLegal.tsx`, `src/pages/Cookies.tsx` — legales, delegan detalle a comunica.com.
- `src/pages/NotFound.tsx` — 404.
- `src/components/{Navbar,Hero,Industries,IndustryCard,Benefits,ContactForm,CTA,Footer}.tsx` — contenido real.
- `src/components/ui/*` — solo los primitivos de shadcn realmente usados: `button`, `input`, `textarea`,
  `label`, `form`, `card`, `dialog`, `checkbox`, `toast`, `toaster`, `tooltip`. Todo lo demás (accordion,
  carousel, chart, calendar, command, sidebar, etc.) se eliminó porque no se usaba en ningún componente
  de página — venían por defecto del scaffolding original y no aportaban nada al build.

No hay backend propio: el único punto de integración externo es un **webhook POST** desde `ContactForm.tsx`.

El proyecto se originó con **Lovable** (plataforma no-code). Ya se ha limpiado todo rastro de esa
plantilla (ver sección 0) — si en el futuro aparece algo con "lovable" en el nombre, es un resto que
se coló y debería eliminarse igual.

---

## 0. Limpieza ya realizada (sesión 2026-07-08)

Se hizo una pasada completa de limpieza y fixes tras la auditoría inicial. Resumen de lo que cambió:

**Restos de Lovable eliminados:**
- `lovable-tagger` quitado de `vite.config.ts` y `package.json`.
- `README.md` reescrito (antes era el boilerplate genérico de Lovable con enlaces a `lovable.dev`).
- `package.json` renombrado de `vite_react_shadcn_ts` a `iandrea-landing`.
- `bun.lockb` eliminado (coexistía con `package-lock.json`; nos quedamos solo con npm).

**Dependencias y código muerto eliminados** (confirmado por grep que no se usaban en ningún componente
de página, solo en plantilla shadcn sin invocar):
- Paquetes: `@tanstack/react-query`, `sonner`, `next-themes`, `recharts`, `embla-carousel-react`,
  `react-day-picker`, `date-fns`, `input-otp`, `vaul`, `cmdk`, `react-resizable-panels`, y 19
  `@radix-ui/react-*` sin usar (accordion, alert-dialog, aspect-ratio, avatar, collapsible,
  context-menu, dropdown-menu, hover-card, menubar, popover, progress, radio-group, scroll-area,
  select, separator, slider, switch, tabs, toggle, toggle-group).
- Archivos: 31 componentes `src/components/ui/*.tsx` sin uso real, `src/hooks/use-mobile.tsx`,
  `src/App.css` (boilerplate de Vite/React nunca usado), `public/placeholder.svg`,
  `public/_old_favicon.ico`, el array `industries` muerto en `Navbar.tsx` (se declaraba pero nunca
  se renderizaba), `QueryClientProvider`/`Sonner` en `App.tsx` (montados sin ninguna llamada real
  a `useQuery` ni a `toast()` de sonner — el proyecto solo usa el `useToast` de shadcn).
- Resultado: bundle de producción bajó a **404 KB / 128 KB gzip** (`npm run build`), 85 paquetes
  npm menos, `npm audit` bajó de 15 vulnerabilidades a 2 (las 2 restantes son de `esbuild`/`vite` y
  requieren un salto mayor de versión con posibles breaking changes — pendiente de decisión, ver
  sección de pendientes).

**Bugs de conversión arreglados:**
- CTA principal en `CTA.tsx` ("Configura tu Agente IA Ahora") ahora enlaza a `#contacto` (antes no
  hacía nada al pulsarlo).
- Botón "Ver Demo Interactiva" del Hero ahora enlaza al vídeo de YouTube de la demo (antes no tenía
  ninguna acción).
- Footer: los 8 enlaces `href="#"` muertos se sustituyeron por anclas reales a secciones existentes
  (`#beneficios`, `#industrias`, `#contacto`) o al sitio de Comunica; año del copyright ahora es
  dinámico (`{new Date().getFullYear()}`).
- Logo servido localmente desde `public/logo-iandrea.png` (antes se cargaba desde `comunica.com`,
  dependencia de infraestructura ajena para un asset propio).

**Seguridad:**
- Formulario de contacto ahora tiene **honeypot anti-spam** (campo oculto `website`; si llega
  relleno, el submit se descarta en cliente sin llamar al webhook).
- Formulario ahora exige **checkbox de consentimiento RGPD** (enlaza a `/aviso-legal`) antes de
  poder enviar, validado con zod (`consent: z.literal(true)`).
- El webhook (`https://services.thehotels.tv/webhook/pruebazammad2`) sigue hardcodeado en
  `ContactForm.tsx` — **esto sigue pendiente de decisión del usuario**, ver sección 1.

**SEO:**
- `index.html`: añadidos `og:image`, `og:url`, `og:locale`, `og:site_name`, `twitter:title/description/image`,
  `<link rel="canonical">`, `<link rel="icon">` + `apple-touch-icon`, `meta robots`, y un bloque
  JSON-LD `schema.org/Organization`.

**Rendimiento/accesibilidad:**
- `loading="lazy"` + `decoding="async"` en las imágenes de `IndustryCard.tsx` y en el logo del Footer.
- Las 10 URLs de Unsplash en `Industries.tsx` ahora piden `&w=900` en vez de resolución completa.
- `aria-label`/`aria-expanded` añadidos al botón de menú móvil en `Navbar.tsx`.
- `@media (prefers-reduced-motion: reduce)` añadido en `index.css` para las animaciones continuas
  (marquee, float, spins) — usuarios con esa preferencia del sistema ya no las ven.
- `tailwind.config.ts`: quitado el `content` apuntando a carpetas inexistentes (`./pages`, `./app`,
  restos de config genérica de Next.js), quitadas las keyframes de accordion no usadas, y el plugin
  `tailwindcss-animate` ahora se importa con `import` en vez de `require()` (arreglaba un error de lint).
- `src/components/ui/textarea.tsx`: arreglado error de lint (`interface` vacía → `type` alias).

**Verificación:** `npm run build`, `npx tsc --noEmit` y `npm run lint` pasan limpios (0 errores; solo
2 warnings inofensivos de "fast refresh" en `button.tsx`/`form.tsx`, estándar en shadcn). No se pudo
hacer una verificación visual en navegador real dentro de este entorno (sin `chromium-cli` disponible
en esta máquina) — **queda pendiente que el usuario lo valide visualmente en local (`npm run dev`) o
en un preview de producción antes de publicar**.

---

## 1. Pendiente de decisión del usuario (no resuelto por la limpieza, requiere input del negocio)

- **Webhook de contacto**: `https://services.thehotels.tv/webhook/pruebazammad2` — el nombre sugiere
  endpoint de pruebas ("prueba" + "zammad"), y el dominio (`thehotels.tv`) no tiene relación aparente
  con iAndrea/Comunica. Confirmar si es el endpoint de producción correcto antes de publicar. Sigue
  expuesto en el bundle cliente (visible para cualquiera, sin autenticación) — si se quiere ocultarlo
  de verdad, hace falta un backend/serverless propio que actúe de proxy (ver alternativas más abajo).
- **Repo público en GitHub**: `github.com/josejuanbruno-web/webiAndrea` — verificar visibilidad;
  si es público, la URL del webhook es (y ha sido desde el commit `7c90c4f`) visible en el historial
  aunque se cambie ahora.
- **Teléfono/email de contacto real**: no hay ningún dato de contacto directo en la web, solo el
  formulario. ¿Existe ya uno que se pueda mostrar?
- **Dominio `iandrea.com`**: el sitemap, robots.txt y los metadatos OG ya asumen ese dominio — confirmar
  que se va a usar ese antes de publicar (si no, hay que actualizar esas referencias).
- **Prueba social**: no hay testimonios, logos de clientes ni cifras verificables — todo el copy de
  beneficios ("reduce el ausentismo un 40%", "absorbe el 80% de las consultas") son afirmaciones propias
  sin fuente. Esto no se ha tocado en la limpieza porque requiere contenido real del negocio (testimonios,
  casos de uso, o al menos decidir si se suaviza el lenguaje a "hasta un X% en casos similares").
- **Precio**: no se menciona en ningún sitio. Si la estrategia es venta consultiva, está bien, pero
  conviene que el copy lo diga explícitamente en vez de omitirlo sin más.
- **Política de Privacidad propia**: `AvisoLegal.tsx` sigue delegando el tratamiento de datos a las
  políticas corporativas de Comunica sin mencionar el webhook de terceros que recibe los datos del
  formulario de iAndrea. El checkbox de consentimiento ya enlaza a `/aviso-legal`, pero ese contenido
  en sí no cubre el tratamiento específico — si se quiere ser estrictos con RGPD, hace falta ampliarlo.
- **`npm audit fix --force`**: quedan 2 vulnerabilidades (moderate/high) en `esbuild`/`vite` que solo
  se resuelven saltando a Vite 8, un cambio mayor de versión con posibles breaking changes. No se ha
  aplicado porque requiere probar que el build sigue funcionando igual — decidir si merece la pena
  antes de publicar o dejarlo para una iteración posterior.

---

## 2. Otras mejoras de marketing/conversión no aplicadas (requieren copy o assets nuevos)

- Ningún calendario de reserva directa (Calendly/Cal.com) — solo el formulario de contacto con
  respuesta prometida en 24h. Bajaría fricción si se quiere apostar fuerte por conversión.
- Ninguna oferta de lanzamiento/urgencia ("primeras N empresas", "piloto de 30 días").
- El `<title>`/meta describen "automatización de llamadas" de forma clara, pero el Hero usa lenguaje
  muy técnico ("Agente Autónomo de Voz Multimodal", "modelos fundacionales") — vale la pena unificar
  a un único ángulo de beneficio de negocio si se detecta que el público no es técnico.
- Imagen `og:image` actual es el logo (500×242px) — funciona, pero una imagen dedicada de 1200×630px
  con más contexto visual del producto convertiría mejor en redes sociales.

---

## 3. Referencia rápida del stack tras la limpieza

**Dependencias de producción** (`package.json`): `@hookform/resolvers`, `@radix-ui/react-{checkbox,
dialog,label,slot,toast,tooltip}`, `class-variance-authority`, `clsx`, `lucide-react`, `react`,
`react-dom`, `react-hook-form`, `react-router-dom`, `tailwind-merge`, `tailwindcss-animate`, `zod`.

**Comandos:**
```sh
npm run dev       # servidor de desarrollo (puerto 8080, o el siguiente libre)
npm run build     # build de producción a dist/
npm run preview   # sirve el build de producción localmente
npm run lint      # eslint
npx tsc --noEmit  # typecheck
```

## Notas de sesión / historial relevante

- Commits previos muestran que el CTA principal pasó de decir "Gratis" a "Demo" (`35e1c0d`), y que
  el webhook se añadió en `7c90c4f` — es una integración relativamente nueva, no legacy.
- Sesión 2026-07-08: auditoría completa + limpieza de restos de Lovable + fixes de conversión/seguridad/SEO
  descritos en la sección 0. Cambios aún sin commitear en git al cierre de la sesión.
