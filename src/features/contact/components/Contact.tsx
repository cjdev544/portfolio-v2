import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { Section } from '../../../shared/components/Section'
import { SectionHeading } from '../../../shared/components/SectionHeading'
import { ContactForm } from './ContactForm'
import styles from '../styles/Contact.module.scss'

const CONTACT_INFO = [
  { icon: FiMail, label: 'Email', value: 'cjdev544@gmail.com' },
  { icon: FiPhone, label: 'Teléfono', value: '+34 641 87 51 83' },
  { icon: FiMapPin, label: 'Ubicación', value: 'Málaga España' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Contact() {
  return (
    <Section id="contact" muted>
      <SectionHeading
        eyebrow="Contacto"
        title="Hablemos de tu próximo proyecto"
        description="¿Tienes una idea en mente o una oportunidad para colaborar? Escríbeme y te responderé pronto."
      />

      <div className={styles.grid}>
        <motion.div
          className={styles.info}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className={styles.infoItem}>
              <span className={styles.infoIcon}>
                <Icon size={18} />
              </span>
              <div>
                <p className={styles.infoLabel}>{label}</p>
                <p className={styles.infoValue}>{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  )
}
