import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import WhyChooseUs from './components/WhyChooseUs';
import ExploreMenu from './components/ExploreMenu';
import HealthyFood from './components/HealthyFood';
import DeliveryPayment from './components/DeliveryPayment';
import ThankingCustomers from './components/ThankingCustomers';
import FollowUs from './components/FollowUs';
import CategoryPage from './components/CategoryPage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmed from './components/OrderConfirmed';
import { CartProvider } from './contexts/CartContext';
import { useEffect } from 'react';
function RootLayout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Banner />
      <WhyChooseUs />
      <ExploreMenu />
      <HealthyFood />
      <DeliveryPayment />
      <ThankingCustomers />
      <FollowUs />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;