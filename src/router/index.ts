import { AppLayout } from "@/components/layout/app-layout";
import { AppContent } from "@/components/layout/content/app-content";
import { DashBoard } from "@/pages/dashboard";
import { HomePage } from "@/pages/home";
import { TodoPage } from "@/pages/todo";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: AppContent },
      {
        path: "/home",
        Component: HomePage,
      },
      {
        path: "/dashboard",
        Component: DashBoard,
      },
      {
        path: "/todo",
        Component: TodoPage,
      },
    ],
  },
]);
