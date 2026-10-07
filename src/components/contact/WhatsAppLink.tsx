'use client';
import type { ReactNode } from 'react';
import { createWhatsAppUrl } from '@/services/whatsapp';
import { track } from '@/services/analytics';
export function WhatsAppLink({
  children,
  className,
  position,
  message,
  serviceId,
}: {
  children: ReactNode;
  className?: string;
  position: string;
  message?: string;
  serviceId?: string;
}) {
  return (
    <a
      href={createWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track('whatsapp_click', { position, serviceId })}
    >
      {children}
    </a>
  );
}
