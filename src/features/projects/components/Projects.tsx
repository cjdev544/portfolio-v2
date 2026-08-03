import { motion } from 'framer-motion';
import { Section } from '../../../shared/components/Section';
import { SectionHeading } from '../../../shared/components/SectionHeading';
import { PROJECTS } from '../data/projects.mock';
import { ProjectCard } from './ProjectCard';
import styles from '../styles/Projects.module.scss';

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Proyectos"
        title="Trabajo reciente"
        description="Una selección de proyectos donde participé en el diseño, desarrollo y despliegue completo de la solución."
      />

      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridVariants}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </Section>
  );
}
