import type { ContactProjectFormSchema } from '../model/ContactForm.schema';

const formatList = (items: string[]) => items.join(', ');

export const submitContactProjectForm = async (data: ContactProjectFormSchema) => {
  const formData = new FormData();

  formData.append('fullName', data.fullName);
  formData.append('email', data.email);
  if (data.phone) {
    formData.append('phone', data.phone);
  }

  const message = [
    `Project type: ${formatList(data.projectType)}`,
    `Estimated project scope: ${formatList(data.projectScope)}`,
    `Company / Organization: ${data.companyName || 'Not provided'}`,
    '',
    'Message:',
    data.message,
  ].join('\n');

  formData.append('message', message);
  formData.append('recaptcha', 'disabled');

  const res = await fetch('/api/contact-new', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Submission failed');
  }
};
