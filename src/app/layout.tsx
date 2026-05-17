import "../globals.css";
import "aos/dist/aos.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zaenalos-portfolio.vercel.app/"),
  title: "Zaenalos | Software Developer & IT Student Portfolio",
  description:
    "Rameses (Zaenalos) - 4th-year IT student and aspiring software engineer specializing in backend systems, cybersecurity, reverse engineering, and web development. View my projects and experience.",
  keywords: [
    "Zaenalos",
    "Rameses Chamian",
    "software developer",
    "IT student",
    "cybersecurity",
    "reverse engineering",
    "web development",
    "backend systems",
    "portfolio",
    "PHINMA Saint Jude College",
  ],
  authors: [{ name: "Rameses Chamian (Zaenalos)" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zaenalos | Software Developer & IT Student Portfolio",
    description:
      "4th-year IT student and aspiring software engineer specializing in backend systems, cybersecurity, reverse engineering, and web development.",
    url: "https://zaenalos-portfolio.vercel.app/",
    siteName: "Zaenalos Portfolio",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/77824453?v=4",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaenalos | Software Developer & IT Student Portfolio",
    description:
      "4th-year IT student and aspiring software engineer specializing in backend systems, cybersecurity, reverse engineering, and web development.",
    images: ["https://avatars.githubusercontent.com/u/77824453?v=4"],
    creator: "@Zaenalos",
  },
  icons: {
    icon: "https://avatars.githubusercontent.com/u/77824453?v=4",
    apple: "https://avatars.githubusercontent.com/u/77824453?v=4",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        jetBrainsMono.variable,
        "font-sans",
        "h-full",
        "antialiased",
      )}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
