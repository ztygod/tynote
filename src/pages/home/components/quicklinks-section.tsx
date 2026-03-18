import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuicklinksStore, type Quicklink } from "@/store/quicklinks-store";
import { QuicklinkCard } from "./quicklink-card";
import { QuicklinksManager } from "./quicklinks-manager";

interface QuicklinksSectionProps {
  quicklinks: Quicklink[];
  totalCount: number;
  editable?: boolean;
}

export function QuicklinksSection({
  quicklinks,
  totalCount,
  editable = false,
}: QuicklinksSectionProps) {
  const deleteQuicklink = useQuicklinksStore((s) => s.deleteQuicklink);
  const [managerOpen, setManagerOpen] = useState(false);
  const [selectedQuicklink, setSelectedQuicklink] = useState<Quicklink | null>(null);

  return (
    <>
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">快捷链接</h2>
            <p className="text-sm text-muted-foreground">
              当前显示 {quicklinks.length} 项，共 {totalCount} 项。
            </p>
          </div>

          {editable ? (
            <Button
              variant="outline"
              className="h-10 rounded-xl"
              onClick={() => {
                setSelectedQuicklink(null);
                setManagerOpen(true);
              }}
            >
              <Plus size={16} />
              新增快捷链接
            </Button>
          ) : null}
        </div>

        {quicklinks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quicklinks
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((quicklink) => (
                <QuicklinkCard
                  key={quicklink.id}
                  quicklink={quicklink}
                  editable={editable}
                  onEdit={(item) => {
                    setSelectedQuicklink(item);
                    setManagerOpen(true);
                  }}
                  onDelete={(id) => {
                    deleteQuicklink(id);
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 bg-card p-12 text-center shadow-sm">
            <p className="text-sm font-medium">未找到快捷链接</p>
            <p className="mt-1 text-sm text-muted-foreground">
              新增一个快捷链接以加速常用导航。
            </p>
          </div>
        )}
      </section>

      <QuicklinksManager
        open={managerOpen}
        onOpenChange={setManagerOpen}
        selectedQuicklink={selectedQuicklink}
      />
    </>
  );
}
