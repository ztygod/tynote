import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Activity, RefreshCw, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DashboardHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
  lastRefreshed: number | null;
  matchedCount: number;
  totalCount: number;
}

function formatTimestamp(timestamp: number | null) {
  if (!timestamp) {
    return "尚未刷新";
  }

  return format(timestamp, "MM月dd日 HH:mm", { locale: zhCN });
}

export function DashboardHero({
  searchQuery,
  onSearchChange,
  onRefresh,
  autoRefresh,
  onToggleAutoRefresh,
  lastRefreshed,
  matchedCount,
  totalCount,
}: DashboardHeroProps) {
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <section className="rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 shadow-sm">
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/15 text-chart-2">
              <Sparkles size={22} />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  数据总览
                </h1>
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  控制台
                </Badge>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                聚合快捷入口、搜索缓存和系统状态，保留真正有决策价值的信息，去掉重复和噪音。
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-xl border border-border/60 bg-background/80 p-4 sm:grid-cols-2 lg:min-w-[320px]">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                最后刷新
              </p>
              <p className="text-sm font-medium">{formatTimestamp(lastRefreshed)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                当前范围
              </p>
              <p className="text-sm font-medium">
                {matchedCount} / {totalCount} 项
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                自动刷新
              </p>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Activity
                  size={14}
                  className={autoRefresh ? "text-emerald-500" : "text-muted-foreground"}
                />
                {autoRefresh ? "已开启" : "未开启"}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                搜索状态
              </p>
              <p className="text-sm font-medium">
                {hasQuery ? `筛选: ${searchQuery}` : "未启用筛选"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="搜索快捷链接标题"
              className="h-11 rounded-xl border-border/60 bg-background pl-10"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant={autoRefresh ? "secondary" : "outline"}
              className="h-11 rounded-xl px-4"
              onClick={onToggleAutoRefresh}
            >
              <Activity size={16} />
              自动刷新{autoRefresh ? "已开启" : "未开启"}
            </Button>
            <Button className="h-11 rounded-xl px-4" onClick={onRefresh}>
              <RefreshCw size={16} />
              立即刷新
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
