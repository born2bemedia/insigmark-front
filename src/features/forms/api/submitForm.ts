import type {
  AssistanceRequestFormSchema,
  CallRequestFormSchema,
  RequestFormSchema,
} from '../model/schemas';

export async function submitForm(
  formType: 'request' | 'assistance' | 'call',
  data:
    | (RequestFormSchema & { name?: string })
    | AssistanceRequestFormSchema
    | CallRequestFormSchema
): Promise<void> {
  const payload =
    formType === 'request'
      ? { ...data, service: (data as RequestFormSchema & { name?: string }).name ?? (data as RequestFormSchema).service ?? '' }
      : data;
  const body = { formType, data: payload };

  const res = await fetch('/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(json?.message ?? 'Submission failed');
  }
}

export async function submitRequestForm(data: RequestFormSchema, name: string): Promise<void> {
  return submitForm('request', { ...data, name });
}

export async function submitAssistanceRequestForm(
  data: AssistanceRequestFormSchema
): Promise<void> {
  return submitForm('assistance', data);
}

export async function submitCallRequestForm(data: CallRequestFormSchema): Promise<void> {
  const payload = { ...data };
  if (!payload.email || !String(payload.email).trim()) {
    delete (payload as Record<string, unknown>).email;
  }
  return submitForm('call', payload);
}
