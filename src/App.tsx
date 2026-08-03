import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from './shared/components';
import { scrollToSection } from './shared/utils/scrollTo';
import { Hero } from './features/home';
import { About } from './features/about';
import { Projects, ProjectDetail } from './features/projects';
import { Contact } from './features/contact';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;

    if (state?.scrollTo) {
      const id = state.scrollTo;
      const timer = setTimeout(() => scrollToSection(id), 50);
      navigate(location.pathname, { replace: true, state: {} });
      return () => clearTimeout(timer);
    }

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <About />
      <Projects />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
