import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export interface FilterOptions {
  categories: string[];
  sortBy: "recent" | "oldest" | "alphabetical";
  tags: string[];
}

interface StarredFilterProps {
  value: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  availableCategories?: string[];
}

export function StarredFilter({
  value,
  onFilterChange,
  availableCategories = ["技术", "设计", "产品", "运营", "其他"],
}: StarredFilterProps) {
  const handleCategoryToggle = (category: string) => {
    const updated = value.categories.includes(category)
      ? value.categories.filter((c) => c !== category)
      : [...value.categories, category];
    onFilterChange({ categories: updated });
  };

  const handleSortChange = (sort: "recent" | "oldest" | "alphabetical") => {
    onFilterChange({ sortBy: sort });
  };

  const activeCount = value.categories.length + (value.sortBy !== "recent" ? 1 : 0);
  const hasActiveFilters = activeCount > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`h-10 gap-2 rounded-xl ${
            hasActiveFilters ? "border-primary text-primary" : ""
          }`}
        >
          <SlidersHorizontal size={16} />
          筛选
          {hasActiveFilters && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel>分类</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableCategories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={value.categories.includes(category)}
            onCheckedChange={() => handleCategoryToggle(category)}
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>排序</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={value.sortBy === "recent"}
          onCheckedChange={() => handleSortChange("recent")}
        >
          最近优先
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={value.sortBy === "oldest"}
          onCheckedChange={() => handleSortChange("oldest")}
        >
          最早优先
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={value.sortBy === "alphabetical"}
          onCheckedChange={() => handleSortChange("alphabetical")}
        >
          按名称排序
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
