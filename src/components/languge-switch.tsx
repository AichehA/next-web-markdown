"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/use-lang";
import { allDocs, allHomes } from "contentlayer/generated";
import appConfig from "app-config";

export function LangugeSwitch() {
  const { getCurrentSlug, getCurrentLang } = useLang();
  const { push } = useRouter();

  const potentialPath = appConfig.langs.map((lang) => {
    const slugArray = getCurrentSlug.split("/").splice(2);
    return slugArray.length
      ? "/" + lang + "/" + slugArray.join("/")
      : "/" + lang;
  });

  const allData = [...allDocs, ...allHomes];

  /**
   * Permet de filtrer si l'article est disponible dans plusieurs langues.
   * Le résultat des boutons est retourné dans ordre du tableau de configuration "appConfig.langs"
   */
  const getLangs = allData
    .filter((doc) => {
      return potentialPath.includes(doc.slug);
    })
    .sort(
      (docA, docB) =>
        appConfig.langs.indexOf(docA.lang) - appConfig.langs.indexOf(docB.lang)
    );

  return (
    <>
      {getLangs.map((doc, index) => (
        <Button
          key={index}
          type="button"
          variant="link"
          onClick={() => push(doc.slug)}
          className={doc.lang === getCurrentLang ? "font-bold border-2" : ""}
        >
          <span>{doc.lang.toUpperCase()}</span>
        </Button>
      ))}
    </>
  );
}
