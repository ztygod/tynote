import { Star } from "lucide-react";
import { PinnedNoteCard } from "./components/pinned-note-card";
import { RecentActivitySection } from "./components/recent-note-item";
import { HomeHeader } from "./components/home-header";

// --- 模拟数据 ---
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

export function HomePage() {
  return (
    <div className="bg-muted/20 text-foreground min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-7 md:p-8">
        <header>
          <HomeHeader />
        </header>
        <div className="mx-auto text-center py-6">
          <h1 className="text-3xl font-bold mr-10">👋 欢迎回来, Alex!</h1>
          <p className="text-muted-foreground mt-1 mr-10">
            今天是个创造的好日子。
          </p>
        </div>
        <main className="space-y-10">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Star size={20} className="text-yellow-500" /> 收藏内容
          </h2>
          <PinnedNoteCard notes={pinnedNotes} />
          <RecentActivitySection />
        </main>
      </div>
    </div>
  );
}
