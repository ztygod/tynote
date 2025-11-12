import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
  note: string;
}

interface TaskItemProps {
  task: TaskItem;
}
export function TaskItem({ task }: TaskItemProps) {
  return (
    <>
      <div className="flex items-center gap-3 p-2.5 hover:bg-accent rounded-lg">
        <Checkbox id={`task-${task.id}`} defaultChecked={task.completed} />
        <div className="flex-1">
          <label
            htmlFor={`task-${task.id}`}
            className={`flex-1 ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.text}
          </label>
          <Badge variant="outline" className="mt-1">
            {task.note}
          </Badge>
        </div>
      </div>
    </>
  );
}
