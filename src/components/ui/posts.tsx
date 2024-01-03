"use client";

import { useLang } from "@/hooks/use-lang";
import { cn, dateToString } from "@/lib/utils";
import { allDocs } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

interface PostsProps {
  children?: React.ReactNode;
  featuredPostTitle: string;
  featuredPostBtn: string;
  allPostsTitle: string;
  allPostsBtn: string;
}

export function Posts({
  featuredPostTitle,
  featuredPostBtn,
  allPostsTitle,
  allPostsBtn,
}: PostsProps) {
  const { getCurrentLang } = useLang();
  const allData = allDocs.filter((data) => data.lang === getCurrentLang);
  const features = allData
    .filter((docs) => docs._id.includes("index") === false)
    .sort((docA, docB) => {
      return new Date(docB.date).valueOf() - new Date(docA.date).valueOf();
    })
    .slice(0, 6);

  const firstFeatures = features.shift();

  return (
    <div className="w-full  max-md:max-w-full">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <section className="flex flex-col items-stretch w-[60%] max-md:w-full max-md:ml-0 mt-10">
          <h2
            className={cn(
              "mb-4 text-4xl font-semibold leading-10 tracking-tighter"
            )}
          >
            {featuredPostTitle}
          </h2>
          <div className="border flex justify-around flex-col w-full p-8 border-solid max-md:max-w-full max-md:mt-8 max-md:px-5 mb-2 bg-card text-card-foreground">
            {firstFeatures ? (
              <>
                {firstFeatures.cover ? (
                  <div>
                    <Image
                      className="aspect-[1.9] object-fill object-center w-full overflow-hidden self-stretch max-md:max-w-full"
                      src={firstFeatures.cover}
                      alt="Next.js Logo"
                      width={1500}
                      height={1500}
                    />
                    <span className="text-sm font-medium leading-5 self-stretch max-md:max-w-full">
                      {dateToString(firstFeatures.date, getCurrentLang)} {" | "}
                      {firstFeatures.readTime}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-medium leading-5 self-stretch max-md:max-w-full">
                    {dateToString(firstFeatures.date, getCurrentLang)} {" | "}
                    {firstFeatures.readTime}
                  </span>
                )}

                <div>
                  <h3 className="text-3xl font-bold leading-10 tracking-tighter self-stretch max-md:max-w-full">
                    {firstFeatures.title}
                  </h3>
                  <p className="text-base leading-7 self-stretch mt-5 max-md:max-w-full">
                    {firstFeatures.description} Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Quis nam exercitationem
                    distinctio quaerat. Est, sit ipsum praesentium soluta fuga
                    impedit ut. Veniam nisi obcaecati odit aperiam debitis amet
                    rem quis!
                  </p>
                  <Link
                    href={firstFeatures.slug}
                    title={firstFeatures.title}
                    className={cn(
                      "text-lg font-bold leading-6 mt-9 px-12 py-4 self-start max-md:px-5 inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
                    )}
                  >
                    {featuredPostBtn}
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </section>
        <section className="flex flex-col items-stretch w-[40%] ml-5 max-md:w-full max-md:ml-0 mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2
              className={cn(
                "text-4xl font-semibold leading-10 tracking-tighter"
              )}
            >
              {allPostsTitle}
            </h2>
            <Link
              href={`en/docs`}
              title={"all docs"}
              className={cn(
                "text-lg font-bold leading-6 px-12 py-2 self-start max-md:px-5 inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
              )}
            >
              {allPostsBtn}
            </Link>
          </div>

          <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-8">
            {features.map((doc) => (
              <Link
                className="flex flex-col p-8 mb-2 items-start max-md:max-w-full max-md:px-5 bg-card hover:bg-card/70 text-card-foreground"
                href={doc.slug}
                title={doc.title}
                key={doc._id}
              >
                <span className="text-sm font-medium leading-5">
                  {dateToString(doc.date, getCurrentLang)} | {doc.readTime}
                </span>
                <h3 className="text-2xl font-bold leading-8 mt-4">
                  {doc.title}
                </h3>
                <p className="leading-8 mt-2">
                  {doc.description} Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Accusamus similique quidem id nobis
                  inventore modi tempora fugiat labore consequuntur, perferendis
                  dicta tempore est iure totam et voluptatibus reiciendis,
                  commodi vel?
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
