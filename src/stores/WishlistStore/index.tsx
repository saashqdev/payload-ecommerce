import axios from "axios";
import debounce from "lodash.debounce";
import { create } from "zustand";

import canUseDOM from "@/utilities/canUseDOM";

import { type WishList } from "./types";

type WishListState = {
  wishlist: WishList | null;
  setWishList: (wishlistToSet: WishList | null) => void;
  toggleWishList: (wishlistToSet: WishList) => void;
  removeFromWishList: (productId: string, variantSlug?: string) => void;
  synchronizeWishList: () => Promise<void>;
};

const saveWishListToUserAccount = async (wishlist: WishList) => {
  try {
    await axios.post("/next/wishlist", wishlist);
  } catch (error) {
    console.error("Failed to save wishlist to UserAccount:", error);
  }
};

const fetchWishListFromUserAccount = async (): Promise<WishList | null> => {
  try {
    const { data } = await axios.get<{ data: WishList; status: number }>("/next/wishlist");
    if (data.status === 400) return null;
    return data.data;
  } catch (error) {
    console.error("Failed to fetch wishlist from UserAccount:", error);
    return null;
  }
};

const debouncedFetchWishListFromUserAccount = debounce(fetchWishListFromUserAccount, 1000);

const debouncedSaveWishListToUserAccount = debounce(saveWishListToUserAccount, 1000);

const useWishListStore = create<WishListState>((set) => ({
  wishlist: canUseDOM
    ? (() => {
        const wishlistData = window.localStorage.getItem("wishlist");
        if (wishlistData && wishlistData.length > 1) {
          try {
            return wishlistData ? (JSON.parse(wishlistData) as WishList) : [];
          } catch (error) {
            console.error("Error parsing wishlist data from localStorage", error);
            return [];
          }
        } else {
          return [];
        }
      })()
    : null,

  setWishList: (wishlistToSet: WishList) => {
    if (canUseDOM) {
      window.localStorage.setItem("wishlist", JSON.stringify(wishlistToSet));
    }
    void debouncedSaveWishListToUserAccount(wishlistToSet);
    set({ wishlist: wishlistToSet });
  },

  toggleWishList: (wishlistToSet: WishList) => {
    set((state) => {
      const prevWishList = state.wishlist;

      if (prevWishList === null) {
        if (canUseDOM) {
          window.localStorage.setItem("wishlist", JSON.stringify(wishlistToSet));
        }
        void debouncedSaveWishListToUserAccount(wishlistToSet);
        return { wishlist: wishlistToSet };
      }

      const updatedWishList = [...prevWishList];

      wishlistToSet.forEach((newProduct) => {
        const existingProductIndex = updatedWishList.findIndex(
          (product) =>
            product.id === newProduct.id &&
            (product.chosenVariantSlug === newProduct.chosenVariantSlug ||
              (!product.chosenVariantSlug && !newProduct.chosenVariantSlug)),
        );

        if (existingProductIndex !== -1) {
          updatedWishList.splice(existingProductIndex, 1);
        } else {
          updatedWishList.push(newProduct);
        }
      });

      if (canUseDOM) {
        window.localStorage.setItem("wishlist", JSON.stringify(updatedWishList));
      }
      void debouncedSaveWishListToUserAccount(updatedWishList);

      return { wishlist: updatedWishList };
    });
  },

  removeFromWishList: (productId: string, variantSlug?: string) => {
    set((state) => {
      const updatedWishList = state.wishlist?.filter((product) => {
        if (variantSlug) {
          return product.id !== productId || product.chosenVariantSlug !== variantSlug;
        }
        return product.id !== productId;
      });

      if (canUseDOM) {
        window.localStorage.setItem("wishlist", JSON.stringify(updatedWishList));
      }
      void debouncedSaveWishListToUserAccount(updatedWishList ?? []);
      return { wishlist: updatedWishList };
    });
  },

  synchronizeWishList: async () => {
    if (!canUseDOM) return;

    const wishlistFromLocalStorage = JSON.parse(window.localStorage.getItem("wishlist") ?? "[]") as WishList;
    const wishlistFromUserAccount = await debouncedFetchWishListFromUserAccount();

    if (!wishlistFromUserAccount) {
      if (wishlistFromLocalStorage.length > 0) {
        void debouncedSaveWishListToUserAccount(wishlistFromLocalStorage);
      }
      return;
    }

    window.localStorage.setItem("wishlist", JSON.stringify(wishlistFromUserAccount));
    set({ wishlist: wishlistFromUserAccount });
  },
}));

export const useWishList = () => useWishListStore((state) => state);
