import { Badge } from "@/components/ui/badge";
import type { PageThemeTokens } from "@/lib/page-theme";
import { cn } from "@/lib/utils";
import { PanelCard } from "@/pages/dashboard/components/panel-card";

interface WorkloadItem {
  label: string;
  value: string;
  status: string;
}

interface WorkloadCardProps {
  items: WorkloadItem[];
  theme: PageThemeTokens;
}

export function WorkloadCard({ items, theme }: WorkloadCardProps) {
  return (
    <PanelCard
      title="系统状态"
      description="展示当前 dashboard 的刷新、筛选和数据覆盖状态。"
      className={cn(theme.infoBorder)}
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.label}
            className={cn("flex items-center justify-between gap-4 rounded-xl border bg-background/80 px-4 py-3", theme.infoBorder)}
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.status}</p>
            </div>
            <Badge variant="secondary" className={cn("rounded-full px-2.5 py-1", theme.infoBadge)}>
              {item.value}
            </Badge>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

export default WorkloadCard;
