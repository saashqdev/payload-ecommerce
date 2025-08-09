import { create } from "zustand";

type MobileFiltersState = {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
};

const useMobileFiltersStore = create<MobileFiltersState>((set) => ({
  mobileFiltersOpen: false, // domyślna wartość
  setMobileFiltersOpen: (open: boolean) => set({ mobileFiltersOpen: open }),
}));

export const useMobileFilters = () => {
  return useMobileFiltersStore();
};
