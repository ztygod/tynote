import * as React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchStore, type SearchResult } from "@/store/search-store";
import { format } from "date-fns";

interface SearchResultsProps {
  results: SearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
  const sortBy = useSearchStore((state) => state.sortBy);
  const setSortBy = useSearchStore((state) => state.setSortBy);
  const isLoading = useSearchStore((state) => state.isLoading);

  const sortedResults = React.useMemo(() => {
    if (!results || results.length <= 1) {
      return results;
    }

    const sorted = [...results];
    switch (sortBy) {
      case "time-desc":
        return sorted.sort(
          (a, b) =>
            new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
        );
      case "time-asc":
        return sorted.sort(
          (a, b) =>
            new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime()
        );
      case "alpha-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
      case "alpha-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title, "zh-CN"));
      default:
        return sorted;
    }
  }, [results, sortBy]);

  const highlightKeywords = (
    text: string,
    keywords?: string[]
  ): React.ReactNode => {
    if (!keywords || keywords.length === 0) return text;

    let lastIndex = 0;
    const parts: React.ReactNode[] = [];

    const escapedKeywords = keywords
      .filter((keyword) => keyword)
      .map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    if (escapedKeywords.length === 0) {
      return text;
    }

    const regex = new RegExp(escapedKeywords.join("|"), "gi");

    let match;
    while ((match = regex.exec(text)) !== null) {
      // 添加匹配前的文本
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      // 添加高亮的匹配文本
      parts.push(
        <span
          key={`highlight-${match.index}-${match[0]}`}
          className="bg-yellow-200 dark:bg-yellow-900 font-semibold"
        >
          {match[0]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }

    // 添加剩余文本
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold mb-2">未找到结果</h3>
        <p className="text-muted-foreground">尝试调整搜索关键词或过滤条件</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 排序工具栏 */}
      <div className="flex items-center gap-2 border-b pb-3">
        <span className="text-sm text-muted-foreground">
          找到 {sortedResults.length} 个结果
        </span>
        <div className="ml-auto flex gap-2">
          <Button
            variant={sortBy === "time-desc" ? "default" : "outline"}
            size="sm"
            className="gap-1 h-8"
            onClick={() => setSortBy("time-desc")}
          >
            <ArrowDown className="h-4 w-4" />
            最新
          </Button>
          <Button
            variant={sortBy === "time-asc" ? "default" : "outline"}
            size="sm"
            className="gap-1 h-8"
            onClick={() => setSortBy("time-asc")}
          >
            <ArrowUp className="h-4 w-4" />
            最早
          </Button>
          <Button
            variant={sortBy === "alpha-asc" ? "default" : "outline"}
            size="sm"
            className="gap-1 h-8"
            onClick={() => setSortBy("alpha-asc")}
          >
            A-Z
          </Button>
          <Button
            variant={sortBy === "alpha-desc" ? "default" : "outline"}
            size="sm"
            className="gap-1 h-8"
            onClick={() => setSortBy("alpha-desc")}
          >
            Z-A
          </Button>
        </div>
      </div>

      {/* 结果列表 */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {sortedResults.map((result) => (
          <div
            key={result.id}
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
          >
            {/* 标题 */}
            <h4 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {highlightKeywords(result.title, result.matchedKeywords)}
            </h4>

            {/* 摘要 */}
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {highlightKeywords(result.summary, result.matchedKeywords)}
            </p>

            {/* 元数据 */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                {result.author && (
                  <span>
                    作者:{" "}
                    <span className="font-medium text-foreground">
                      {result.author}
                    </span>
                  </span>
                )}
                <span>
                  更新于:{" "}
                  <span className="font-medium text-foreground">
                    {format(new Date(result.updateTime), "MMM dd")}
                  </span>
                </span>
              </div>
            </div>

            {/* 标签 */}
            {result.tags && result.tags.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
