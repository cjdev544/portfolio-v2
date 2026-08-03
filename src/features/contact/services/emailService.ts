import emailjs from '@emailjs/browser';
import type { ContactFormValues } from '../types/contact.types';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'Faltan las credenciales de EmailJS. Configura VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID y VITE_EMAILJS_PUBLIC_KEY en tu archivo .env.',
    );
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: values.name,
      from_email: values.email,
      message: values.message,
      to_email: 'cjdev544@gmail.com',
    },
    { publicKey: PUBLIC_KEY },
  );
}
