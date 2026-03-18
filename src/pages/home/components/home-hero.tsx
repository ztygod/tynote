import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HomeHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  matchedCount: number;
  totalCount: number;
  latestUpdatedAt: number | null;
  onClearSearch: () => void;
}

function formatUpdatedAt(timestamp: number | null) {
  if (!timestamp) {
    return "暂无更新";
  }

  return format(timestamp, "MM-dd HH:mm", { locale: zhCN });
}

export function HomeHero({
  searchQuery,
  onSearchChange,
  matchedCount,
  totalCount,
  latestUpdatedAt,
  onClearSearch,
}: HomeHeroProps) {
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
                  首页工作台
                </h1>
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                  核心视图
                </Badge>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                只保留高频核心内容，用于快速导航和查看最近动态。
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-xl border border-border/60 bg-background/80 p-4 sm:grid-cols-2 lg:min-w-[320px]">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                快捷链接
              </p>
              <p className="text-sm font-medium">
                {matchedCount} / {totalCount}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                最近更新
              </p>
              <p className="text-sm font-medium">{formatUpdatedAt(latestUpdatedAt)}</p>
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
              placeholder="搜索快捷链接"
              className="h-11 rounded-xl border-border/60 bg-background pl-10"
            />
          </div>

          <Button className="h-11 rounded-xl px-4" onClick={onClearSearch}>
            <Plus size={16} />
            清空筛选
          </Button>
        </div>
      </div>
    </section>
  );
}
