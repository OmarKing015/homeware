import { StateCreator } from "zustand";

export interface DiscreetModeSlice {
  isDiscreet: boolean;
  toggleDiscreetMode: () => void;
}

export const createDiscreetModeSlice: StateCreator<
  DiscreetModeSlice,
  [],
  [],
  DiscreetModeSlice
> = (set) => ({
  isDiscreet: false,
  toggleDiscreetMode: () => set((state) => ({ isDiscreet: !state.isDiscreet })),
});
