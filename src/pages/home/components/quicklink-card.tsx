import { useNavigate } from "react-router";
import { BookOpenText, Edit2, ExternalLink, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Quicklink } from "@/store/quicklinks-store";

interface QuicklinkCardProps {
  quicklink: Quicklink;
  onEdit?: (quicklink: Quicklink) => void;
  onDelete?: (id: string) => void;
  editable?: boolean;
}

function getTypeLabel(linkType: Quicklink["linkType"]) {
  if (linkType === "external") {
    return {
      label: "外部链接",
      icon: ExternalLink,
    };
  }

  if (linkType === "knowledge") {
    return {
      label: "知识节点",
      icon: BookOpenText,
    };
  }

  return {
    label: "内部页面",
    icon: FileText,
  };
}

export function QuicklinkCard({
  quicklink,
  onEdit,
  onDelete,
  editable = false,
}: QuicklinkCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (quicklink.linkType === "internal") {
      navigate(quicklink.target);
      return;
    }

    if (quicklink.linkType === "knowledge") {
      navigate(`/knowledge/${quicklink.target}`);
      return;
    }

    const raw = quicklink.target.trim();
    if (!raw) {
      return;
    }

    const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw);
    const target = hasScheme ? raw : `https://${raw}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const typeMeta = getTypeLabel(quicklink.linkType);
  const TypeIcon = typeMeta.icon;

  return (
    <Card className="group rounded-xl border-border/60 shadow-sm transition hover:border-border hover:shadow-md">
      <CardContent className="p-0">
        <button
          onClick={handleClick}
          className="w-full cursor-pointer rounded-xl p-4 text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-lg">
                {quicklink.icon || "🔗"}
              </div>
              <div className="min-w-0 space-y-1">
                <h3 className="truncate text-sm font-semibold">{quicklink.title}</h3>
                {quicklink.description ? (
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {quicklink.description}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">暂无描述</p>
                )}
              </div>
            </div>

            {editable ? (
              <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEdit?.(quicklink);
                  }}
                  aria-label="编辑快捷链接"
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg hover:text-destructive"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete?.(quicklink.id);
                  }}
                  aria-label="删除快捷链接"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ) : null}
          </div>

          <div className="mt-3 flex items-center">
            <Badge variant="secondary" className="rounded-full px-2.5 py-1 text-xs">
              <TypeIcon size={12} />
              {typeMeta.label}
            </Badge>
          </div>
        </button>
      </CardContent>
    </Card>
  );
}
