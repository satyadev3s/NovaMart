import { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext();
const read = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => read("novamart-cart", []));
  const [wishlist, setWishlist] = useState(() => read("novamart-wishlist", []));
  const [orders, setOrders] = useState(() => read("novamart-orders", []));
  const [coupon, setCoupon] = useState(() => read("novamart-coupon", null));
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem("novamart-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("novamart-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("novamart-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("novamart-coupon", JSON.stringify(coupon));
    } else {
      localStorage.removeItem("novamart-coupon");
    }
  }, [coupon]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = (product, quantity = 1, notify = true) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      if (found) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item
        );
      }
      return [...items, { ...product, quantity }];
    });
    if (notify) {
      addToast(`Added "${product.title}" to bag`, "success");
    }
  };

  const updateQuantity = (id, quantity) => {
    setCart((items) => {
      if (quantity < 1) {
        return items.filter((item) => item.id !== id);
      }
      return items.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(quantity, item.stock || 99) } : item
      );
    });
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((items) => items.filter((item) => item.id !== id));
    if (item) {
      addToast(`Removed "${item.title}" from bag`, "info");
    }
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((items) => items.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.title}" from wishlist`, "info");
    } else {
      setWishlist((items) => [...items, product]);
      addToast(`Saved "${product.title}" to wishlist ♥`, "success");
    }
  };

  const moveToCart = (product) => {
    addToCart(product, 1, false);
    setWishlist((items) => items.filter((item) => item.id !== product.id));
    addToast(`Moved "${product.title}" to bag`, "success");
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || "").trim().toUpperCase();
    if (cleanCode === "WELCOME10" || cleanCode === "NOVA10") {
      setCoupon({ code: cleanCode, discountPercent: 10 });
      addToast(`Coupon "${cleanCode}" applied! 10% discount added.`, "success");
      return { success: true, message: "10% off applied!" };
    } else if (cleanCode === "LUXURY20" || cleanCode === "SAVE20") {
      setCoupon({ code: cleanCode, discountPercent: 20 });
      addToast(`Coupon "${cleanCode}" applied! 20% discount added.`, "success");
      return { success: true, message: "20% off applied!" };
    } else {
      addToast(`Invalid coupon code. Try WELCOME10`, "error");
      return { success: false, message: "Invalid promo code" };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast("Promo code removed", "info");
  };

  const saveOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setCoupon(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const value = {
    cart,
    wishlist,
    orders,
    coupon,
    toasts,
    cartCount,
    wishlistCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    moveToCart,
    applyCoupon,
    removeCoupon,
    saveOrder,
    addToast,
    removeToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
