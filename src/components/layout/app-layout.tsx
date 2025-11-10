import { AppSidebar } from "./sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppHeader } from "./header/app-header";
import { AppContent } from "./content/app-content";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <AppContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
