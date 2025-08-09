import { create } from "zustand";

type WishListState = {
  isOpen: boolean;
  toggleWishList: () => void;
  setWishListState: (isOpen: boolean) => void;
};

const useWishListStateStore = create<WishListState>((set) => ({
  isOpen: false,
  toggleWishList: () => set((state) => ({ isOpen: !state.isOpen })),
  setWishListState: (isOpen) => set({ isOpen }),
}));

export const useWishListState = () => {
  const { isOpen, toggleWishList, setWishListState } = useWishListStateStore();

  return { isOpen, toggleWishList, setWishListState };
};
