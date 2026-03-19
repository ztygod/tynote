import { create } from "zustand";
import { getStorage, setStorage } from "@/utils/storage";

export interface StarredItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
  image?: string;
  date: string;
  starred: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface StarredState {
  items: StarredItem[];
  addStarredItem: (item: Omit<StarredItem, "id" | "createdAt" | "updatedAt">) => void;
  updateStarredItem: (id: string, updates: Partial<Omit<StarredItem, "id" | "createdAt">>) => void;
  deleteStarredItem: (id: string) => void;
  toggleStar: (id: string) => void;
  initializeStarredItems: () => void;
}

const STARRED_STORAGE_KEY = "tynote_starred_items";

// Mock data for initial migration
const MOCK_STARRED_ITEMS: Omit<StarredItem, "createdAt" | "updatedAt">[] = [
  {
    id: "1",
    title: "React 官方文档",
    description: "React 的官方文档，包含最新的 API 和最佳实践指南。",
    category: "技术",
    tags: ["React", "前端", "JavaScript"],
    url: "https://react.dev",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop&auto=format",
    date: "2024-11-20",
    starred: true,
  },
  {
    id: "2",
    title: "Tailwind CSS 官方网站",
    description: "一个功能优先的 CSS 框架，用于快速构建现代用户界面。",
    category: "技术",
    tags: ["CSS", "前端", "设计系统"],
    url: "https://tailwindcss.com",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&auto=format",
    date: "2024-11-18",
    starred: true,
  },
  {
    id: "3",
    title: "设计系统最佳实践",
    description: "深入探讨如何构建和维护一个可扩展的设计系统。",
    category: "设计",
    tags: ["设计系统", "UI设计", "品牌"],
    url: "https://example.com/design-system",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&auto=format",
    date: "2024-11-15",
    starred: true,
  },
  {
    id: "4",
    title: "产品管理完全指南",
    description: "从零开始学习产品管理的核心概念和实践方法。",
    category: "产品",
    tags: ["产品管理", "策略", "用户研究"],
    date: "2024-11-10",
    starred: true,
  },
  {
    id: "5",
    title: "TypeScript 深度指南",
    description: "全面学习 TypeScript 的类型系统和高级特性。",
    category: "技术",
    tags: ["TypeScript", "JavaScript", "类型系统"],
    url: "https://www.typescriptlang.org",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    date: "2024-11-08",
    starred: true,
  },
  {
    id: "6",
    title: "用户体验研究方法",
    description: "学习如何进行有效的用户研究和可用性测试。",
    category: "设计",
    tags: ["UX研究", "用户测试", "数据分析"],
    date: "2024-11-05",
    starred: true,
  },
  {
    id: "7",
    title: "内容营销策略",
    description: "如何通过高质量的内容吸引和留住用户。",
    category: "运营",
    tags: ["内容营销", "SEO", "增长"],
    date: "2024-11-01",
    starred: true,
  },
  {
    id: "8",
    title: "Web 性能优化指南",
    description: "提高网站加载速度和用户体验的实用技巧。",
    category: "技术",
    tags: ["性能优化", "前端", "Web"],
    url: "https://web.dev/performance",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    date: "2024-10-28",
    starred: true,
  },
];

export const useStarredStore = create<StarredState>((set) => ({
  items: [],

  addStarredItem: (item) =>
    set((state) => {
      const newItem: StarredItem = {
        ...item,
        id: `starred_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const updated = [...state.items, newItem];
      setStorage(STARRED_STORAGE_KEY, updated);
      return { items: updated };
    }),

  updateStarredItem: (id, updates) =>
    set((state) => {
      const updated = state.items.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: Date.now() } : item
      );
      setStorage(STARRED_STORAGE_KEY, updated);
      return { items: updated };
    }),

  deleteStarredItem: (id) =>
    set((state) => {
      const updated = state.items.filter((item) => item.id !== id);
      setStorage(STARRED_STORAGE_KEY, updated);
      return { items: updated };
    }),

  toggleStar: (id) =>
    set((state) => {
      const updated = state.items.map((item) =>
        item.id === id
          ? { ...item, starred: !item.starred, updatedAt: Date.now() }
          : item
      );
      setStorage(STARRED_STORAGE_KEY, updated);
      return { items: updated };
    }),

  initializeStarredItems: () => {
    const stored = getStorage<StarredItem[]>(STARRED_STORAGE_KEY, []) ?? [];

    // If no stored items, migrate MOCK data
    if (stored.length === 0) {
      const migratedItems: StarredItem[] = MOCK_STARRED_ITEMS.map((item) => ({
        ...item,
        createdAt: new Date(item.date).getTime(),
        updatedAt: new Date(item.date).getTime(),
      }));
      setStorage(STARRED_STORAGE_KEY, migratedItems);
      set({ items: migratedItems });
    } else {
      set({ items: stored });
    }
  },
}));
