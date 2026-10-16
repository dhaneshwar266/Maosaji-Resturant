import { createContext } from 'react';
import type { CartItem, CustomerOrderInfo, DiningPreference, MenuItem } from '../types/restaurant';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  hasEstimatedItems: boolean;
  orderInfo: CustomerOrderInfo;
  setCustomerName: (name: string) => void;
  setDiningPreference: (pref: DiningPreference) => void;
  setOrderNotes: (notes: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
