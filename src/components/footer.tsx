import { Icons } from "@/components/icons";
import Link from "next/link";
import appConfig from "app-config";
import { cn } from "@/lib/utils";

function getIcon(type: string) {
  switch (type) {
    case "github":
      return <Icons.gitHub />;
    case "twitter":
      return <Icons.twitter />;
    case "youtube":
      return <Icons.youtube />;

    default:
      return "";
  }
}

export function Footer() {
  return (
    <footer>
      <div className={cn("flex")}>
        {appConfig.socials.map((value, index) => (
          <Link
            key={index}
            href={value.link}
            aria-label={value.type}
            target="_blank"
          >
            {getIcon(value.type)}
          </Link>
        ))}
      </div>

      <p>© 2023 - {appConfig.title}</p>
    </footer>
  );
}
