"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/use-lang";
import { allDocs, allHomes } from "contentlayer/generated";
import appConfig from "app-config";

export function LangugeSwitch() {
  const { getCurrentSlug } = useLang();
  const { push } = useRouter();

  const potentialPath = appConfig.locates.map((lang) => {
    const slugArray = getCurrentSlug.split("/").splice(2);
    return slugArray.length
      ? "/" + lang + "/" + slugArray.join("/")
      : "/" + lang;
  });

  const allData = [...allDocs, ...allHomes];

  const getLangs = allData.filter((doc) => {
    return potentialPath.includes(doc.slug);
  });

  return (
    <>
      {getLangs.map((doc, index) => (
        <Button
          key={index}
          type="button"
          variant="link"
          onClick={() => push(doc.slug)}
          className={doc.locale === getCurrentSlug ? "font-bold border-2" : ""}
        >
          <span>{doc.locale.toUpperCase()}</span>
        </Button>
      ))}
    </>
  );
}
