import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './shared/styles/global.scss';
import App from './App.tsx';

const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Las rutas prerenderizadas llegan con el HTML ya dentro de #root y se hidratan.
// En dev #root llega vacío y se renderiza en cliente como un SPA normal.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
