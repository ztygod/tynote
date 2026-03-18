import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQuicklinksStore, type LinkType, type Quicklink } from "@/store/quicklinks-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface QuicklinksManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedQuicklink?: Quicklink | null;
}

const COMMON_ICONS = [
  "📌",
  "📂",
  "✅",
  "⭐",
  "🔍",
  "📝",
  "📊",
  "🎯",
  "🔗",
  "🌐",
  "💡",
  "📚",
];

const INTERNAL_PAGES = [
  { value: "/home", label: "首页" },
  { value: "/dashboard", label: "仪表盘" },
  { value: "/todo", label: "待办事项" },
  { value: "/starred", label: "收藏内容" },
];

const INITIAL_FORM: Omit<Quicklink, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  description: "",
  linkType: "internal",
  target: "/home",
  icon: "🔗",
  order: 0,
};

export function QuicklinksManager({
  open,
  onOpenChange,
  selectedQuicklink,
}: QuicklinksManagerProps) {
  const addQuicklink = useQuicklinksStore((s) => s.addQuicklink);
  const updateQuicklink = useQuicklinksStore((s) => s.updateQuicklink);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    if (!selectedQuicklink) {
      setFormData(INITIAL_FORM);
      return;
    }

    setFormData({
      title: selectedQuicklink.title,
      description: selectedQuicklink.description || "",
      linkType: selectedQuicklink.linkType,
      target: selectedQuicklink.target,
      icon: selectedQuicklink.icon || "🔗",
      order: selectedQuicklink.order,
    });
  }, [selectedQuicklink]);

  const handleTypeChange = (value: LinkType) => {
    setFormData((prev) => ({
      ...prev,
      linkType: value,
      target: value === "internal" ? "/home" : "",
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error("请输入标题。");
      return;
    }

    if (!formData.target.trim()) {
      toast.error("请输入目标地址。");
      return;
    }

    if (formData.linkType === "external") {
      try {
        new URL(formData.target.trim());
      } catch {
        toast.error("请输入有效的网址（例如：https://example.com）。");
        return;
      }
    }

    try {
      if (selectedQuicklink) {
        updateQuicklink(selectedQuicklink.id, formData);
        toast.success("快捷链接已更新。");
      } else {
        addQuicklink(formData);
        toast.success("快捷链接已创建。");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("保存快捷链接失败。");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedQuicklink ? "编辑快捷链接" : "新增快捷链接"}</DialogTitle>
          <DialogDescription>
            配置常用入口，便于快速访问目标页面或资源。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="quicklink-title">标题</Label>
            <Input
              id="quicklink-title"
              placeholder="例如：迭代看板"
              value={formData.title}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, title: event.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quicklink-description">描述</Label>
            <Textarea
              id="quicklink-description"
              className="h-20 resize-none"
              placeholder="可选：补充该链接的用途说明"
              value={formData.description}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, description: event.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quicklink-icon">图标</Label>
            <div className="flex flex-wrap gap-2">
              {COMMON_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, icon }))}
                  className={`rounded-lg p-2 text-xl transition ${
                    formData.icon === icon
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-accent"
                  }`}
                  aria-pressed={formData.icon === icon}
                >
                  {icon}
                </button>
              ))}
            </div>
            <Input
              id="quicklink-icon"
              placeholder="或输入自定义图标"
              value={formData.icon}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, icon: event.target.value }))
              }
              maxLength={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quicklink-type">类型</Label>
            <Select value={formData.linkType} onValueChange={handleTypeChange}>
              <SelectTrigger id="quicklink-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">内部页面</SelectItem>
                <SelectItem value="knowledge">知识节点</SelectItem>
                <SelectItem value="external">外部链接</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quicklink-target">目标</Label>
            {formData.linkType === "internal" ? (
              <Select
                value={formData.target}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, target: value }))}
              >
                <SelectTrigger id="quicklink-target">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INTERNAL_PAGES.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="quicklink-target"
                placeholder={
                  formData.linkType === "external" ? "例如：https://example.com" : "例如：知识节点ID"
                }
                value={formData.target}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, target: event.target.value }))
                }
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>
            {selectedQuicklink ? "保存修改" : "创建快捷链接"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
