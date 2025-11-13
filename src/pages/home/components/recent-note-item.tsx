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
    comment: "这个想法很棒 ，我们可以下周讨论一下细节。",
    note: "一个关于Tauri的有趣想法",
    time: "30分钟前",
  },
  {
    id: 8,
    user: "Alice",
    avatar: "https://github.com/shadcn.png",
    comment: "会议纪要已确认 ，无异议。",
    note: "项目Alpha启动会议纪要",
    time: "1小时前",
  },
];

const ActivityItemWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg group transition">
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
        <DropdownMenuItem>移除记录</DropdownMenuItem>
        <DropdownMenuItem>添加到收藏</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">删除笔记</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const renderPath = (path: string | { id: string; name: string }[]) => {
  if (typeof path === "string") return <span className="truncate">{path}</span>;
  return (
    <div className="flex items-center gap-1 truncate">
      {path.map((p, index) => (
        <React.Fragment key={p.id}>
          <span>{p.name}</span>
          {index < path.length - 1 && <ChevronRight className="h-3 w-3" />}
        </React.Fragment>
      ))}
    </div>
  );
};

interface NoteActivityItemProps {
  note: NoteActivity;
}

const NoteActivityItem: React.FC<NoteActivityItemProps> = ({ note }) => (
  <ActivityItemWrapper>
    <div className="flex items-center gap-4 flex-1 min-w-0">
      <span className="text-xl">{note.emoji || "📄"}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{note.title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          {note.path && (
            <div className="flex-shrink-0">{renderPath(note.path)}</div>
          )}
          {note.path && note.tags && note.tags.length > 0 && (
            <span className="text-muted-foreground/50">|</span>
          )}
          {note.tags && note.tags.length > 0 && (
            <div className="flex items-center gap-1.5 truncate">
              {note.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="flex gap-4 items-end ml-4">
      <span className="text-sm text-muted-foreground">{note.time}</span>
      <Avatar className="h-5 w-5 mt-1">
        <AvatarImage src={note.author.avatar} alt={note.author.name} />
        <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  </ActivityItemWrapper>
);

interface CommentActivityItemProps {
  item: CommentActivity;
}

const CommentActivityItem: React.FC<CommentActivityItemProps> = ({ item }) => (
  <ActivityItemWrapper>
    <div className="flex items-start gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={item.avatar} alt={item.user} />
        <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="font-medium">
          {item.user}{" "}
          <span className="text-muted-foreground font-normal">评论了</span> "
          {item.note}"
        </p>
        <blockquote className="mt-1 border-l-2 pl-3 text-sm text-muted-foreground italic">
          {item.comment}
        </blockquote>
      </div>
    </div>
    <span className="text-sm text-muted-foreground self-start mr-2">
      {item.time}
    </span>
  </ActivityItemWrapper>
);

// 主组件：最近动态
export const RecentActivitySection: React.FC = () => (
  <section>
    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
      <Clock size={20} className="text-blue-500" />
      最近动态
    </h2>

    <Tabs defaultValue="edited" className="w-full">
      <TabsList className="grid w-100 grid-cols-3 bg-muted">
        <TabsTrigger value="edited">
          <FileText className="h-4 w-4 mr-2" /> 最近编辑
        </TabsTrigger>
        <TabsTrigger value="viewed">
          <Eye className="h-4 w-4 mr-2" /> 最近浏览
        </TabsTrigger>
        <TabsTrigger value="comments">
          <MessageSquare className="h-4 w-4 mr-2" /> 最近评论
        </TabsTrigger>
      </TabsList>

      <Card className="mt-4">
        <CardContent className="p-2 space-y-1">
          <TabsContent value="edited" className="m-0">
            {recentEditedNotes.map((note) => (
              <NoteActivityItem key={`edit-${note.id}`} note={note} />
            ))}
          </TabsContent>
          <TabsContent value="viewed" className="m-0">
            {recentViewedNotes.map((note) => (
              <NoteActivityItem key={`view-${note.id}`} note={note} />
            ))}
          </TabsContent>
          <TabsContent value="comments" className="m-0">
            {recentComments.map((item) => (
              <CommentActivityItem key={`comment-${item.id}`} item={item} />
            ))}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  </section>
);

export default RecentActivitySection;
