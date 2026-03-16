import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, SearchIcon, Star, Plus } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { StarredCard } from "./components/starred-card";
import { FilterOptions, StarredFilter } from "./components/filter";
import { EmptyState } from "./components/empty-state";
import { useStarredStore, StarredItem } from "@/store/starred-store";
import { StarredEditor } from "./components/starred-editor";
import { DeleteConfirmDialog } from "./components/delete-confirm-dialog";
import { TagFilter } from "./components/tag-filter";

export function StarredPage() {
  const { items, initializeStarredItems } = useStarredStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    sortBy: "recent",
    tags: [],
  });
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StarredItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<StarredItem | null>(null);

  // Initialize starred items from storage on mount
  useEffect(() => {
    initializeStarredItems();
  }, [initializeStarredItems]);

  // 筛选和搜索逻辑
  const filteredItems = useMemo(() => {
    let result = [...items];

    // 按搜索词筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 按分类筛选
    if (filters.categories.length > 0) {
      result = result.filter((item) =>
        filters.categories.includes(item.category)
      );
    }

    // 按标签筛选（OR 逻辑）
    if (filters.tags.length > 0) {
      result = result.filter((item) =>
        filters.tags.some((tag) => item.tags.includes(tag))
      );
    }

    // 排序
    switch (filters.sortBy) {
      case "oldest":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "alphabetical":
        result.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
        break;
      case "recent":
      default:
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }

    return result;
  }, [items, searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ categories: [], sortBy: "recent", tags: [] });
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setEditorOpen(true);
  };

  const handleEdit = (item: StarredItem) => {
    setEditingItem(item);
    setEditorOpen(true);
  };

  const handleEditorClose = (open: boolean) => {
    setEditorOpen(open);
    if (!open) {
      setEditingItem(null);
    }
  };

  const handleDelete = (item: StarredItem) => {
    setDeletingItem(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = (open: boolean) => {
    setDeleteDialogOpen(open);
    if (!open) {
      setDeletingItem(null);
    }
  };

  const availableCategories = Array.from(
    new Set(items.map((item) => item.category))
  );

  // 计算可用标签及其使用次数
  const availableTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    items.forEach((item) => {
      item.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count); // 按使用次数降序排列
  }, [items]);

  const handleTagsChange = (tags: string[]) => {
    setFilters((prev) => ({ ...prev, tags }));
  };

  return (
    <div className="bg-muted/20 text-foreground min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-7 md:p-8">
        {/* Header Section */}
        <header className="mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-foreground/90">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Star
                  size={28}
                  className="text-yellow-600 dark:text-yellow-500 fill-yellow-500"
                />
              </div>
              收藏中心
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ChevronRight size={20} />
              <p>你喜欢的都在这里了</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={handleAddNew}
                className="gap-2"
                size="sm"
              >
                <Plus size={16} />
                新增收藏
              </Button>
              <form
                onSubmit={handleSearch}
                className="flex gap-2 flex-1 sm:flex-none"
              >
                <Input
                  placeholder="搜索标题、描述或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 sm:w-64"
                />
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  aria-label="Search"
                >
                  <SearchIcon size={18} />
                </Button>
              </form>
              <TagFilter
                availableTags={availableTags}
                selectedTags={filters.tags}
                onTagsChange={handleTagsChange}
              />
              <StarredFilter
                availableCategories={availableCategories}
                onFilterChange={setFilters}
              />
            </div>
          </div>
        </header>

        {/* Stats Section */}
        {filteredItems.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              共{" "}
              <span className="font-semibold text-foreground">
                {filteredItems.length}
              </span>{" "}
              项{searchQuery && ` (搜索结果)`}
              {(filters.categories.length > 0 || filters.tags.length > 0) && ` (已筛选)`}
            </p>
            {(searchQuery || filters.categories.length > 0 || filters.tags.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-xs"
              >
                清除所有筛选
              </Button>
            )}
          </div>
        )}

        {/* Main Content */}
        <main>
          {filteredItems.length === 0 ? (
            <EmptyState
              type={
                searchQuery || filters.categories.length > 0 || filters.tags.length > 0
                  ? "no-search-results"
                  : "no-items"
              }
              onReset={handleResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <StarredCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>

        {/* Footer Info */}
        {filteredItems.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              最后更新于{" "}
              {new Date(
                Math.max(
                  ...filteredItems.map((i) => new Date(i.date).getTime())
                )
              ).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Editor Dialog */}
      <StarredEditor
        open={editorOpen}
        onOpenChange={handleEditorClose}
        item={editingItem}
      />

      {/* Delete Confirm Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={handleDeleteDialogClose}
        item={deletingItem}
      />
    </div>
  );
}

export default StarredPage;
