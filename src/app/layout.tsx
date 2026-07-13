import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import CombineProviders from "./providers/combineProviders";

const jetbrainsMonoHeading = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); */

/* const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  src: "../assets/fonts/jetbrains-mono/jetbrains-mono-variable.ttf",
});

export const metadata: Metadata = {
  title: "FX Checker",
  description: "Foreign exchange currency converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        jetbrainsMono.variable,
        "font-sans",
        inter.variable,
        jetbrainsMonoHeading.variable,
      )}
    >
      <body className="h-full flex flex-col">
        <CombineProviders>{children}</CombineProviders>
      </body>
    </html>
  );
}
