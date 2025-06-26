import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function OrderConfirmed() {
  const { cartTotal, clearCart } = useCart();
  const orderId = `FM${Math.floor(10000 + Math.random() * 90000)}`;

  useEffect(() => {
    clearCart();
    window.scrollTo(0, 0);
  }, [clearCart]);

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 140px)' }}>
      <div className="card shadow mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body p-5 text-center">
          <div className="text-success mb-4">
            <i className="fas fa-check-circle fa-5x"></i>
          </div>
          <h2 className="mb-3">Order Confirmed!</h2>
          <p className="text-muted mb-4">
            Your delicious food is being prepared and will arrive soon
          </p>
          <div className="order-details text-start mb-4">
            <p><strong>Order ID:</strong> #{orderId}</p>
            <p><strong>Estimated Delivery:</strong> 30-40 minutes</p>
            <p><strong>Amount Paid:</strong> ₹{(cartTotal + 40).toFixed(2)}</p>
          </div>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}