import * as React from "react";
import { Search as SearchIcon, Lightbulb } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilters } from "./search-filters";
import { SearchResults } from "./search-results";
import {
  useSearchStore,
  type SearchMode,
  type SearchResult,
} from "@/store/search-store";
import { isApplePlatform } from "@/utils";

// Mock 数据生成函数
function generateMockResults(query: string): SearchResult[] {
  const mockTitles = [
    "React Hooks 最佳实践",
    "TypeScript 类型系统深度解析",
    "搜索算法优化指南",
    "前端性能优化笔记",
    "API 设计规范",
    "数据库索引策略",
    "状态管理模式对比",
    "CSS Grid 布局完全指南",
  ];

  const mockSummaries = [
    "介绍了 React Hooks 的核心概念和常见的使用模式...",
    "深入讲解 TypeScript 的类型系统，包括泛型、交叉类型等...",
    "分析各种搜索算法的时间复杂度和应用场景...",
    "总结前端应用的性能优化方法和最佳实践...",
    "规范 REST API 的设计原则和实现细节...",
    "讨论数据库索引的创建和优化策略...",
    "比较不同的状态管理解决方案的优缺点...",
    "详细介绍 CSS Grid 的布局方式和应用场景...",
  ];

  const authors = ["张三", "李四", "王五", "赵六"];
  const tags = [
    ["React", "Hooks"],
    ["TypeScript", "类型"],
    ["算法", "搜索"],
    ["性能", "优化"],
  ];

  return mockTitles.map((title, index) => ({
    id: `${index}`,
    title: title,
    summary: mockSummaries[index],
    author: authors[index % authors.length],
    updateTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    tags: tags[index % tags.length],
    matchedKeywords: query ? [query] : [],
  }));
}

// 模拟搜索延迟
async function performSearch(
  query: string,
  mode: SearchMode
): Promise<SearchResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!query) return [];

  if (mode === "ask") {
    // Ask 模式可以返回更多相关结果
    return generateMockResults(query).slice(0, 8);
  } else {
    // Search 模式返回精确匹配结果
    return generateMockResults(query).filter(
      (r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.summary.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export function SearchDialog() {
  const {
    isOpen,
    setIsOpen,
    mode,
    setMode,
    query,
    setQuery,
    results,
    setResults,
    setIsLoading,
  } = useSearchStore();

  const handleSearch = React.useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await performSearch(query, mode);
      setResults(searchResults);
    } catch (error) {
      console.error("搜索失败:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, mode, setResults, setIsLoading]);

  // 监听查询变化，自动搜索
  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300); // 防抖

    return () => clearTimeout(timer);
  }, [query, mode]);

  // 处理模式切换
  const handleModeChange = (value: string) => {
    setMode(value as SearchMode);
    setResults([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-hidden">
        {/* 对话框头部 */}
        <DialogHeader className="px-9 pt-6 pb-4 border-b">
          <DialogTitle className="sr-only">搜索</DialogTitle>

          {/* Tabs 和模式切换 */}
          <Tabs
            defaultValue="search"
            value={mode}
            onValueChange={handleModeChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="search" className="gap-2">
                <SearchIcon className="h-4 w-4" />
                <span>搜索</span>
              </TabsTrigger>
              <TabsTrigger value="ask" className="gap-2">
                <Lightbulb className="h-4 w-4" />
                <span>提问</span>
              </TabsTrigger>
            </TabsList>

            {/* Search 模式输入 */}
            <TabsContent value="search" className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="输入关键词搜索笔记、标题、作者..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  autoFocus
                  className="h-10"
                />
                <Button onClick={handleSearch} className="px-6">
                  搜索
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                💡 提示：输入关键词快速搜索，支持标题、内容、作者等多维度查询
              </div>
            </TabsContent>

            {/* Ask 模式输入 */}
            <TabsContent value="ask" className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="用自然语言提问，例如：最近更新的技术笔记有哪些..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  autoFocus
                  className="h-10"
                />
                <Button onClick={handleSearch} className="px-6">
                  提问
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                💡 提示：用自然语言提问，AI 将理解你的意图并返回相关结果
              </div>
            </TabsContent>
          </Tabs>
        </DialogHeader>

        {/* 对话框主体 */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(80vh-200px)]">
          <div className="space-y-4">
            {/* 过滤面板 */}
            {query && <SearchFilters />}

            {/* 搜索结果 */}
            {query && <SearchResults results={results} />}

            {/* 初始提示 */}
            {!query && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-5xl mb-4">
                  {mode === "search" ? "🔍" : "💡"}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {mode === "search" ? "搜索你的笔记" : "提问获取答案"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {mode === "search"
                    ? "输入关键词开始搜索你的笔记库"
                    : "用自然语言提问，让 AI 帮助你找到相关笔记"}
                </p>

                {/* 快捷提示 */}
                {mode === "ask" && (
                  <div className="mt-6 space-y-2 text-left">
                    <p className="text-xs font-semibold text-muted-foreground">
                      示例提问：
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• 最近有哪些关于 React 的笔记</li>
                      <li>• 找出过去 7 天更新的笔记</li>
                      <li>• 张三最近写的笔记</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 关闭按钮和快捷键提示 */}
        <div className="px-6 py-3 border-t bg-slate-50 dark:bg-slate-900 text-xs text-muted-foreground flex justify-between items-center">
          <div>
            按{" "}
            <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">
              Esc
            </kbd>{" "}
            关闭
          </div>
          <div>
            支持快捷键：
            <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">
              {isApplePlatform() ? "⌘K" : "Ctrl+K"}
            </kbd>{" "}
            或{" "}
            <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">
              /
            </kbd>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
