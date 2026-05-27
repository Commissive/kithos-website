import type { Metadata } from "next";
import {
  Schibsted_Grotesk,
  Hanken_Grotesk,
  IBM_Plex_Mono,
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

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kithos.ai"),
  title: "Kithos — Commercial reasoning for B2B startups",
  description:
    "Kithos is the commercial reasoning system for early B2B teams. Turn scattered context into sharper account decisions, better outreach, better meetings, and a sales motion that improves with every outcome.",
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
    title: "Kithos — Commercial reasoning for B2B startups",
    description:
      "Kithos helps early B2B teams win deals they would otherwise lose.",
    url: "https://kithos.ai",
    siteName: "Kithos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kithos — Commercial reasoning for B2B startups",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kithos — Commercial reasoning for B2B startups",
    description:
      "Kithos helps early B2B teams win deals they would otherwise lose.",
    images: ["/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kithos",
  url: "https://kithos.ai",
  logo: "https://kithos.ai/icon.svg",
  description: "Commercial reasoning system for early B2B teams.",
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
  description:
    "Kithos is the commercial reasoning system for early B2B teams. It turns scattered commercial context into sharper account decisions, stronger outreach, better meetings, and a sales motion that improves with every outcome.",
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
      className={`${hanken.variable} ${schibsted.variable} ${plexMono.variable} antialiased`}
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
      </body>
    </html>
  );
}
