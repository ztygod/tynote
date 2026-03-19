import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Heart, ExternalLink, Copy, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { StarredItem, useStarredStore } from "@/store/starred-store";

interface StarredCardProps {
  item: StarredItem;
  onEdit?: (item: StarredItem) => void;
  onDelete?: (item: StarredItem) => void;
}

export function StarredCard({ item, onEdit, onDelete }: StarredCardProps) {
  const toggleStar = useStarredStore((state) => state.toggleStar);

  const handleToggleStar = () => {
    toggleStar(item.id);
  };

  const handleCopyUrl = () => {
    if (item.url) {
      navigator.clipboard.writeText(item.url);
      toast.success("链接已复制到剪贴板");
    }
  };

  const handleOpenInNewTab = () => {
    if (item.url) {
      const newWindow = window.open(item.url, "_blank", "noopener,noreferrer");
      if (newWindow) {
        newWindow.opener = null;
      }
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card
          className="group relative
            hover:-translate-y-2
            hover:shadow-xl
            transition-all duration-300
            rounded-xl cursor-pointer
            border border-transparent
            hover:border-primary/30
            bg-card
            hover:bg-accent/40"
        >
          {item.image ? (
            <div className="w-full h-40 bg-muted overflow-hidden rounded-t-lg -mt-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div
              className="
                w-full h-40 -mt-6 rounded-t-lg
                flex items-center justify-center
                bg-indigo-100 text-indigo-700
                px-2 text-center
            "
              title={item.title}
            >
              <span className="text-lg font-semibold line-clamp-2">
                {item.title}
              </span>
            </div>
          )}
          <CardHeader className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-xs mt-2">
                  {new Date(item.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleStar}
                className="flex-shrink-0"
              >
                <Heart
                  size={18}
                  className={
                    item.starred
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }
                />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 flex-1 flex flex-col">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs">
                {item.category}
              </Badge>
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{item.tags.length - 2}
                </Badge>
              )}
            </div>

            {item.url && (
              <div className="flex gap-2 mt-auto pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <ExternalLink size={14} className="mr-1" />
                  访问
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={handleCopyUrl}
                >
                  <Copy size={14} className="mr-1" />
                  复制
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {onEdit && (
          <ContextMenuItem onClick={() => onEdit(item)}>
            <Edit size={16} className="mr-2" />
            编辑
          </ContextMenuItem>
        )}
        {onDelete && (
          <ContextMenuItem
            onClick={() => onDelete(item)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 size={16} className="mr-2" />
            删除
          </ContextMenuItem>
        )}
        {(onEdit || onDelete) && item.url && <ContextMenuSeparator />}
        {item.url && (
          <>
            <ContextMenuItem onClick={handleOpenInNewTab}>
              <ExternalLink size={16} className="mr-2" />
              在新标签页打开
            </ContextMenuItem>
            <ContextMenuItem onClick={handleCopyUrl}>
              <Copy size={16} className="mr-2" />
              复制链接
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
