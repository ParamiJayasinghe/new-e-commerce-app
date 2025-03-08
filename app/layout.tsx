import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./component/footer";
import Header from "./component/header";
import { CategoryProvider } from "./context/categoryContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CategoryProvider>
          <Header />
          {children}
          <Footer />
        </CategoryProvider>
      </body>
    </html>
  );
}
