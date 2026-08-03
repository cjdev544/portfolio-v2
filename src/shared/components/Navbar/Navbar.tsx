import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useSectionNav } from '../../hooks/useSectionNav'
import styles from './Navbar.module.scss'

const NAV_LINKS = [
  { id: 'home', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'contact', label: 'Contacto' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrollProgress()
  const { pathname } = useLocation()
  const goToSection = useSectionNav()
  const activeId = useActiveSection(pathname === '/' ? NAV_LINKS.map((link) => link.id) : [])

  function handleNavigate(id: string) {
    goToSection(id)
    setMenuOpen(false)
  }

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button
          className={styles.logo}
          onClick={() => handleNavigate('home')}
          aria-label="Ir al inicio"
        >
          <span className={styles.logoMark}>&lt;/&gt;</span>
          CjDev
        </button>

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`${styles.navLink} ${activeId === link.id ? styles.active : ''}`}
              onClick={() => handleNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span
            className={`${styles.bar} ${menuOpen ? styles.barTopOpen : ''}`}
          />
          <span
            className={`${styles.bar} ${menuOpen ? styles.barMidOpen : ''}`}
          />
          <span
            className={`${styles.bar} ${menuOpen ? styles.barBottomOpen : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Navegación móvil"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                className={`${styles.mobileNavLink} ${activeId === link.id ? styles.active : ''}`}
                onClick={() => handleNavigate(link.id)}
              >
                {link.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
