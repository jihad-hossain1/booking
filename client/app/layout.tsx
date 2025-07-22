import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/header/Header";
import { Footer } from "@/components/shared/footer/Footer";

export const metadata: Metadata = {
  title: "Booking",
  description: "Booking app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
