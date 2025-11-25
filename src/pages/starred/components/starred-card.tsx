import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface StarredItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
  image?: string;
  date: string;
  starred: boolean;
}

interface StarredCardProps {
  item: StarredItem;
  onToggleStar?: (id: string) => void;
}

export function StarredCard({ item, onToggleStar }: StarredCardProps) {
  const [isStarred, setIsStarred] = useState(item.starred);

  const handleToggleStar = () => {
    setIsStarred(!isStarred);
    onToggleStar?.(item.id);
  };

  const handleCopyUrl = () => {
    if (item.url) {
      navigator.clipboard.writeText(item.url);
      toast.success("链接已复制到剪贴板");
    }
  };

  return (
    <Card
      className="group relative
        hover:-translate-y-2
        hover:shadow-xl
        transition-all duration-300
        rounded-xl cursor-pointer
        border border-transparent
        hover:border-primary/30
        bg-card
        hover:bg-accent/40"
    >
      {item.image ? (
        <div className="w-full h-40 bg-muted overflow-hidden rounded-t-lg -mt-6">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div
          className="
                w-full h-40 -mt-6 rounded-t-lg
                flex items-center justify-center
                bg-indigo-100 text-indigo-700
                px-2 text-center
            "
          title={item.title}
        >
          <span className="text-lg font-semibold line-clamp-2">
            {item.title}
          </span>
        </div>
      )}
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
              {item.title}
            </CardTitle>
            <CardDescription className="text-xs mt-2">
              {new Date(item.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleStar}
            className="flex-shrink-0"
          >
            <Heart
              size={18}
              className={
                isStarred
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
              }
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
          {item.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{item.tags.length - 2}
            </Badge>
          )}
        </div>

        {item.url && (
          <div className="flex gap-2 mt-auto pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => window.open(item.url, "_blank")}
            >
              <ExternalLink size={14} className="mr-1" />
              访问
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={handleCopyUrl}
            >
              <Copy size={14} className="mr-1" />
              复制
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
