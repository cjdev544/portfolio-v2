export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string[];
  role: string;
  year: string;
  highlights: string[];
  coverImage: string;
  images: string[];
  tags: string[];
  demoUrl: string;
  /** Ausente = repo privado; la UI muestra "Código privado" en vez de un enlace. */
  repoUrl?: string;
}
