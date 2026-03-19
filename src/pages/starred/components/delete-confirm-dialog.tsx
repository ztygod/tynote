import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarredItem, useStarredStore } from "@/store/starred-store";
import { toast } from "sonner";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: StarredItem | null;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  item,
}: DeleteConfirmDialogProps) {
  const deleteStarredItem = useStarredStore((state) => state.deleteStarredItem);

  const handleDelete = () => {
    if (!item) {
      return;
    }
    deleteStarredItem(item.id);
    toast.success("已删除收藏");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>确认删除</DialogTitle>
          <DialogDescription>
            确定要删除“{item?.title}”吗？此操作无法撤销。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button variant="destructive" className="rounded-xl" onClick={handleDelete}>
            确认删除
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
