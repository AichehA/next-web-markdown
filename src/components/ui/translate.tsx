"use client";

import * as React from "react";
import { Icons } from "../icons";
import { AppContext } from "@/hooks/use-app-context";
import { translateText } from "@/lib/translate-text";

export const Translate = (keyTranslate: string) => {
  const { getCurrentLang } = React.useContext(AppContext);

  const texte = translateText(getCurrentLang, keyTranslate);

  return texte ? texte : <Icons.spinner />;
};
