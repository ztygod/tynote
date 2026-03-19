import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Plus, Search } from "lucide-react";

interface EmptyStateProps {
  type?: "no-items" | "no-search-results";
  onReset?: () => void;
  onCreate?: () => void;
}

export function EmptyState({ type = "no-items", onReset, onCreate }: EmptyStateProps) {
  if (type === "no-search-results") {
    return (
      <Card className="rounded-xl border-border/60 shadow-sm">
        <CardHeader className="items-center pb-2 text-center">
          <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Search size={20} />
          </div>
          <CardTitle>未找到匹配的收藏</CardTitle>
          <CardDescription>尝试调整搜索词或筛选条件</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-3 pb-6">
          {onReset && (
            <Button variant="outline" className="rounded-xl" onClick={onReset}>
              清空筛选
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-border/60 shadow-sm">
      <CardHeader className="items-center pb-2 text-center">
        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Heart size={20} />
        </div>
        <CardTitle>还没有收藏内容</CardTitle>
        <CardDescription>把常用链接、文档和灵感收藏到这里</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center gap-3 pb-6">
        {onCreate && (
          <Button className="rounded-xl" onClick={onCreate}>
            <Plus size={16} />
            新增收藏
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
