import { type Product } from "@/payload-types";

export type WishListProduct = {
  id: Product["id"];
  chosenVariantSlug?: string;
};

export type WishList = WishListProduct[];
