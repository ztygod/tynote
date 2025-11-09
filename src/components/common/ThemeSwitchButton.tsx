import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../ThemeProvider";

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4">
      <h2> 当前主题 {theme}</h2>

      <div className="flex gap-8">
        {theme === "light" ? (
          <Button onClick={() => setTheme("dark")}>
            <Moon />
          </Button>
        ) : (
          <Button onClick={() => setTheme("light")}>
            <Sun />
          </Button>
        )}
      </div>
    </div>
  );
}
