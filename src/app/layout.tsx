import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Space_Mono } from "next/font/google";
import { AskProvider } from "@/components/ask/ask-provider";
import { SiteHeader } from "@/components/sections/site-header";
import { AskFab } from "@/components/ask/ask-fab";
import { SiteFooter } from "@/components/sections/site-footer";
import { profile } from "@/data/profile";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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

// Browser chrome follows the system; the tokens' --paper values, repeated because metadata can't read CSS.
export const viewport: Viewport = {
  // Android shrinks the page above the keyboard, so the Ask sheet's field stays in view (iOS: see ask-dialog.tsx).
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1c212b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the head script sets data-theme before React hydrates.
    <html lang="en" className={`${schibsted.variable} ${spaceMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <AskProvider>
          <div className="mx-auto flex w-full max-w-[var(--artboard-max)] flex-1 flex-col px-6 pt-8 pb-16 sm:px-10 sm:pt-10 lg:px-14">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
          <AskFab />
        </AskProvider>
      </body>
    </html>
  );
}
