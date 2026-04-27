"use client";

import { useLoyaltyModal } from "@/components/marketing/LoyaltyModalContext";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function ShopLoyaltyJoinButton({ className, children }: Props) {
  const { openLoyaltyModal } = useLoyaltyModal();

  return (
    <button type="button" className={className} onClick={openLoyaltyModal}>
      {children}
    </button>
  );
}
