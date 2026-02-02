import { useState, useEffect, useCallback } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('ps3-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ps3-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = useCallback((item, size = null, action = 'add') => {
    setCart(prev => {
      const cartItemId = size ? `${item.id}-${size.size}` : `${item.id}-regular`;
      const existingIndex = prev.findIndex(i => i.id === cartItemId);

      if (action === 'remove') {
        if (existingIndex > -1) {
          const newCart = [...prev];
          if (newCart[existingIndex].quantity > 1) {
            newCart[existingIndex].quantity -= 1;
            return newCart;
          } else {
            return prev.filter(i => i.id !== cartItemId);
          }
        }
        return prev;
      }

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }

      const newItem = {
        id: cartItemId,
        itemId: item.id,
        name: item.name,
        price: size ? size.price : item.price,
        size: size?.size || null,
        quantity: 1,
        image: item.image,
        category: item.category,
        description: item.description
      };
      return [...prev, newItem];
    });
  }, []);

  // Remove item from cart completely
  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  // Update quantity of an item
  const updateQuantity = useCallback((id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Clear entire cart (used after successful order)
  const clearCart = useCallback(() => {
    setCart([]);
    try {
      localStorage.removeItem('ps3-cart');
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }, []);

  // Get total price (ONLY item prices, no tax, no delivery fee)
  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  // Get total item count
  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);
  
  // Get quantity of specific item in cart
  const getItemQuantity = useCallback((itemId, size = null) => {
    const cartItemId = size ? `${itemId}-${size.size}` : `${itemId}-regular`;
    const cartItem = cart.find(i => i.id === cartItemId);
    return cartItem ? cartItem.quantity : 0;
  }, [cart]);

  // Check if cart is empty
  const isCartEmpty = useCallback(() => {
    return cart.length === 0;
  }, [cart]);

  // Get cart summary for display (NO TAX, NO DELIVERY FEES)
  const getCartSummary = useCallback(() => {
    const subtotal = getCartTotal();
    const deliveryFee = 0; // Always 0
    const tax = 0; // Always 0
    const total = subtotal; // Only item cost

    return {
      subtotal,
      deliveryFee,
      tax,
      total,
      itemCount: getCartCount(),
    };
  }, [cart, getCartTotal, getCartCount]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getItemQuantity,
    isCartEmpty,
    getCartSummary
  };
};