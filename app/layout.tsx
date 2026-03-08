import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";

const tanMemories = localFont({
  src: "../public/fonts/TAN-MEMORIES-Regular.ttf",
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Timotion Studio — Cinematic Photography & Film",
  description:
    "Timotion Studio offers tailored photo and videography services for events, fashion, weddings, and film. Emotion. Magic. Art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tanMemories.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
