import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { DocsPageHeader } from "@/components/page-header";
import { allHomes } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface HomePageProps {
  params: {
    lang: string;
  };
}

export async function generateStaticParams() {
  return allHomes.map((doc) => ({
    lang: doc.lang,
  }));
}

async function getDocFromParams(lang: string) {
  const doc = allHomes.find((home) => home.lang === lang);

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params.lang);

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
          url: "/next-web-markdown/background_1.jpg",
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

export default async function Home({ params }: HomePageProps) {
  const doc = await getDocFromParams(params.lang);

  if (!doc) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <DocsPageHeader heading={doc.title} text={doc.description} mode="home" />
      <div className="container">
        <Mdx code={doc.body.code} />
      </div>
    </main>
  );
}
