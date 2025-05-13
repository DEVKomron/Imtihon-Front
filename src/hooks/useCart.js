import { createContext, useContext, useState } from 'react';

// 1. Kontekst yaratamiz
const CartContext = createContext();

// 2. Provider komponenti
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Mahsulot qo'shish
  const addItem = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Mahsulotni o'chirish
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  // Mahsulot miqdorini o'zgartirish
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Savatchani tozalash
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Hook exporti
export const useCart = () => useContext(CartContext);
