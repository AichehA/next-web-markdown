import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
  cover?: string;
  mode?: "home" | "post";
}

export function PageHeader({
  heading,
  text,
  cover,
  className,
  mode = "post",
  ...props
}: PageHeaderProps) {
  const appRepo = process.env.NEXT_PUBLIC_APP_REPO;
  const urlImage = appRepo ? `/${appRepo}/${cover}` : `/${cover}`;

  return (
    <>
      {mode === "home" ? (
        <section
          className={cn(
            "relative space-y-4 h-[480px] md:h-[720px] bg-no-repeat bg-cover",
            className
          )}
          {...props}
          style={
            cover
              ? {
                  backgroundImage: `url(${urlImage})`,
                }
              : {}
          }
        >
          <div className="absolute h-full w-full bg-shadow opacity-60 left-0 top-0;"></div>
          <div className="absolute max-w-[800px] h-[200px] translate-y-[-70%] left-8 top-2/4">
            <h1 className="text-4xl lg:text-5xl text-primary font-bold">
              {heading}
            </h1>
            {text && (
              <p className="text-xl text-primary-foreground mt-4">{text}</p>
            )}
            {props.children && <div {...props} />}
          </div>
        </section>
      ) : (
        <section
          className={cn(
            "h-[300px] md:h-[400px] bg-card flex items-center justify-center border-b",
            className
          )}
          style={
            cover
              ? {
                  backgroundImage: `url(${urlImage})`,
                }
              : {}
          }
        >
          <div
            className={cn("space-y-4 bg-secondary-opacity w-full text-center")}
          >
            <h1 className="text-4xl lg:text-5xl text-primary font-bold">
              {heading}
            </h1>
            {text && <p className="text-xl text-primary-foreground">{text}</p>}
            {props.children && <div {...props} />}
          </div>
        </section>
      )}
    </>
  );
}
