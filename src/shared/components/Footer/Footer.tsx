import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useSectionNav } from '../../hooks/useSectionNav'
import styles from './Footer.module.scss'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/cjdev544', icon: FiGithub },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/cjdev544',
    icon: FiLinkedin,
  },
  { label: 'Email', href: 'mailto:cjdev544@gmail.com', icon: FiMail },
]

export function Footer() {
  const year = new Date().getFullYear()
  const goToSection = useSectionNav()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => goToSection('home')}>
          &lt;/&gt; CjDev
        </button>

        <div className={styles.social}>
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={styles.socialLink}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className={styles.copy}>© {year} · Hecho con React</p>
      </div>
    </footer>
  )
}
