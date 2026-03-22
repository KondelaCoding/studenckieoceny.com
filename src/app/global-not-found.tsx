import './globals.css';
import { Montserrat } from 'next/font/google';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import DebugRWD from '@/components/DebugRWD';
import NotFoundContent from '@/components/NotFoundContent';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="flex flex-col justify-between h-screen">
        <Navbar />
        <NotFoundContent />
        <Footer />
        <DebugRWD />
      </body>
    </html>
  );
}
