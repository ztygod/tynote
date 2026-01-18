import { Quicklink } from "@/store/quicklinks-store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  ExternalLink,
  Edit2,
  Trash2,
  FileText,
  BookOpenText,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuicklinkCardProps {
  quicklink: Quicklink;
  onEdit?: (quicklink: Quicklink) => void;
  onDelete?: (id: string) => void;
  editable?: boolean;
}

export function QuicklinkCard({
  quicklink,
  onEdit,
  onDelete,
  editable = false,
}: QuicklinkCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      if (quicklink.linkType === "internal") {
        navigate(quicklink.target);
      } else if (quicklink.linkType === "external") {
        const raw = (quicklink.target || "").trim();
        if (!raw) {
          console.warn("quicklink external target is empty");
          return;
        }

        // 检查目标是否已包含 URL 协议（例如 mailto:, http:, https: 等）
        const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw);
        const url = hasScheme ? raw : `https://${raw}`;

        // 如果在 Tauri 环境中运行，优先使用 shell API 打开（如果可用）
        const tauri = (window as any).__TAURI__;
        if (tauri?.shell?.open) {
          try {
            tauri.shell.open(url);
            return;
          } catch (err) {
            // 若调用失败，则回退到浏览器打开逻辑
            console.warn(
              "tauri.shell.open failed, falling back to browser open",
              err,
            );
          }
        }

        // 使用锚点点击方式以避免部分弹窗拦截问题
        try {
          const a = document.createElement("a");
          a.href = url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          // 部分浏览器要求元素在文档中才能触发 click 生效
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch (err) {
          // 最后兜底方案
          window.open(url, "_blank", "noopener,noreferrer");
        }
      } else if (quicklink.linkType === "knowledge") {
        // 知识库节点 - 需要根据实际的知识库路由调整
        navigate(`/knowledge/${quicklink.target}`);
      }
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  };

  return (
    <TooltipProvider>
      <div className="relative group">
        <button
          onClick={handleClick}
          className="w-full p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent transition-all duration-200 cursor-pointer text-left hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl flex-shrink-0">
              {quicklink.icon || "🔗"}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {quicklink.title}
              </h3>
              {quicklink.description && (
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {quicklink.description}
                </p>
              )}
              {quicklink.linkType && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  {quicklink.linkType === "external" && (
                    <ExternalLink size={12} />
                  )}
                  {quicklink.linkType === "internal" && <FileText size={12} />}
                  {quicklink.linkType === "knowledge" && (
                    <BookOpenText size={12} />
                  )}
                  <span>
                    {quicklink.linkType === "external" && "外部链接"}
                    {quicklink.linkType === "internal" && "内部链接"}
                    {quicklink.linkType === "knowledge" && "知识库"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </button>

        {editable && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-background/80 hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(quicklink);
                  }}
                >
                  <Edit2 size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>编辑</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 bg-background/80 hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(quicklink.id);
                  }}
                >
                  <Trash2 size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>删除</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
