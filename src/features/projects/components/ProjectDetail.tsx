import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { Section } from '../../../shared/components/Section';
import { useSectionNav } from '../../../shared/hooks/useSectionNav';
import { PROJECTS } from '../data/projects.mock';
import styles from '../styles/ProjectDetail.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const goToSection = useSectionNav();
  const project = PROJECTS.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLightboxIndex(null);
  }, [id]);

  useEffect(() => {
    if (lightboxIndex === null || !project) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i === null ? i : (i + 1) % project!.images.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) => (i === null ? i : (i - 1 + project!.images.length) % project!.images.length));
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, project]);

  if (!project) {
    return (
      <Section id="project-detail">
        <div className={styles.notFound}>
          <h1>Proyecto no encontrado</h1>
          <p>El proyecto que buscas no existe o fue movido.</p>
          <button className={styles.backLink} onClick={() => goToSection('projects')}>
            <FiArrowLeft size={16} /> Volver a proyectos
          </button>
        </div>
      </Section>
    );
  }

  const [from, to] = project.gradient;

  return (
    <Section id="project-detail">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <button className={styles.backLink} onClick={() => goToSection('projects')}>
          <FiArrowLeft size={16} /> Volver a proyectos
        </button>

        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Proyecto</span>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <FiUser size={14} /> {project.role}
              </span>
              <span className={styles.metaItem}>
                <FiCalendar size={14} /> {project.year}
              </span>
            </div>

            <ul className={styles.tags}>
              {project.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>
                Ver demo <FiArrowUpRight size={16} />
              </a>
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.secondaryAction}>
                Código <FiGithub size={16} />
              </a>
            </div>
          </div>

          <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
            <span className={styles.thumbInitials}>
              {project.name
                .split(/(?=[A-Z])/)
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
            </span>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.copy}>
            {project.longDescription.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className={styles.highlights}>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className={styles.gallery}>
          {project.images.map((src, index) => (
            <button
              key={src}
              type="button"
              className={styles.galleryButton}
              onClick={() => setLightboxIndex(index)}
              aria-label={`Ver captura ${index + 1} de ${project.name} en pantalla completa`}
            >
              <img
                src={src}
                alt={`Captura ${index + 1} de ${project.name}`}
                className={styles.galleryImage}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className={styles.lightboxClose}
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar imagen"
            >
              <FiX size={22} />
            </button>

            {project.images.length > 1 && (
              <button
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? i : (i - 1 + project.images.length) % project.images.length));
                }}
                aria-label="Imagen anterior"
              >
                <FiChevronLeft size={24} />
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              src={project.images[lightboxIndex]}
              alt={`Captura ${lightboxIndex + 1} de ${project.name}`}
              className={styles.lightboxImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />

            {project.images.length > 1 && (
              <button
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? i : (i + 1) % project.images.length));
                }}
                aria-label="Imagen siguiente"
              >
                <FiChevronRight size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
