import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { SearchDialog } from "./components/search/search-dialog";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="notes-app-theme">
      <RouterProvider router={router} />
      <SearchDialog />
    </ThemeProvider>
  </React.StrictMode>
);
