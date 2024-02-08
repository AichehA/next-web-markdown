import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { DocsPageHeader } from "@/components/page-header";
import { allPages } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface PagesProps {
  params: {
    lang: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    lang: page.lang,
    slug: page.slugAsParams,
  }));
}

async function getDocFromParams(lang: string, slug: string) {
  const slugPath = slug || "";

  const doc = allPages.find(
    (page) => page.slugAsParams === slugPath && page.lang === lang
  );

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: PagesProps): Promise<Metadata> {
  const doc = await getDocFromParams(params.lang, params.slug);

  if (!doc) {
    return {};
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
          url: `${appUrl}${appRepo}/background_1.jpg`,
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

export default async function Page({ params }: PagesProps) {
  const doc = await getDocFromParams(params.lang, params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <DocsPageHeader heading={doc.title} text={doc.description} />
      <div className="container">
        <Mdx code={doc.body.code} />
      </div>
    </main>
  );
}
