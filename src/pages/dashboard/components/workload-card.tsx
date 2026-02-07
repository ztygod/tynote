import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function WorkloadCard() {
  // Placeholder workload metrics; integrate real queues/tasks later
  const items = [
    { label: "待办事项", value: 5 },
    { label: "未审核内容", value: 2 },
    { label: "同步队列长度", value: 0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workload</CardTitle>
        <CardDescription>当前系统负载与待办</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{it.label}</span>
              <span className="font-medium">{it.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default WorkloadCard;
