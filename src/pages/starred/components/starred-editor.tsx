import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { StarredItem, useStarredStore } from "@/store/starred-store";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface StarredEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: StarredItem | null;
}

const DEFAULT_CATEGORIES = ["技术", "设计", "产品", "运营", "其他"];

export function StarredEditor({
  open,
  onOpenChange,
  item,
}: StarredEditorProps) {
  const addStarredItem = useStarredStore((state) => state.addStarredItem);
  const updateStarredItem = useStarredStore((state) => state.updateStarredItem);
  const isEditing = Boolean(item);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
      setTags(item.tags);
      setUrl(item.url ?? "");
      setImage(item.image ?? "");
      return;
    }
    resetForm();
  }, [item, open]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setTags([]);
    setUrl("");
    setImage("");
    setTagInput("");
  };

  const validateUrl = (urlString: string): boolean => {
    if (!urlString) {
      return true;
    }

    try {
      const parsed = new URL(urlString);
      const allowedProtocols = ["http:", "https:", "mailto:"];
      return allowedProtocols.includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (!trimmedTag || tags.includes(trimmedTag)) {
      return;
    }
    setTags((prev) => [...prev, trimmedTag]);
    setTagInput("");
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("请输入标题");
      return;
    }

    if (!description.trim()) {
      toast.error("请输入描述");
      return;
    }

    if (!category) {
      toast.error("请选择分类");
      return;
    }

    if (url && !validateUrl(url)) {
      toast.error("请输入有效的链接地址");
      return;
    }

    if (image && !validateUrl(image)) {
      toast.error("请输入有效的图片地址");
      return;
    }

    const itemData = {
      title: title.trim(),
      description: description.trim(),
      category,
      tags,
      url: url.trim() || undefined,
      image: image.trim() || undefined,
      date: isEditing && item ? item.date : new Date().toISOString().split("T")[0],
      starred: isEditing && item ? item.starred : true,
    };

    if (isEditing && item) {
      updateStarredItem(item.id, itemData);
      toast.success("收藏已更新");
    } else {
      addStarredItem(itemData);
      toast.success("收藏已添加");
    }

    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "编辑收藏" : "新增收藏"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "更新收藏信息" : "添加新的收藏内容到收藏中心"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">
              标题 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              className="h-10 rounded-xl"
              placeholder="输入标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              描述 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              className="rounded-xl"
              placeholder="输入描述"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              分类 <span className="text-destructive">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="h-10 rounded-xl">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">标签</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                className="h-10 rounded-xl"
                placeholder="输入标签后按 Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl px-3"
                onClick={handleAddTag}
              >
                <Plus size={16} />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 rounded-lg">
                    {tag}
                    <button
                      type="button"
                      className="ml-1 hover:text-destructive"
                      onClick={() => setTags((prev) => prev.filter((itemTag) => itemTag !== tag))}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">链接 URL（可选）</Label>
            <Input
              id="url"
              type="url"
              className="h-10 rounded-xl"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">图片 URL（可选）</Label>
            <Input
              id="image"
              type="url"
              className="h-10 rounded-xl"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button className="rounded-xl" onClick={handleSubmit}>
            {isEditing ? "保存" : "添加"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
