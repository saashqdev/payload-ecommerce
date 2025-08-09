import { create } from "zustand";

type CartState = {
  isOpen: boolean;
  toggleCart: () => void;
  setCartState: (isOpen: boolean) => void;
};

const useCartStateStore = create<CartState>((set) => ({
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setCartState: (isOpen) => set({ isOpen }),
}));

export const useCartState = () => {
  const { isOpen, toggleCart, setCartState } = useCartStateStore();

  return { isOpen, toggleCart, setCartState };
};
