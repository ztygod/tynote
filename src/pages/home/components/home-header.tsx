import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function HomeHeader() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现搜索逻辑
    console.log("Search:", searchQuery);
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Left side: Empty for future use */}
      <div></div>

      {/* Right side: Search and Create */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 sm:flex-none relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="搜索笔记..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-64 h-10"
          />
        </form>

        {/* Create dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              <Plus size={18} />
              新建
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Plus size={16} className="mr-2" />
              空白笔记
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus size={16} className="mr-2" />
              从模板创建
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus size={16} className="mr-2" />
              设置待办项
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Plus size={16} className="mr-2" />
              新的笔记库
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}