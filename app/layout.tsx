import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import ThemeSwitcher from './components/ThemeSwitcher'
import { Providers } from './providers';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Joris Mathijssen - C# Software Developer",
  description: "Portfolio of Joris Mathijssen, a C# Software Developer specializing in API development at 9292. Explore my projects, skills, and experience in building high-performance software solutions.",
  keywords: ["C#", "Software Developer", "API Development", ".NET", "ASP.NET Core", "9292"],
};

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
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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