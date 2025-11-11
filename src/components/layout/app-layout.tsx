import { AppSidebar } from "./sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppHeader } from "./header/app-header";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <AppHeader /> */}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
