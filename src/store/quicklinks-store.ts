import { create } from "zustand";
import { localStorageQuicklinksRepository } from "@/features/quicklinks/model/repository";

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

export const useQuicklinksStore = create<QuicklinksState>((set) => ({
  quicklinks: [],

  addQuicklink: (quicklink) =>
    set((state) => {
      const newQuicklink: Quicklink = {
        ...quicklink,
        id: `quicklink_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        order: (state.quicklinks.length > 0 
          ? Math.max(...state.quicklinks.map(q => q.order)) + 1 
          : 0),
      };
      const updated = [...state.quicklinks, newQuicklink];
      localStorageQuicklinksRepository.save(updated);
      return { quicklinks: updated };
    }),

  updateQuicklink: (id, updates) =>
    set((state) => {
      const updated = state.quicklinks.map((q) =>
        q.id === id ? { ...q, ...updates, updatedAt: Date.now() } : q
      );
      localStorageQuicklinksRepository.save(updated);
      return { quicklinks: updated };
    }),

  deleteQuicklink: (id) =>
    set((state) => {
      const updated = state.quicklinks.filter((q) => q.id !== id);
      localStorageQuicklinksRepository.save(updated);
      return { quicklinks: updated };
    }),

  reorderQuicklinks: (orderedIds) =>
    set((state) => {
      const quicklinksById = new Map(state.quicklinks.map((q) => [q.id, q] as const));
      const updated: Quicklink[] = [];
      for (const id of orderedIds) {
        const quicklink = quicklinksById.get(id);
        if (!quicklink) {
          continue;
        }
        updated.push({
          ...quicklink,
          order: updated.length,
        });
        quicklinksById.delete(id);
      }
      const remaining = Array.from(quicklinksById.values()).sort(
        (a, b) => a.order - b.order
      );
      for (const quicklink of remaining) {
        updated.push({
          ...quicklink,
          order: updated.length,
        });
      }
      localStorageQuicklinksRepository.save(updated);
      return { quicklinks: updated };
    }),

  initializeQuicklinks: () => {
    const stored = localStorageQuicklinksRepository.load();
    set({ quicklinks: stored });
  },
}));
