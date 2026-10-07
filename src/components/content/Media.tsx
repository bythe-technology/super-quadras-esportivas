import Image from 'next/image';
import { contentRepository } from '@/repositories/contentRepository';
import styles from './content.module.css';
export function Media({
  id,
  priority = false,
  sizes = '(max-width: 720px) 100vw, 50vw',
  className,
  caption = true,
}: {
  id: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: boolean;
}) {
  const asset = contentRepository.media(id);
  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <div className={styles.imageFrame}>
        <Image src={asset.src} alt={asset.alt} fill sizes={sizes} preload={priority} quality={85} />
      </div>
      {caption && (asset.caption || asset.kind === 'conceptual-illustration') ? (
        <figcaption className={styles.caption}>
          {asset.caption ?? 'Ilustração conceitual'}
        </figcaption>
      ) : null}
    </figure>
  );
}
