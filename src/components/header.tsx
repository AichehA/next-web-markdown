import * as React from "react";
import { cn } from "@/lib/utils";
import appConfig from "app-config";
import { LangugeSwitch } from "@/components/languge-switch";
import { ColorModeSwitch } from "@/components/color-mode-switch";
import Link from "next/link";
import { useLang } from "@/hooks/use-lang";
import { Search } from "@/components/search";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

interface routerModel {
  title: string;
  link: string;
  lang: string;
}

const router: routerModel[] = appConfig.menuNavigation;

function navigation({ currentLang, currentSlug, isMobile = false, callBack }) {
  return (
    <nav
      className={cn(
        isMobile
          ? "flex flex-col space-y-3 ml-3"
          : "hidden md:flex md:items-center md:space-x-6 md:text-sm md:font-medium"
      )}
    >
      {router
        .filter((value) => value.lang === currentLang)
        .map((value, index) => (
          <Link
            key={index}
            className={cn(
              "transition-colors hover:text-foreground/80 text-foreground/60",
              value.link === currentSlug
                ? "transition-colors hover:text-foreground/80 text-foreground"
                : ""
            )}
            href={value.link}
            onClick={callBack}
          >
            {value.title}
          </Link>
        ))}
    </nav>
  );
}

export function Header() {
  const { getCurrentSlug, getCurrentLang } = useLang();

  const [open, setOpen] = React.useState(false);

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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <span
                className={cn(
                  "flex items-center space-x-2 cursor-pointer md:hidden"
                )}
              >
                {appConfig.title}
              </span>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <Link href="/" className={cn("space-x-2 font-bold")}>
                  {appConfig.title}
                </Link>
                <SheetClose asChild>
                  <div className="flex">
                    <LangugeSwitch />
                  </div>
                </SheetClose>
              </SheetHeader>
              {navigation({
                currentLang: getCurrentLang,
                currentSlug: getCurrentSlug,
                isMobile: true,
                callBack: () => setOpen(false),
              })}
            </SheetContent>
          </Sheet>
          {navigation({
            currentLang: getCurrentLang,
            currentSlug: getCurrentSlug,
            callBack: () => {},
          })}
          <div className={cn("flex flex-1 items-center md:flex-initial")}>
            <Search className={cn("w-full md:w-auto")} />
            <ColorModeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
