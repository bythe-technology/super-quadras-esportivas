import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { JsonLd } from './StructuredData';
import { breadcrumbSchema } from '@/utils/seo';
import styles from './content.module.css';
export function PageIntro({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
}) {
  const items = [{ label: 'Início', href: '/' }, ...breadcrumbs];
  return (
    <section className={styles.pageIntro}>
      <div className="container">
        <JsonLd value={breadcrumbSchema(items)} />
        <nav aria-label="Caminho da página" className={styles.breadcrumb}>
          {items.map((item, i) => (
            <span key={item.href}>
              {i > 0 ? <Icon name="arrow" size={12} /> : null}
              {i === items.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </span>
          ))}
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.introDescription}>{description}</p>
      </div>
    </section>
  );
}
