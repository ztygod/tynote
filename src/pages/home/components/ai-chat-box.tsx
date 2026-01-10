import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sparkles,
  Send,
  Loader2,
  User,
  Bot,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "你好！我是你的 AI 助手。有什么我可以帮助你的吗？",
    timestamp: new Date(),
  },
];

export function AiChatBox() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `我收到了你的消息："${userMessage.content}"。这是一个模拟回复。`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="overflow-hidden border-border/50 bg-background hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Sparkles size={18} className="text-primary" />
          </div>
          <span className="font-semibold text-foreground">AI 助手</span>
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          随时为你提供帮助和建议
        </p>
      </CardHeader>

      <CardContent className="space-y-3 px-6 pb-4">
        {/* Messages Area */}
        <ScrollArea
          className="h-40 rounded-lg border border-border/50 bg-muted/20 p-3"
          ref={scrollRef}
        >
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarFallback className="bg-primary/10">
                    <Bot size={16} className="text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    正在思考...
                  </span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="输入你的问题..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="pr-10 border-border/50"
            />
            <MessageSquare
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            aria-label="发送消息"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <QuickActionButton
            text="总结笔记"
            onClick={() => setInput("帮我总结最近的笔记")}
          />
          <QuickActionButton
            text="创建待办"
            onClick={() => setInput("帮我创建一个新的待办事项")}
          />
          <QuickActionButton
            text="搜索内容"
            onClick={() => setInput("帮我搜索相关内容")}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser && "flex-row-reverse"
      )}
    >
      <Avatar
        className={cn(
          "h-8 w-8 border flex-shrink-0",
          isUser ? "border-border bg-primary/10" : "border-border bg-muted"
        )}
      >
        <AvatarFallback
          className={cn(
            isUser
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "rounded-2xl px-3 py-2 max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted rounded-tl-sm"
        )}
      >
        <p
          className={cn(
            "text-sm leading-relaxed",
            isUser ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {message.content}
        </p>
        <span
          className={cn(
            "text-xs mt-1 block",
            isUser ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {message.timestamp.toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

interface QuickActionButtonProps {
  text: string;
  onClick: () => void;
}

function QuickActionButton({ text, onClick }: QuickActionButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="text-xs border-border/50 hover:border-primary transition-colors"
    >
      {text}
    </Button>
  );
}
