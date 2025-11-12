import { Plus, Search, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { PinnedNoteCard } from "./components/pinned-note-card";
import { RecentActivitySection } from "./components/recent-note-item";

// --- 模拟数据 ---
const userName = "Alex";
const pinnedNotes = [
  {
    id: 1,
    title: "项目Alpha启动会议纪要",
    description: "讨论了Q4目标和资源分配...",
    lastEdited: "2小时前",
    emoji: "🚀",
  },
  {
    id: 2,
    title: "我的2025年旅行计划",
    description: "目的地清单：冰岛、新西兰、日本...",
    lastEdited: "昨天",
    emoji: "✈️",
  },
  {
    id: 3,
    title: "React最佳实践",
    description: "Hooks, Context, and Performance...",
    lastEdited: "3天前",
    emoji: "⚛️",
  },
  {
    id: 1,
    title: "项目Alpha启动会议纪要",
    description: "讨论了Q4目标和资源分配...",
    lastEdited: "2小时前",
    emoji: "🚀",
  },
  {
    id: 2,
    title: "我的2025年旅行计划",
    description: "目的地清单：冰岛、新西兰、日本...",
    lastEdited: "昨天",
    emoji: "✈️",
  },
  {
    id: 3,
    title: "React最佳实践",
    description: "Hooks, Context, and Performance...",
    lastEdited: "3天前",
    emoji: "⚛️",
  },
];

export function Home() {
  return (
    <div className="bg-muted/20 text-foreground min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-6 md:p-8">
        {/* 顶部欢迎区 */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">欢迎回来, {userName}! 👋</h1>
            <p className="text-muted-foreground mt-1">今天是个创造的好日子。</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input placeholder="搜索..." className="pl-10 w-40 md:w-64" />
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
                <DropdownMenuItem>从模板创建...</DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>会议纪要</DropdownMenuItem>
                <DropdownMenuItem>周报</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="space-y-10">
          {/* 收藏内容 */}
          <section>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Star size={20} className="text-yellow-500" /> 收藏内容
            </h2>
            <PinnedNoteCard notes={pinnedNotes} />
          </section>

          {/* 主体布局 */}
          <div className="">
            <RecentActivitySection />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
