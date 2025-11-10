import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight, LucideIcon } from "lucide-react";

interface Item {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Item[];
}

function RenderItems({ items, depth = 0 }: { items: Item[]; depth?: number }) {
  return (
    <SidebarMenu
      className={
        depth === 0
          ? ""
          : depth === 1
          ? "pl-2 border-l border-border/20"
          : "pl-1 border-l border-border/20"
      }
    >
      {items.map((item) => {
        const hasChildren = !!item.items?.length;
        const Icon = item.icon;

        return (
          <Collapsible key={item.title} defaultOpen={item.isActive}>
            <SidebarMenuItem className="group/collapsible">
              {hasChildren ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="group/collapsible"
                    >
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <RenderItems items={item.items!} depth={depth + 1} />
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        );
      })}
    </SidebarMenu>
  );
}

export function NavProjects({ items }: { items: Item[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Collections</SidebarGroupLabel>
      <RenderItems items={items} />
    </SidebarGroup>
  );
}
