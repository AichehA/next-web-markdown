"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useLang } from "@/hooks/use-lang";

export function LangugeSwitch() {
  const { getCurrentSlugFr, getCurrentSlugEn, getCurrentSlug } = useLang();
  const { push } = useRouter();

  return (
    <>
      {getCurrentSlugFr != null ? (
        <Button
          type="button"
          variant="link"
          onClick={() => push(getCurrentSlugFr)}
          className={
            getCurrentSlugFr === getCurrentSlug ? "font-bold border-2" : ""
          }
        >
          <span>Fr</span>
        </Button>
      ) : null}
      {getCurrentSlugEn != null ? (
        <Button
          type="button"
          variant="link"
          onClick={() => push(getCurrentSlugEn)}
          className={
            getCurrentSlugEn === getCurrentSlug ? "font-bold border-2" : ""
          }
        >
          <span>En</span>
        </Button>
      ) : null}
    </>
  );
}
