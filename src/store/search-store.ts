import { create } from "zustand";

export type SearchMode = "search" | "ask";

export type TimeRange = "today" | "week" | "month" | "custom" | "all";

export interface SearchFilters {
  title?: string;
  author?: string;
  timeRange: TimeRange;
  startDate?: Date;
  endDate?: Date;
  tags?: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  summary: string;
  author: string;
  updateTime: Date;
  tags?: string[];
  matchedKeywords?: string[];
}

export interface SearchStoreType {
  // 对话框状态
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  // 搜索模式
  mode: SearchMode;
  setMode: (mode: SearchMode) => void;

  // 搜索内容
  query: string;
  setQuery: (query: string) => void;

  // 过滤条件
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  updateFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
  clearFilters: () => void;

  // 搜索结果
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // 排序
  sortBy: "time-desc" | "time-asc" | "alpha-asc" | "alpha-desc";
  setSortBy: (sort: "time-desc" | "time-asc" | "alpha-asc" | "alpha-desc") => void;
}

const defaultFilters: SearchFilters = {
  timeRange: "all",
};

export const useSearchStore = create<SearchStoreType>((set) => ({
  // 对话框状态
  isOpen: false,
  setIsOpen: (open: boolean) => set({ isOpen: open }),

  // 搜索模式
  mode: "search",
  setMode: (mode: SearchMode) => set({ mode }),

  // 搜索内容
  query: "",
  setQuery: (query: string) => set({ query }),

  // 过滤条件
  filters: defaultFilters,
  setFilters: (filters: SearchFilters) => set({ filters }),
  updateFilter: (key: keyof SearchFilters, value: any) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  clearFilters: () => set({ filters: defaultFilters }),

  // 搜索结果
  results: [],
  setResults: (results: SearchResult[]) => set({ results }),
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  // 排序
  sortBy: "time-desc",
  setSortBy: (sort) => set({ sortBy: sort }),
}));
