"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient = ({ children }: LayoutClientProps) => {
  const pathname = usePathname();
  const hideHeaderFooter =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default LayoutClient;
