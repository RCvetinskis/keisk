import { create } from "zustand";

interface SheetState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useSheetStore = create<SheetState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSheetStore;
