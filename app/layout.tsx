import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#061a12",
};

export const metadata: Metadata = {
  title: "No I Am Not A IA",
  description: "Quelqu'un frappe a votre porte. Il dit qu'il peut generer des images. Ne le laissez pas entrer.",
  openGraph: {
    title: "No I Am Not A IA",
    description: "Quelqu'un frappe a votre porte. Ne le laissez pas entrer.",
    type: "website",
    locale: "fr_FR",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preload" href="/assets/backgrounds/door-interior.png" as="image" />
        <link rel="preload" href="/assets/backgrounds/exterior-view.png" as="image" />
        <link rel="preload" href="/assets/characters/smiling.png" as="image" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
