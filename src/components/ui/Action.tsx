import Link from 'next/link';
import { Icon } from './Icon';
import styles from './ui.module.css';
export function Action({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`${styles.action} ${secondary ? styles.secondary : ''}`} href={href}>
      {children}
      <Icon name="arrow" size={18} />
    </Link>
  );
}
