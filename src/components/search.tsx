"use client";

import * as React from "react";
import { allDocs } from "contentlayer/generated";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Translate } from "@/components/ui/translate";
import { cn } from "@/lib/utils";
import { AppContext } from "@/hooks/use-app-context";

export function Search({ className }) {
  const { getCurrentLang } = React.useContext(AppContext);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const allData = allDocs.filter((data) => data.lang === getCurrentLang);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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
        className={cn("border", className)}
        onClick={() => setOpen((open) => !open)}
      >
        <span className="inline-flex mr-2">
          {Translate("search.search_bar_name", getCurrentLang)}
        </span>
        <kbd className="pointer-events-none right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command
          filter={(itemId, search) => {
            const idDocArray = allData
              .filter((docs) => {
                return JSON.stringify(
                  `${docs.title} ${docs.description} ${docs.body.raw}`.toLowerCase()
                ).includes(search.toLowerCase());
              })
              .map((doc) => {
                return doc._id;
              });
            if (idDocArray.includes(itemId)) return 1;
            return 0;
          }}
        >
          <CommandInput
            placeholder={Translate("search.placeholder", getCurrentLang)}
          />
          <CommandList>
            <CommandEmpty>
              {Translate("search.search_not_found", getCurrentLang)}
            </CommandEmpty>
            <CommandGroup heading="Documentation">
              {allData.map((item) => {
                return (
                  <CommandItem
                    key={item._id}
                    value={item._id}
                    className="flex-col items-start"
                    onSelect={(value) => {
                      const slug = allData.find(
                        (doc) => doc._id === value
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
        </Command>
      </CommandDialog>
    </>
  );
}
