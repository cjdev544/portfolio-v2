import { motion } from 'framer-motion';
import { Section } from '../../../shared/components/Section';
import { SectionHeading } from '../../../shared/components/SectionHeading';
import { SKILLS } from '../data/skills.mock';
import { SkillBadge } from './SkillBadge';
import styles from '../styles/About.module.scss';

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function About() {
  return (
    <Section id="about" muted>
      <SectionHeading
        eyebrow="Sobre mí"
        title="Desarrollador fullstack enfocado en producto"
        description="Diseño y construyo aplicaciones web de punta a punta, priorizando rendimiento, mantenibilidad y una experiencia de usuario cuidada."
      />

      <div className={styles.grid}>
        <motion.div
          className={styles.bio}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <p>
            Tengo experiencia diseñando arquitecturas limpias y escalables, tanto en el frontend
            como en el backend. Me apasiona transformar ideas en productos funcionales, cuidando
            cada detalle: desde la interacción del usuario hasta la lógica que corre detrás de
            cada API.
          </p>
          <p>
            Trabajo cómodo en todo el stack — construyendo interfaces reactivas, APIs robustas y
            arquitecturas mantenibles — y disfruto especialmente los proyectos donde puedo tener
            impacto de extremo a extremo.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>+3</span>
              <span className={styles.statLabel}>Años de experiencia</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Enfoque en calidad</span>
            </div>
          </div>
        </motion.div>

        <motion.ul
          className={styles.skills}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={listVariants}
        >
          {SKILLS.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} />
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
