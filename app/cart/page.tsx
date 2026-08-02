"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCart, removeFromCart, addToCart, subscribe } from "@/lib/cart";
import { CartItem } from "@/lib/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const refreshCart = () => {
    const items = getCart();
    setCartItems([...items]);
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    refreshCart();
    const unsubscribe = subscribe(refreshCart);
    return unsubscribe;
  }, []);

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const currentItem = cartItems.find(item => item.productId === productId);
    if (currentItem) {
      const diff = newQuantity - currentItem.quantity;
      if (diff > 0) {
        addToCart(productId, diff);
      } else {
        // Remove and re-add with new quantity
        removeFromCart(productId);
        // Add back with new quantity
        for (let i = 0; i < newQuantity; i++) {
          addToCart(productId);
        }
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-ink">Your Cart</h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold text-ink">Your Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border-b border-line py-4"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-20 w-20 object-contain"
              />
              <div className="flex-1">
                <Link
                  href={`/product/${item.product.slug}`}
                  className="font-medium text-ink hover:text-trace"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted">?{item.product.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="border border-line px-2 py-1 text-ink hover:bg-surface"
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                >
                  -
                </button>
                <span className="w-8 text-center text-ink">{item.quantity}</span>
                <button
                  className="border border-line px-2 py-1 text-ink hover:bg-surface"
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemove(item.productId)}
              >
                ?
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-line bg-surface p-6">
            <h2 className="font-display text-xl font-bold text-ink">Order Summary</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink">?{total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span className="text-ink">Calculated at checkout</span>
              </div>
              <div className="border-t border-line pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>?{total}</span>
                </div>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-trace px-6 py-3 text-base font-semibold hover:opacity-80"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}