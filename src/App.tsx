import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CartPage from './pages/Cart';
import CatalogPage from './pages/Catalog';
import CategoriesPage from './pages/Categories';
import CheckoutPage from './pages/Checkout';
import FavoritesPage from './pages/Favorites';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import OrderConfirmationPage from './pages/OrderConfirmation';
import ProductDetailPage from './pages/ProductDetail';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="productos" element={<CatalogPage />} />
        <Route path="productos/:slug" element={<ProductDetailPage />} />
        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="pedido-confirmado" element={<OrderConfirmationPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
