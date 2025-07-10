import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import ThemeSwitcher from './components/ThemeSwitcher'
import { Providers } from './providers'

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Joris Mathijssen - C# Software Developer",
  description: "Portfolio of Joris Mathijssen, a C# Software Developer specializing in API development at 9292. Explore my projects, skills, and experience in building high-performance software solutions.",
  keywords: ["C#", "Software Developer", "API Development", ".NET", "ASP.NET Core", "9292"],
};

/**
 * Main layout component for the portfolio app.
 * - Wraps all pages with global styles and providers.
 * - Loads custom fonts and applies them to the body.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfolio of Joris Mathijssen, a C# Software Developer specializing in API development at 9292." />
        <meta name="keywords" content="C#, Software Developer, API Development, .NET, ASP.NET Core, 9292" />
        <meta property="og:title" content="Joris Mathijssen - C# Software Developer" />
        <meta property="og:description" content="Explore my projects, skills, and experience in building high-performance software solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jorismathijssen.nl" />
        <meta property="og:image" content="https://jorismathijssen.nl/4.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Joris Mathijssen - C# Software Developer" />
        <meta name="twitter:description" content="Explore my projects, skills, and experience in building high-performance software solutions." />
        <meta name="twitter:image" content="https://jorismathijssen.nl/4.png" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <link rel="canonical" href="https://jorismathijssen.nl" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" href="/fonts/GeistVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeistMonoVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <noscript>
          <div style={{padding: '20px', textAlign: 'center'}}>
            <p>This website requires JavaScript to function properly. Please enable JavaScript to continue.</p>
            <h1 style={{marginTop: '20px'}}>Joris Mathijssen</h1>
            <p>C# Software Developer</p>
            <div style={{ marginTop: '20px' }}>
              <a href="https://github.com/jorismathijssen" style={{ marginRight: '10px' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/jorismathijssen/">LinkedIn</a>
            </div>
          </div>
        </noscript>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ThemeSwitcher />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
