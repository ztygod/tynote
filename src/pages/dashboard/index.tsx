import * as React from "react";
import { useQuicklinksStore } from "@/store/quicklinks-store";
import { QuickStatsSection } from "@/pages/dashboard/components/quick-stats";
import MetricsSummary from "@/pages/dashboard/components/metrics-summary";
import OverviewCard from "@/pages/dashboard/components/overview-card";
import WorkloadCard from "@/pages/dashboard/components/workload-card";
import ChartsPanel from "@/pages/dashboard/components/charts-panel";
import DashboardHeader from "@/pages/dashboard/components/dashboard-header";

export function DashboardPage() {
  const initializeQuicklinks = useQuicklinksStore(
    (s) => s.initializeQuicklinks,
  );

  const [lastRefreshed, setLastRefreshed] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [autoRefresh, setAutoRefresh] = React.useState<boolean>(false);

  React.useEffect(() => {
    // initialize on mount so stored quicklinks are loaded
    initializeQuicklinks();
  }, [initializeQuicklinks]);

  function handleRefresh() {
    initializeQuicklinks();
    setLastRefreshed(Date.now());
  }

  React.useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      initializeQuicklinks();
      setLastRefreshed(Date.now());
    }, 30_000);
    return () => clearInterval(id);
  }, [autoRefresh, initializeQuicklinks]);

  return (
    <div className="bg-muted/20 text-foreground min-h-screen">
      <div className="max-w-screen-xl mx-auto p-4 sm:p-7 md:p-8">
        <DashboardHeader
          onRefresh={handleRefresh}
          lastRefreshed={lastRefreshed}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          autoRefresh={autoRefresh}
          onToggleAutoRefresh={() => setAutoRefresh((v) => !v)}
        />

        <MetricsSummary lastRefreshed={lastRefreshed} query={searchQuery} />

        {/* Quick stats (moved from Home) */}
        <div className="mt-6">
          <QuickStatsSection />
        </div>

        {/* Overview / Workload / Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <OverviewCard />
          <WorkloadCard />
          <ChartsPanel />
        </div>
      </div>
    </div>
  );
}
