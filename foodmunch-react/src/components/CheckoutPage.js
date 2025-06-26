import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CheckoutPage = () => {
  const { cart, cartTotal } = useCart();

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h2 className="mb-4">Your Order</h2>
              {cart.map(item => (
                <div key={item.id} className="py-3 border-bottom">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-0">
                        ₹{item.price} × {item.quantity || 1}
                      </p>
                    </div>
                    <div className="fw-bold">₹{(item.price * (item.quantity || 1)).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card shadow sticky-top" style={{ top: '80px' }}>
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
  );
};

export default CheckoutPage;