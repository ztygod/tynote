import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Search } from "lucide-react";

export function NavSearch() {
  const { state } = useSidebar();
  return (
    <Button variant="outline" size="sm">
      {state === "collapsed" ? (
        <Search />
      ) : (
        <>
          <Search />
          Search
        </>
      )}
    </Button>
  );
}
