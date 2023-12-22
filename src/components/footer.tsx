import { Icons } from "@/components/icons";
import Link from "next/link";
import appConfig from "app-config";
import { cn } from "@/lib/utils";

function getIcon(type: string) {
  switch (type) {
    case "Github":
      return <Icons.gitHub className={cn("inline-flex")} />;
    case "Twitter":
      return <Icons.twitterX className={cn("inline-flex")} />;
    case "Youtube":
      return <Icons.youtube className={cn("inline-flex")} />;

    default:
      return "";
  }
}

export function Footer() {
  return (
    <footer className={cn("border-t")}>
      <div className={cn("container flex justify-between h-14 items-center")}>
        <div className={cn("flex items-center")}>
          {appConfig.socials.map((value, index) => (
            <Link
              key={index}
              href={value.link}
              aria-label={value.type}
              target="_blank"
              className={cn("w-12 text-center")}
              title={value.type}
            >
              {getIcon(value.type)}
            </Link>
          ))}
        </div>

        <p>{appConfig.copyright}</p>
      </div>
    </footer>
  );
}
