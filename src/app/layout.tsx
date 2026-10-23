import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WatchlistProvider from "@/components/ui/WatchlistProvider";
import SessionProvider from "@/components/ui/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cineverse | Discover your Next Obsession",
  description: "Discover movies, explore series, and build your personal watchlist with Cineverse",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SessionProvider>
          <WatchlistProvider>
            <Navbar />
            {children}
          </WatchlistProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
