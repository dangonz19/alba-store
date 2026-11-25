import type { ReactNode } from 'react';

type Tone = 'sale' | 'new' | 'neutral' | 'warning';

const tones: Record<Tone, string> = {
  sale: 'bg-accent text-white',
  new: 'bg-ink-900 text-paper',
  neutral: 'bg-sand-100 text-ink-700',
  warning: 'bg-amber-100 text-amber-900',
};

export default function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>
  );
}
