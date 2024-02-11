"use client";

import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Translate } from "@/components/ui/translate";

export function generateMetadata(): Metadata {
  return {
    title: Translate("page_not_found.title"),
    description: Translate("page_not_found.title"),
  };
}

export default function NotFound() {
  return (
    <main className="min-h-not-found">
      <PageHeader
        heading="404"
        text={Translate("page_not_found.description")}
        mode="post"
      >
        <Link href="/" className={cn("btn-link-primary")}>
          {Translate("page_not_found.back_to_home")}
        </Link>
      </PageHeader>
    </main>
  );
}
