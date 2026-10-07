import { Action } from '@/components/ui/Action';
export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">404 · PÁGINA NÃO ENCONTRADA</p>
        <h1>Vamos encontrar outro caminho.</h1>
        <p>
          A página não existe ou ainda não está publicada. Você pode voltar ao início e conhecer as
          soluções.
        </p>
        <Action href="/">Voltar ao início</Action>
      </div>
    </section>
  );
}
