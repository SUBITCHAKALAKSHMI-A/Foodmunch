import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import WhyChooseUs from './components/WhyChooseUs';
import ExploreMenu from './components/ExploreMenu';
import HealthyFood from './components/HealthyFood';
import DeliveryPayment from './components/DeliveryPayment';
import ThankingCustomers from './components/ThankingCustomers';
import FollowUs from './components/FollowUs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <WhyChooseUs />
      <ExploreMenu />
      <HealthyFood />
      <DeliveryPayment />
      <ThankingCustomers />
      <FollowUs />
      <Footer />
    </div>
  );
}

export default App;