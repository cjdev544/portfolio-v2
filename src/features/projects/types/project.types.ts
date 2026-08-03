export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string[];
  role: string;
  year: string;
  highlights: string[];
  images: string[];
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  gradient: [string, string];
}
