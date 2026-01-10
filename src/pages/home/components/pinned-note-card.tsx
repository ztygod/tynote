import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export interface PinnedNote {
  id: number;
  title: string;
  description: string;
  lastEdited: string;
  emoji: string;
}

interface PinnedNoteCardProps {
  notes: PinnedNote[];
}

export function PinnedNoteCard({ notes }: PinnedNoteCardProps) {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  if (notes.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Star size={48} className="text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground text-center">
            还没有收藏内容，从你的笔记中收藏一些内容开始吧
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel
      plugins={[autoplay.current]}
      className="w-full"
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-3">
        {notes.map((note) => (
          <CarouselItem
            key={note.id}
            className="pl-2 md:pl-3 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <PinnedNoteItem note={note} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {notes.length > 1 && (
        <>
          <CarouselPrevious className="-left-4 md:-left-6" />
          <CarouselNext className="-right-4 md:-right-6" />
        </>
      )}
    </Carousel>
  );
}

interface PinnedNoteItemProps {
  note: PinnedNote;
}

function PinnedNoteItem({ note }: PinnedNoteItemProps) {
  return (
    <Card className="h-full hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer group border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="p-4 pb-3 space-y-0">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
              {note.emoji}
            </span>
            <Star
              className="text-yellow-500 fill-yellow-500 shrink-0"
              size={14}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity -mr-1 -mt-1"
              >
                <MoreHorizontal size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>编辑</DropdownMenuItem>
              <DropdownMenuItem>取消收藏</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="line-clamp-2 text-sm font-semibold leading-tight hover:underline hover:decoration-dashed hover:decoration-muted-foreground/80 underline-offset-2 transition-all">
          {note.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2 text-xs mb-3 leading-relaxed">
          {note.description}
        </CardDescription>
        <p className="text-xs text-muted-foreground/80">{note.lastEdited}</p>
      </CardContent>
    </Card>
  );
}
