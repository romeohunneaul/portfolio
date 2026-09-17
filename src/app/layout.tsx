import type { Metadata } from "next";
import { Schibsted_Grotesk, Space_Mono } from "next/font/google";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { profile } from "@/data/profile";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: { default: `${profile.name} — notebook`, template: `%s — ${profile.name}` },
  description: profile.headline,
  metadataBase: new URL(profile.links.site),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${schibsted.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="mx-auto flex w-full max-w-[var(--artboard-max)] flex-1 flex-col px-6 pt-8 pb-16 sm:px-10 sm:pt-12 lg:px-14">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
