import { afterEach, describe, it, expect, vi } from 'vitest';
import { track } from '@/services/analytics';
afterEach(() => vi.unstubAllGlobals());
describe('analytics privacy', () => {
  it('does not emit events without consent', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
    vi.stubGlobal('localStorage', { getItem: () => 'rejected' });
    track('whatsapp_click');
    expect(gtag).not.toHaveBeenCalled();
  });
  it('only serializes whitelisted identifiers', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
    vi.stubGlobal('localStorage', { getItem: () => 'accepted' });
    const input = {
      position: 'quote',
      serviceId: 'pisos-esportivos',
      name: 'Private name',
      city: 'Private city',
    };
    track('quote_whatsapp_open', input);
    expect(gtag).toHaveBeenCalledWith('event', 'quote_whatsapp_open', {
      position: 'quote',
      service_id: 'pisos-esportivos',
    });
  });
  it('does not break contact when storage throws', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('Storage blocked');
      },
    });
    expect(() => track('quote_message_copy')).not.toThrow();
  });
});
