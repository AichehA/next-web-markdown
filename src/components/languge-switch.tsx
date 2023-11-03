"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/use-lang";
import { allDocs } from "contentlayer/generated";
import appConfig from "app-config";

export function LangugeSwitch() {
  const { getCurrentSlug } = useLang();
  const { push } = useRouter();

  const potentialDocs = appConfig.locates.map((lang) => {
    let v = getCurrentSlug.split("/").splice(2);
    return "/" + lang + "/" + v.join("/");
  });

  console.log("potentialDocs", potentialDocs);

  const getLangs = allDocs.filter((doc) => {
    return potentialDocs.includes(doc.slug);
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
