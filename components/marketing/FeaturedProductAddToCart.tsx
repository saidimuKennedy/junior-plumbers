"use client";

import { useStorefrontCart } from "@/components/marketing/StorefrontCartContext";

type Props = {
  sku: string;
  name: string;
  price: number;
  image?: string;
  className?: string;
};

export function FeaturedProductAddToCart({ sku, name, price, image, className }: Props) {
  const { addItem } = useStorefrontCart();

  return (
    <button
      type="button"
      className={className}
      onClick={() => addItem({ sku, name, price, image })}
    >
      Add to cart
    </button>
  );
}
