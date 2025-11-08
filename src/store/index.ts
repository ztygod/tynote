import { create } from "zustand";

export interface BearType {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}
export const useBearStore = create<BearType>((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: { bears: number }) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
