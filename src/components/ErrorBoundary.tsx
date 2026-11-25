import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  hasError: boolean;
}

/** Evita que un error de render deje la pantalla en blanco. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error de la aplicación:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <h1 className="text-3xl">Algo salió mal</h1>
        <p className="mt-3 max-w-md text-ink-500">Ocurrió un error inesperado. Recarga la página para intentarlo de nuevo.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Recargar
        </button>
      </div>
    );
  }
}
