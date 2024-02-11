"use client";

import { FC } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageCount: number;
  currentPageProps: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  pageCount,
  currentPageProps,
}) => {
  const boundaryCount = 1;
  const siblingCount = 1;

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, pageCount));

  const endPages = range(
    Math.max(pageCount - boundaryCount + 1, boundaryCount + 1),
    pageCount
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPageProps - siblingCount,
      // Lower boundary when page is high
      pageCount - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPageProps + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : pageCount - 1
  );

  const itemList = [
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ["ellipsis"]
      : boundaryCount + 1 < pageCount - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < pageCount - boundaryCount - 1
      ? ["ellipsis"]
      : pageCount - boundaryCount > boundaryCount
      ? [pageCount - boundaryCount]
      : []),

    ...endPages,
  ];

  return (
    <div className="flex gap-2 items-center mt-4 mb-4">
      {hasPrevPage ? (
        <Link
          href={`docs?page=${currentPageProps - 1}`}
          title={`Page ${currentPageProps - 1}`}
          className={cn("btn-link-primary")}
        >
          <Icons.chevronLeft />
        </Link>
      ) : (
        <Button
          type="button"
          title={`disabled`}
          disabled={true}
          className={cn("px-2")}
        >
          <Icons.chevronLeft />
        </Button>
      )}

      {itemList.map((item, index) => (
        <div
          key={index}
          className={cn(
            item !== "ellipsis"
              ? "w-7 h-7 border-2 flex justify-center rounded-xl bg-primary text-primary-foreground shadow hover:bg-primary/90"
              : "w-7 h-7 flex justify-center rounded-xl",
            item === currentPageProps
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              : ""
          )}
        >
          {item === "ellipsis" ? (
            <div>...</div>
          ) : (
            <Link
              href={`docs?page=${Number(item)}`}
              title={`Page ${item}`}
              className={cn(
                item === currentPageProps
                  ? "self-center w-full h-full text-center font-bold"
                  : "self-center w-full h-full text-center"
              )}
            >
              {item}
            </Link>
          )}
        </div>
      ))}

      {hasNextPage ? (
        <Link
          href={`docs?page=${currentPageProps + 1}`}
          title={`Page ${currentPageProps + 1}`}
          className={cn("btn-link-primary")}
        >
          <Icons.chevronRight />
        </Link>
      ) : (
        <Button
          type="button"
          title={`disabled`}
          disabled={true}
          className={cn("px-2")}
        >
          <Icons.chevronRight />
        </Button>
      )}
    </div>
  );
};

export default PaginationControls;
