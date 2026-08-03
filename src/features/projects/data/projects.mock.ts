import type { Project } from '../types/project.types';

export const PROJECTS: Project[] = [
  {
    id: 'transcribemind',
    name: 'TranscribeMind',
    description:
      'Plataforma que transcribe videos con IA, genera un resumen ejecutivo con capítulos navegables, y permite chatear directamente con el contenido del video.',
    longDescription: [
      'TranscribeMind resuelve un problema simple pero tedioso: convertir un video largo en algo que se pueda leer y explorar en segundos. Subes un archivo, un enlace directo o un video de YouTube, el sistema extrae el audio y lo transcribe con Whisper, y GPT-4o genera un resumen ejecutivo, puntos clave, capítulos y keywords en el idioma que elijas, aunque el video esté en otro. Sobre esa base, un chat con IA responde preguntas puntuales sobre el contenido del video, manteniendo el historial de la conversación.',
      'Es un monorepo con tres servicios backend independientes (gateway, worker de video y servicio de IA) que se comunican por colas con Redis/BullMQ, así cada etapa pesada escala por separado y un fallo en el resumen de IA no bloquea la transcripción. El estado del procesamiento se refleja en tiempo real en el frontend vía WebSockets, con notificaciones del navegador para no tener que quedarse vigilando la pestaña.',
    ],
    role: 'Desarrollo full stack de un monorepo con 4 servicios (web, gateway-api, video-worker y ai-summary-service) comunicados por colas',
    year: '2026',
    highlights: [
      'Transcripción con Whisper y resumen con GPT-4o, con capítulos navegables y traducción automática de idioma',
      'Chat con IA para preguntar directamente sobre el contenido del video, sincronizado con el reproductor',
      'Arquitectura por colas (Redis/BullMQ): cada servicio escala y falla de forma independiente',
      'Estado del procesamiento en tiempo real vía WebSockets, con notificaciones del navegador al completarse',
      'Login con email/contraseña o Google, instalable como PWA, con almacenamiento de videos en AWS S3',
    ],
    images: ['/projects/transcribemind/1.jpg', '/projects/transcribemind/2.jpg', '/projects/transcribemind/3.jpg'],
    tags: ['React', 'TypeScript', 'Socket.io', 'Redis', 'Docker'],
    demoUrl: 'https://transcribemind.cjdev544.com',
    repoUrl: 'https://github.com/cjdev544/TranscribeMind',
    gradient: ['#7c5cff', '#34e0d0'],
  },
  {
    id: 'baby-dreams',
    name: 'Baby Dreams',
    description:
      'PWA para rastrear el sueño de un bebé, predecir su próximo plan de descanso y compartir el seguimiento entre toda la familia en tiempo real.',
    longDescription: [
      'Baby Dreams nace para que el seguimiento del sueño de un bebé no dependa de una sola persona: cada cuidador (mamá, papá, abuelo, niñera) tiene su propia cuenta y ve en vivo lo que registran los demás sobre el mismo bebé. Al iniciar o terminar una siesta, la app recalcula al instante el plan de sueño restante del día combinando matemática local con IA que solo narra patrones ya verificados en el historial, nunca los inventa.',
      'Incluye un "Baby Coach" para resolver dudas puntuales sobre el sueño del bebé, notificaciones push antes de la siguiente siesta, e insights con estadísticas sobre las últimas semanas. Todo se persiste en MongoDB para que la información sobreviva a reinicios y esté disponible para todos los cuidadores invitados.',
    ],
    role: 'Desarrollo full stack (backend en tiempo real, frontend PWA y lógica de predicción de sueño)',
    year: '2026',
    highlights: [
      'Plan de sueño recalculado en vivo combinando matemática local e IA verificada contra el historial',
      'Colaboración multiusuario en tiempo real: varios cuidadores sobre el mismo bebé',
      '"Baby Coach" con IA para responder dudas sobre el sueño del bebé',
      'Notificaciones push antes de la siguiente siesta o dormir de noche',
      'Insights con estadísticas semanales: duración promedio de siesta, tendencia de sueño y día con mejor calidad',
      'Sistema de logros que se desbloquean con el uso: primer registro, récord de siesta, mejor semana...',
    ],
    images: ['/projects/baby-dreams/1.jpg', '/projects/baby-dreams/2.jpg', '/projects/baby-dreams/3.jpg'],
    tags: ['React', 'TypeScript', 'Express', 'MongoDB', 'Socket.io'],
    demoUrl: 'https://dreams.cjdev544.com',
    repoUrl: 'https://github.com/cjdev544/baby-dreams',
    gradient: ['#ff6b6b', '#ffb86b'],
  },
  {
    id: 'kosmos',
    name: 'Kosmos',
    description:
      'Agenda virtual modular donde cada espacio (tareas, calendario, finanzas) se personaliza según cómo trabaja o vive cada usuario.',
    longDescription: [
      'Kosmos parte de una idea simple: no todo el mundo organiza su vida igual, así que en vez de una agenda rígida, cada usuario arma "espacios" con el módulo que necesita — un tablero Kanban para el trabajo, una lista para las finanzas, un calendario para lo demás — con plantillas listas para estudiantes, freelancers o el hogar.',
      'El backend sigue arquitectura hexagonal por módulo (dominio, casos de uso e infraestructura separados) para que la lógica de negocio no dependa de Express ni de Prisma, y el frontend organiza cada feature en slices verticales completos. Es una PWA con notificaciones push para no perderse ninguna tarea.',
    ],
    role: 'Desarrollo full stack con arquitectura hexagonal en el backend y vertical-slice en el frontend',
    year: '2026',
    highlights: [
      'Espacios modulares (tablero, lista, calendario) con plantillas por tipo de usuario',
      'Backend con arquitectura hexagonal: dominio aislado de Express y Prisma',
      'Tablero Kanban con drag & drop entre columnas, prioridades y fechas, además de vista de calendario',
      'PWA instalable con notificaciones push',
    ],
    images: ['/projects/kosmos/1.jpg', '/projects/kosmos/2.jpg', '/projects/kosmos/3.jpg'],
    tags: ['React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker'],
    demoUrl: 'https://kosmos.cjdev544.com',
    repoUrl: 'https://github.com/cjdev544/kosmos',
    gradient: ['#34e0d0', '#5c3fd6'],
  },
  {
    id: 'optimizer-cv',
    name: 'CV Optimizer',
    description:
      'App web y extensión de Chrome que usa IA para adaptar un CV a una oferta de empleo específica, protegiendo los datos personales del candidato.',
    longDescription: [
      'CV Optimizer toma el CV real de un candidato y una oferta de empleo, y reescribe y prioriza la experiencia relevante sin inventar tecnologías, títulos ni fechas que no estén en el original — detecta automáticamente el idioma de la oferta y responde en ese idioma aunque el CV esté en otro, y además genera un mensaje de presentación personalizado.',
      'Antes de que el CV salga hacia el proveedor de IA, un servicio de enmascarado reemplaza nombre, email, teléfono y dirección por símbolos opacos, y los restaura solo en la respuesta final: el proveedor externo nunca ve el dato real. El mismo componente de React se monta tanto en la app web como en el popup de la extensión de Chrome (Manifest V3), sin duplicar lógica entre ambos.',
    ],
    role: 'Desarrollo full stack con arquitectura hexagonal, incluyendo la extensión de Chrome (Manifest V3)',
    year: '2026',
    highlights: [
      'Enmascarado de datos personales (PII) antes de enviar el CV a la IA, restaurados solo en el resultado final',
      'Regla de cero alucinación: nunca inventa experiencia, tecnologías ni fechas',
      'Detecta el idioma de la oferta y responde en ese idioma, aunque el CV esté en otro',
      'Score de Coincidencia ATS antes/después de optimizar, para medir el impacto real del cambio',
      'Genera un mensaje de presentación personalizado, listo para copiar o adaptar',
      'Exporta el CV optimizado a PDF con formato real, no un volcado de texto plano',
      'Mismo código para la app web y el popup de la extensión de Chrome, sin duplicar lógica',
    ],
    images: ['/projects/optimizer-cv/1.jpg', '/projects/optimizer-cv/2.jpg'],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Express', 'Chrome Extension'],
    demoUrl: 'https://cv.cjdev544.com',
    repoUrl: 'https://github.com/cjdev544/optimizer-cv',
    gradient: ['#ff6b6b', '#7c5cff'],
  },
];
