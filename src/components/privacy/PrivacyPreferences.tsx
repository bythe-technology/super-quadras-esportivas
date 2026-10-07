'use client';
export function PrivacyPreferences() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event('sq-open-consent'))}>
      Preferências de cookies
    </button>
  );
}
