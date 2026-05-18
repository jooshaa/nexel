import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Bruno_Ace } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";

const playfairHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-font",
});

const brunoAce = Bruno_Ace({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bruno-font",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Nexel | Premium Tech Products",
    template: "%s | Nexel",
  },
  description: "Experience the next level of technology with Nexel. Premium, high-end electronics designed for the modern lifestyle.",
  keywords: ["tech", "premium electronics", "gadgets", "smart home", "audio", "nexel"],
  authors: [{ name: "Nexel Team" }],
  creator: "Nexel",
  publisher: "Nexel",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexel-store.com",
    siteName: "Nexel",
    title: "Nexel | Premium Tech Store",
    description: "Experience the next level of technology with Nexel. Premium, high-end electronics designed for the modern lifestyle.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexel Premium Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexel | Premium Tech Store",
    description: "Experience the next level of technology with Nexel.",
    images: ["/og-image.jpg"],
    creator: "@nexel_tech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        playfairHeading.variable,
        brunoAce.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
