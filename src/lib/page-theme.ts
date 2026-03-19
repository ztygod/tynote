export type PageThemeKey = "home" | "todo" | "dashboard" | "starred" | "inbox";

export interface PageThemeTokens {
  key: PageThemeKey;
  iconText: string;
  pageBackground: string;
  heroGradient: string;
  heroIcon: string;
  infoSurface: string;
  infoBorder: string;
  infoBadge: string;
  inputRing: string;
  primaryButton: string;
  outlineButton: string;
  chartText: string;
}

export const PAGE_THEMES: Record<PageThemeKey, PageThemeTokens> = {
  home: {
    key: "home",
    iconText: "text-sky-500 dark:text-sky-400",
    pageBackground: "bg-muted/20",
    heroGradient: "bg-gradient-to-br from-sky-500/8 via-card to-card",
    heroIcon: "bg-sky-500/12 text-sky-600 dark:text-sky-300",
    infoSurface: "bg-card",
    infoBorder: "border-sky-500/18",
    infoBadge: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
    inputRing: "focus-visible:ring-sky-500/35",
    primaryButton:
      "bg-sky-600 text-white hover:bg-sky-600/85 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-500/85",
    outlineButton:
      "border-sky-500/25 text-sky-700 hover:bg-sky-500/8 dark:text-sky-300 dark:hover:bg-sky-500/12",
    chartText: "text-sky-500 dark:text-sky-300",
  },
  todo: {
    key: "todo",
    iconText: "text-emerald-500 dark:text-emerald-400",
    pageBackground: "bg-muted/20",
    heroGradient: "bg-gradient-to-br from-emerald-500/8 via-card to-card",
    heroIcon: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
    infoSurface: "bg-card",
    infoBorder: "border-emerald-500/18",
    infoBadge: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    inputRing: "focus-visible:ring-emerald-500/35",
    primaryButton:
      "bg-emerald-600 text-white hover:bg-emerald-600/85 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-500/85",
    outlineButton:
      "border-emerald-500/25 text-emerald-700 hover:bg-emerald-500/8 dark:text-emerald-300 dark:hover:bg-emerald-500/12",
    chartText: "text-emerald-500 dark:text-emerald-300",
  },
  dashboard: {
    key: "dashboard",
    iconText: "text-violet-500 dark:text-violet-400",
    pageBackground: "bg-muted/20",
    heroGradient: "bg-gradient-to-br from-violet-500/8 via-card to-card",
    heroIcon: "bg-violet-500/12 text-violet-600 dark:text-violet-300",
    infoSurface: "bg-card",
    infoBorder: "border-violet-500/18",
    infoBadge: "bg-violet-500/12 text-violet-700 dark:text-violet-300",
    inputRing: "focus-visible:ring-violet-500/35",
    primaryButton:
      "bg-violet-600 text-white hover:bg-violet-600/85 dark:bg-violet-500 dark:text-slate-950 dark:hover:bg-violet-500/85",
    outlineButton:
      "border-violet-500/25 text-violet-700 hover:bg-violet-500/8 dark:text-violet-300 dark:hover:bg-violet-500/12",
    chartText: "text-violet-500 dark:text-violet-300",
  },
  starred: {
    key: "starred",
    iconText: "text-amber-500 dark:text-amber-400",
    pageBackground: "bg-muted/20",
    heroGradient: "bg-gradient-to-br from-amber-500/8 via-card to-card",
    heroIcon: "bg-amber-500/12 text-amber-600 dark:text-amber-300",
    infoSurface: "bg-card",
    infoBorder: "border-amber-500/18",
    infoBadge: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
    inputRing: "focus-visible:ring-amber-500/35",
    primaryButton:
      "bg-amber-600 text-white hover:bg-amber-600/85 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-500/85",
    outlineButton:
      "border-amber-500/25 text-amber-700 hover:bg-amber-500/8 dark:text-amber-300 dark:hover:bg-amber-500/12",
    chartText: "text-amber-500 dark:text-amber-300",
  },
  inbox: {
    key: "inbox",
    iconText: "text-zinc-600 dark:text-zinc-300",
    pageBackground: "bg-muted/20",
    heroGradient: "bg-gradient-to-br from-zinc-500/8 via-card to-card",
    heroIcon: "bg-zinc-500/12 text-zinc-700 dark:text-zinc-300",
    infoSurface: "bg-card",
    infoBorder: "border-zinc-500/18",
    infoBadge: "bg-zinc-500/12 text-zinc-700 dark:text-zinc-300",
    inputRing: "focus-visible:ring-zinc-500/35",
    primaryButton:
      "bg-zinc-700 text-white hover:bg-zinc-700/85 dark:bg-zinc-400 dark:text-zinc-950 dark:hover:bg-zinc-400/85",
    outlineButton:
      "border-zinc-500/25 text-zinc-700 hover:bg-zinc-500/8 dark:text-zinc-300 dark:hover:bg-zinc-500/12",
    chartText: "text-zinc-500 dark:text-zinc-300",
  },
};

export function getPageTheme(key: PageThemeKey) {
  return PAGE_THEMES[key];
}

export function getPageThemeByPath(path: string) {
  if (path.startsWith("/dashboard")) {
    return PAGE_THEMES.dashboard;
  }
  if (path.startsWith("/todo")) {
    return PAGE_THEMES.todo;
  }
  if (path.startsWith("/starred")) {
    return PAGE_THEMES.starred;
  }
  if (path.startsWith("/inbox")) {
    return PAGE_THEMES.inbox;
  }
  return PAGE_THEMES.home;
}
