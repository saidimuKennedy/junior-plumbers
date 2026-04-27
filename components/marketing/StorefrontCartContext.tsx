"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STOREFRONT_CART_STORAGE_KEY, type StorefrontCartLine } from "@/lib/storefront-cart";

type StorefrontCartContextValue = {
  lines: StorefrontCartLine[];
  hydrated: boolean;
  addItem: (item: { sku: string; name: string; price: number; image?: string; qty?: number }) => void;
  setLineQty: (sku: string, qty: number) => void;
  removeLine: (sku: string) => void;
  clearCart: () => void;
  totalQty: number;
  subtotal: number;
};

const StorefrontCartContext = createContext<StorefrontCartContextValue | null>(null);

export function StorefrontCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<StorefrontCartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STOREFRONT_CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StorefrontCartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STOREFRONT_CART_STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const addItem = useCallback(
    (item: { sku: string; name: string; price: number; image?: string; qty?: number }) => {
      const q = item.qty ?? 1;
      setLines((prev) => {
        const i = prev.findIndex((l) => l.sku === item.sku);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + q };
          return next;
        }
        return [
          ...prev,
          {
            sku: item.sku,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: q,
          },
        ];
      });
    },
    []
  );

  const setLineQty = useCallback((sku: string, qty: number) => {
    const n = Math.max(0, Math.floor(qty));
    setLines((prev) => {
      if (n <= 0) return prev.filter((l) => l.sku !== sku);
      return prev.map((l) => (l.sku === sku ? { ...l, qty: n } : l));
    });
  }, []);

  const removeLine = useCallback((sku: string) => {
    setLines((prev) => prev.filter((l) => l.sku !== sku));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalQty = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.price * l.qty, 0), [lines]);

  const value = useMemo(
    () => ({
      lines,
      hydrated,
      addItem,
      setLineQty,
      removeLine,
      clearCart,
      totalQty,
      subtotal,
    }),
    [lines, hydrated, addItem, setLineQty, removeLine, clearCart, totalQty, subtotal]
  );

  return <StorefrontCartContext.Provider value={value}>{children}</StorefrontCartContext.Provider>;
}

export function useStorefrontCart(): StorefrontCartContextValue {
  const ctx = useContext(StorefrontCartContext);
  if (!ctx) {
    throw new Error("useStorefrontCart must be used within StorefrontCartProvider");
  }
  return ctx;
}
