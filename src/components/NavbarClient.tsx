'use client';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

export function NavbarClient() {
  const pathname = usePathname();
  const isAuthRoute = ['/login', '/rejestracja'].includes(pathname ?? '');

  return (
    <div className="w-full max-w-md">
      {!isAuthRoute ? <SearchBar isInstant={false} buttonVariant="secondary" /> : null}
    </div>
  );
}
