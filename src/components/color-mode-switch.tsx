"use client";

import { useTheme } from "next-themes";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";

export function ColorModeSwitch() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="ml-1 mr-1">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 px-0"
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
