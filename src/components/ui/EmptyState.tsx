import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, message, action }: Props) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-sand-300 bg-white px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sand-100 text-ink-500">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="text-xl">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-ink-500">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
