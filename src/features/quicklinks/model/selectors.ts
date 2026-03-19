import type { LinkType, Quicklink } from "@/store/quicklinks-store";

export function filterQuicklinksByQuery(
  quicklinks: Quicklink[],
  query: string
): Quicklink[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return quicklinks;
  }

  return quicklinks.filter((quicklink) => {
    const title = quicklink.title?.toLowerCase() ?? "";
    const description = quicklink.description?.toLowerCase() ?? "";
    return title.includes(normalizedQuery) || description.includes(normalizedQuery);
  });
}

export function getLatestQuicklinkUpdatedAt(
  quicklinks: Quicklink[]
): number | null {
  if (quicklinks.length === 0) {
    return null;
  }

  return Math.max(...quicklinks.map((quicklink) => quicklink.updatedAt));
}

export function countRecentQuicklinks(
  quicklinks: Quicklink[],
  days: number = 7,
  now: number = Date.now()
): number {
  const start = now - days * 24 * 60 * 60 * 1000;
  return quicklinks.filter((quicklink) => quicklink.updatedAt >= start).length;
}

export function countQuicklinksByType(
  quicklinks: Quicklink[],
  type: LinkType
): number {
  return quicklinks.filter((quicklink) => quicklink.linkType === type).length;
}

export type QuicklinksTrendPoint = {
  label: string;
  value: number;
};

export function buildQuicklinksTrendData(
  quicklinks: Quicklink[],
  days: number = 7,
  locale: string = "zh-CN"
): QuicklinksTrendPoint[] {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "numeric",
    day: "numeric",
  });

  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (days - 1 - index));

    const start = date.getTime();
    const end = start + 24 * 60 * 60 * 1000;
    const value = quicklinks.filter(
      (quicklink) => quicklink.updatedAt >= start && quicklink.updatedAt < end
    ).length;

    return {
      label: formatter.format(date),
      value,
    };
  });
}
