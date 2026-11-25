import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  side?: 'left' | 'right';
  children: ReactNode;
}

/** Panel lateral accesible: cierra con Escape o clic en el fondo, bloquea el scroll del body. */
export default function Drawer({ open, title, onClose, side = 'left', children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink-900/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute top-0 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl ${side === 'left' ? 'left-0' : 'right-0'}`}
      >
        <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
          <h2 className="text-lg">{title}</h2>
          <button type="button" onClick={onClose} className="rounded p-1.5 text-ink-500 hover:bg-sand-100" aria-label="Cerrar">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
