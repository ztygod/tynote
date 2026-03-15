import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
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
          size="sm"
          className={`gap-2 ${
            hasSelectedTags ? "border-primary text-primary" : ""
          }`}
        >
          <Tag size={16} />
          标签
          {hasSelectedTags && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              {selectedTags.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-96 overflow-y-auto">
        <DropdownMenuLabel>按标签筛选</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableTags.length === 0 ? (
          <div className="px-2 py-4 text-sm text-muted-foreground text-center">
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
              <span className="ml-2 text-xs text-muted-foreground">
                {count}
              </span>
            </DropdownMenuCheckboxItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
