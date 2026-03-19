import { create } from "zustand";
import { getStorage, setStorage } from "@/utils/storage";

export type StarredSortBy = "recent" | "oldest" | "alphabetical";

export interface StarredFilterState {
  categories: string[];
  sortBy: StarredSortBy;
  tags: string[];
}

export interface StarredFilterPreset {
  id: string;
  name: string;
  searchQuery: string;
  filters: StarredFilterState;
  isDefault: boolean;
  createdAt: number;
  updatedAt: number;
}

interface SavePresetInput {
  id?: string;
  name: string;
  searchQuery: string;
  filters: StarredFilterState;
}

interface StarredPreferenceState {
  presets: StarredFilterPreset[];
  activePresetId: string;
  initializePresets: () => void;
  savePreset: (input: SavePresetInput) => StarredFilterPreset;
  deletePreset: (id: string) => void;
  applyPreset: (id: string) => StarredFilterPreset | null;
  setActivePresetId: (id: string) => void;
}

const STARRED_PRESET_STORAGE_KEY = "tynote_starred_filter_presets";
const DEFAULT_PRESET_ID = "preset_all";

function createDefaultPreset(): StarredFilterPreset {
  const now = Date.now();
  return {
    id: DEFAULT_PRESET_ID,
    name: "鍏ㄩ儴鏀惰棌",
    searchQuery: "",
    filters: {
      categories: [],
      sortBy: "recent",
      tags: [],
    },
    isDefault: true,
    createdAt: now,
    updatedAt: now,
  };
}

function withDefaultPreset(presets: StarredFilterPreset[]) {
  const defaultPreset = presets.find((preset) => preset.id === DEFAULT_PRESET_ID);
  if (defaultPreset) {
    return presets;
  }
  return [createDefaultPreset(), ...presets];
}

export const useStarredPreferenceStore = create<StarredPreferenceState>((set, get) => ({
  presets: [createDefaultPreset()],
  activePresetId: DEFAULT_PRESET_ID,

  initializePresets: () => {
    const stored = getStorage<StarredFilterPreset[]>(STARRED_PRESET_STORAGE_KEY, []) ?? [];
    const normalized = withDefaultPreset(stored);
    setStorage(STARRED_PRESET_STORAGE_KEY, normalized);
    set((state) => ({
      presets: normalized,
      activePresetId: normalized.some((preset) => preset.id === state.activePresetId)
        ? state.activePresetId
        : DEFAULT_PRESET_ID,
    }));
  },

  savePreset: (input) => {
    const now = Date.now();
    const state = get();
    const existing = input.id
      ? state.presets.find((preset) => preset.id === input.id && !preset.isDefault)
      : undefined;

    const nextPreset: StarredFilterPreset = existing
      ? {
          ...existing,
          name: input.name.trim(),
          searchQuery: input.searchQuery,
          filters: {
            categories: [...input.filters.categories],
            sortBy: input.filters.sortBy,
            tags: [...input.filters.tags],
          },
          updatedAt: now,
        }
      : {
          id: `preset_${now}_${Math.random().toString(36).slice(2, 11)}`,
          name: input.name.trim(),
          searchQuery: input.searchQuery,
          filters: {
            categories: [...input.filters.categories],
            sortBy: input.filters.sortBy,
            tags: [...input.filters.tags],
          },
          isDefault: false,
          createdAt: now,
          updatedAt: now,
        };

    const nextPresets = withDefaultPreset(
      existing
        ? state.presets.map((preset) => (preset.id === nextPreset.id ? nextPreset : preset))
        : [...state.presets, nextPreset]
    );

    setStorage(STARRED_PRESET_STORAGE_KEY, nextPresets);
    set({
      presets: nextPresets,
      activePresetId: nextPreset.id,
    });

    return nextPreset;
  },

  deletePreset: (id) => {
    const state = get();
    const nextPresets = withDefaultPreset(
      state.presets.filter((preset) => preset.id !== id || preset.isDefault)
    );
    setStorage(STARRED_PRESET_STORAGE_KEY, nextPresets);
    set({
      presets: nextPresets,
      activePresetId: state.activePresetId === id ? DEFAULT_PRESET_ID : state.activePresetId,
    });
  },

  applyPreset: (id) => {
    const preset = get().presets.find((item) => item.id === id) ?? null;
    if (preset) {
      set({ activePresetId: id });
    }
    return preset;
  },

  setActivePresetId: (id) => {
    set({ activePresetId: id });
  },
}));

