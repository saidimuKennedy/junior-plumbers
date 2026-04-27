export const STOREFRONT_CART_STORAGE_KEY = "jp-storefront-cart";

export type StorefrontCartLine = {
  sku: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};
