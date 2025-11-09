import { AppLayout } from "@/components/layout/app-layout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
  },
]);
