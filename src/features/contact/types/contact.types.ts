export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';
