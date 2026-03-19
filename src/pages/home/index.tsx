import * as React from "react";
import { useQuicklinksStore } from "@/store/quicklinks-store";
import { HomeHero } from "./components/home-hero";
import { QuicklinksSection } from "./components/quicklinks-section";
import { RecentActivitySection } from "./components/recent-note-item";
import {
  filterQuicklinksByQuery,
  getLatestQuicklinkUpdatedAt,
} from "@/features/quicklinks/model/selectors";

export function HomePage() {
  const quicklinks = useQuicklinksStore((s) => s.quicklinks);
  const initializeQuicklinks = useQuicklinksStore((s) => s.initializeQuicklinks);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    initializeQuicklinks();
  }, [initializeQuicklinks]);

  const filteredQuicklinks = React.useMemo(() => {
    return filterQuicklinksByQuery(quicklinks, searchQuery);
  }, [quicklinks, searchQuery]);

  const latestUpdatedAt = React.useMemo(() => {
    return getLatestQuicklinkUpdatedAt(quicklinks);
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
