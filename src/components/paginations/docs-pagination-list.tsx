"use client";

import PaginationControls from "@/components/paginations/pagination-controls";
import { allDocs, allEnDocs } from "contentlayer/generated";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function DocsPaginationList({ lang }) {
  const docs = lang === "fr" ? allDocs : allEnDocs;
  const totalDocs = docs.filter(
    (doc) => doc._raw.sourceFileName !== "index.mdx"
  );
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = "1";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = totalDocs.slice(start, end);

  return (
    <div className="flex flex-col gap-2 items-center">
      {entries.map((item, index) => (
        <Link key={index} href={item.slug}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Link>
      ))}

      <PaginationControls
        hasNextPage={end < totalDocs.length}
        hasPrevPage={start > 0}
        perPage={per_page}
        size={totalDocs.length}
      />
    </div>
  );
}
