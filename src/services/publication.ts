// Owner authorized recovered photographs and listed services on 2026-10-07.
// An explicit false remains available as a publication kill switch.
export const siteApproved =
  process.env.SITE_APPROVED === 'true' ||
  (process.env.VERCEL_ENV === 'production' && process.env.SITE_APPROVED !== 'false');
export const indexable = siteApproved && process.env.VERCEL_ENV === 'production';
