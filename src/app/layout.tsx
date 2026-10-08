import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Aura & Archive | Luxury Smart Cards & Interactive Media",
    template: "%s | Aura & Archive",
  },
  description:
    "The physical gateway to digital elegance. Transforming vows, spoken confessions, and cinematic moments into instant luxury experiences.",
  keywords: [
    "Luxury Smart Cards",
    "Interactive Media",
    "Digital Keepsakes",
    "NFC Cards",
    "Aura & Archive",
  ],
  authors: [{ name: "Aura & Archive" }],
  openGraph: {
    title: "Aura & Archive | Luxury Smart Cards & Interactive Media",
    description:
      "The physical gateway to digital elegance. Transforming vows, spoken confessions, and cinematic moments into instant luxury experiences.",
    siteName: "Aura & Archive",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura & Archive | Luxury Smart Cards & Interactive Media",
    description:
      "The physical gateway to digital elegance. Transforming vows, spoken confessions, and cinematic moments into instant luxury experiences.",
  },
  icons: {
    icon: "/favicon.ico",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased bg-[#070709] text-slate-100 selection:bg-amber-500/20 selection:text-amber-200`}
      style={{ backgroundColor: "#070709", colorScheme: "dark" }}
    >
      <head>
        <meta name="theme-color" content="#070709" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* IMMEDIATE ZERO-LATENCY CSS: Prevents Chrome from showing white unstyled content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root, html, body {
                background-color: #070709 !important;
                background: #070709 !important;
                color: #f3f3f7 !important;
                color-scheme: dark !important;
                margin: 0;
                padding: 0;
                min-height: 100vh;
              }

              /* Immediate Component Styling Before Main CSS Loads */
              .btn {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0.75rem 1.25rem !important;
                font-size: 0.75rem !important;
                font-weight: 600 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.1em !important;
                border-radius: 0.375rem !important;
                cursor: pointer !important;
                text-decoration: none !important;
              }

              .btn-gold {
                background-color: #d4af37 !important;
                color: #000000 !important;
                border: 1px solid #d4af37 !important;
              }

              .btn-outline {
                background-color: transparent !important;
                color: #f4e6b0 !important;
                border: 1px solid rgba(212, 175, 55, 0.35) !important;
              }

              .app-viewport {
                max-width: 1140px;
                margin-left: auto;
                margin-right: auto;
                padding-left: 1rem;
                padding-right: 1rem;
                width: 100%;
              }

              a {
                color: #d4af37 !important;
                text-decoration: none !important;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-[#070709] text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-200`}
        style={{ backgroundColor: "#070709" }}
      >
        {children}
      </body>
    </html>
  );
}