"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function NavMain({
  items,
  onInboxClick,
  isInboxOpen,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    color?: string;
  }[];
  onInboxClick: (open: boolean) => void;
  isInboxOpen: boolean;
}) {
  return (
    <>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={item.isActive}
              onClick={() =>
                item.title === "Inbox" && onInboxClick(!isInboxOpen)
              }
            >
              {item.title === "Inbox" ? (
                <span className="flex items-center gap-2 cursor-pointer">
                  <item.icon className={item.color} />
                  {item.title}
                </span>
              ) : (
                <Link to={item.url} className="flex items-center gap-2">
                  <item.icon className={item.color} />
                  {item.title}
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
