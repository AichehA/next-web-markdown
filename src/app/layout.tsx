"use client";

import "./globals.css";
import "katex/dist/katex.min.css";
import { Inter } from "next/font/google";
import { ColorModeSwitch } from "@/components/color-mode-switch";
import { ThemeProvider } from "@/components/theme-provider";
import { LangugeSwitch } from "@/components/languge-switch";
import { useLang } from "@/hooks/use-lang";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getCurrentLang } = useLang();

  return (
    <html lang={getCurrentLang}>
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
