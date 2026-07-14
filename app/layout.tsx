import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/features/navigation/Navbar";
import Footer from "@/features/navigation/Footer";

export const metadata: Metadata = {
  title: "NGO THI THUY DUYEN - Living Artistic Archive",
  description: "An evolving digital archive tracking memory, fragility and transformation.",
};

import { LanguageProvider } from "@/lib/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <LanguageProvider>
          <div>
            <Navbar />
            <main>{children}</main>
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
