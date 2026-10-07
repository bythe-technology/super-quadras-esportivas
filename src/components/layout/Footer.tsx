import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/modules/company/profile';
import { WhatsAppLink } from '@/components/contact/WhatsAppLink';
import { Icon } from '@/components/ui/Icon';
import { PrivacyPreferences } from '@/components/privacy/PrivacyPreferences';
import styles from './layout.module.css';
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <Image src="/brand/logo-white.svg" alt={company.name} width={136} height={88} />
            <p>
              Espaços preparados para o esporte.
              <br />
              Projetos pensados para o seu uso.
            </p>
          </div>
          <div>
            <h2>Explore</h2>
            <Link href="/solucoes">Nossas soluções</Link>
            <Link href="/obras">Obras e registros</Link>
            <Link href="/empresa">A Super Quadras</Link>
            <Link href="/guias">Guias e informações</Link>
          </div>
          <div>
            <h2>Vamos conversar</h2>
            <WhatsAppLink position="footer">
              <Icon name="phone" />
              {company.phoneDisplay}
            </WhatsAppLink>
            <a href={company.instagram} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" />
              {company.instagramHandle}
            </a>
            <Link href="/orcamento">
              Solicitar orçamento <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div>
            <h2>Atendimento</h2>
            <p>De São Paulo para todo o Brasil.</p>
            <p>Atendimento conforme escopo e logística.</p>
            <Link href="/atendimento">
              Conheça nossa cobertura <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Super Quadras Esportivas</span>
          <div>
            <Link href="/politica-de-privacidade">Privacidade</Link>
            <PrivacyPreferences />
            <span>Desenvolvido pela Bythe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
