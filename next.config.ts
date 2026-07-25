import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

/**
 * CSP tuned for this site:
 * - Google Maps embed (iframe)
 * - Clerk auth (admin / sign-in)
 * - Vercel Analytics + Speed Insights
 * - Cloudinary + flagcdn images
 * WhatsApp / Messenger are plain links (wa.me, m.me) — no script hosts required.
 *
 * Start here; tighten further once securityheaders.com / browser console are clean.
 */
const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js + Clerk + Vercel analytics + Google Analytics / GTM
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "https://*.clerk.accounts.dev",
    "https://*.clerk.com",
    "https://va.vercel-scripts.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
  ].join(" "),
  "style-src 'self' 'unsafe-inline'",
  [
    "img-src 'self' data: blob:",
    "https://res.cloudinary.com",
    "https://flagcdn.com",
    "https://img.clerk.com",
    "https://www.google.com",
    "https://maps.gstatic.com",
    "https://*.googleapis.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://*.doubleclick.net",
  ].join(" "),
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://*.clerk.accounts.dev",
    "https://*.clerk.com",
    "https://api.clerk.com",
    "https://clerk-telemetry.com",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com",
    "https://*.blob.vercel-storage.com",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://stats.g.doubleclick.net",
  ].join(" "),
  [
    "frame-src 'self'",
    "https://www.google.com",
    "https://maps.google.com",
    "https://*.clerk.accounts.dev",
    "https://*.clerk.com",
    "https://www.googletagmanager.com",
  ].join(" "),
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
      "accelerometer=()",
      "gyroscope=()",
      "magnetometer=()",
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/(.*\\.(?:svg|ico|png|jpg|jpeg|webp))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);
