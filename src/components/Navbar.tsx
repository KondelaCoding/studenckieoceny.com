import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import Logo from '../../public/Logo.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, Menu, CirclePlus } from 'lucide-react';
import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const session = await auth();

  const handleSignOut = async () => {
    'use server';
    console.log('Logging out...');
    await signOut();
  };

  return (
    <Sheet>
      <div
        className={`fixed top-0 left-0 z-50 w-full bg-card ${session?.user?.role === 'admin' ? 'bg-primary' : ''}`}
      >
        <nav className="py-3 flex justify-between items-center px-default w-full gap-5">
          <Link href={'/'} className="inline-flex gap-3 items-center text-xl font-semibold">
            <Image src={Logo} alt="absolwent-uczelni" width={32} className="foreground-filter" />
            <span className="hidden md:block">Studenckie oceny</span>
          </Link>
          <div className="inline-flex gap-3 flex-grow justify-end">
            <NavbarClient />
          </div>
          <div className="flex gap-3 items-center">
            {session ? (
              <div className="hidden md:block">
                <HoverCard>
                  <HoverCardTrigger>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={`cursor-pointer ${session.user?.role === 'user' ? 'bg-primary' : ''}`}
                      >
                        {session.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="inline-flex gap-3 items-center mb-5">
                      <User />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{session.user?.name}</span>
                        <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <Button onClick={handleSignOut}>
                        <LogOut />
                        <span className="hidden sm:block">Wyloguj</span>
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            ) : (
              <Link href={'/login'} className="hidden md:inline-flex gap-2 items-center">
                <Button>
                  <LogIn />
                  Zaloguj się
                </Button>
              </Link>
            )}
            {session ? (
              <div className="block md:hidden">
                <SheetTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      className={`cursor-pointer ${session.user?.role === 'user' ? 'bg-primary' : ''}`}
                    >
                      {session.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="text-sm font-semibold">{session.user?.name}</SheetTitle>
                    <SheetDescription className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </SheetDescription>
                    <Separator className="my-2" />
                    <div className="w-full flex justify-end">
                      <Button onClick={handleSignOut}>
                        <LogOut />
                        Wyloguj
                      </Button>
                    </div>
                  </SheetHeader>
                </SheetContent>
              </div>
            ) : (
              <div className="block md:hidden">
                <SheetTrigger>
                  <Button className="p-2" size="icon" asChild>
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="text-sm font-semibold">Menu</SheetTitle>
                    <SheetDescription className="text-xs text-muted-foreground">
                      Zaloguj się, aby uzyskać dostęp do pełnej funkcjonalności
                    </SheetDescription>
                  </SheetHeader>
                  <Separator className="" />
                  <div className="p-4">
                    <Link href="/login">
                      <Button className="w-full">
                        <LogIn />
                        Zaloguj się
                      </Button>
                    </Link>
                    <Link href="/rejestracja">
                      <Button variant="secondary" className="w-full mt-2">
                        <CirclePlus />
                        Zarejestruj się
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </div>
            )}
          </div>
        </nav>
        <Separator orientation="horizontal" />
      </div>
    </Sheet>
  );
}

export default Navbar;
