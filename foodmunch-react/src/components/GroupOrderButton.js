import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const GroupOrderButton = () => {
  const navigate = useNavigate();
  const { setIsGroupOrder, setGroupId } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async () => {
    setLoading(true);
    try {
      const testUserId = '686110d263d19399b3da7f14'; // Your test user ID
      
      const res = await axios.post('http://localhost:5000/api/group-orders', {
        userId: testUserId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data?.success) {
        setIsGroupOrder(true);
        setGroupId(res.data.groupId);
        navigate(`/group/${res.data.groupId}`);
      } else {
        throw new Error(res.data?.error || "Invalid response format");
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCreateGroup}
      disabled={loading}
      className={`btn btn-primary ${loading ? 'opacity-75' : ''}`}
    >
      {loading ? 'Creating...' : 'Start Group Order'}
    </button>
  );
};

export default GroupOrderButton;