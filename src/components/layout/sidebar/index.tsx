import * as React from "react";
import {
  AlarmClockCheck,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Home,
  Inbox,
  Settings2,
  SquareTerminal,
  Star,
} from "lucide-react";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { NavProjects } from "@/components/layout/sidebar/nav-projects";
import { NavUser } from "@/components/layout/sidebar/nav-user";
import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavSearch } from "./nav-search";
import { useEffect, useState } from "react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
      isActive: true,
      color: "text-blue-500",
    },
    {
      title: "Todo",
      url: "/todo",
      icon: AlarmClockCheck,
      color: "text-emerald-500",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Bot,
      color: "text-purple-500",
    },
    {
      title: "Starred",
      url: "/starred",
      icon: Star,
      badge: "10",
      color: "text-yellow-500",
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
      color: "text-black-500",
    },
  ],
  projects: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
          items: [
            {
              title: "History",
              url: "#",
            },
            {
              title: "Starred",
              url: "#",
            },
          ],
        },
        {
          title: "Settings",
          url: "#",
          items: [
            {
              title: "History",
              url: "#",
            },
            {
              title: "Starred",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
          items: [
            {
              title: "Genesis",
              url: "#",
            },
            {
              title: "Explorer",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256); // w-64 默认 256px
  const { open } = useSidebar();

  useEffect(() => {
    open ? setSidebarWidth(256) : setSidebarWidth(48);
  }, [open]); // 当折叠状态 open 变化时更新宽度

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
          <NavSearch />
          <NavMain
            items={data.navMain}
            onInboxClick={setIsInboxOpen}
            isInboxOpen={isInboxOpen}
          />
        </SidebarHeader>
        <SidebarContent>
          <NavProjects items={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      {isInboxOpen && (
        <aside
          className="fixed top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg z-50 transition-transform transform"
          style={{ transform: `translateX(${sidebarWidth}px)` }}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg">Inbox</h2>
            <button
              onClick={() => setIsInboxOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              关闭
            </button>
          </div>
          <div className="p-4">{/* Inbox 内容 */}</div>
        </aside>
      )}
    </>
  );
}
