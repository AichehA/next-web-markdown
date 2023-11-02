import { cn } from "@/lib/utils";
import appConfig from "app-config";
import { LangugeSwitch } from "@/components/languge-switch";
import { ColorModeSwitch } from "@/components/color-mode-switch";
import Link from "next/link";
import { useLang } from "@/hooks/use-lang";

interface routerModel {
  title: string;
  link: string;
  lang: string;
}

const router: routerModel[] = [
  {
    title: "Documentation",
    link: "/docs",
    lang: "fr",
  },
  {
    title: "Documentation",
    link: "/en/docs",
    lang: "en",
  },
  {
    title: "Exemple toto",
    link: "/docs/toto",
    lang: "fr",
  },
  {
    title: "Example toto",
    link: "/en/docs/toto",
    lang: "en",
  },
];

export function Header() {
  const { getCurrentSlug, getCurrentLang } = useLang();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className={cn("container flex h-14 items-center")}>
        <div className={cn("mr-4 hidden md:flex")}>
          <Link href="/" className={cn("mr-6 flex items-center space-x-2")}>
            {appConfig.title}
          </Link>
          <LangugeSwitch />
        </div>
        <div
          className={cn(
            "flex flex-1 items-center justify-between space-x-2 md:justify-end"
          )}
        >
          <nav
            className={cn("flex items-center space-x-6 text-sm font-medium")}
          >
            {router
              .filter((value) => value.lang === getCurrentLang)
              .map((value, index) => (
                <Link
                  key={index}
                  className={cn(
                    "transition-colors hover:text-foreground/80 text-foreground/60",
                    value.link === getCurrentSlug
                      ? "transition-colors hover:text-foreground/80 text-foreground"
                      : ""
                  )}
                  href={value.link}
                >
                  {value.title}
                </Link>
              ))}
          </nav>
          <nav className={cn("flex items-center")}>
            <ColorModeSwitch />
          </nav>
        </div>
      </div>
    </header>
  );
}
