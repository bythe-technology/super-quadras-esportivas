import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import styles from './content.module.css';
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkText,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className={styles.sectionHeading} data-motion-heading>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className={styles.textLink}>
          {linkText}
          <Icon name="arrow" size={18} />
        </Link>
      ) : null}
    </div>
  );
}
