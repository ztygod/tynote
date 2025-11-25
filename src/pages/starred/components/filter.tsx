import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FilterOptions {
  categories: string[];
  sortBy: "recent" | "oldest" | "alphabetical";
}

interface StarredFilterProps {
  onFilterChange?: (filters: FilterOptions) => void;
  availableCategories?: string[];
}

export function StarredFilter({
  onFilterChange,
  availableCategories = ["技术", "设计", "产品", "运营", "其他"],
}: StarredFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "alphabetical">(
    "recent"
  );

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange?.({ categories: updated, sortBy });
  };

  const handleSortChange = (sort: "recent" | "oldest" | "alphabetical") => {
    setSortBy(sort);
    onFilterChange?.({ categories: selectedCategories, sortBy: sort });
  };

  const hasActiveFilters = selectedCategories.length > 0 || sortBy !== "recent";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`gap-2 ${
            hasActiveFilters ? "border-primary text-primary" : ""
          }`}
        >
          筛选
          {hasActiveFilters && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              {selectedCategories.length}
            </span>
          )}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>分类</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableCategories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => handleCategoryToggle(category)}
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>排序</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={sortBy === "recent"}
          onCheckedChange={() => handleSortChange("recent")}
        >
          最新优先
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "oldest"}
          onCheckedChange={() => handleSortChange("oldest")}
        >
          最早优先
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortBy === "alphabetical"}
          onCheckedChange={() => handleSortChange("alphabetical")}
        >
          按名称排序
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
