import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Lato,
  Lora,
  Playfair_Display,
  Source_Sans_3,
} from "next/font/google";
import { getSettings } from "@/lib/queries";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.siteTitle,
    description: settings.siteDescription,
    icons: settings.favicon ? { icon: settings.favicon } : undefined,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${lato.variable} ${cormorant.variable} ${sourceSans.variable} ${vibes.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
