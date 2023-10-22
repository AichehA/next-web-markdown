import * as React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findSlotOfType(children, slotType) {
  return React.Children.toArray(children).find(
    (child: any) => child.type === slotType
  );
}
