"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface CartItem {
  productId: string;
  quantity: number;
  product: any;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load cart from Supabase
  const refreshCart = async () => {
    console.log('🔍 refreshCart called');
    console.log('User in CartContext:', user);
    console.log('User ID:', user?.id);
    
    setLoading(true);
    
    if (!user) {
      console.log('No user, setting empty cart');
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('carts')
        .select('items')
        .eq('user_id', user.id)
        .single();

      console.log('Cart data from Supabase:', data);
      console.log('Cart error:', error);

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading cart:', error);
        setItems([]);
        setLoading(false);
        return;
      }

      // If no cart exists, create one
      if (!data) {
        console.log('No cart found, creating new cart');
        const { error: insertError } = await supabase
          .from('carts')
          .insert({ user_id: user.id, items: [] });

        if (insertError) {
          console.error('Error creating cart:', insertError);
        }
        setItems([]);
        setLoading(false);
        return;
      }

      console.log('Cart items loaded:', data.items);
      setItems(data.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Save cart to Supabase
  const saveCart = async (cartItems: CartItem[]) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('carts')
        .upsert({
          user_id: user.id,
          items: cartItems,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving cart:', error);
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Load cart when user changes
  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    console.log('addToCart called with productId:', productId);
    
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    const currentItems = [...items];
    const existing = currentItems.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      try {
        const { data: productData, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error || !productData) {
          console.error('Product not found:', error);
          return;
        }

        console.log('Product found:', productData);
        currentItems.push({
          productId,
          quantity,
          product: productData
        });
      } catch (error) {
        console.error('Failed to fetch product:', error);
        return;
      }
    }

    setItems(currentItems);
    await saveCart(currentItems);
    console.log('Cart saved, items:', currentItems);
  };

  const removeFromCart = async (productId: string) => {
    const currentItems = items.filter((item) => item.productId !== productId);
    setItems(currentItems);
    await saveCart(currentItems);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const currentItems = [...items];
    const item = currentItems.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      setItems(currentItems);
      await saveCart(currentItems);
    }
  };

  const clearCart = async () => {
    setItems([]);
    await saveCart([]);
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
        loading,
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