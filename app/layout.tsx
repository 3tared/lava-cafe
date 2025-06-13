import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lava Cafe - Best Café Experience",
  description:
    "Enjoy the finest coffee and events at our café. Explore our menu and upcoming events.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased`}
        >
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto mt-[80px] sm:mt-[100px] px-4 sm:px-6 lg:px-8">
            <div className="w-full min-h-[calc(100vh-160px)]">{children}</div>
          </main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
