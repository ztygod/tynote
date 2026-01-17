import { useQuicklinksStore, Quicklink } from "@/store/quicklinks-store";
import { QuicklinkCard } from "./quicklink-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { QuicklinksManager } from "./quicklinks-manager";

interface QuicklinksectionProps {
  editable?: boolean;
}

export function QuicklinksSection({ editable = false }: QuicklinksectionProps) {
  const { quicklinks, initializeQuicklinks, deleteQuicklink } =
    useQuicklinksStore();
  const [managerOpen, setManagerOpen] = useState(false);
  const [selectedQuicklink, setSelectedQuicklink] = useState<Quicklink | null>(
    null
  );

  useEffect(() => {
    initializeQuicklinks();
  }, [initializeQuicklinks]);

  if (quicklinks.length === 0 && !editable) {
    return null;
  }

  return (
    <>
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">快捷链接</h2>
          </div>

          {editable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedQuicklink(null);
                setManagerOpen(true);
              }}
              className="gap-2"
            >
              <Plus size={16} />
              新增
            </Button>
          )}
        </div>

        {quicklinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quicklinks
              .sort((a, b) => a.order - b.order)
              .map((quicklink) => (
                <QuicklinkCard
                  key={quicklink.id}
                  quicklink={quicklink}
                  editable={editable}
                  onEdit={(ql) => {
                    setSelectedQuicklink(ql);
                    setManagerOpen(true);
                  }}
                  onDelete={(id) => {
                    deleteQuicklink(id);
                  }}
                />
              ))}
          </div>
        ) : editable ? (
          <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-muted rounded-lg">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  还没有快捷链接
                </p>
                <p className="text-xs text-muted-foreground">
                  点击上方"新增"按钮来添加您的第一个快捷链接
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <QuicklinksManager
        open={managerOpen}
        onOpenChange={setManagerOpen}
        selectedQuicklink={selectedQuicklink}
      />
    </>
  );
}
