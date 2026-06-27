import type { Metadata, Viewport } from "next";
import { Raleway, Roboto, Inter } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileActionBar from "@/components/layout/StickyMobileActionBar";
import JsonLd from "@/components/seo/JsonLd";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", weight: ["600", "700", "800"] });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["400", "500", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.joyfmsclinic.com";

export const viewport: Viewport = {
  themeColor: "#224C7A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JOY FAMILY Multispecialty Clinic",
    template: "%s | JOY FAMILY Multispecialty Clinic",
  },
  description:
    "Comprehensive Healthcare for Every Generation. Expert Doctors, Laboratory Diagnostics, Pharmacy Services, Health Packages, and DG Shipping Medical Examinations.",
  keywords: [
    "multispeciality clinic Chennai",
    "family doctor Villivakkam",
    "ENT specialist Chennai",
    "DG Shipping medical examination",
    "health checkup packages Chennai",
    "NABL certified lab Chennai",
    "SSN Scans diagnostic partner",
    "Joy Family Clinic",
    "multispeciality hospital Villivakkam",
    "paediatrics Chennai",
    "gynaecology Villivakkam",
    "dental clinic Chennai",
    "orthopaedics specialist Chennai",
  ],
  authors: [{ name: "Joy Family Multispeciality Clinic", url: siteUrl }],
  creator: "Joy Family Multispeciality Clinic",
  publisher: "Joy Family Multispeciality Clinic",
  category: "Healthcare",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "JOY FAMILY Multispecialty Clinic",
    description: "Comprehensive Healthcare for Every Generation",
    siteName: "JOY FAMILY Multispecialty Clinic",
    url: siteUrl,
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className={`${raleway.variable} ${roboto.variable} ${inter.variable} font-body`}>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyMobileActionBar />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
