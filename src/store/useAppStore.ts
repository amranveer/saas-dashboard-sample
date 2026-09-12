import { create } from 'zustand';

type AppState = {
  isCommandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;
  toast: { message: string; type: "success" | "error" | "info" } | null;
  setToast: (message: string, type?: "success" | "error" | "info") => void;
};

export const useAppStore = create<AppState>((set) => ({
  isCommandOpen: false,
  setCommandOpen: (open) => set({ isCommandOpen: open }),
  toggleCommand: () => set((state) => ({ isCommandOpen: !state.isCommandOpen })),
  toast: null,
  setToast: (message, type = "success") => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },
}));
