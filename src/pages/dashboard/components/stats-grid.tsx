import type { PageThemeTokens } from "@/lib/page-theme";
import type { StatCardProps } from "@/pages/dashboard/components/stat-card";
import { StatCard } from "@/pages/dashboard/components/stat-card";

interface StatsGridProps {
  stats: StatCardProps[];
  theme: PageThemeTokens;
}

export function StatsGrid({ stats, theme }: StatsGridProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} theme={theme} />
      ))}
    </section>
  );
}
