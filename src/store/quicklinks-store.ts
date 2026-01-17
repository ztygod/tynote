import { create } from "zustand";
import { getStorage, setStorage } from "@/utils/storage";

export type LinkType = "internal" | "knowledge" | "external";

export interface Quicklink {
  id: string;
  title: string;
  description?: string;
  linkType: LinkType;
  target: string; // 内部页面的路径、知识库节点ID、或外部URL
  icon?: string; // emoji 或图标名称
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface QuicklinksState {
  quicklinks: Quicklink[];
  addQuicklink: (quicklink: Omit<Quicklink, "id" | "createdAt" | "updatedAt">) => void;
  updateQuicklink: (id: string, updates: Partial<Omit<Quicklink, "id" | "createdAt">>) => void;
  deleteQuicklink: (id: string) => void;
  reorderQuicklinks: (orderedIds: string[]) => void;
  initializeQuicklinks: () => void;
}

const QUICKLINKS_STORAGE_KEY = "tynote_quicklinks";

export const useQuicklinksStore = create<QuicklinksState>((set, get) => ({
  quicklinks: [],

  addQuicklink: (quicklink) =>
    set((state) => {
      const newQuicklink: Quicklink = {
        ...quicklink,
        id: `quicklink_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        order: (state.quicklinks.length > 0 
          ? Math.max(...state.quicklinks.map(q => q.order)) + 1 
          : 0),
      };
      const updated = [...state.quicklinks, newQuicklink];
      setStorage(QUICKLINKS_STORAGE_KEY, updated);
      return { quicklinks: updated };
    }),

  updateQuicklink: (id, updates) =>
    set((state) => {
      const updated = state.quicklinks.map((q) =>
        q.id === id ? { ...q, ...updates, updatedAt: Date.now() } : q
      );
      setStorage(QUICKLINKS_STORAGE_KEY, updated);
      return { quicklinks: updated };
    }),

  deleteQuicklink: (id) =>
    set((state) => {
      const updated = state.quicklinks.filter((q) => q.id !== id);
      setStorage(QUICKLINKS_STORAGE_KEY, updated);
      return { quicklinks: updated };
    }),

  reorderQuicklinks: (orderedIds) =>
    set((state) => {
      const updated = orderedIds.map((id, index) => {
        const quicklink = state.quicklinks.find((q) => q.id === id);
        return quicklink ? { ...quicklink, order: index } : null;
      }).filter(Boolean) as Quicklink[];
      setStorage(QUICKLINKS_STORAGE_KEY, updated);
      return { quicklinks: updated };
    }),

  initializeQuicklinks: () => {
    const stored = getStorage<Quicklink[]>(QUICKLINKS_STORAGE_KEY, []) ?? [];
    set({ quicklinks: stored });
  },
}));
