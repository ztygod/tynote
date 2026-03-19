import { Clock3, FileText, MessageSquare, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PageThemeTokens } from "@/lib/page-theme";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "edited" | "comment" | "viewed";
  title: string;
  detail: string;
  actor: string;
  time: string;
}

interface RecentActivitySectionProps {
  theme: PageThemeTokens;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "a1",
    type: "edited",
    title: "项目周同步记录",
    detail: "更新了目标与负责人分配。",
    actor: "Alex",
    time: "10 分钟前",
  },
  {
    id: "a2",
    type: "comment",
    title: "Tauri 迁移草案",
    detail: "在评论线程中补充了实现反馈。",
    actor: "Bob",
    time: "40 分钟前",
  },
  {
    id: "a3",
    type: "viewed",
    title: "Q2 规划看板",
    detail: "从快捷链接打开并检查了待处理事项。",
    actor: "Alex",
    time: "2 小时前",
  },
  {
    id: "a4",
    type: "edited",
    title: "设计交付检查清单",
    detail: "完善了验收标准与发布顺序。",
    actor: "Alice",
    time: "昨天",
  },
];

function getTypeMeta(type: ActivityItem["type"]) {
  if (type === "edited") {
    return {
      icon: FileText,
      label: "已编辑",
    };
  }

  if (type === "comment") {
    return {
      icon: MessageSquare,
      label: "已评论",
    };
  }

  return {
    icon: Clock3,
    label: "已查看",
  };
}

export function RecentActivitySection({ theme }: RecentActivitySectionProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">最近动态</h2>
        <p className="text-sm text-muted-foreground">不离开首页即可快速了解最近更新。</p>
      </div>

      <Card className="rounded-xl border-border/60 bg-card shadow-sm">
        <CardHeader className="px-6 py-5">
          <CardTitle className="text-base font-semibold">最新事件</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-6 pb-6">
          {ACTIVITIES.map((activity) => {
            const meta = getTypeMeta(activity.type);
            const Icon = meta.icon;

            return (
              <article
                key={activity.id}
                className={cn(
                  "flex items-start justify-between gap-4 rounded-xl border p-4",
                  theme.infoBorder,
                  "bg-background/80",
                )}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", theme.heroIcon)}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <p className="text-sm font-semibold">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User size={12} />
                      <span>{activity.actor}</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Badge variant="secondary" className={cn("rounded-full px-2.5 py-1 text-xs", theme.infoBadge)}>
                    {meta.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </article>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}

export default RecentActivitySection;
