import type { CSSProperties } from 'react';
type IconName =
  | 'arrow'
  | 'diagonal'
  | 'check'
  | 'pin'
  | 'phone'
  | 'instagram'
  | 'grid'
  | 'ruler'
  | 'layers'
  | 'tool'
  | 'flag'
  | 'message';
const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </>
  ),
  diagonal: (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4c0 2-2 3-4 2C9 20 4 15 3 7c-1-2 0-4 2-4Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  ruler: (
    <>
      <path d="m3 16 13-13 5 5L8 21Z" />
      <path d="m7 12 2 2m2-6 2 2m2-6 2 2" />
    </>
  ),
  layers: (
    <>
      <path d="m2 8 10-5 10 5-10 5ZM2 12l10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  tool: <path d="M21 3a7 7 0 0 1-9 9L5 21l-3-3 9-7a7 7 0 0 1 9-9l-5 5 3 3Z" />,
  flag: (
    <>
      <path d="M5 21V3c5-3 9 4 14 0v10c-5 4-9-3-14 0" />
    </>
  ),
  message: (
    <path d="M21 11a9 9 0 0 1-9 9 10 10 0 0 1-4-1l-6 2 2-6a10 10 0 0 1-1-4 9 9 0 1 1 18 0Z" />
  ),
};
export function Icon({
  name,
  size = 20,
  style,
}: {
  name: IconName;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
