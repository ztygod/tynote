import { useState, useEffect } from "react";
import {
  useQuicklinksStore,
  Quicklink,
  LinkType,
} from "@/store/quicklinks-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface QuicklinksManagerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedQuicklink?: Quicklink | null;
}

const COMMON_EMOJIS = [
  "🏠",
  "📝",
  "✅",
  "⭐",
  "🔖",
  "📚",
  "🎯",
  "📊",
  "🔗",
  "🌐",
  "💼",
  "📧",
  "🔔",
  "⚙️",
  "🔍",
  "❤️",
];

const INTERNAL_PAGES = [
  { value: "/home", label: "首页" },
  { value: "/todo", label: "待办事项" },
  { value: "/starred", label: "收藏内容" },
  { value: "/inbox", label: "收件箱" },
];

export function QuicklinksManager({
  open,
  onOpenChange,
  selectedQuicklink,
}: QuicklinksManagerProps) {
  const { addQuicklink, updateQuicklink } = useQuicklinksStore();
  const [formData, setFormData] = useState<
    Omit<Quicklink, "id" | "createdAt" | "updatedAt">
  >({
    title: "",
    description: "",
    linkType: "internal",
    target: "/home",
    icon: "🔗",
    order: 0,
  });

  useEffect(() => {
    if (selectedQuicklink) {
      setFormData({
        title: selectedQuicklink.title,
        description: selectedQuicklink.description || "",
        linkType: selectedQuicklink.linkType,
        target: selectedQuicklink.target,
        icon: selectedQuicklink.icon || "🔗",
        order: selectedQuicklink.order,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        linkType: "internal",
        target: "/home",
        icon: "🔗",
        order: 0,
      });
    }
  }, [selectedQuicklink, open]);

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error("请输入链接标题");
      return;
    }

    if (!formData.target.trim()) {
      toast.error("请输入链接目标");
      return;
    }

    try {
      if (selectedQuicklink) {
        updateQuicklink(selectedQuicklink.id, formData);
        toast.success("快捷链接已更新");
      } else {
        addQuicklink(formData);
        toast.success("快捷链接已添加");
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("操作失败");
      console.error(error);
    }
  };

  const handleLinkTypeChange = (value: LinkType) => {
    setFormData((prev) => ({
      ...prev,
      linkType: value,
      target: value === "internal" ? "/home" : "",
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedQuicklink ? "编辑快捷链接" : "新增快捷链接"}
          </DialogTitle>
          <DialogDescription>
            {selectedQuicklink
              ? "修改快捷链接的信息"
              : "创建一个新的快捷链接以快速访问常用功能"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">标题 *</Label>
            <Input
              id="title"
              placeholder="如：我的待办"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              placeholder="可选：添加描述来说明这个链接的作用"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="resize-none h-20"
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label htmlFor="icon">图标</Label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {COMMON_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  {...(formData.icon === emoji ? { "aria-pressed": true } : {})}
                  title={emoji}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, icon: emoji }))
                  }
                  className={`text-2xl p-2 rounded transition-all select-none ${
                    formData.icon === emoji
                      ? "bg-primary/90 text-white ring-2 ring-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <Input
              id="icon"
              placeholder="或输入自定义emoji"
              value={formData.icon}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, icon: e.target.value }))
              }
              maxLength={4}
            />
          </div>

          {/* Link Type */}
          <div className="space-y-2">
            <Label htmlFor="linkType">链接类型 *</Label>
            <Select
              value={formData.linkType}
              onValueChange={handleLinkTypeChange}
            >
              <SelectTrigger id="linkType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">内部页面</SelectItem>
                <SelectItem value="knowledge">知识库节点</SelectItem>
                <SelectItem value="external">外部链接</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target */}
          <div className="space-y-2">
            <Label htmlFor="target">
              {formData.linkType === "internal" && "目标页面"}
              {formData.linkType === "knowledge" && "节点ID"}
              {formData.linkType === "external" && "链接地址"}
            </Label>

            {formData.linkType === "internal" ? (
              <Select
                value={formData.target}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, target: value }))
                }
              >
                <SelectTrigger id="target">
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
                id="target"
                placeholder={
                  formData.linkType === "knowledge"
                    ? "如：note-123456"
                    : "如：https://example.com"
                }
                value={formData.target}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, target: e.target.value }))
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
            {selectedQuicklink ? "保存更改" : "添加链接"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
