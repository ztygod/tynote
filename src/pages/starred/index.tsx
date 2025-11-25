import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, SearchIcon, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { StarredCard, StarredItem } from "./components/starred-card";
import { FilterOptions, StarredFilter } from "./components/filter";
import { EmptyState } from "./components/empty-state";

// 示例数据
const MOCK_STARRED_ITEMS: StarredItem[] = [
  {
    id: "1",
    title: "React 官方文档",
    description: "React 的官方文档，包含最新的 API 和最佳实践指南。",
    category: "技术",
    tags: ["React", "前端", "JavaScript"],
    url: "https://react.dev",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop&auto=format",
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
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&auto=format",
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
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&auto=format",
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
    // 没有 image 字段，不显示图片也正常
  },
  {
    id: "5",
    title: "TypeScript 深度指南",
    description: "全面学习 TypeScript 的类型系统和高级特性。",
    category: "技术",
    tags: ["TypeScript", "JavaScript", "类型系统"],
    url: "https://www.typescriptlang.org",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
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
    // 没有 image，正常
  },
  {
    id: "7",
    title: "内容营销策略",
    description: "如何通过高质量的内容吸引和留住用户。",
    category: "运营",
    tags: ["内容营销", "SEO", "增长"],
    date: "2024-11-01",
    starred: true,
    // 没有 image
  },
  {
    id: "8",
    title: "Web 性能优化指南",
    description: "提高网站加载速度和用户体验的实用技巧。",
    category: "技术",
    tags: ["性能优化", "前端", "Web"],
    url: "https://web.dev/performance",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    date: "2024-10-28",
    starred: true,
  },
];

export function StarredPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    sortBy: "recent",
  });

  // 筛选和搜索逻辑
  const filteredItems = useMemo(() => {
    let result = [...MOCK_STARRED_ITEMS];

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
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilters({ categories: [], sortBy: "recent" });
  };

  const availableCategories = Array.from(
    new Set(MOCK_STARRED_ITEMS.map((item) => item.category))
  );

  return (
    <div className="bg-muted/20 text-foreground min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-7 md:p-8">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-4">
            <Star size={32} className="text-yellow-500 fill-yellow-500" />
            收藏内容
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ChevronRight size={20} />
              <p>你喜欢的都在这里了</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
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
              {filters.categories.length > 0 && ` (已筛选)`}
            </p>
            {(searchQuery || filters.categories.length > 0) && (
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
                searchQuery || filters.categories.length > 0
                  ? "no-search-results"
                  : "no-items"
              }
              onReset={handleResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <StarredCard key={item.id} item={item} />
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
    </div>
  );
}

export default StarredPage;
