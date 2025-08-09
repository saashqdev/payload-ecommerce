import { type Product } from "@/payload-types";

export type CartProduct = {
  id: Product["id"];
  quantity: number;
  chosenVariantSlug?: string;
};

export type Cart = CartProduct[];
