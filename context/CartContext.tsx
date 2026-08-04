"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { mapProduct } from '@/lib/mapData';

interface CartItem {
  productId: string;
  quantity: number;
  product: any;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cart_items");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart_items", JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const refreshCart = () => {
    setItems(loadCart());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (productId: string, quantity: number = 1) => {
    const currentItems = loadCart();
    const existing = currentItems.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const productData = await res.json();
        if (productData) {
          const product = mapProduct(productData);
          currentItems.push({ productId, quantity, product });
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        return;
      }
    }

    saveCart(currentItems);
    setItems(currentItems);
  };

  const removeFromCart = (productId: string) => {
    const currentItems = loadCart().filter((item) => item.productId !== productId);
    saveCart(currentItems);
    setItems(currentItems);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const currentItems = loadCart();
    const item = currentItems.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      saveCart(currentItems);
      setItems(currentItems);
    }
  };

  const clearCart = () => {
    saveCart([]);
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}