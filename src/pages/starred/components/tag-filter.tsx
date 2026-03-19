import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag } from "lucide-react";

interface TagFilterProps {
  availableTags: { tag: string; count: number }[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagFilter({
  availableTags,
  selectedTags,
  onTagsChange,
}: TagFilterProps) {
  const handleTagToggle = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(updated);
  };

  const hasSelectedTags = selectedTags.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`h-10 gap-2 rounded-xl ${
            hasSelectedTags ? "border-primary text-primary" : ""
          }`}
        >
          <Tag size={16} />
          标签
          {hasSelectedTags && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {selectedTags.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-96 w-56 overflow-y-auto rounded-xl">
        <DropdownMenuLabel>按标签筛选</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableTags.length === 0 ? (
          <div className="px-3 py-4 text-center text-sm text-muted-foreground">
            暂无标签
          </div>
        ) : (
          availableTags.map(({ tag, count }) => (
            <DropdownMenuCheckboxItem
              key={tag}
              checked={selectedTags.includes(tag)}
              onCheckedChange={() => handleTagToggle(tag)}
            >
              <span className="flex-1">{tag}</span>
              <span className="ml-2 text-xs text-muted-foreground">{count}</span>
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
