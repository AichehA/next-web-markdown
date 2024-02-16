"use client";

import * as React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Translate } from "@/components/ui/translate";
import { AppContext } from "@/hooks/use-app-context";

export function generateMetadata(): Metadata {
  return {
    title: Translate("page_not_found.title"),
    description: Translate("page_not_found.title"),
  };
}

export default function NotFound() {
  const { getCurrentLang } = React.useContext(AppContext);

  return (
    <main className="min-h-not-found">
      <PageHeader
        heading="404"
        text={Translate("page_not_found.description", getCurrentLang)}
        mode="post"
      >
        <Link href="/" className={cn("btn-link-primary")}>
          {Translate("page_not_found.back_to_home", getCurrentLang)}
        </Link>
      </PageHeader>
    </main>
  );
}
