import React, { useEffect, useState, useCallback } from 'react';
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
  const [currentUserId] = useState('686110d263d19399b3da7f14');

  const calculateSplits = useCallback((groupData) => {
    if (!groupData?.items) return null;

    const total = groupData.items.reduce(
      (sum, item) => sum + (item.dish?.price || 0) * item.quantity, 0
    );
    const memberCount = groupData.members?.length || 1;

    return {
      total,
      equalSplit: total / memberCount,
      itemizedSplit: groupData.items.reduce((acc, item) => {
        const userId = item.user?._id?.toString();
        if (userId) {
          acc[userId] = (acc[userId] || 0) + (item.dish?.price || 0) * item.quantity;
        }
        return acc;
      }, {})
    };
  }, []);

  const fetchGroupData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/group-orders/${groupId}`);
      if (res.data.success) {
        setGroup({
          ...res.data,
          splits: calculateSplits(res.data.group)
        });
      } else {
        throw new Error(res.data.error || "Failed to load group");
      }
    } catch (err) {
      console.error("Group fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [groupId, calculateSplits]);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    fetchGroupData();
    socket.emit('join-group', groupId);

    socket.on('group-updated', (updatedGroup) => {
      setGroup(prev => ({
        ...prev,
        group: updatedGroup,
        splits: calculateSplits(updatedGroup)
      }));
    });

    socket.on('connect_error', (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, [groupId, fetchGroupData, calculateSplits]);

  const addToGroup = async (item) => {
    try {
      if (!item._id) throw new Error("Dish ObjectId (_id) is missing");

      const apiUrl = `http://localhost:5000/api/group-orders/${groupId}/items`;

      const response = await axios.post(
        apiUrl,
        {
          userId: currentUserId,
          dishId: item._id,
          quantity: item.quantity || 1
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to add item");
      }

      await fetchGroupData();
    } catch (error) {
      console.error("Error adding item to group:", {
        error: error.message,
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data
      });
      alert(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handlePayment = (amount) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: amount * 100,
      currency: 'INR',
      name: 'Food Munch',
      description: 'Group Order Payment',
      handler: function (response) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onerror = () => console.error('Razorpay SDK failed to load');
      document.body.appendChild(script);
    }
  }, []);

  if (loading) return <div className="text-center py-5">Loading group data...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!group) return <div className="alert alert-warning">Group not found</div>;

  return (
    <div className="container py-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="mb-3">Group Order: {groupId}</h2>

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
                  navigator.clipboard.writeText(`${window.location.origin}/group/${groupId}`)
                    .then(() => alert('Link copied to clipboard!'))
                    .catch(() => alert('Failed to copy link'));
                }}
              >
                Copy Link
              </button>
            </div>
          </div>

          <div className="row">
            {/* Current Orders Section */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-body">
                  <h4>Current Orders</h4>
                  {group.group?.items?.length > 0 ? (
                    <div className="list-group">
                      {group.group.items.map((item, index) => (
                        <div key={index} className="list-group-item">
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong>{item.dish?.name || 'Unknown Item'}</strong>
                              <div className="text-muted small">
                                Quantity: {item.quantity}
                              </div>
                              <div className="text-muted small">
                                Price per item: ₹{item.dish?.price || 0}
                              </div>
                            </div>
                            <div className="text-end">
                              Total: ₹{(item.dish?.price || 0) * item.quantity}
                              <div className="text-muted small">
                                Added by: {item.user?.name || 'Unknown User'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-info">No items added yet</div>
                  )}
                </div>
              </div>
            </div>

            {/* Cart + Payment Section */}
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h4>Your Cart</h4>
                  {cart.length > 0 ? (
                    <div className="list-group">
                      {cart.map(item => (
                        <div key={item.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {item.name}
                              <div className="text-muted small">Qty: {item.quantity}</div>
                            </div>
                            <button
                              onClick={() => addToGroup(item)}
                              className="btn btn-sm btn-primary"
                            >
                              Add to Group
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-info">Your cart is empty</div>
                  )}
                </div>
              </div>

              {/* Payment Split */}
              {group.splits && (
                <div className="card">
                  <div className="card-body">
                    <h4>Split Bill</h4>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Total:</span>
                        <strong>₹{group.splits.total.toFixed(2)}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Your Share:</span>
                        <strong>₹{group.splits.equalSplit.toFixed(2)}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePayment(group.splits.equalSplit)}
                      className="btn btn-success w-100"
                    >
                      Pay Now
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
