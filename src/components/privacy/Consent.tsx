'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_KEY, type AnalyticsConsent } from '@/services/analytics';
import styles from './privacy.module.css';
export function Consent({ gaId }: { gaId?: string }) {
  const [choice, setChoice] = useState<AnalyticsConsent | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === 'accepted' || saved === 'rejected') setChoice(saved);
      else if (gaId) setOpen(true);
    } catch {
      if (gaId) setOpen(true);
    }
    setLoaded(true);
    const show = () => setOpen(true);
    window.addEventListener('sq-open-consent', show);
    return () => window.removeEventListener('sq-open-consent', show);
  }, [gaId]);
  useEffect(() => {
    if (!loaded || choice !== 'accepted' || !gaId) return;
    window.dataLayer ??= [];
    window.gtag ??= function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    const scriptId = 'sq-analytics';
    if (!document.getElementById(scriptId)) {
      window.gtag('js', new Date());
      window.gtag('config', gaId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.append(script);
    }
    // Use only pathname. Never send user-supplied search parameters or referrers.
    window.gtag('event', 'page_view', {
      page_location: `${location.origin}${pathname}`,
      page_referrer: '',
      page_title: document.title,
    });
  }, [choice, loaded, gaId, pathname]);
  function choose(next: AnalyticsConsent) {
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      /* No storage is required for navigation. */
    }
    setChoice(next);
    setOpen(false);
    if (next === 'rejected') {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      window.gtag = undefined;
      document.getElementById('sq-analytics')?.remove();
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.split('=')[0].trim();
        if (/^_ga(?:_|$)/.test(name)) {
          for (const domain of ['', location.hostname, `.${location.hostname}`])
            document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ''} SameSite=Lax`;
        }
      }
      // Reload after revocation to terminate an already loaded third-party runtime.
      if (choice === 'accepted') location.reload();
    }
  }
  if (!loaded || !open) return null;
  return (
    <section className={styles.panel} aria-label="Preferências de privacidade">
      <div>
        <strong>Sua privacidade importa.</strong>
        <p>
          {gaId
            ? 'Com sua permissão, usamos análises para entender a navegação. Recusar não altera o funcionamento do site.'
            : 'As análises estão desativadas nesta versão. Nenhum cookie analítico é necessário para entrar em contato.'}{' '}
          <Link href="/politica-de-privacidade">Saiba mais</Link>.
        </p>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => choose('rejected')}>Recusar análises</button>
        {gaId ? (
          <button onClick={() => choose('accepted')}>Permitir análises</button>
        ) : (
          <button onClick={() => setOpen(false)}>Fechar</button>
        )}
      </div>
    </section>
  );
}
