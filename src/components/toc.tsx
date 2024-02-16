"use client";

import * as React from "react";

import { TableOfContents, Item } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { Translate } from "@/components/ui/translate";
import { AppContext } from "@/hooks/use-app-context";

interface TocProps {
  toc: TableOfContents;
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const { getCurrentLang } = React.useContext(AppContext);
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items) {
    return null;
  }

  const tocTitle = <>{Translate("toc.title", getCurrentLang)}</>;

  return mounted ? (
    <div className="space-y-2">
      <p className="font-medium">{tocTitle}</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null;
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 5 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return item ? (
          <li key={index} className={cn("mt-0 pt-2")}>
            <TreeTitle item={item} activeItem={activeItem} />
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        ) : null;
      })}
    </ul>
  ) : null;
}

interface TreeTitleProps {
  item: Item;
  activeItem?: string | null;
}

function TreeTitle({ item, activeItem }: TreeTitleProps) {
  return item.title ? (
    <a
      href={item.url}
      className={cn(
        "inline-block no-underline",
        item.url === `#${activeItem}`
          ? "font-medium text-primary"
          : "text-sm text-muted-foreground"
      )}
    >
      {item.title}
    </a>
  ) : null;
}
