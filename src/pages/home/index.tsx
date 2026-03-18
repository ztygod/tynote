import * as React from "react";
import { useQuicklinksStore } from "@/store/quicklinks-store";
import { HomeHero } from "./components/home-hero";
import { QuicklinksSection } from "./components/quicklinks-section";
import { RecentActivitySection } from "./components/recent-note-item";

export function HomePage() {
  const quicklinks = useQuicklinksStore((s) => s.quicklinks);
  const initializeQuicklinks = useQuicklinksStore((s) => s.initializeQuicklinks);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    initializeQuicklinks();
  }, [initializeQuicklinks]);

  const filteredQuicklinks = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return quicklinks;
    }

    return quicklinks.filter((quicklink) => {
      const title = quicklink.title?.toLowerCase() ?? "";
      const description = quicklink.description?.toLowerCase() ?? "";
      return title.includes(query) || description.includes(query);
    });
  }, [quicklinks, searchQuery]);

  const latestUpdatedAt = React.useMemo(() => {
    if (quicklinks.length === 0) {
      return null;
    }

    return Math.max(...quicklinks.map((quicklink) => quicklink.updatedAt));
  }, [quicklinks]);

  return (
    <div className="bg-muted/20 text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <HomeHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          matchedCount={filteredQuicklinks.length}
          totalCount={quicklinks.length}
          latestUpdatedAt={latestUpdatedAt}
          onClearSearch={() => setSearchQuery("")}
        />

        <QuicklinksSection
          quicklinks={filteredQuicklinks}
          totalCount={quicklinks.length}
          editable
        />

        <RecentActivitySection />
      </div>
    </div>
  );
}
