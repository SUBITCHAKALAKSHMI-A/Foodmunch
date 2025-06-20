import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CheckoutPage = () => {
  const { cart, cartTotal } = useCart();

  return (
    <div className="checkout-page py-5" style={{ 
      minHeight: 'calc(100vh - 120px)', // Adjust based on header/footer height
      overflow: 'visible'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card shadow mb-4">
              <div className="card-body">
                <h2 className="mb-4">Your Order</h2>
                {cart.map(item => (
                  <div key={`${item.id}-${Math.random()}`} className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                    <div>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-0 small">
                        ₹{item.price} × {item.quantity || 1}
                      </p>
                    </div>
                    <div className="fw-bold">₹{(item.price * (item.quantity || 1)).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card shadow sticky-top" style={{ top: '80px' }}> {/* Adjusted top position */}
              <div className="card-body">
                <h4 className="mb-3">Order Summary</h4>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee:</span>
                  <span>₹40.00</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>₹{(cartTotal + 40).toFixed(2)}</strong>
                </div>
                <Link to="/order-confirmed" className="btn btn-primary w-100 py-2">
                  Confirm Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;