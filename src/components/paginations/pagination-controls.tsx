"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  perPage: string;
  size: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  perPage,
  size,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPageProps = searchParams.get("page") ?? "1";
  const pageCount = Math.ceil(size / Number(perPage));
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
      Number(currentPageProps) - siblingCount,
      // Lower boundary when page is high
      pageCount - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      Number(currentPageProps) + siblingCount,
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
    <div className="flex gap-2 items-center">
      <Button
        type="button"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`docs/?page=${Number(currentPageProps) - 1}`);
        }}
      >
        prev page
      </Button>

      {itemList.map((item, index) => (
        <div key={index}>
          {item === "ellipsis" ? (
            <div>...</div>
          ) : (
            <Link
              href={`docs/?page=${Number(item)}`}
              className={
                item === Number(currentPageProps)
                  ? "font-bold border-2 p-1"
                  : ""
              }
            >
              {item}
            </Link>
          )}
        </div>
      ))}

      <Button
        type="button"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`docs/?page=${Number(currentPageProps) + 1}`);
        }}
      >
        next page
      </Button>
    </div>
  );
};

export default PaginationControls;
