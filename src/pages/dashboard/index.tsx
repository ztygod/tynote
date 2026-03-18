import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Archive, Database, ExternalLink, SearchCheck } from "lucide-react";
import { useQuicklinksStore } from "@/store/quicklinks-store";
import { useSearchStore } from "@/store/search-store";
import ChartsPanel from "@/pages/dashboard/components/charts-panel";
import { DashboardHero } from "@/pages/dashboard/components/dashboard-hero";
import { StatsGrid } from "@/pages/dashboard/components/stats-grid";
import WorkloadCard from "@/pages/dashboard/components/workload-card";

function formatRelativeTime(timestamp: number | null) {
  if (!timestamp) {
    return "暂无更新";
  }

  return formatDistanceToNow(timestamp, {
    addSuffix: true,
    locale: zhCN,
  });
}

export function DashboardPage() {
  const quicklinks = useQuicklinksStore((s) => s.quicklinks);
  const initializeQuicklinks = useQuicklinksStore((s) => s.initializeQuicklinks);
  const searchResultsCount = useSearchStore((s) => s.results.length);

  const [lastRefreshed, setLastRefreshed] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [autoRefresh, setAutoRefresh] = React.useState(false);

  React.useEffect(() => {
    initializeQuicklinks();
    setLastRefreshed(Date.now());
  }, [initializeQuicklinks]);

  const handleRefresh = React.useCallback(() => {
    initializeQuicklinks();
    setLastRefreshed(Date.now());
  }, [initializeQuicklinks]);

  React.useEffect(() => {
    if (!autoRefresh) {
      return;
    }

    const timerId = window.setInterval(() => {
      initializeQuicklinks();
      setLastRefreshed(Date.now());
    }, 30_000);

    return () => window.clearInterval(timerId);
  }, [autoRefresh, initializeQuicklinks]);

  const filteredQuicklinks = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return quicklinks;
    }

    return quicklinks.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";
      const description = item.description?.toLowerCase() ?? "";
      return title.includes(query) || description.includes(query);
    });
  }, [quicklinks, searchQuery]);

  const latestUpdatedAt = React.useMemo(() => {
    if (filteredQuicklinks.length === 0) {
      return null;
    }

    return Math.max(...filteredQuicklinks.map((item) => item.updatedAt));
  }, [filteredQuicklinks]);

  const recentCount = React.useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return filteredQuicklinks.filter((item) => item.updatedAt >= sevenDaysAgo).length;
  }, [filteredQuicklinks]);

  const externalCount = React.useMemo(() => {
    return filteredQuicklinks.filter((item) => item.linkType === "external").length;
  }, [filteredQuicklinks]);

  const trendData = React.useMemo(() => {
    const formatter = new Intl.DateTimeFormat("zh-CN", {
      month: "numeric",
      day: "numeric",
    });

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));

      const start = date.getTime();
      const end = start + 24 * 60 * 60 * 1000;
      const value = quicklinks.filter((item) => item.updatedAt >= start && item.updatedAt < end).length;

      return {
        label: formatter.format(date),
        value,
      };
    });
  }, [quicklinks]);

  const stats = [
    {
      title: "快捷链接总数",
      value: `${filteredQuicklinks.length}`,
      description: searchQuery ? "当前为筛选后的可见数量" : "当前已存储的快捷入口数量",
      icon: Archive,
      tone: "info" as const,
      trend: searchQuery ? `匹配 ${filteredQuicklinks.length} 项` : `共 ${quicklinks.length} 项`,
    },
    {
      title: "外部链接",
      value: `${externalCount}`,
      description: "外部资源入口数量，便于判断跳转型内容占比。",
      icon: ExternalLink,
      tone: "warning" as const,
      trend:
        filteredQuicklinks.length > 0
          ? `${Math.round((externalCount / filteredQuicklinks.length) * 100)}% 占比`
          : "0% 占比",
    },
    {
      title: "近 7 天更新",
      value: `${recentCount}`,
      description: "最近 7 天内发生更新时间变化的快捷链接数量。",
      icon: Database,
      tone: "success" as const,
      trend: formatRelativeTime(latestUpdatedAt),
    },
    {
      title: "搜索缓存",
      value: `${searchResultsCount}`,
      description: "当前搜索弹层中的结果数量，用于判断缓存是否活跃。",
      icon: SearchCheck,
      tone: "neutral" as const,
      trend: lastRefreshed ? `刷新于 ${formatRelativeTime(lastRefreshed)}` : "尚未刷新",
    },
  ];

  const workloadItems = [
    {
      label: "刷新模式",
      value: autoRefresh ? "自动" : "手动",
      status: autoRefresh ? "每 30 秒同步一次快捷链接数据" : "仅在进入页面或手动触发时刷新",
    },
    {
      label: "筛选范围",
      value: searchQuery ? `${filteredQuicklinks.length} 项` : "全部",
      status: searchQuery ? `当前关键词为“${searchQuery}”` : "未启用搜索过滤，显示全部快捷链接",
    },
    {
      label: "最近更新时间",
      value: latestUpdatedAt ? formatRelativeTime(latestUpdatedAt) : "暂无",
      status: latestUpdatedAt ? "至少存在一条近期有变更的快捷链接" : "当前没有可用的更新时间信息",
    },
  ];

  return (
    <div className="bg-muted/20 text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <DashboardHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          autoRefresh={autoRefresh}
          onToggleAutoRefresh={() => setAutoRefresh((value) => !value)}
          lastRefreshed={lastRefreshed}
          matchedCount={filteredQuicklinks.length}
          totalCount={quicklinks.length}
        />

        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <ChartsPanel data={trendData} />
          <WorkloadCard items={workloadItems} />
        </div>
      </div>
    </div>
  );
}
