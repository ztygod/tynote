import { AppLayout } from "@/components/layout/app-layout";
import { AppContent } from "@/components/layout/content/app-content";
import { HomePage } from "@/pages/home";
import { TodoPage } from "@/pages/todo";
import { createBrowserRouter } from "react-router";
import { StarredPage } from "@/pages/starred";

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
        path: "/todo",
        Component: TodoPage,
      },
      {
        path: "/starred",
        Component: StarredPage,
      },
    ],
  },
]);
