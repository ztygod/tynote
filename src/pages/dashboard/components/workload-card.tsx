import { Badge } from "@/components/ui/badge";
import { PanelCard } from "@/pages/dashboard/components/panel-card";

interface WorkloadItem {
  label: string;
  value: string;
  status: string;
}

interface WorkloadCardProps {
  items: WorkloadItem[];
}

export function WorkloadCard({ items }: WorkloadCardProps) {
  return (
    <PanelCard
      title="系统状态"
      description="展示当前 dashboard 的刷新、筛选和数据覆盖状态。"
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/30 px-4 py-3"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.status}</p>
            </div>
            <Badge variant="secondary" className="rounded-full px-2.5 py-1">
              {item.value}
            </Badge>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

export default WorkloadCard;
