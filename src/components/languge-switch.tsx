"use client";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { allDocs, allEnDocs } from "contentlayer/generated";
import { useRouter } from "next/navigation";

const locates = ["fr", "en"];

function getSlugFr(slug: string, currentLang: string) {
  const currentSlug = currentLang === "fr" ? slug : slug.split("/en").at(1);

  if (slug === "/" || slug === "/en") {
    return "/";
  }

  const doc = allDocs.find((doc) => doc.slug === currentSlug);

  if (!doc) {
    return null;
  }

  return doc.slug;
}

function getSlugEn(slug: string, currentLang: string) {
  const currentSlug = currentLang === "fr" ? "/en" + slug : slug;

  if (slug === "/" || slug === "/en") {
    return "/en";
  }

  const doc = allEnDocs.find((doc) => doc.slug === currentSlug);

  if (!doc) {
    return null;
  }

  return doc.slug;
}

export function LangugeSwitch() {
  const { push } = useRouter();
  const currentSlug = usePathname();
  const currentSlugArray = currentSlug.split("/");
  const currentLang = locates.includes(currentSlugArray.at(1)!)
    ? currentSlugArray.at(1)!
    : "fr";

  const slugFr = getSlugFr(currentSlug, currentLang);
  const slugEn = getSlugEn(currentSlug, currentLang);

  return (
    <>
      {slugFr != null ? (
        <Button
          type="button"
          variant="link"
          onClick={() => push(slugFr)}
          className={slugFr === currentSlug ? "font-bold border-2" : ""}
        >
          <span>Fr</span>
        </Button>
      ) : null}
      {slugEn != null ? (
        <Button
          type="button"
          variant="link"
          onClick={() => push(slugEn)}
          className={slugEn === currentSlug ? "font-bold border-2" : ""}
        >
          <span>En</span>
        </Button>
      ) : null}
    </>
  );
}
