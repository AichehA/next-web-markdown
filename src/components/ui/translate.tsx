"use client";

import * as React from "react";
import { Icons } from "../icons";
import { translateText } from "@/lib/translate-text";
import appConfig from "app-config";

export const Translate = (
  keyTranslate: string,
  currentLang = appConfig.langs[0]
) => {
  const texte = translateText(currentLang, keyTranslate);

  return texte ? texte : <Icons.spinner />;
};
