import type { ReactNode } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
}

export function Section({ id, children, className, muted }: SectionProps) {
  const classes = [styles.section, muted && styles.muted, className].filter(Boolean).join(' ');

  return (
    <section id={id} className={classes}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
