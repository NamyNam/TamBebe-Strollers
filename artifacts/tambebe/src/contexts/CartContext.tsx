import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Product, ProductVariant } from "@/data/products";

export interface CartItem {
  variantId: string;
  productSlug: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  condition: string;
  price: string;
  priceNum: number;
  image: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant: ProductVariant) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  isInCart: (variantId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, variant: ProductVariant) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === variant.id);
      if (existing) return prev;
      return [
        ...prev,
        {
          variantId: variant.id,
          productSlug: product.slug,
          brand: product.brand,
          model: product.model,
          color: variant.color,
          year: variant.year,
          condition: variant.condition,
          price: variant.price,
          priceNum: variant.priceNum,
          image: variant.image,
          quantity: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (variantId: string) => items.some((i) => i.variantId === variantId),
    [items]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.priceNum * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalPrice, isOpen, openCart, closeCart, addItem, removeItem, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
