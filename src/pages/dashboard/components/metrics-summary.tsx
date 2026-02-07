import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useQuicklinksStore } from "@/store/quicklinks-store";
import { useSearchStore } from "@/store/search-store";

export function MetricsSummary({
  lastRefreshed,
  query,
}: {
  lastRefreshed?: number | null;
  query?: string;
}) {
  const quicklinks = useQuicklinksStore((s) => s.quicklinks);
  const initializeQuicklinks = useQuicklinksStore(
    (s) => s.initializeQuicklinks,
  );
  const results = useSearchStore((s) => s.results);

  React.useEffect(() => {
    initializeQuicklinks();
  }, [initializeQuicklinks]);

  const filteredQuicklinks = React.useMemo(() => {
    if (!query) return quicklinks;
    const q = query.toLowerCase();
    return quicklinks.filter((k) => (k.title || "").toLowerCase().includes(q));
  }, [quicklinks, query]);

  const quicklinksCount = filteredQuicklinks.length;
  const searchResultsCount = results.length;

  const latestQuicklinkUpdate = React.useMemo(() => {
    if (filteredQuicklinks.length === 0) return null;
    return new Date(Math.max(...filteredQuicklinks.map((q) => q.updatedAt)));
  }, [filteredQuicklinks]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>快速链接</CardTitle>
          <CardDescription>存储的快速入口数量</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{quicklinksCount}</div>
          <div className="text-sm text-muted-foreground mt-2">
            {latestQuicklinkUpdate
              ? `最近更新：${latestQuicklinkUpdate.toLocaleString()}`
              : "暂无更新记录"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>搜索结果缓存</CardTitle>
          <CardDescription>当前搜索结果数量（临时）</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{searchResultsCount}</div>
          <div className="text-sm text-muted-foreground mt-2">
            {lastRefreshed
              ? `上次刷新：${new Date(lastRefreshed).toLocaleString()}`
              : "尚未手动刷新"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>系统概况</CardTitle>
          <CardDescription>结构与使用的快速视图</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>快速链接：{quicklinksCount}</li>
            <li>搜索缓存：{searchResultsCount}</li>
            <li>
              最近更新：
              {latestQuicklinkUpdate
                ? latestQuicklinkUpdate.toLocaleString()
                : "—"}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default MetricsSummary;
