import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vishalli Maini | Software Engineer & AI Builder",
  description: "Explore Vishalli Maini’s full stack products, real-time voice systems, and production AI agents. Meet her AI recruiter.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
