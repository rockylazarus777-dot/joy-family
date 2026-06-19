import type { Metadata } from "next";
import { Raleway, Roboto, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileActionBar from "@/components/layout/StickyMobileActionBar";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", weight: ["600", "700", "800"] });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["400", "500", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joyfmsclinic.com"),
  title: {
    default: "JOY FAMILY Multispecialty Clinic",
    template: "%s | JOY FAMILY Multispecialty Clinic",
  },
  description:
    "Comprehensive Healthcare for Every Generation. Expert Doctors, Laboratory Diagnostics, Pharmacy Services, Health Packages, and DG Shipping Medical Examinations.",
  keywords: [
    "multispeciality clinic Chennai",
    "family doctor Mogappair",
    "ENT specialist Chennai",
    "DG Shipping medical examination",
    "health checkup packages Chennai",
    "NABL certified lab Chennai",
    "SSN Scans diagnostic partner",
  ],
  icons: {
    icon: [
      { url: "/images/fav.icon/favicon-64x64.png" },
      { url: "/images/fav.icon/favicon.ico.png", sizes: "42x42", type: "image/png" },
    ],
    shortcut: "/images/fav.icon/favicon.ico",
    apple: [{ url: "/images/fav.icon/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "JOY FAMILY Multispecialty Clinic",
    description: "Comprehensive Healthcare for Every Generation",
    siteName: "JOY FAMILY Multispecialty Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/fav.icon/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JOY FAMILY Multispecialty Clinic — Comprehensive Healthcare for Every Generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JOY FAMILY Multispecialty Clinic",
    description: "Comprehensive Healthcare for Every Generation",
    images: ["/images/fav.icon/twitter-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${roboto.variable} ${inter.variable} font-body`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyMobileActionBar />
      </body>
    </html>
  );
}
