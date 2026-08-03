import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { sendContactEmail } from '../services/emailService';
import type { ContactFormErrors, ContactFormValues, SubmitStatus } from '../types/contact.types';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Tu nombre es obligatorio.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }

  if (!values.email.trim()) {
    errors.email = 'Tu email es obligatorio.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Ingresa un email válido.';
  }

  if (!values.message.trim()) {
    errors.message = 'Escribe un mensaje.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errors;
}

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === 'success' || status === 'error') {
      setStatus('idle');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');

    try {
      await sendContactEmail(values);
      setStatus('success');
      setValues(INITIAL_VALUES);
    } catch (error) {
      console.error('Error al enviar el mensaje de contacto:', error);
      setStatus('error');
    }
  }

  return { values, errors, status, handleChange, handleSubmit };
}
