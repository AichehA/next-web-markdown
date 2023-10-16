"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Icons } from "@/components/icons";

export function ColorModeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme === "dark" ? (
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
