import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
}

export default function QuantityStepper({ value, min = 1, max, onChange, label = 'Cantidad' }: Props) {
  const btn =
    'flex h-9 w-9 items-center justify-center text-ink-700 transition-colors hover:bg-sand-100 disabled:cursor-not-allowed disabled:text-sand-300 disabled:hover:bg-transparent';
  return (
    <div className="inline-flex items-center rounded-md border border-sand-200 bg-white" role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Disminuir cantidad">
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="w-9 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Aumentar cantidad">
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
