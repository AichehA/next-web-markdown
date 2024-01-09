import fr from "./langs/fr.json";
import en from "./langs/en.json";

const appConfig = {
  title: "Mon site",
  copyright: "© 2023 - Mon site",
  email: "your-email@example.com",
  locates: { fr: "fr-FR", en: "en-US" },
  langs: ["fr", "en"],
  langTranslates: {
    fr: fr,
    en: en,
  },
  menuNavigation: [
    {
      title: "Documentation",
      link: "/fr/docs",
      lang: "fr",
    },
    {
      title: "Documentation",
      link: "/en/docs",
      lang: "en",
    },
    {
      title: "A propos",
      link: "/fr/about",
      lang: "fr",
    },
    {
      title: "About",
      link: "/en/about",
      lang: "en",
    },
  ],
  socials: [
    {
      link: "https://twitter.com/damienaicheh",
      type: "Twitter",
    },
    {
      link: "https://github.com/damienaicheh",
      type: "Github",
    },
    {
      link: "https://www.youtube.com/@damienaicheh",
      type: "Youtube",
    },
  ],
};

export default appConfig;
