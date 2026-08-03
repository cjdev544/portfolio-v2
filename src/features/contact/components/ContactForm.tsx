import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiSend } from 'react-icons/fi';
import { Button } from '../../../shared/components/Button';
import { useContactForm } from '../hooks/useContactForm';
import styles from '../styles/Contact.module.scss';

export function ContactForm() {
  const { values, errors, status, handleChange, handleSubmit } = useContactForm();
  const isSubmitting = status === 'submitting';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.errorText}>
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.errorText}>
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Cuéntame sobre tu proyecto..."
          className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className={styles.errorText}>
            {errors.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        icon={<FiSend />}
        disabled={isSubmitting}
        className={styles.submit}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </Button>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            className={styles.success}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="status"
          >
            <FiCheckCircle size={18} />
            ¡Mensaje enviado! Te responderé lo antes posible.
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            className={styles.errorBanner}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="alert"
          >
            <FiAlertCircle size={18} />
            No se pudo enviar el mensaje. Intenta de nuevo o escríbeme directo a cjdev544@gmail.com.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
