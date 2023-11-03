import { allDocs } from "contentlayer/generated";
import { usePathname } from "next/navigation";
import appConfig from "app-config";

function getCurrentLangBySlug(currentSlug: string): string {
  const currentSlugArray = currentSlug.split("/");
  return appConfig.locates.includes(currentSlugArray.at(1)!)
    ? currentSlugArray.at(1)!
    : "fr";
}

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

  const doc = allDocs.find((doc) => doc.slug === currentSlug);

  if (!doc) {
    return null;
  }

  return doc.slug;
}

export function useLang() {
  const getCurrentSlug = usePathname();
  const getLangs = appConfig.locates;
  const getCurrentLang = getCurrentLangBySlug(getCurrentSlug);

  return {
    getLangs,
    getCurrentLang,
    getCurrentSlug,
  };
}
