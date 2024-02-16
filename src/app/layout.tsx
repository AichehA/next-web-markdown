"use client";

import "./globals.css";
import "katex/dist/katex.min.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import { getCurrentLangBySlug } from "@/hooks/use-lang";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";
import { AppContext } from "@/hooks/use-app-context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getCurrentSlug = usePathname();
  const getCurrentLang = getCurrentLangBySlug(getCurrentSlug);

  return (
    <AppContext.Provider value={{ getCurrentSlug, getCurrentLang }}>
      <html lang={getCurrentLang} suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </AppContext.Provider>
  );
}
