export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'quote_form_start'
  | 'quote_validation_error'
  | 'quote_whatsapp_open'
  | 'quote_message_copy'
  | 'project_view';
export type AnalyticsConsent = 'accepted' | 'rejected';
export const CONSENT_KEY = 'sq-analytics-consent-v1';
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
export function track(
  event: AnalyticsEvent,
  values: { position?: string; serviceId?: string; projectId?: string } = {},
) {
  try {
    if (localStorage.getItem(CONSENT_KEY) !== 'accepted') return;
    // Only explicitly allowed identifiers, never form values or URL query strings.
    window.gtag?.('event', event, {
      ...(values.position ? { position: values.position } : {}),
      ...(values.serviceId ? { service_id: values.serviceId } : {}),
      ...(values.projectId ? { project_id: values.projectId } : {}),
    });
  } catch {
    /* Analytics must never block the contact flow. */
  }
}
