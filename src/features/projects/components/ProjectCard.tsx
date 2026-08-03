import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project.types';
import styles from '../styles/Projects.module.scss';

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [from, to] = project.gradient;
  const navigate = useNavigate();

  function openDetail() {
    navigate(`/proyectos/${project.id}`);
  }

  return (
    <motion.article
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      role="link"
      tabIndex={0}
      onClick={openDetail}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetail();
        }
      }}
    >
      <div className={styles.thumb} style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
        <span className={styles.thumbInitials}>
          {project.name
            .split(/(?=[A-Z])/)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.description}>{project.description}</p>

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>

        <div className={styles.links}>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            Demo <FiArrowUpRight size={15} />
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            Código <FiGithub size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
