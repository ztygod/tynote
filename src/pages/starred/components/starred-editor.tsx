import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import { StarredItem, useStarredStore } from "@/store/starred-store";

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
  const { addStarredItem, updateStarredItem } = useStarredStore();
  const isEditing = !!item;

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [tagInput, setTagInput] = useState("");

  // Initialize form with item data when editing
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
      setTags(item.tags);
      setUrl(item.url || "");
      setImage(item.image || "");
    } else {
      resetForm();
    }
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
    if (!urlString) return true; // URL is optional
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
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = () => {
    // Validation
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
      toast.error("请输入有效的 URL");
      return;
    }
    if (image && !validateUrl(image)) {
      toast.error("请输入有效的图片 URL");
      return;
    }

    const itemData = {
      title: title.trim(),
      description: description.trim(),
      category,
      tags,
      url: url.trim() || undefined,
      image: image.trim() || undefined,
      date:
        isEditing && item ? item.date : new Date().toISOString().split("T")[0],
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "编辑收藏" : "添加收藏"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "修改收藏项的信息" : "添加新的收藏项到你的收藏中心"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              标题 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="输入标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              描述 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="输入描述"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              分类 <span className="text-destructive">*</span>
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
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

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">标签</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="输入标签后按 Enter 添加"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddTag}
              >
                <Plus size={16} />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">链接 URL (可选)</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">图片 URL (可选)</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleSubmit}>{isEditing ? "保存" : "添加"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
