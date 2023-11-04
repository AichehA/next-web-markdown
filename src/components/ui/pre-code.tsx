import { CopyToClipboard } from "@/components/ui/copy-to-clipboard";

export const PreCode = ({ children, raw, ...props }) => {
  return (
    <CopyToClipboard>
      <pre
        {...props}
        className={"mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"}
      >
        {children}
      </pre>
    </CopyToClipboard>
  );
};
