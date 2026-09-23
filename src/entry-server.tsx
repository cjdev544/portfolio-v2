import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.tsx';
import { PROJECTS } from './features/projects/data/projects.mock';
import { pageTitle } from './shared/hooks/useDocumentTitle';

const SITE_URL = 'https://cjdev544.com';

export interface PageMeta {
  title: string;
  description: string;
  url: string;
  image: string;
}

/** Rutas que se generan como HTML estático en el build. */
export const routes: string[] = ['/', ...PROJECTS.map((p) => `/proyectos/${p.id}`)];

/** Meta por ruta; `null` = mantener las de index.html. */
export function getMeta(url: string): PageMeta | null {
  const project = PROJECTS.find((p) => url === `/proyectos/${p.id}`);
  if (!project) return null;

  return {
    title: pageTitle(project.name),
    description: project.description,
    url: `${SITE_URL}${url}`,
    image: `${SITE_URL}${project.coverImage}`,
  };
}

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
