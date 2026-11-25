import { CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Button from '../ui/Button';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Ingresa un correo válido.');
      return;
    }
    // Simulado: aquí se llamaría a un servicio de newsletter.
    setError('');
    setDone(true);
  };

  return (
    <section className="bg-sand-100">
      <div className="container-page py-14 text-center">
        <h2 className="text-2xl sm:text-3xl">Recibe novedades y ofertas</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
          Un correo al mes con lanzamientos y descuentos. Sin spam.
        </p>

        {done ? (
          <p className="mt-6 inline-flex items-center gap-2 font-medium text-success" role="status">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> ¡Gracias! Te suscribiste correctamente.
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="input"
                aria-invalid={!!error}
                aria-describedby={error ? 'newsletter-error' : undefined}
              />
              {error && <p id="newsletter-error" role="alert" className="mt-1 text-xs text-red-700">{error}</p>}
            </div>
            <Button type="submit" className="sm:self-start">Suscribirme</Button>
          </form>
        )}
      </div>
    </section>
  );
}
