import { motion } from 'framer-motion';
import { FiArrowRight, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/Button';
import { NOT_FOUND_TITLE, useDocumentTitle } from '../../../shared/hooks/useDocumentTitle';
import { useSectionNav } from '../../../shared/hooks/useSectionNav';
import styles from '../styles/NotFound.module.scss';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

// Se prerenderiza una sola vez como 404.html y se hidrata en cualquier ruta
// desconocida, así que no debe depender de la URL actual.
export function NotFound() {
  const navigate = useNavigate();
  const goToSection = useSectionNav();

  useDocumentTitle(NOT_FOUND_TITLE);

  return (
    <main className={styles.notFound}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
        <motion.span className={styles.code} variants={item} aria-hidden="true">
          404
        </motion.span>

        <motion.span className={styles.eyebrow} variants={item}>
          Error 404 · Página no encontrada
        </motion.span>

        <motion.h1 className={styles.title} variants={item}>
          Esta ruta no lleva a ninguna parte
        </motion.h1>

        <motion.p className={styles.text} variants={item}>
          La página que buscas no existe o fue movida. Puedes volver al inicio o echar un vistazo a
          los proyectos.
        </motion.p>

        <motion.div className={styles.actions} variants={item}>
          <Button variant="primary" icon={<FiHome />} onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
          <Button variant="secondary" icon={<FiArrowRight />} onClick={() => goToSection('projects')}>
            Ver proyectos
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
