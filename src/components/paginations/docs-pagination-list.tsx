"use client";

import PaginationControls from "@/components/paginations/pagination-controls";
import { useLang } from "@/hooks/use-lang";
import { allDocs } from "contentlayer/generated";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DocsPaginationListProps {
  perPage?: string;
}

export function DocsPaginationList({ perPage }: DocsPaginationListProps) {
  const { getCurrentLang } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const totalDocs = allDocs.filter(
    (doc) =>
      doc.locale === getCurrentLang && doc._raw.sourceFileName !== "index.mdx"
  );

  perPage = perPage ? perPage : "8";

  const pageCount = Math.ceil(totalDocs.length / Number(perPage));
  const searchParamPage = searchParams.get("page");

  useEffect(() => {
    let searchParamPageNumber = Number(searchParamPage);
    if (isNaN(Number(searchParamPage))) {
      searchParamPageNumber = 1;
      setPage(1);
      router.push(`docs?page=${Number(page)}`);
    }

    if (searchParamPageNumber > pageCount) {
      setPage(pageCount);
      router.push(`docs?page=${Number(page)}`);
    } else if (searchParamPageNumber <= 0) {
      setPage(1);
      router.push(`docs?page=${Number(page)}`);
    } else {
      setPage(searchParamPageNumber);
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
