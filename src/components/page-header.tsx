import { cn } from "@/lib/utils";

interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
  mode?: "home" | "post";
}

// TODO Changer l'url du backgroundImage avec de la configuration

export function DocsPageHeader({
  heading,
  text,
  className,
  mode = "post",
  ...props
}: DocsPageHeaderProps) {
  return (
    <>
      {mode === "home" ? (
        <section
          className={cn(
            "relative space-y-4 h-[480px] md:h-[720px] bg-no-repeat bg-cover",
            className
          )}
          {...props}
          style={{
            backgroundImage: `url('/next-web-markdown/background_1.jpg')`,
          }}
        >
          <div className="absolute h-full w-full bg-secondary opacity-60 left-0 top-0;"></div>
          <div className="absolute max-w-[800px] h-[200px] translate-y-[-70%] left-8 top-2/4">
            <h1 className="text-4xl lg:text-5xl text-primary font-bold">
              {heading}
            </h1>
            {text && (
              <p className="text-xl text-primary-foreground mt-4">{text}</p>
            )}
          </div>
        </section>
      ) : (
        <>
          <div className={cn("space-y-4", className)} {...props}>
            <h1 className="text-4xl lg:text-5xl">{heading}</h1>
            {text && <p className="text-xl text-muted-foreground">{text}</p>}
          </div>
          <hr className="my-4" />
        </>
      )}
    </>
  );
}
