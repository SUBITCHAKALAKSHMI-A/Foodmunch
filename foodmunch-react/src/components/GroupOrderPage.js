import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useCart } from '../contexts/CartContext';

const GroupOrderPage = () => {
  const { groupId } = useParams();
  const { cart } = useCart();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Initialize socket and fetch group data
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    const fetchGroupData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/group-orders/${groupId}`);
        if (res.data.success) {
          setGroup(res.data);
        } else {
          throw new Error(res.data.error || "Failed to load group");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
    newSocket.emit('join-group', groupId);
    newSocket.on('group-updated', (updatedGroup) => {
      setGroup(prev => ({ ...prev, group: updatedGroup }));
    });

    return () => newSocket.disconnect();
  }, [groupId]);

  // Add item to group order
  const addToGroup = async (item) => {
    try {
      await axios.post(`http://localhost:5000/api/group-orders/${groupId}/items`, {
        item: {
          user: '686110d263d19399b3da7f14', // Replace with actual user ID
          dish: item.id,
          quantity: item.quantity
        }
      });
    } catch (err) {
      console.error("Failed to add item:", err);
      alert("Failed to add item to group order");
    }
  };

  // Handle payment
  const handlePayment = (amount) => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: amount * 100,
      currency: 'INR',
      name: 'Food Munch',
      description: 'Group Order Payment',
      handler: function(response) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <div className="text-center py-5">Loading group data...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!group) return <div className="alert alert-warning">Group not found</div>;

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="mb-3">Group Order: {groupId}</h2>
          
          {/* Share Link Section */}
          <div className="mb-4">
            <h5>Share this link with friends:</h5>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={`${window.location.origin}/group/${groupId}`}
                readOnly
              />
              <button 
                className="btn btn-outline-secondary"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/group/${groupId}`);
                  alert('Link copied to clipboard!');
                }}
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="row">
            {/* Current Orders */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-body">
                  <h4>Current Orders</h4>
                  {group.group?.items?.length > 0 ? (
                    group.group.items.map((item, index) => (
                      <div key={index} className="py-2 border-bottom">
                        <p className="mb-1">
                          <strong>{item.dish?.name || 'Unknown Item'}</strong> - 
                          ₹{item.dish?.price * item.quantity} (Qty: {item.quantity})
                        </p>
                        <small className="text-muted">
                          Added by: {item.user?.name || 'Unknown User'}
                        </small>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No items added yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Your Cart */}
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h4>Your Cart</h4>
                  {cart.length > 0 ? (
                    cart.map(item => (
                      <div key={item.id} className="py-2 border-bottom">
                        <p>{item.name} (Qty: {item.quantity})</p>
                        <button 
                          onClick={() => addToGroup(item)}
                          className="btn btn-sm btn-primary"
                        >
                          Add to Group
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">Your cart is empty</p>
                  )}
                </div>
              </div>

              {/* Split Bill Section */}
              {group.splits && (
                <div className="card">
                  <div className="card-body">
                    <h4>Split Bill</h4>
                    <p>Total: ₹{group.splits.total.toFixed(2)}</p>
                    <p>Equal Share: ₹{group.splits.equalSplit.toFixed(2)}</p>
                    <button 
                      onClick={() => handlePayment(group.splits.equalSplit)}
                      className="btn btn-success w-100"
                    >
                      Pay Your Share
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupOrderPage;