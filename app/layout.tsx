import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PersonDash - People Discovery Platform",
  description: "A comprehensive dashboard for discovering and managing people profiles with advanced search and analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

