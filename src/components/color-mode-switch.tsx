"use client";

import { useTheme } from "next-themes";

import { Icons } from "@/components/icons";
import { useMounted } from "@/hooks/use-mounted";

export function ColorModeSwitch() {
  const mounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      {mounted && resolvedTheme === "dark" ? (
        <div onClick={() => setTheme("light")}>
          <Icons.sun />
        </div>
      ) : (
        <div onClick={() => setTheme("dark")}>
          <Icons.moon />
        </div>
      )}
    </>
  );
}