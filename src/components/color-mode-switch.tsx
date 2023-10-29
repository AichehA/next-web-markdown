"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useMounted } from "@/hooks/use-mounted";

export function ColorModeSwitch() {
  const mounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      {mounted && resolvedTheme === "dark" ? (
        <div onClick={() => setTheme("light")} className={cn("cursor-pointer")}>
          <Icons.sun />
        </div>
      ) : (
        <div onClick={() => setTheme("dark")} className={cn("cursor-pointer")}>
          <Icons.moon />
        </div>
      )}
    </>
  );
}
