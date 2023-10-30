"use client";

import "./globals.css";
import "katex/dist/katex.min.css";
import { Inter } from "next/font/google";
import { ColorModeSwitch } from "@/components/color-mode-switch";
import { ThemeProvider } from "@/components/theme-provider";
import { LangugeSwitch, getCurrentLang } from "@/components/languge-switch";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentSlug = usePathname();

  return (
    <html lang={getCurrentLang(currentSlug)}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ColorModeSwitch />
          <LangugeSwitch />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
