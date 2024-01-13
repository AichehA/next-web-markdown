import appConfig from "app-config";

export function getCurrentLangBySlug(currentSlug: string): string {
  const currentSlugArray = currentSlug.split("/");
  return appConfig.langs.includes(currentSlugArray.at(1)!)
    ? currentSlugArray.at(1)!
    : "fr";
}
