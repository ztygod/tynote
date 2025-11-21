import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  CalendarRange,
  ChevronRight,
  ListTodo,
  MousePointerClick,
  Sprout,
  SquareCheckBig,
  Sun,
} from "lucide-react";
import { Kanban } from "./components/kanban";
import { Toolbar } from "./components/toolbar";
import { Calendar } from "./components/calendar";
import { List } from "./components/list";
import TableActions from "./components/table";
import { Gantt } from "./components/gantt";

export function TodoPage() {
  return (
    <>
      <div className="bg-muted/20 text-foreground min-h-screen">
        <div className="max-w-screen-xl mx-auto p-4 sm:p-7 md:p-8">
          <header className="">
            <h1 className="text-3xl font-semibold flex items-center gap-2 mb-4">
              <SquareCheckBig size={30} className="text-green-500 mr-2" />
              Todo 待办事项
            </h1>
            <div className="flex mt-1">
              <ChevronRight size={20} className="mx-2 my-auto" />
              <p className="text-muted-foreground">今日事，今日毕</p>
            </div>
          </header>

          <main className="mt-5">
            <div className="w-full gap-6">
              <div>
                <section className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Sprout size={20} className="text-green-500" /> 代办事项
                  </h2>

                  <Toolbar />
                </section>

                <div className="flex justify-between gap-6 mt-5">
                  <Tabs defaultValue="status" className="w-full">
                    <TabsList>
                      <TabsTrigger value="status">
                        <MousePointerClick />
                        状态
                      </TabsTrigger>
                      <TabsTrigger value="today">
                        <Sun />
                        今天
                      </TabsTrigger>
                      <TabsTrigger value="todo">
                        <ListTodo />
                        待处理任务
                      </TabsTrigger>
                      <TabsTrigger value="progress">
                        <CalendarRange />
                        进度
                      </TabsTrigger>
                      <TabsTrigger value="year">
                        <CalendarDays />
                        历视图
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="status">
                      <Kanban />
                    </TabsContent>
                    <TabsContent value="progress">
                      <Gantt />
                    </TabsContent>
                    <TabsContent value="year">
                      <Calendar />
                    </TabsContent>
                    <TabsContent value="todo">
                      <List />
                    </TabsContent>
                    <TabsContent value="today">
                      <TableActions />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
