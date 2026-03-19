import { getStorage, setStorage } from "@/utils/storage";
import type { Quicklink } from "@/store/quicklinks-store";

const QUICKLINKS_STORAGE_KEY = "tynote_quicklinks";

export interface QuicklinksRepository {
  load: () => Quicklink[];
  save: (quicklinks: Quicklink[]) => void;
}

export const localStorageQuicklinksRepository: QuicklinksRepository = {
  load: () => getStorage<Quicklink[]>(QUICKLINKS_STORAGE_KEY, []) ?? [],
  save: (quicklinks) => {
    setStorage(QUICKLINKS_STORAGE_KEY, quicklinks);
  },
};
