import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import WebVitals from "@/components/WebVitals";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Joris Mathijssen - C# Software Developer",
  description:
    "Portfolio of Joris Mathijssen, a C# Software Developer specializing in API development at 9292. Explore my projects, skills, and experience in building high-performance software solutions.",
  keywords: [
    "C#",
    "Software Developer",
    "API Development",
    ".NET",
    "ASP.NET Core",
    "9292",
  ],
};

/**
 * Main layout component for the portfolio app.
 * - Wraps all pages with global styles and providers.
 * - Loads custom fonts and applies them to the body.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfolio of Joris Mathijssen, a C# Software Developer specializing in API development at 9292." />
        <meta name="keywords" content="C#, Software Developer, API Development, .NET, ASP.NET Core, 9292" />
        <meta name="author" content="Joris Mathijssen" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Joris Mathijssen - C# Software Developer" />
        <meta property="og:description" content="Explore my projects, skills, and experience in building high-performance software solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jorismathijssen.nl" />
        <meta property="og:image" content="https://jorismathijssen.nl/profile_pic_original.webp" />
        <meta property="og:locale" content="nl_NL" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Joris Mathijssen - C# Software Developer" />
        <meta name="twitter:description" content="Explore my projects, skills, and experience in building high-performance software solutions." />
        <meta name="twitter:image" content="https://jorismathijssen.nl/profile_pic_original.webp" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        <link rel="canonical" href="https://jorismathijssen.nl" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UmamiAnalytics />
        <WebVitals />
        <ErrorBoundary>
          <ClientLayout>{children}</ClientLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}
