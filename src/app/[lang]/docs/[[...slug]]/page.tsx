import { notFound } from "next/navigation";

import { Metadata } from "next";
import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { PageHeader } from "@/components/page-header";
import { DashboardTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { translateText } from "@/lib/translate-text";
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
    return {
      title: translateText(params.lang, "page_not_found.title"),
      description: translateText(params.lang, "page_not_found.description"),
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const appRepo = process.env.NEXT_PUBLIC_APP_REPO;

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
      url: `${appUrl}${appRepo}/${doc.slug}`,
      images: [
        {
          url: `${appUrl}${appRepo}/${doc.cover}`,
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
      <PageHeader
        heading={doc.title}
        text={doc.description}
        cover={doc.cover}
      />
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
