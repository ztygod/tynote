import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useQuicklinksStore } from "@/store/quicklinks-store";
import { useSearchStore } from "@/store/search-store";

export function OverviewCard() {
  const quicklinks = useQuicklinksStore((s) => s.quicklinks);
  const results = useSearchStore((s) => s.results);

  const quicklinksCount = quicklinks.length;
  const searchResultsCount = results.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>核心指标一览</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">快速链接</p>
            <p className="text-2xl font-bold">{quicklinksCount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">搜索缓存</p>
            <p className="text-2xl font-bold">{searchResultsCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OverviewCard;
