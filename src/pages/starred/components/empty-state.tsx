import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";

interface EmptyStateProps {
  type?: "no-items" | "no-search-results";
  onReset?: () => void;
}

export function EmptyState({ type = "no-items", onReset }: EmptyStateProps) {
  if (type === "no-search-results") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search size={48} className="text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">未找到匹配的内容</h3>
        <p className="text-muted-foreground mb-6">尝试调整搜索词或筛选条件</p>
        {onReset && (
          <Button variant="outline" onClick={onReset}>
            清除筛选
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Heart size={48} className="text-muted-foreground mb-4 opacity-50" />
      <h3 className="text-lg font-semibold mb-2">还没有收藏任何内容</h3>
      <p className="text-muted-foreground">开始收藏你喜欢的内容吧！</p>
    </div>
  );
}
