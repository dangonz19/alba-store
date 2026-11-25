import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './context/CartContext';
import { CatalogProvider } from './context/CatalogContext';
import { FavoritesProvider } from './context/FavoritesContext';
import '@fontsource-variable/inter/opsz.css';
import '@fontsource-variable/manrope';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <CatalogProvider>
          <CartProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </CartProvider>
        </CatalogProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
