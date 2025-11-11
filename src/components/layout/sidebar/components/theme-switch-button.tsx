import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitchButton({
  className,
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={className}
        onClick={(e) => {
          e.stopPropagation(); // 阻止 DropdownMenuItem 的点击冒泡
          setTheme(theme === "light" ? "dark" : "light");
        }}
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>
    </>
  );
}
