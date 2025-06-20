import React, { createContext, useState, useContext, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((dish, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === dish.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...dish, quantity }];
    });
  }, []);

  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <CartContext.Provider value={{ cart, addToCart, cartTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);