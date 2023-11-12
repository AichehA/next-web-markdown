import { usePathname } from "next/navigation";
import appConfig from "app-config";

function getCurrentLangBySlug(currentSlug: string): string {
  const currentSlugArray = currentSlug.split("/");
  return appConfig.locates.includes(currentSlugArray.at(1)!)
    ? currentSlugArray.at(1)!
    : "fr";
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
