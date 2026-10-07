'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { company } from '@/modules/company/profile';
import styles from './layout.module.css';
const links = [
  ['Soluções', '/solucoes'],
  ['Obras', '/obras'],
  ['Empresa', '/empresa'],
  ['Guias', '/guias'],
  ['Contato', '/contato'],
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header
      className={styles.header}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" aria-label={`${company.name} — início`} onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-negative.svg"
            alt={company.name}
            width={112}
            height={72}
            className={styles.logo}
          />
        </Link>
        <button
          ref={toggle}
          type="button"
          className={styles.menuToggle}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="main-navigation"
          aria-label="Principal"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/orcamento" className={styles.headerCta} onClick={() => setOpen(false)}>
            Solicitar orçamento <Icon name="diagonal" size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
