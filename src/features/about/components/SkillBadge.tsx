import { motion } from 'framer-motion';
import type { Skill } from '../types/skill.types';
import styles from '../styles/About.module.scss';

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <motion.li className={styles.skillBadge} variants={item} whileHover={{ y: -4 }}>
      {skill.name}
    </motion.li>
  );
}
