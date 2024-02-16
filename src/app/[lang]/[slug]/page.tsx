import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { PageHeader } from "@/components/page-header";
import { allPages } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { translateText } from "@/lib/translate-text";

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

  const page = allPages.find(
    (page) => page.slugAsParams === slugPath && page.lang === lang
  );

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PagesProps): Promise<Metadata> {
  const page = await getDocFromParams(params.lang, params.slug);

  if (!page) {
    return {
      title: translateText(params.lang, "page_not_found.title"),
      description: translateText(params.lang, "page_not_found.description"),
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const appRepo = process.env.NEXT_PUBLIC_APP_REPO;

  //   const ogUrl = new URL(`${url}/api/og`)
  //   ogUrl.searchParams.set("heading", page.description ?? page.title)
  //   ogUrl.searchParams.set("type", "Documentation")
  //   ogUrl.searchParams.set("mode", "dark")

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: `${appUrl}${appRepo}/${page.slug}`,
      images: [
        {
          url: `${appUrl}${appRepo}/${page.cover}`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function Page({ params }: PagesProps) {
  const page = await getDocFromParams(params.lang, params.slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        heading={page.title}
        text={page.description}
        cover={page.cover}
      />
      <div className="container">
        <Mdx code={page.body.code} />
      </div>
    </main>
  );
}
