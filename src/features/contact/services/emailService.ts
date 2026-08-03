import type { ContactFormValues } from '../types/contact.types';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  if (!ACCESS_KEY) {
    throw new Error(
      'Falta la Access Key de Web3Forms. Configura VITE_WEB3FORMS_ACCESS_KEY en tu archivo .env.',
    );
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `Nuevo mensaje de ${values.name} desde el portafolio`,
      name: values.name,
      email: values.email,
      message: values.message,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(result?.message ?? `Error del servidor (${response.status})`);
  }
}
