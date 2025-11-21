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
import { Star } from "lucide-react";
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
  const autoplay = useRef(Autoplay({ delay: 1500, stopOnInteraction: true }));
  return (
    <>
      <Carousel
        plugins={[autoplay.current]}
        className="w-92/100 mx-auto"
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent>
          {notes.map((note, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-110">
                        {note.emoji}
                      </span>
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                    </div>
                    <Star
                      className="text-yellow-400 fill-yellow-400"
                      size={18}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{note.description}</CardDescription>
                  <p className="text-xs text-muted-foreground mt-4">
                    最后编辑: {note.lastEdited}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
