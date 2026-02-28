import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Undo2 } from 'lucide-react';

export default function NotFoundContent() {
  return (
    <main className="grow flex flex-col items-center justify-center gap-2 pt-12 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <h1 className="text-2xl font-semibold">Nie znaleziono strony</h1>
      <Link href="/">
        <Button className="mt-5">
          <Undo2 /> Powrót
        </Button>
      </Link>
    </main>
  );
}
