import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { StarredItem, useStarredStore } from "@/store/starred-store";
import { Copy, Edit, ExternalLink, Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
    if (!item.url) {
      return;
    }
    navigator.clipboard.writeText(item.url);
    toast.success("链接已复制");
  };

  const handleOpenInNewTab = () => {
    if (!item.url) {
      return;
    }
    const newWindow = window.open(item.url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="group h-full rounded-xl border-border/60 shadow-sm transition-colors hover:border-primary/40">
          {item.image ? (
            <div className="-mt-6 aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="-mt-6 flex aspect-[16/9] w-full items-center justify-center rounded-t-xl bg-muted px-4">
              <span className="line-clamp-2 text-center text-base font-semibold">{item.title}</span>
            </div>
          )}

          <CardHeader className="gap-3 pb-3">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="line-clamp-2 text-base leading-6">{item.title}</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-lg"
                onClick={handleToggleStar}
              >
                <Heart
                  size={16}
                  className={item.starred ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}
                />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(item.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-3 pb-4">
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{item.description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-lg text-xs font-medium">
                {item.category}
              </Badge>
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-lg text-xs font-normal">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 2 && (
                <Badge variant="outline" className="rounded-lg text-xs font-normal">
                  +{item.tags.length - 2}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-auto grid grid-cols-2 gap-2 border-t border-border/60 pt-4">
            {item.url ? (
              <>
                <Button type="button" variant="outline" className="h-9 rounded-lg" onClick={handleOpenInNewTab}>
                  <ExternalLink size={14} />
                  访问
                </Button>
                <Button type="button" variant="outline" className="h-9 rounded-lg" onClick={handleCopyUrl}>
                  <Copy size={14} />
                  复制
                </Button>
              </>
            ) : (
              <div className="col-span-2 text-xs text-muted-foreground">该收藏未设置链接</div>
            )}
          </CardFooter>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-48 rounded-xl">
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
