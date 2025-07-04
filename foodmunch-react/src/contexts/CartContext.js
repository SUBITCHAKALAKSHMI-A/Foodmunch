import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isGroupOrder, setIsGroupOrder] = useState(false);
  const [groupId, setGroupId] = useState(null);

  const addToCart = (item, quantity = 1) => {
    setCart([...cart, { ...item, quantity }]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      cartTotal,
      isGroupOrder,
      setIsGroupOrder,
      groupId,
      setGroupId
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);