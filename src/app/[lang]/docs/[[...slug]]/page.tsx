import { notFound } from "next/navigation";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { DocsPageHeader } from "@/components/page-header";
import { DashboardTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { allDocs } from "contentlayer/generated";
import { cn } from "@/lib/utils";

interface DocPageProps {
  params: {
    lang: string;
    slug: string[];
  };
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    lang: doc.lang,
    slug: doc.slugAsParams.split("/"),
  }));
}

async function getDocFromParams(lang: string, slug: string[]) {
  const slugPath = slug?.join("/") || "";

  const doc = allDocs.find(
    (doc) => doc.slugAsParams === slugPath && doc.lang === lang
  );

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params.lang, params.slug);

  if (!doc) {
    return {};
  }

  // const url = env.NEXT_PUBLIC_APP_URL

  //   const ogUrl = new URL(`${url}/api/og`)
  //   ogUrl.searchParams.set("heading", doc.description ?? doc.title)
  //   ogUrl.searchParams.set("type", "Documentation")
  //   ogUrl.searchParams.set("mode", "dark")

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: "https://aicheha.github.io/next-web-markdown" + doc.slug,
      images: [
        {
          url: "https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg",
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params.lang, params.slug);

  if (!doc) {
    notFound();
  }

  const isIndex = doc._raw.sourceFilePath.includes("index.mdx");

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="min-h-screen">
      <DocsPageHeader heading={doc.title} text={doc.description} mode="post" />
      <div className="container mt-4">
        <div className="flex md:gap-4">
          <div
            className={cn(
              "mx-auto min-w-0 w-full",
              isIndex ? null : "xl:w-[75%]"
            )}
          >
            <Mdx code={doc.body.code} />
          </div>
          {isIndex ? null : (
            <div className="hidden text-sm xl:block w-[25%]">
              <div className="sticky top-16 max-h-[calc(var(--vh)-4rem)] overflow-y-auto">
                <DashboardTableOfContents toc={toc} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
