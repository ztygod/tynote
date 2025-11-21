import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Plus, Search } from "lucide-react";

export function HomeHeader() {
  return (
    <>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div></div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Button variant="outline" className="pl-10 w-40 md:w-64">
              搜索...
            </Button>
            {/* <Input placeholder="搜索..." className="pl-10 w-40 md:w-64" /> */}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" /> 新建{" "}
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>空白笔记</DropdownMenuItem>
              <DropdownMenuItem>设置Todo</DropdownMenuItem>
              <DropdownMenuItem>从模板创建...</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem>新的笔记库</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
