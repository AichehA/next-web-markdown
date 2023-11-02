"use client";

import PaginationControls from "@/components/paginations/pagination-controls";
import { allDocs, allEnDocs } from "contentlayer/generated";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DocsPaginationListProps {
  lang: string;
  perPage?: string;
}

export function DocsPaginationList({ lang, perPage }: DocsPaginationListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const docs = lang === "fr" ? allDocs : allEnDocs;
  const totalDocs = docs.filter(
    (doc) => doc._raw.sourceFileName !== "index.mdx"
  );

  perPage = perPage ? perPage : "8";

  const pageCount = Math.ceil(totalDocs.length / Number(perPage));
  const searchParamPage = searchParams.get("page");

  useEffect(() => {
    if (searchParamPage) {
      if (Number(searchParamPage) > pageCount) {
        setPage(pageCount);
        router.push(`docs?page=${Number(page)}`);
      } else if (Number(searchParamPage) <= 0) {
        setPage(1);
        router.push(`docs?page=${Number(page)}`);
      } else {
        setPage(Number(searchParamPage));
      }
    }
  }, [searchParamPage, page, setPage, pageCount, router]);

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

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
