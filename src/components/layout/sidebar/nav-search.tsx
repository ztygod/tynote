import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { useSearchStore } from "@/store/search-store";
import { isApplePlatform } from "@/utils";

export function NavSearch() {
  const { state } = useSidebar();
  const { setIsOpen } = useSearchStore();

  // 监听键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) 或 Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      // / 快捷键
      if (
        e.key === "/" &&
        e.target instanceof HTMLElement &&
        !e.target.matches("input, textarea")
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsOpen(true)}
      className="w-full justify-center"
    >
      {state === "collapsed" ? (
        <Search className="h-4 w-4" />
      ) : (
        <>
          <Search className="h-4 w-4" />
          <span>搜索</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {isApplePlatform() ? "⌘K" : "Ctrl+K"}
          </span>
        </>
      )}
    </Button>
  );
}
