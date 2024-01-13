"use client";

import PaginationControls from "@/components/paginations/pagination-controls";
import { PostsDateAndReadTime } from "@/components/ui/posts-date-read";
import { allDocs } from "contentlayer/generated";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/hooks/use-app-context";
import { Icons } from "@/components/icons";

interface DocsPaginationListProps {
  perPage?: string;
}

export function DocsPaginationList({ perPage }: DocsPaginationListProps) {
  const { getCurrentLang } = useContext(AppContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const totalDocs = allDocs.filter(
    (doc) =>
      doc.lang === getCurrentLang && doc._raw.sourceFileName !== "index.mdx"
  );

  perPage = perPage ? perPage : "8";

  const pageCount = Math.ceil(totalDocs.length / Number(perPage));
  const searchParamPage = searchParams.get("page");

  useEffect(() => {
    let searchParamPageNumber = Number(searchParamPage);

    if (isNaN(Number(searchParamPage))) {
      setPage(1);
      setLoading(false);
      router.push(`docs?page=${Number(1)}`);
    } else {
      if (searchParamPageNumber > pageCount) {
        setPage(pageCount);
        setLoading(false);
      } else if (searchParamPageNumber <= 0) {
        setLoading(false);
      } else {
        setPage(searchParamPageNumber);
        setLoading(false);
      }
    }
  }, [searchParamPage, page, pageCount, router]);

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const entries = totalDocs.slice(start, end);

  if (isLoading)
    return (
      <div className="p-4 md:p-6 items-start max-md:max-w-full bg-card hover:bg-card/70 text-card-foreground w-full text-center">
        <Icons.spinner />
      </div>
    );

  return (
    <div className="flex flex-col gap-2 items-center">
      {entries.map((doc) => (
        <Link
          className="flex flex-col p-4 md:p-6 items-start max-md:max-w-full bg-card hover:bg-card/70 text-card-foreground w-full"
          href={doc.slug}
          title={doc.title}
          key={doc._id}
        >
          {PostsDateAndReadTime(doc, getCurrentLang)}
          <h2 className="text-2xl font-bold leading-8">{doc.title}</h2>
          <p className="leading-8 mt-2">{doc.description}</p>
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
