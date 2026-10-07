import { WhatsAppLink } from './WhatsAppLink';
import { Icon } from '@/components/ui/Icon';
import styles from './contact.module.css';
export function FloatingContact() {
  return (
    <WhatsAppLink className={styles.floating} position="floating">
      <Icon name="message" size={20} />
      <span>Vamos conversar</span>
      <span className="sr-only"> pelo WhatsApp, abre em nova aba</span>
    </WhatsAppLink>
  );
}
