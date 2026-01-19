import { Bot, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardHeader({
  searchQuery,
  onSearchChange,
  onRefresh,
  autoRefresh,
  onToggleAutoRefresh,
  lastRefreshed,
}: {
  searchQuery?: string;
  onSearchChange?: (v: string) => void;
  onRefresh?: () => void;
  autoRefresh?: boolean;
  onToggleAutoRefresh?: () => void;
  lastRefreshed?: number | null;
}) {
  return (
    <header className="mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-foreground/90">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Bot size={28} className="text-purple-600 dark:text-purple-500" />
          </div>
          数据总览
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ChevronRight size={20} />
          <p>系统指标与使用概况一览，可展开查看详细趋势。</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="flex gap-2 flex-1 sm:flex-none">
            <Input
              placeholder="筛选或搜索指标..."
              className="flex-1 sm:w-64"
              value={searchQuery ?? ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={autoRefresh ? "secondary" : "outline"}
              size="sm"
              onClick={onToggleAutoRefresh}
            >
              {autoRefresh ? "自动刷新：开" : "自动刷新：关"}
            </Button>
            <Button variant="outline" size="sm" onClick={onRefresh}>
              刷新
            </Button>
            {lastRefreshed && (
              <div className="text-xs text-muted-foreground">
                {new Date(lastRefreshed).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
