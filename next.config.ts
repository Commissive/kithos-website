import type { NextConfig } from "next";

// Baseline security response headers applied to every route. Deliberately
// conservative: no Content-Security-Policy here because the app ships a few
// inline scripts (JSON-LD, Next's bootstrap, Vercel Analytics) that a strict
// CSP would need nonces to allow — adding one safely is a separate change.
const SECURITY_HEADERS = [
  // Don't let browsers MIME-sniff a response into a different content type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block cross-origin framing (clickjacking); the site is never embedded.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Send origin only (not the full path) on cross-origin requests.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Drop access to device APIs and the Topics API the site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Pin HTTPS for a year. No `preload`/`includeSubDomains` so it stays
  // reversible and can't affect any non-HTTPS subdomain.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
