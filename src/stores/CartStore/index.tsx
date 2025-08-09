import axios from "axios";
import debounce from "lodash.debounce";
import { create } from "zustand";

import canUseDOM from "@/utilities/canUseDOM";

import { type Cart } from "./types";

type CartState = {
  cart: Cart | null;
  setCart: (cartToSet: Cart | null) => void;
  updateCart: (cartToSet: Cart) => void;
  removeFromCart: (productId: string, variantSlug?: string) => void;
  synchronizeCart: () => Promise<void>;
};

const saveCartToUserAccount = async (cart: Cart) => {
  try {
    await axios.post("/next/cart", cart);
  } catch (error) {
    console.error("Failed to save cart to UserAccount:", error);
  }
};

const fetchCartFromUserAccount = async (): Promise<Cart | null> => {
  try {
    const { data } = await axios.get<{ data: Cart; status: number }>("/next/cart");
    if (data.status === 400) return null;
    return data.data;
  } catch (error) {
    console.error("Failed to fetch cart from UserAccount:", error);
    return null;
  }
};

const debouncedFetchCartFromUserAccount = debounce(fetchCartFromUserAccount, 1000);

const debouncedSaveCartToUserAccount = debounce(saveCartToUserAccount, 1000);

const useCartStore = create<CartState>((set) => ({
  cart: canUseDOM
    ? (() => {
        const cartData = window.localStorage.getItem("cart");
        if (cartData && cartData.length > 1) {
          try {
            return cartData ? (JSON.parse(cartData) as Cart) : [];
          } catch (error) {
            console.error("Error parsing cart data from localStorage", error);
            return [];
          }
        } else {
          return [];
        }
      })()
    : null,

  setCart: (cartToSet: Cart) => {
    if (canUseDOM) {
      window.localStorage.setItem("cart", JSON.stringify(cartToSet));
    }
    void debouncedSaveCartToUserAccount(cartToSet);
    set({ cart: cartToSet });
  },

  updateCart: (cartToSet: Cart) => {
    set((state) => {
      const prevCart = state.cart;

      if (prevCart === null) {
        if (canUseDOM) {
          window.localStorage.setItem("cart", JSON.stringify(cartToSet));
        }
        void debouncedSaveCartToUserAccount(cartToSet);
        return { cart: cartToSet };
      }

      const updatedCart = [...prevCart];

      cartToSet.forEach((newProduct) => {
        const existingProductIndex = updatedCart.findIndex(
          (product) =>
            product.id === newProduct.id &&
            (product.chosenVariantSlug === newProduct.chosenVariantSlug ||
              (!product.chosenVariantSlug && !newProduct.chosenVariantSlug)),
        );

        if (existingProductIndex >= 0) {
          updatedCart[existingProductIndex].quantity += newProduct.quantity;
        } else {
          updatedCart.push(newProduct);
        }
      });

      if (canUseDOM) {
        window.localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      void debouncedSaveCartToUserAccount(updatedCart);
      return { cart: updatedCart };
    });
  },

  removeFromCart: (productId: string, variantSlug?: string) => {
    set((state) => {
      const updatedCart = state.cart?.filter((product) => {
        if (variantSlug) {
          return product.id !== productId || product.chosenVariantSlug !== variantSlug;
        }
        return product.id !== productId;
      });

      if (canUseDOM) {
        window.localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      void debouncedSaveCartToUserAccount(updatedCart ?? []);
      return { cart: updatedCart };
    });
  },

  synchronizeCart: async () => {
    if (!canUseDOM) return;

    const cartFromLocalStorage = JSON.parse(window.localStorage.getItem("cart") ?? "[]") as Cart;
    const cartFromUserAccount = await debouncedFetchCartFromUserAccount();

    if (!cartFromUserAccount) {
      if (cartFromLocalStorage.length > 0) {
        void debouncedSaveCartToUserAccount(cartFromLocalStorage);
      }
      return;
    }

    window.localStorage.setItem("cart", JSON.stringify(cartFromUserAccount));
    set({ cart: cartFromUserAccount });
  },
}));

export const useCart = () => useCartStore((state) => state);
