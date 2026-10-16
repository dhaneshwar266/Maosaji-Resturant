import React, { useState, useEffect } from 'react';
import type { CartItem, CustomerOrderInfo, DiningPreference, MenuItem } from '../types/restaurant';
import { CartContext } from './CartContextInstance';

const CART_STORAGE_KEY = 'maosaji_cart_v1';
const ORDER_INFO_STORAGE_KEY = 'maosaji_order_info_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderInfo, setOrderInfo] = useState<CustomerOrderInfo>(() => {
    try {
      const saved = localStorage.getItem(ORDER_INFO_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            customerName: '',
            diningPreference: 'dine-in',
            notes: '',
          };
    } catch {
      return {
        customerName: '',
        diningPreference: 'dine-in',
        notes: '',
      };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore write errors in private mode
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_INFO_STORAGE_KEY, JSON.stringify(orderInfo));
    } catch {
      // Ignore
    }
  }, [orderInfo]);

  const addToCart = (item: MenuItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const setCustomerName = (name: string) => {
    setOrderInfo((prev) => ({ ...prev, customerName: name }));
  };

  const setDiningPreference = (diningPreference: DiningPreference) => {
    setOrderInfo((prev) => ({ ...prev, diningPreference }));
  };

  const setOrderNotes = (notes: string) => {
    setOrderInfo((prev) => ({ ...prev, notes }));
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const hasEstimatedItems = cart.some((ci) => ci.item.priceEstimated);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        hasEstimatedItems,
        orderInfo,
        setCustomerName,
        setDiningPreference,
        setOrderNotes,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
