import { useEffect } from 'react';

/** Debe coincidir con el <title> de index.html. */
export const DEFAULT_TITLE = 'Jefferson Campos · Fullstack Developer';

export function pageTitle(name: string): string {
  return `${name} · Jefferson Campos`;
}

/**
 * Mantiene document.title sincronizado al navegar en cliente. El HTML
 * prerenderizado ya trae el título correcto en la carga inicial.
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
