"use client";

import PaginationControls from "@/components/paginations/pagination-controls";
import { allDocs, allEnDocs } from "contentlayer/generated";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DocsPaginationList({ lang }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const docs = lang === "fr" ? allDocs : allEnDocs;
  const totalDocs = docs.filter(
    (doc) => doc._raw.sourceFileName !== "index.mdx"
  );

  const per_page = "1";
  const pageCount = Math.ceil(totalDocs.length / Number(per_page));
  const searchParamPage = searchParams.get("page");

  useEffect(() => {
    if (searchParamPage) {
      if (Number(searchParamPage) > pageCount) {
        setPage(pageCount);
        router.push(`docs/?page=${Number(page)}`);
      } else if (Number(searchParamPage) <= 0) {
        setPage(1);
        router.push(`docs/?page=${Number(page)}`);
      } else {
        setPage(Number(searchParamPage));
      }
    }
  }, [searchParamPage, page, setPage, pageCount, router]);

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
        pageCount={pageCount}
        currentPageProps={page}
      />
    </div>
  );
}
