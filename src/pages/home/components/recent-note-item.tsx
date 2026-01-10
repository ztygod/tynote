import React from "react";
import {
  Clock,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface Author {
  name: string;
  avatar: string;
}

export interface NoteActivity {
  id: number;
  title: string;
  time: string;
  author: Author;
  path: string | { id: string; name: string }[];
  tags?: string[];
  emoji?: string;
}

export interface CommentActivity {
  id: number;
  user: string;
  avatar: string;
  comment: string;
  note: string;
  time: string;
}

// 清理后的模拟数据
const recentEditedNotes: NoteActivity[] = [
  {
    id: 4,
    title: "周报-W45",
    time: "刚刚",
    author: { name: "Alex", avatar: "https://github.com/shadcn.png" },
    path: "工作/团队周报",
    tags: ["周报", "团队同步"],
    emoji: "📄",
  },
  {
    id: 1,
    title: "项目Alpha启动会议纪要",
    time: "2小时前",
    author: { name: "Alice", avatar: "https://i.pravatar.cc/150?u=alice" },
    path: [
      { id: "proj", name: "项目" },
      { id: "alpha", name: "项目Alpha" },
    ],
    tags: ["会议", "Q4目标", "启动"],
    emoji: "🚀",
  },
  {
    id: 5,
    title: "一个关于Tauri的有趣想法",
    time: "5小时前",
    author: { name: "Alex", avatar: "https://github.com/shadcn.png" },
    path: "技术探索/Tauri",
    tags: ["Tauri", "Rust", "灵感"],
    emoji: "💡",
  },
  {
    id: 9,
    title: "客户反馈整理 (October)",
    time: "8小时前",
    author: { name: "Bob", avatar: "https://i.pravatar.cc/150?u=bob" },
    path: "客户关系/用户反馈",
    tags: ["反馈", "UX"],
    emoji: "💬",
  },
  {
    id: 10,
    title: "个人年度总结框架",
    time: "昨天",
    author: { name: "Alex", avatar: "https://github.com/shadcn.png" },
    path: "个人/复盘与计划",
    tags: ["复盘", "个人成长"],
    emoji: "🎯",
  },
];

const recentViewedNotes: NoteActivity[] = [
  recentEditedNotes[1],
  recentEditedNotes[2],
];

const recentComments: CommentActivity[] = [
  {
    id: 7,
    user: "Bob",
    avatar: "https://github.com/shadcn.png",
    comment: "这个想法很棒，我们可以下周讨论一下细节。",
    note: "一个关于Tauri的有趣想法",
    time: "30分钟前",
  },
  {
    id: 8,
    user: "Alice",
    avatar: "https://github.com/shadcn.png",
    comment: "会议纪要已确认，无异议。",
    note: "项目Alpha启动会议纪要",
    time: "1小时前",
  },
];

const ActivityItemWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex items-center justify-between p-4 hover:bg-accent/50 rounded-lg group transition border-b border-border/50 last:border-0">
    {children}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>打开</DropdownMenuItem>
        <DropdownMenuItem>添加到收藏</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">移除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const renderPath = (path: string | { id: string; name: string }[]) => {
  if (typeof path === "string") {
    return (
      <span className="truncate text-xs text-muted-foreground">{path}</span>
    );
  }
  return (
    <div className="flex items-center gap-1 truncate text-xs text-muted-foreground">
      {path.map((p, index) => (
        <React.Fragment key={p.id}>
          <span>{p.name}</span>
          {index < path.length - 1 && <ChevronRight className="h-3 w-3" />}
        </React.Fragment>
      ))}
    </div>
  );
};

const NoteActivityItem: React.FC<{ note: NoteActivity }> = ({ note }) => (
  <ActivityItemWrapper>
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <span className="text-lg flex-shrink-0">{note.emoji || "📄"}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate text-sm">{note.title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5 flex-wrap">
          {note.path && <div className="truncate">{renderPath(note.path)}</div>}
          {note.tags && note.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {note.path && <span className="text-muted-foreground/40">•</span>}
              {note.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="flex gap-3 items-center ml-4 flex-shrink-0">
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {note.time}
      </span>
      <Avatar className="h-6 w-6">
        <AvatarImage src={note.author.avatar} alt={note.author.name} />
        <AvatarFallback className="text-xs">
          {note.author.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  </ActivityItemWrapper>
);

const CommentActivityItem: React.FC<{ item: CommentActivity }> = ({ item }) => (
  <ActivityItemWrapper>
    <div className="flex items-start gap-3 flex-1">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={item.avatar} alt={item.user} />
        <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">
          {item.user}{" "}
          <span className="text-muted-foreground font-normal">评论了</span> "
          <span className="text-foreground">{item.note}</span>"
        </p>
        <blockquote className="mt-2 border-l-2 border-muted-foreground/30 pl-3 text-sm text-muted-foreground italic">
          "{item.comment}"
        </blockquote>
      </div>
    </div>
    <span className="text-xs text-muted-foreground flex-shrink-0">
      {item.time}
    </span>
  </ActivityItemWrapper>
);

export const RecentActivitySection: React.FC = () => (
  <section className="mt-8">
    <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <Clock size={24} className="text-blue-600 dark:text-blue-400" />
      </div>
      最近动态
    </h2>

    <Tabs defaultValue="edited" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted/50">
        <TabsTrigger value="edited" className="gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">最近编辑</span>
          <span className="sm:hidden">编辑</span>
        </TabsTrigger>
        <TabsTrigger value="viewed" className="gap-2">
          <Eye className="h-4 w-4" />
          <span className="hidden sm:inline">最近浏览</span>
          <span className="sm:hidden">浏览</span>
        </TabsTrigger>
        <TabsTrigger value="comments" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">最近评论</span>
          <span className="sm:hidden">评论</span>
        </TabsTrigger>
      </TabsList>

      <Card className="mt-4 border-border/50">
        <CardContent className="p-0">
          <TabsContent value="edited" className="m-0">
            {recentEditedNotes.length > 0 ? (
              <div className="divide-y divide-border/50">
                {recentEditedNotes.map((note) => (
                  <NoteActivityItem key={`edit-${note.id}`} note={note} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无最近编辑的笔记
              </div>
            )}
          </TabsContent>
          <TabsContent value="viewed" className="m-0">
            {recentViewedNotes.length > 0 ? (
              <div className="divide-y divide-border/50">
                {recentViewedNotes.map((note) => (
                  <NoteActivityItem key={`view-${note.id}`} note={note} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无最近浏览的笔记
              </div>
            )}
          </TabsContent>
          <TabsContent value="comments" className="m-0">
            {recentComments.length > 0 ? (
              <div className="divide-y divide-border/50">
                {recentComments.map((item) => (
                  <CommentActivityItem key={`comment-${item.id}`} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无最近评论
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  </section>
);

export default RecentActivitySection;
