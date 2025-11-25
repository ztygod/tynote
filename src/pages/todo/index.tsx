import {
  CalendarDays,
  CalendarRange,
  ChevronRight,
  ListTodo,
  MousePointerClick,
  Plus,
  Sprout,
  SquareCheckBig,
  Sun,
  LayoutGrid,
} from "lucide-react";

// 引入 Shadcn UI 组件
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// 引入你的自定义组件
import { Kanban } from "./components/kanban";
import { Toolbar } from "./components/toolbar";
import { Calendar } from "./components/calendar";
import { List } from "./components/list";
import TableActions from "./components/table";
import { Gantt } from "./components/gantt";

export function TodoPage() {
  return (
    <div className="bg-muted/10 text-foreground min-h-screen pb-10">
      {/* --- 顶部背景装饰 (可选，增加层次感) --- */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-green-50/50 to-transparent -z-10 dark:from-green-950/20" />

      <div className="max-w-screen-xl mx-auto p-4 sm:p-7 md:p-8">
        {/* --- Header 区域优化 --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-foreground/90">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <SquareCheckBig
                  size={28}
                  className="text-green-600 dark:text-green-500"
                />
              </div>
              Todo 待办中心
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <ChevronRight size={20} />
              <p>今日事，今日毕</p>
            </div>
          </div>

          {/* 右侧数据概览与操作 */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                今日剩余
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">3</span>
                <span className="text-sm text-muted-foreground">/ 8 任务</span>
              </div>
            </div>
            <Button className="shadow-lg shadow-green-500/20 bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
              <Plus size={18} className="mr-2" /> 新建任务
            </Button>
          </div>
        </header>

        {/* --- Main 内容区域 --- */}
        <main>
          {/* 使用 Card 组件包裹内容，制造悬浮感和整洁感 */}
          <Card className="border-border/60 shadow-sm bg-background/60 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LayoutGrid size={20} className="text-primary" />
                    任务视图
                  </CardTitle>
                  <CardDescription>
                    选择最适合你的工作流视图模式
                  </CardDescription>
                </div>
                {/* 将 Toolbar 放在 Card Header 中更合适 */}
                <div className="flex-shrink-0">
                  <Toolbar />
                </div>
              </div>
            </CardHeader>

            <Separator className="mb-4" />

            <CardContent>
              <Tabs defaultValue="status" className="w-full">
                {/* TabsList 优化：增加背景色，优化圆角，处理移动端滚动 */}
                <div className="overflow-x-auto pb-2 -mx-2 px-2 sm:pb-0 sm:mx-0 sm:px-0">
                  <TabsList className="w-full sm:w-auto inline-flex h-11 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground">
                    <TabsTrigger
                      value="status"
                      className="gap-2 px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      <MousePointerClick size={16} />
                      看板状态
                    </TabsTrigger>
                    <TabsTrigger
                      value="today"
                      className="gap-2 px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      <Sun size={16} className="text-orange-500" />
                      今日聚焦
                      <Badge
                        variant="secondary"
                        className="ml-1 h-5 px-1.5 text-[10px] pointer-events-none"
                      >
                        3
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger
                      value="todo"
                      className="gap-2 px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      <ListTodo size={16} />
                      清单列表
                    </TabsTrigger>
                    <TabsTrigger
                      value="progress"
                      className="gap-2 px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      <CalendarRange size={16} />
                      甘特进度
                    </TabsTrigger>
                    <TabsTrigger
                      value="year"
                      className="gap-2 px-4 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                    >
                      <CalendarDays size={16} />
                      年度日历
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* 内容区域增加 padding 和动画过渡效果 */}
                <div className="mt-6 min-h-[500px] animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                  <TabsContent
                    value="status"
                    className="m-0 border-none p-0 outline-none"
                  >
                    <Kanban />
                  </TabsContent>
                  <TabsContent
                    value="today"
                    className="m-0 border-none p-0 outline-none"
                  >
                    <TableActions />
                  </TabsContent>
                  <TabsContent
                    value="todo"
                    className="m-0 border-none p-0 outline-none"
                  >
                    <List />
                  </TabsContent>
                  <TabsContent
                    value="progress"
                    className="m-0 border-none p-0 outline-none"
                  >
                    <Gantt />
                  </TabsContent>
                  <TabsContent
                    value="year"
                    className="m-0 border-none p-0 outline-none"
                  >
                    <Calendar />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
