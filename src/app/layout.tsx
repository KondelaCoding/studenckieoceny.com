import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import DebugRWD from "@/components/DebugRWD";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster closeButton={true} />
        <div className="px-default w-full">{children}</div>
        <Footer />
        <DebugRWD />
      </body>
    </html>
  );
}
