"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Icons } from "../icons";

interface CopyToClipboardProps {
  children: React.ReactNode;
}

export const CopyToClipboard = ({ children }: CopyToClipboardProps) => {
  const textInput = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const onEnter = () => {
    setHovered(true);
  };

  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
    if (textInput.current !== null && textInput.current.textContent !== null)
      navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative code-block"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={cn("absolute right-2 top-2 w-8 h-8 p-1  z-10")}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
          >
            {copied ? <Icons.copyCheck /> : <Icons.copy />}
          </svg>
        </button>
      )}
      {children}
    </div>
  );
};
