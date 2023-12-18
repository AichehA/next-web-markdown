import fr from "./langs/fr.json";
import en from "./langs/en.json";

const appConfig = {
  title: "Mon site",
  email: "your-email@example.com",
  locates: ["fr", "en"],
  langs: {
    fr: fr,
    en: en,
  },
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
