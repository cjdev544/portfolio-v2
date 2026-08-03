# Portfolio — Jefferson Campos

Portafolio profesional construido con **React + TypeScript + Vite**, organizado bajo
**Vertical Slice Architecture**: cada feature (Home, About, Projects, Contact) es
autocontenida, con sus propios componentes, hooks, estilos y datos mock.

## Stack

- **React 19** + **TypeScript**
- **Vite** como build tool
- **Sass** (CSS Modules) para estilos
- **Framer Motion** para animaciones
- **React Icons**
- **EmailJS** para el envío real de emails desde el formulario de contacto

## Arquitectura

```
src/
  features/
    home/
      components/     # Hero.tsx
      styles/          # Hero.module.scss
      index.ts         # exporta lo público de la feature
    about/
      components/
      data/             # skills.mock.ts
      types/
      styles/
      index.ts
    projects/
      components/       # Projects.tsx, ProjectCard.tsx
      data/              # projects.mock.ts (3 proyectos de ejemplo)
      types/
      styles/
      index.ts
    contact/
      components/        # Contact.tsx, ContactForm.tsx
      hooks/               # useContactForm.ts (validación + envío)
      services/             # emailService.ts (integración con EmailJS)
      types/
      styles/
      index.ts
  shared/
    components/            # Button, Navbar, Footer, Section, SectionHeading
    hooks/                  # useActiveSection, useScrollProgress
    utils/                  # scrollTo
    styles/                 # _variables.scss, _mixins.scss, global.scss
  App.tsx
  main.tsx
```

Cada feature expone su API pública a través de un `index.ts`, evitando que otras
partes de la app importen directamente sus archivos internos.

## Personalización

Antes de publicar el portafolio, reemplaza:

- **Nombre y rol**: `src/features/home/components/Hero.tsx`
- **Bio y estadísticas**: `src/features/about/components/About.tsx`
- **Skills**: `src/features/about/data/skills.mock.ts`
- **Proyectos** (nombre, descripción, tecnologías, links): `src/features/projects/data/projects.mock.ts`
- **Datos de contacto y redes**: `src/features/contact/components/Contact.tsx` y `src/shared/components/Footer/Footer.tsx`
- **Título y meta tags**: `index.html`

## Configurar el envío de emails (EmailJS)

El formulario de contacto envía los mensajes directamente desde el navegador
usando [EmailJS](https://www.emailjs.com/) — no necesita backend propio, y los
mensajes llegan a **cjdev544@gmail.com**.

1. Crea una cuenta gratuita en [emailjs.com](https://www.emailjs.com/).
2. En **Email Services**, agrega un servicio y conéctalo con tu cuenta de Gmail
   (`cjdev544@gmail.com`). Copia el **Service ID** generado.
3. En **Email Templates**, crea una plantilla con variables `{{from_name}}`,
   `{{from_email}}` y `{{message}}` en el cuerpo del email. Copia el
   **Template ID**.
4. En **Account → General**, copia tu **Public Key**.
5. Copia `.env.example` a `.env` en la raíz del proyecto y completa los tres
   valores:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```

6. Reinicia `npm run dev` para que Vite cargue las nuevas variables de entorno.

El plan gratuito de EmailJS permite 200 emails/mes, suficiente para un
formulario de contacto de portafolio. El archivo `.env` está en `.gitignore`
y nunca debe subirse al repositorio.

## Cómo correr el proyecto

Requiere Node.js 18+.

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción (genera /dist)
npm run build

# Previsualizar el build de producción
npm run preview

# Lint
npm run lint
```

## Notas

- El formulario de contacto valida los campos en el cliente y envía el email
  real vía EmailJS (ver sección de configuración arriba). La lógica de envío
  vive en `src/features/contact/services/emailService.ts` y el estado del
  formulario en `src/features/contact/hooks/useContactForm.ts`.
- Si las credenciales de EmailJS no están configuradas, el formulario muestra
  un mensaje de error en vez de fallar silenciosamente.
- Los 3 proyectos son **ficticios**, pensados para ser reemplazados con
  información real.
