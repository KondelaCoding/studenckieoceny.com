import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import DebugRWD from "@/components/DebugRWD";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studenckie Oceny",
  description: "Oceniaj zajęcia i sprawdź opinie innych studentów!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="overflow-x-hidden">
      <body
        className={`${montserrat.variable} antialiased font-[family-name:var(--font-montserrat)] flex justify-between flex-col min-h-screen pt-20 overflow-hidden`}
      >
        {children}
        <Footer />
        <DebugRWD />
      </body>
    </html>
  );
}
