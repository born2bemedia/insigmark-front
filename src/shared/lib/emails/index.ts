export type { EmailTemplateOptions } from './baseTemplate';
export { buildFormConfirmationEmail, escapeHtml } from './baseTemplate';
export {
  getAssistanceRequestConfirmationEmail,
  getCallRequestConfirmationEmail,
  getContactProjectConfirmationEmail,
  getHomeRequestConfirmationEmail,
  getServiceRequestConfirmationEmail,
} from './formTemplates';
