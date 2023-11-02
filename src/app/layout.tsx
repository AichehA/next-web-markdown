"use client";

import "./globals.css";
import "katex/dist/katex.min.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import { useLang } from "@/hooks/use-lang";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

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
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
