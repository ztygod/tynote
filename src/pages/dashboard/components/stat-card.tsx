import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatCardTone = "neutral" | "info" | "success" | "warning";

const toneStyles: Record<StatCardTone, { icon: string; chip: string }> = {
  neutral: {
    icon: "bg-muted text-foreground",
    chip: "bg-muted text-muted-foreground",
  },
  info: {
    icon: "bg-chart-2/15 text-chart-2",
    chip: "bg-chart-2/12 text-chart-2",
  },
  success: {
    icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    chip: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  },
  warning: {
    icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    chip: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
  },
};

export interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone?: StatCardTone;
  trend?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "neutral",
  trend,
}: StatCardProps) {
  return (
    <Card className="rounded-xl border-border/60 shadow-sm">
      <CardContent className="flex h-full flex-col gap-6 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              toneStyles[tone].icon,
            )}
          >
            <Icon size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          {trend ? (
            <Badge
              variant="secondary"
              className={cn("rounded-full border-0 px-2.5 py-1", toneStyles[tone].chip)}
            >
              {trend}
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
