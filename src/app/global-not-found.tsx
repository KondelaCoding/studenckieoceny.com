import "./globals.css";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import DebugRWD from "@/components/DebugRWD";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Undo2 } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="flex flex-col justify-between h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center gap-2">
          <h1 className="text-5xl font-bold">404</h1>
          <h1 className="text-2xl font-semibold">Nie znaleziono strony</h1>
          <Link href="/">
            <Button className="mt-5">
              <Undo2 /> Powrót
            </Button>
          </Link>
        </main>
        <Footer />
        <DebugRWD />
      </body>
    </html>
  );
}
