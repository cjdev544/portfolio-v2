import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import { Button } from '../../../shared/components/Button';
import { scrollToSection } from '../../../shared/utils/scrollTo';
import styles from '../styles/Hero.module.scss';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <motion.div className={styles.content} variants={container} initial="hidden" animate="show">
        <motion.div className={styles.avatarRing} variants={item}>
          <img
            className={styles.avatar}
            src="/profile.jpg"
            alt="Foto de Jefferson Campos"
            width={128}
            height={128}
          />
        </motion.div>

        <motion.span className={styles.badge} variants={item}>
          <span className={styles.dot} />
          Disponible para nuevos proyectos
        </motion.span>

        <motion.h1 className={styles.name} variants={item}>
          Hola, soy <span className={styles.highlight}>Jefferson Campos</span>
        </motion.h1>

        <motion.p className={styles.role} variants={item}>
          Fullstack Developer
        </motion.p>

        <motion.p className={styles.tagline} variants={item}>
          Construyo productos web rápidos, escalables y cuidados al detalle — desde la
          interfaz hasta la API que la sostiene.
        </motion.p>

        <motion.div className={styles.actions} variants={item}>
          <Button variant="primary" icon={<FiArrowRight />} onClick={() => scrollToSection('projects')}>
            Ver proyectos
          </Button>
          <Button variant="secondary" onClick={() => scrollToSection('contact')}>
            Contactarme
          </Button>
        </motion.div>
      </motion.div>

      <motion.button
        className={styles.scrollHint}
        onClick={() => scrollToSection('about')}
        aria-label="Bajar a la sección Sobre mí"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} />
        </motion.span>
      </motion.button>
    </div>
  );
}
