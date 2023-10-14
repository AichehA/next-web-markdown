import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"
import { DocsPageHeader } from "@/components/page-header"


interface DocPageProps {
  params: {
    slug: string
  }
}

async function getDocFromParams(slug: string) {
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)
  console.log('doc :', doc)

  if (!doc) {
    null
  }

  return doc
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params.slug)

  if (!doc) {
    return {}
  }

  // const url = env.NEXT_PUBLIC_APP_URL

//   const ogUrl = new URL(`${url}/api/og`)
//   ogUrl.searchParams.set("heading", doc.description ?? doc.title)
//   ogUrl.searchParams.set("type", "Documentation")
//   ogUrl.searchParams.set("mode", "dark")

  return {
    title: doc.title,
    description: doc.description,
    // openGraph: {
    //   title: doc.title,
    //   description: doc.description,
    //   type: "article",
    //   url: absoluteUrl(doc.slug),
    //   images: [
    //     {
    //       url: ogUrl.toString(),
    //       width: 1200,
    //       height: 630,
    //       alt: doc.title,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: doc.title,
    //   description: doc.description,
    //   images: [ogUrl.toString()],
    // },
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params.slug)

  if (!doc) {
    notFound()
  }

  return (
    <div>
        <main className="p-6">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Mdx code={doc.body.code} />
        <hr className="my-4 md:my-6" />
      </div>
    </main>
    </div>
  )
}
