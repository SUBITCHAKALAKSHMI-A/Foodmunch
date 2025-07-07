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
import { GroupOrderProvider } from './contexts/GroupOrderContext';
import GroupOrderPage from './components/GroupOrderPage';
import { CartProvider } from './contexts/CartContext';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext'; 
import './App.css'; // or whatever your stylesheet filename is

function RootLayout() {
  return (
    <div className="app-container">
      <Navbar className="navbar" />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer className="footer" />
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
     <AuthProvider>
    <CartProvider>
      <GroupOrderProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/group/:groupId" element={<GroupOrderPage />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </GroupOrderProvider>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;