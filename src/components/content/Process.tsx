import { Icon } from '@/components/ui/Icon';
import styles from './content.module.css';
const steps = [
  {
    title: 'Entendimento',
    description: 'Seu espaço, suas modalidades e o que você precisa.',
    icon: 'message',
  },
  {
    title: 'Avaliação',
    description: 'As condições do local orientam as possibilidades.',
    icon: 'ruler',
  },
  {
    title: 'Proposta',
    description: 'Escopo e etapas claros para tomar uma decisão.',
    icon: 'layers',
  },
  {
    title: 'Execução',
    description: 'Organização das atividades conforme o projeto.',
    icon: 'tool',
  },
  {
    title: 'Entrega',
    description: 'Conferência do escopo e orientações de conservação.',
    icon: 'flag',
  },
] as const;
export function Process() {
  return (
    <ol className={styles.process}>
      {steps.map((step, index) => (
        <li key={step.title}>
          <div className={styles.processTop}>
            <span>0{index + 1}</span>
            <Icon name={step.icon} size={25} />
          </div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
