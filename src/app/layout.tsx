import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import DebugRWD from "@/components/DebugRWD";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

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
        className={`${montserrat.variable} antialiased font-[family-name:var(--font-montserrat)] flex justify-between min-h-svh pt-[60px] flex-col overflow-hidden`}
      >
        <div className="flex-grow flex flex-col gap-10">
          <Navbar />
          <div className="w-full h-full">{children}</div>
          <Toaster closeButton={true} />
        </div>
        <Footer />
        <DebugRWD />
      </body>
    </html>
  );
}
