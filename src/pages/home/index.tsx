import { Star } from "lucide-react";
import { PinnedNoteCard } from "./components/pinned-note-card";
import { RecentActivitySection } from "./components/recent-note-item";
import { HomeHeader } from "./components/home-header";
import { QuickStatsSection } from "./components/quick-stats";
import { WelcomeSection } from "./components/welcome-section";
import { AiChatBox } from "./components/ai-chat-box";
import { QuicklinksSection } from "./components/quicklinks-section";

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
        {/* Header */}
        <HomeHeader />

        {/* Welcome Section */}
        <WelcomeSection />

        {/* Quicklinks Section */}
        <QuicklinksSection editable={true} />

        {/* Quick Stats */}
        <QuickStatsSection />

        {/* AI Chat Box */}
        <div className="mb-8 mt-6">
          <AiChatBox />
        </div>

        {/* Main Content */}
        <main className="space-y-8 mt-8">
          {/* Pinned Notes Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Star
                    size={24}
                    className="text-yellow-600 dark:text-yellow-500 fill-yellow-500"
                  />
                </div>
                收藏内容
              </h2>
            </div>
            <PinnedNoteCard notes={pinnedNotes} />
          </section>

          {/* Recent Activity Section */}
          <RecentActivitySection />
        </main>
      </div>
    </div>
  );
}
