import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Fraunces,
  Schibsted_Grotesk,
  Hanken_Grotesk,
} from "next/font/google";
import "./globals.css";
import { AccessModalProvider } from "./access-modal";
import { WordmarkSymbol } from "./wordmark";

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const SITE_TITLE = "Kithos — Commercial reasoning for repeatable revenue";
const SITE_DESCRIPTION =
  "Kithos is the commercial reasoning platform for B2B teams selling into complex buying environments — it finds the right accounts, shapes each opportunity, moves deals forward, and learns what to repeat.";

export const metadata: Metadata = {
  metadataBase: new URL("https://kithos.ai"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-64.png", type: "image/png", sizes: "64x64" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://kithos.ai",
    siteName: "Kithos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kithos",
  url: "https://kithos.ai",
  logo: "https://kithos.ai/icon.svg",
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://x.com/kithosAI",
    "https://linkedin.com/company/kithosAI",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@kithos.ai",
    contactType: "customer support",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kithos",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://kithos.ai",
  description: SITE_DESCRIPTION,
  publisher: { "@type": "Organization", name: "Kithos" },
};

function ldJson(schema: object): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${schibsted.variable} ${fraunces.variable} antialiased`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ldJson(softwareSchema) }}
        />
        <WordmarkSymbol />
        <AccessModalProvider>{children}</AccessModalProvider>
        <Analytics />
      </body>
    </html>
  );
}
