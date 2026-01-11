import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useSearchStore,
  type SearchFilters,
  type TimeRange,
} from "@/store/search-store";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const TIME_RANGE_OPTIONS: { value: TimeRange; label: string }[] = [
  { value: "all", label: "所有时间" },
  { value: "today", label: "今天" },
  { value: "week", label: "最近 7 天" },
  { value: "month", label: "最近 30 天" },
  { value: "custom", label: "自定义时间" },
];

export function SearchFilters() {
  const { filters, updateFilter, clearFilters } = useSearchStore();
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const activeFilterCount = React.useMemo(() => {
    let count = 0;
    if (filters.title) count++;
    if (filters.author) count++;
    if (filters.timeRange !== "all") count++;
    if (filters.tags?.length) count += filters.tags.length;
    return count;
  }, [filters]);

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = filters.tags?.filter((tag) => tag !== tagToRemove) || [];
    updateFilter("tags", newTags.length > 0 ? newTags : undefined);
  };

  return (
    <div className="space-y-4">
      {/* 过滤标签 */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {filters.title && (
            <Badge variant="secondary" className="gap-1">
              标题: {filters.title}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("title", undefined)}
              />
            </Badge>
          )}
          {filters.author && (
            <Badge variant="secondary" className="gap-1">
              作者: {filters.author}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("author", undefined)}
              />
            </Badge>
          )}
          {filters.timeRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              时间范围:{" "}
              {
                TIME_RANGE_OPTIONS.find(
                  (opt) => opt.value === filters.timeRange
                )?.label
              }
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => updateFilter("timeRange", "all")}
              />
            </Badge>
          )}
          {filters.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => handleRemoveTag(tag)}
              />
            </Badge>
          ))}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 px-2 text-xs"
            >
              清空所有
            </Button>
          )}
        </div>
      )}

      {/* 高级过滤按钮 */}
      <div className="flex gap-2">
        <Button
          variant={showAdvanced ? "default" : "outline"}
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "隐藏" : "显示"}高级过滤
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* 高级过滤面板 */}
      {showAdvanced && (
        <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900 space-y-4">
          {/* 标题过滤 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">按标题搜索</label>
            <Input
              placeholder="输入标题关键词..."
              value={filters.title || ""}
              onChange={(e) =>
                updateFilter("title", e.target.value || undefined)
              }
              className="h-9"
            />
          </div>

          {/* 作者过滤 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">按作者搜索</label>
            <Input
              placeholder="输入作者名称..."
              value={filters.author || ""}
              onChange={(e) =>
                updateFilter("author", e.target.value || undefined)
              }
              className="h-9"
            />
          </div>

          {/* 时间范围过滤 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">时间范围</label>
            <Select
              value={filters.timeRange}
              onValueChange={(value) =>
                updateFilter("timeRange", value as TimeRange)
              }
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 自定义时间范围 */}
          {filters.timeRange === "custom" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">开始日期</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-9 justify-start text-left font-normal w-full",
                        !filters.startDate && "text-muted-foreground"
                      )}
                    >
                      {filters.startDate
                        ? format(filters.startDate, "MMM dd, yyyy")
                        : "选择开始日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.startDate}
                      onSelect={(date) => updateFilter("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">结束日期</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-9 justify-start text-left font-normal w-full",
                        !filters.endDate && "text-muted-foreground"
                      )}
                    >
                      {filters.endDate
                        ? format(filters.endDate, "MMM dd, yyyy")
                        : "选择结束日期"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={filters.endDate}
                      onSelect={(date) => updateFilter("endDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
