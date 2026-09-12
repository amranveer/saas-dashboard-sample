import { create } from 'zustand';

type AppState = {
  isCommandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  isCommandOpen: false,
  setCommandOpen: (open) => set({ isCommandOpen: open }),
  toggleCommand: () => set((state) => ({ isCommandOpen: !state.isCommandOpen })),
}));
