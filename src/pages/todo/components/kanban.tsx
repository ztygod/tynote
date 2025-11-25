"use client";
import { faker } from "@faker-js/faker";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const columns = [
  { id: faker.string.uuid(), name: "Planned", color: "#6B7280" },
  { id: faker.string.uuid(), name: "Progress", color: "#F59E0B" },
  { id: faker.string.uuid(), name: "Done", color: "#10B981" },
];

const columnsColor: Record<string, string> = {
  Planned: "#D1D5DB",
  Progress: "#FDE68A",
  Done: "#6EE7B7",
};
const users = Array.from({ length: 4 })
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  }));

const exampleFeatures = Array.from({ length: 20 })
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: capitalize(faker.company.buzzPhrase()),
    startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
    endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
    column: faker.helpers.arrayElement(columns).id,
    owner: faker.helpers.arrayElement(users),
    priority: faker.helpers.arrayElement(["low", "medium", "high"]),
  }));

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  month: "short",
  day: "numeric",
});

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return (
        <Badge variant="destructive" className="text-xs">
          高
        </Badge>
      );
    case "medium":
      return (
        <Badge variant="secondary" className="text-xs">
          中
        </Badge>
      );
    case "low":
      return (
        <Badge variant="outline" className="text-xs">
          低
        </Badge>
      );
    default:
      return null;
  }
}

export function Kanban() {
  const [features, setFeatures] = useState(exampleFeatures);
  return (
    <KanbanProvider
      columns={columns}
      data={features}
      onDataChange={setFeatures}
    >
      {(column: any) => (
        <KanbanBoard id={column.id} key={column.id}>
          <KanbanHeader>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span className="font-semibold">{column.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {features.filter((f) => f.column === column.id).length}
              </span>
            </div>
          </KanbanHeader>
          <KanbanCards
            id={column.id}
            style={{ backgroundColor: columnsColor[column.name] }}
          >
            {(feature: (typeof features)[number]) => (
              <KanbanCard
                column={column.id}
                id={feature.id}
                key={feature.id}
                name={feature.name}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="m-0 flex-1 font-medium text-sm line-clamp-2">
                      {feature.name}
                    </p>
                    {feature.owner && (
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarImage src={feature.owner.image} />
                        <AvatarFallback className="text-xs">
                          {feature.owner.name?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="m-0 text-muted-foreground text-xs">
                      {shortDateFormatter.format(feature.startAt)} -{" "}
                      {shortDateFormatter.format(feature.endAt)}
                    </p>
                    {getPriorityBadge(feature.priority)}
                  </div>
                </div>
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
}
