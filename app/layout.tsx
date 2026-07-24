import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yaa Club | Wellbeing that works",
  description:
    "Discover clubs, join communities, book sports activities and organize events. Play. Connect. Grow. More than a game. It's a community.",
  keywords: [
    "Yaa Club",
    "pickleball",
    "wellbeing",
    "sports community",
    "sports booking",
    "events",
    "run club",
    "yoga",
  ],
  openGraph: {
    title: "Yaa Club | Wellbeing that works",
    description: "Play. Connect. Grow. More than a game. It's a community.",
    type: "website",
    locale: "en_US",
    siteName: "Yaa Club",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--yaa-cream)] text-[var(--yaa-black)]">
        {children}
      </body>
    </html>
  );
}
