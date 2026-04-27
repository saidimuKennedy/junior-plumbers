"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

type LoyaltyModalContextValue = {
  openLoyaltyModal: () => void;
};

const LoyaltyModalContext = createContext<LoyaltyModalContextValue | null>(null);

export function LoyaltyModalProvider({
  children,
  onOpen,
}: {
  children: ReactNode;
  onOpen: () => void;
}) {
  const openLoyaltyModal = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const value = useMemo(() => ({ openLoyaltyModal }), [openLoyaltyModal]);

  return <LoyaltyModalContext.Provider value={value}>{children}</LoyaltyModalContext.Provider>;
}

export function useLoyaltyModal() {
  const ctx = useContext(LoyaltyModalContext);
  return ctx ?? { openLoyaltyModal: () => {} };
}
