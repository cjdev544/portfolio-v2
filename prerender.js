// Genera un HTML estático por cada ruta a partir del build de cliente (dist/)
// y del bundle de servidor (dist-ssr/). Se ejecuta tras `vite build` en `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(root, 'dist');

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const { render, routes, getMeta, notFound } = await import('./dist-ssr/entry-server.js');

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setMetaContent(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`No se encontró <meta ${attr}="${key}"> en index.html`);
  return html.replace(re, (_, start, end) => `${start}${escapeAttr(value)}${end}`);
}

function applyMeta(html, meta) {
  if (!meta) return html;

  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttr(meta.title)}</title>`);
  html = setMetaContent(html, 'name', 'description', meta.description);
  html = setMetaContent(html, 'property', 'og:title', meta.title);
  html = setMetaContent(html, 'property', 'og:description', meta.description);
  html = setMetaContent(html, 'property', 'og:url', meta.url);
  html = setMetaContent(html, 'property', 'og:image', meta.image);
  html = setMetaContent(html, 'name', 'twitter:title', meta.title);
  html = setMetaContent(html, 'name', 'twitter:description', meta.description);
  html = setMetaContent(html, 'name', 'twitter:image', meta.image);
  return html;
}

// Página 404: nginx la sirve con status 404 para cualquier ruta que no exista.
const notFoundHtml = template
  .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttr(notFound.title)}</title>`)
  .replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
  .replace('<!--app-html-->', () => render(notFound.url));
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
console.log(`prerender: 404 -> dist${path.sep}404.html`);

for (const url of routes) {
  const html = applyMeta(template, getMeta(url)).replace('<!--app-html-->', () => render(url));
  const file = path.join(distDir, url, 'index.html');

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`prerender: ${url} -> ${path.relative(root, file)}`);
}
