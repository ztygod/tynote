"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle,
  FileText,
  Loader2,
  Pause,
  Play,
  Trash,
} from "lucide-react";
import { useState } from "react";
type TaskStatus = "pending" | "in-progress" | "completed" | "blocked";
type TaskPriority = "low" | "medium" | "high";
interface Task {
  id: string;
  title: string;
  assignee: {
    name: string;
    avatar: string;
  };
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  notes: string;
  pendingAction?: "start" | "pause" | "complete" | "delete" | "view";
}
const sampleTasks: Task[] = [
  {
    id: "TSK-001",
    title: "Design new landing page",
    assignee: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    status: "in-progress",
    priority: "high",
    dueDate: "2024-02-15",
    notes: "Follow brand guidelines v2.0",
  },
  {
    id: "TSK-002",
    title: "Implement authentication flow",
    assignee: {
      name: "Alex Kumar",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    },
    status: "pending",
    priority: "high",
    dueDate: "2024-02-18",
    notes: "Use OAuth 2.0 with JWT",
  },
  {
    id: "TSK-003",
    title: "Write API documentation",
    assignee: {
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    status: "completed",
    priority: "medium",
    dueDate: "2024-02-10",
    notes: "Include code examples",
  },
  {
    id: "TSK-004",
    title: "Fix mobile responsive issues",
    assignee: {
      name: "James Park",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    status: "blocked",
    priority: "high",
    dueDate: "2024-02-12",
    notes: "Waiting for design assets",
  },
  {
    id: "TSK-005",
    title: "Optimize database queries",
    assignee: {
      name: "Maya Patel",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    },
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-02-20",
    notes: "Focus on user table first",
  },
  {
    id: "TSK-006",
    title: "Set up CI/CD pipeline",
    assignee: {
      name: "Ryan Lee",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    status: "pending",
    priority: "low",
    dueDate: "2024-02-25",
    notes: "Use GitHub Actions",
  },
];
function getStatusBadge(status: TaskStatus) {
  switch (status) {
    case "pending":
      return (
        <Badge className="font-normal" variant="secondary">
          Pending
        </Badge>
      );
    case "in-progress":
      return (
        <Badge className="font-normal" variant="default">
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge
          className="border-green-200 font-normal text-green-700"
          variant="outline"
        >
          Completed
        </Badge>
      );
    case "blocked":
      return (
        <Badge className="font-normal" variant="destructive">
          Blocked
        </Badge>
      );
  }
}
export const title = "Task Table with Actions";
export default function TableActions() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const handleAction = (taskId: string, action: Task["pendingAction"]) => {
    // Set pending state
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, pendingAction: action } : task
      )
    );
    // Simulate async operation
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== taskId) return task;
          // Clear pending state and update status based on action
          const updated = { ...task, pendingAction: undefined };
          if (action === "start") {
            updated.status = "in-progress";
          } else if (action === "pause") {
            updated.status = "pending";
          } else if (action === "complete") {
            updated.status = "completed";
          }
          return updated;
        })
      );
    }, 1500);
  };
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-24 font-semibold text-foreground">
                ID
              </TableHead>
              <TableHead className="min-w-48 font-semibold text-foreground">
                Task
              </TableHead>
              <TableHead className="w-40 font-semibold text-foreground">
                Assignee
              </TableHead>
              <TableHead className="w-32 font-semibold text-foreground">
                Status
              </TableHead>
              <TableHead className="w-24 font-semibold text-foreground">
                Priority
              </TableHead>
              <TableHead className="w-32 font-semibold text-foreground">
                Due Date
              </TableHead>
              <TableHead className="min-w-48 font-semibold text-foreground">
                Notes
              </TableHead>
              <TableHead className="w-48 text-right font-semibold text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {task.id}
                </TableCell>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        alt={task.assignee.name}
                        src={task.assignee.avatar}
                      />
                      <AvatarFallback>
                        {task.assignee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell className="capitalize text-sm">
                  {task.priority}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {task.dueDate}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {task.notes}
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <div className="flex justify-end gap-1">
                      {task.status === "pending" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              aria-label="Start task"
                              disabled={task.pendingAction === "start"}
                              onClick={() => handleAction(task.id, "start")}
                              size="icon"
                              variant="ghost"
                            >
                              {task.pendingAction === "start" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Start task</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {task.status === "in-progress" && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                aria-label="Pause task"
                                disabled={task.pendingAction === "pause"}
                                onClick={() => handleAction(task.id, "pause")}
                                size="icon"
                                variant="ghost"
                              >
                                {task.pendingAction === "pause" ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Pause className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Pause task</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                aria-label="Complete task"
                                disabled={task.pendingAction === "complete"}
                                onClick={() =>
                                  handleAction(task.id, "complete")
                                }
                                size="icon"
                                variant="ghost"
                              >
                                {task.pendingAction === "complete" ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Complete task</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            aria-label="Delete task"
                            disabled={task.pendingAction === "delete"}
                            onClick={() => handleAction(task.id, "delete")}
                            size="icon"
                            variant="ghost"
                          >
                            {task.pendingAction === "delete" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete task</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            aria-label="View task details"
                            disabled={task.pendingAction === "view"}
                            onClick={() => handleAction(task.id, "view")}
                            size="icon"
                            variant="ghost"
                          >
                            {task.pendingAction === "view" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View details</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
