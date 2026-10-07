import { Action } from '@/components/ui/Action';
import styles from './content.module.css';
export function CallToAction({ service }: { service?: string }) {
  return (
    <section className={styles.cta}>
      <div className={`container ${styles.ctaInner}`}>
        <div>
          <p className="eyebrow">SEU ESPAÇO. NOSSO PRÓXIMO ASSUNTO.</p>
          <h2>
            Vamos tirar seu projeto
            <br />
            do papel?
          </h2>
          <p>Conte o que você precisa. A primeira etapa é uma boa conversa.</p>
        </div>
        <Action href={`/orcamento${service ? `?servico=${service}` : ''}`}>
          Solicitar orçamento
        </Action>
      </div>
    </section>
  );
}
