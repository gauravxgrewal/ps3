import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate
} from 'react-router-dom';

import { useCart } from './hooks/useCart';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ROUTES } from './data/constants';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import BottomNav from './components/BottomNav';
import ErrorBoundary from './components/ErrorBoundary';
import InstallPWA from './components/InstallPWA';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import MenuDetailPage from './pages/MenuDetailPage';
import ContactPage from './pages/ContactPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';

/* ---------------- helpers ---------------- */

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const DocumentTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles = {
      [ROUTES.HOME]: 'PS3 FastFood - Fresh Pizza & Ice Cream Delivery',
      [ROUTES.MENU]: 'Menu - PS3 FastFood',
      [ROUTES.CONTACT]: 'Contact Us - PS3 FastFood',
      [ROUTES.ORDERS]: 'Order History - PS3 FastFood',
      [ROUTES.LOGIN]: 'Login - PS3 FastFood',
      [ROUTES.ADMIN]: 'Admin Dashboard - PS3 FastFood',
      [ROUTES.ADMIN_LOGIN]: 'Admin Login - PS3 FastFood',
    };
    document.title = titles[pathname] || 'PS3 FastFood';
  }, [pathname]);
  return null;
};

/* ---------------- protected route ---------------- */

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // FIX: Use context state directly instead of manual localStorage checks
  if (requireAdmin && !isAdmin) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  if (!requireAdmin && !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

/* ---------------- main app content ---------------- */

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    getItemQuantity,
    clearCart,
    getCartSummary,
  } = useCart();

  // FIX: Auto-redirect Admin to Dashboard if they hit customer pages
  useEffect(() => {
    if (!loading && isAdmin && !location.pathname.startsWith('/admin')) {
      navigate(ROUTES.ADMIN, { replace: true });
    }
  }, [isAdmin, loading, navigate, location.pathname]);

  const handleAddToCart = (item, size = null, action = 'add') => {
    addToCart(item, size, action);
    if (action === 'add') {
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 2000);
    }
  };

  const isAdminRoute = location.pathname.includes('/admin');
  const isLoginRoute = location.pathname.includes('/login');

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <DocumentTitle />

      <div className="min-h-screen flex flex-col bg-gray-50">
        {!isAdminRoute && !isLoginRoute && (
          <>
            <Header
              cartCount={getCartCount()}
              onCartClick={() => setIsCartOpen(true)}
              showNotification={showCartNotification}
            />
            <BottomNav
              cartCount={getCartCount()}
              onCartClick={() => setIsCartOpen(true)}
            />
          </>
        )}

        <main
          id="main-content"
          className={`flex-1 ${
            !isAdminRoute && !isLoginRoute ? 'pb-20 md:pb-0' : ''
          }`}
        >
          <Routes>
            <Route
              path={ROUTES.HOME}
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  getItemQuantity={getItemQuantity}
                />
              }
            />

            <Route
              path={ROUTES.MENU}
              element={
                <MenuPage
                  onAddToCart={handleAddToCart}
                  getItemQuantity={getItemQuantity}
                />
              }
            />

            <Route
              path="/menu/:id"
              element={
                <MenuDetailPage
                  onAddToCart={handleAddToCart}
                  getItemQuantity={getItemQuantity}
                />
              }
            />

            <Route path={ROUTES.CONTACT} element={<ContactPage />} />

            <Route
              path={ROUTES.ORDERS}
              element={
                <ProtectedRoute>
                  <OrderHistoryPage />
                </ProtectedRoute>
              }
            />

            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />

            <Route
              path={ROUTES.ADMIN}
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Fallback for undefined routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {!isAdminRoute && !isLoginRoute && (
          <>
            <CartSidebar
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              total={getCartTotal()}
              clearCart={clearCart}
              getCartSummary={getCartSummary}
            />
            <InstallPWA />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

/* ---------------- router wrapper ---------------- */

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;