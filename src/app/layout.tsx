import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joris Mathijssen",
  description: "Senior .NET Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black font-mono">
        {children}
      </body>
    </html>
  );
}
