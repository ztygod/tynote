import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStarredPreferenceStore } from "@/store/starred-preference-store";
import { StarredItem, useStarredStore } from "@/store/starred-store";
import { Bookmark, Plus, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "./components/delete-confirm-dialog";
import { EmptyState } from "./components/empty-state";
import { FilterOptions, StarredFilter } from "./components/filter";
import { StarredCard } from "./components/starred-card";
import { StarredEditor } from "./components/starred-editor";
import { TagFilter } from "./components/tag-filter";

const DEFAULT_FILTERS: FilterOptions = {
  categories: [],
  sortBy: "recent",
  tags: [],
};

export function StarredPage() {
  const items = useStarredStore((state) => state.items);
  const initializeStarredItems = useStarredStore((state) => state.initializeStarredItems);

  const presets = useStarredPreferenceStore((state) => state.presets);
  const activePresetId = useStarredPreferenceStore((state) => state.activePresetId);
  const initializePresets = useStarredPreferenceStore((state) => state.initializePresets);
  const applyPreset = useStarredPreferenceStore((state) => state.applyPreset);
  const savePreset = useStarredPreferenceStore((state) => state.savePreset);
  const deletePreset = useStarredPreferenceStore((state) => state.deletePreset);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StarredItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<StarredItem | null>(null);
  const [presetDialogOpen, setPresetDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");

  useEffect(() => {
    initializeStarredItems();
    initializePresets();
  }, [initializePresets, initializeStarredItems]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((item) => filters.categories.includes(item.category));
    }

    if (filters.tags.length > 0) {
      result = result.filter((item) => filters.tags.some((tag) => item.tags.includes(tag)));
    }

    switch (filters.sortBy) {
      case "oldest":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
        break;
      case "recent":
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    return result;
  }, [items, searchQuery, filters]);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.category))).sort((a, b) =>
      a.localeCompare(b, "zh-CN")
    );
  }, [items]);

  const availableTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [items]);

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.sortBy !== "recent";

  const latestUpdatedAt = useMemo(() => {
    if (filteredItems.length === 0) {
      return null;
    }
    return Math.max(...filteredItems.map((item) => new Date(item.date).getTime()));
  }, [filteredItems]);

  const activePreset = useMemo(
    () => presets.find((preset) => preset.id === activePresetId) ?? null,
    [activePresetId, presets]
  );

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters(DEFAULT_FILTERS);
    applyPreset("preset_all");
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setEditorOpen(true);
  };

  const handleEdit = (item: StarredItem) => {
    setEditingItem(item);
    setEditorOpen(true);
  };

  const handleDelete = (item: StarredItem) => {
    setDeletingItem(item);
    setDeleteDialogOpen(true);
  };

  const handlePresetApply = (presetId: string) => {
    const preset = applyPreset(presetId);
    if (!preset) {
      return;
    }
    setSearchQuery(preset.searchQuery);
    setFilters({
      categories: [...preset.filters.categories],
      sortBy: preset.filters.sortBy,
      tags: [...preset.filters.tags],
    });
  };

  const handleOpenSavePreset = () => {
    setPresetName(activePreset && !activePreset.isDefault ? activePreset.name : "");
    setPresetDialogOpen(true);
  };

  const handleSavePreset = () => {
    const name = presetName.trim();
    if (!name) {
      toast.error("请输入预设名称");
      return;
    }

    const savedPreset = savePreset({
      id: activePreset && !activePreset.isDefault ? activePreset.id : undefined,
      name,
      searchQuery,
      filters,
    });

    toast.success(`已保存预设：${savedPreset.name}`);
    setPresetDialogOpen(false);
  };

  const handleDeletePreset = () => {
    if (!activePreset || activePreset.isDefault) {
      return;
    }

    deletePreset(activePreset.id);
    const fallbackPreset = applyPreset("preset_all");
    if (fallbackPreset) {
      setSearchQuery(fallbackPreset.searchQuery);
      setFilters(fallbackPreset.filters);
    }
    toast.success("预设已删除");
  };

  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <Card className="rounded-xl border-border/60 bg-gradient-to-br from-card via-card to-muted/30 shadow-sm">
          <CardHeader className="space-y-4 pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-chart-4/15 text-chart-4">
                  <Sparkles size={20} />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <CardTitle className="text-3xl font-semibold tracking-tight">收藏中心</CardTitle>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                      Starred
                    </Badge>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground md:text-base">
                    集中管理你标记的重要内容，保持检索与回顾都足够高效。
                  </p>
                </div>
              </div>

              <div className="grid gap-3 rounded-xl border border-border/60 bg-background/80 p-4 sm:grid-cols-2 sm:min-w-[320px]">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">总收藏</p>
                  <p className="text-sm font-medium">{items.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">当前结果</p>
                  <p className="text-sm font-medium">{filteredItems.length}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">最近更新</p>
                  <p className="text-sm font-medium">
                    {latestUpdatedAt
                      ? new Date(latestUpdatedAt).toLocaleDateString("zh-CN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "暂无"}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-6">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="搜索标题、描述或标签"
                  className="h-10 rounded-xl border-border/60 bg-background pl-9"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <TagFilter
                  availableTags={availableTags}
                  selectedTags={filters.tags}
                  onTagsChange={(tags) => setFilters((prev) => ({ ...prev, tags }))}
                />
                <StarredFilter
                  value={filters}
                  availableCategories={availableCategories}
                  onFilterChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
                />
                <Select value={activePresetId} onValueChange={handlePresetApply}>
                  <SelectTrigger className="h-10 min-w-[160px] rounded-xl">
                    <SelectValue placeholder="选择预设" />
                  </SelectTrigger>
                  <SelectContent>
                    {presets.map((preset) => (
                      <SelectItem key={preset.id} value={preset.id}>
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" className="h-10 rounded-xl" onClick={handleOpenSavePreset}>
                  <Bookmark size={14} />
                  保存预设
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-xl"
                  disabled={!activePreset || activePreset.isDefault}
                  onClick={handleDeletePreset}
                >
                  删除预设
                </Button>
                <Button className="h-10 rounded-xl" onClick={handleAddNew}>
                  <Plus size={16} />
                  新增收藏
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
              <p className="text-muted-foreground">
                共 <span className="font-semibold text-foreground">{filteredItems.length}</span> 条结果
                {hasActiveFilters ? "（已应用筛选）" : ""}
              </p>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" className="rounded-lg" onClick={handleResetFilters}>
                  清空筛选
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <main>
          {filteredItems.length === 0 ? (
            <EmptyState
              type={hasActiveFilters ? "no-search-results" : "no-items"}
              onReset={handleResetFilters}
              onCreate={handleAddNew}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredItems.map((item) => (
                <StarredCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>
      </div>

      <StarredEditor
        open={editorOpen}
        onOpenChange={(open) => {
          setEditorOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}
        item={editingItem}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open);
          if (!open) {
            setDeletingItem(null);
          }
        }}
        item={deletingItem}
      />

      <Dialog open={presetDialogOpen} onOpenChange={setPresetDialogOpen}>
        <DialogContent className="max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>保存筛选预设</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="preset-name">预设名称</Label>
            <Input
              id="preset-name"
              className="h-10 rounded-xl"
              value={presetName}
              onChange={(event) => setPresetName(event.target.value)}
              placeholder="例如：设计灵感"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setPresetDialogOpen(false)}>
              取消
            </Button>
            <Button className="rounded-xl" onClick={handleSavePreset}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StarredPage;
