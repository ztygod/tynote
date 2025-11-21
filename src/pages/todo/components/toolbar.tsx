import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  Bell,
  Calendar,
  CaseUpper,
  Clock8,
  Info,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";

interface ToolBarProps {
  className?: string;
}

function SortItem() {
  const sortItem = [
    // 按名称排序
    { name: "按名称升序", icon: CaseUpper },
    // 按时间排序
    { name: "按创建时间升序", icon: Clock8 },
    // 按状态排序
    { name: "按状态升序", icon: CaseUpper },
    // 按日期排序
    { name: "按日期升序", icon: Calendar },
  ];
  return (
    <>
      <div>
        <Popover>
          <PopoverTrigger className="p-2 rounded-md hover:bg-gray-100 transition-colors">
            <ArrowUpDown className="text-gray-500 w-4 h-4" />
          </PopoverTrigger>
          <PopoverContent className="w-52 p-4 shadow-lg rounded-lg">
            <div className="flex flex-col gap-3">
              {sortItem.map((item) => (
                <div className="flex gap-2 item-center">
                  <item.icon className="w-5 h-5 my-auto" />
                  <div className="my-auto text-sm">{item.name}</div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

function SearchItem() {
  return (
    <div>
      <Popover>
        <PopoverTrigger className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Search className="text-gray-600 w-5 h-5" />
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 shadow-lg rounded-lg">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-gray-500">搜索</div>
            <div className="flex gap-2">
              <Input
                placeholder="输入关键词..."
                className="flex-1 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Button
                variant="outline"
                className="px-3 py-1 rounded-md hover:bg-gray-100"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-400">按回车或点击搜索按钮</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SettingItem() {
  return (
    <div>
      <Popover>
        <PopoverTrigger className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <Settings className="text-gray-600 w-5 h-5" />
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 shadow-lg rounded-lg">
          <div className="flex flex-col gap-4">
            {/* 标题 */}
            <div className="text-sm font-semibold text-gray-700">设置</div>

            {/* 用户相关 */}
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 text-sm">账户信息</span>
            </div>

            {/* 通知相关 */}
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <Bell className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 text-sm">通知设置</span>
            </div>

            {/* 关于相关 */}
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <Info className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 text-sm">关于应用</span>
            </div>

            {/* 底部操作按钮 */}
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm">
                帮助
              </Button>
              <Button variant="default" size="sm">
                保存
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function Toolbar({ className }: ToolBarProps) {
  return (
    <>
      <div className={cn("flex gap-2 ml-10", className)}>
        <SortItem />
        <SearchItem />
        <SettingItem />
        <Button>
          <Plus size={16} /> 新建
        </Button>
      </div>
    </>
  );
}
