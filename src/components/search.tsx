"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { allDocs } from "contentlayer/generated";
import { useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "r" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="border"
        onClick={() => setOpen((open) => !open)}
      >
        <span className="inline-flex mr-2">Search...</span>
        <kbd className="pointer-events-none right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span>⌘</span>R
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documentation">
            {allDocs.map((item) => {
              return (
                <CommandItem
                  key={item._id}
                  value={item.title}
                  className="flex-col items-start"
                  onSelect={(value) => {
                    const slug = allDocs.find(
                      (doc) => doc.title.toLowerCase() === value
                    )?.slug;

                    if (slug) {
                      router.push(slug);
                      setOpen(false);
                    }
                  }}
                >
                  <span>{item.title}</span>
                  <span className="text-xs">{item.description}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
