import * as React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import appConfig from "app-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findSlotOfType(children, slotType) {
  return React.Children.toArray(children).find(
    (child: any) => child.type === slotType
  );
}

export function dateToString(date: string, currentLang: string) {
  return new Date(date).toLocaleDateString(appConfig.locates[currentLang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
