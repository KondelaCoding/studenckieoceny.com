import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import SearchBar from "./SearchBar";
import Logo from "../../public/Logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, CirclePlus, LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";

export async function Navbar({ isSearchBarVisible = true }: { isSearchBarVisible?: boolean }) {
  const session = await auth();

  console.log("Session in navbar", session);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-card">
      <nav className="py-3 flex justify-between items-center px-default  w-full gap-5">
        <Link href={"/"} className="inline-flex gap-3 items-center text-xl font-semibold">
          <Image src={Logo} alt="absolwent-uczelni" width={32} className="foreground-filter" />
          <span className="hidden md:block">Studenckie oceny</span>
        </Link>
        <div className="inline-flex gap-3 flex-grow justify-end">
          <div className="w-full max-w-md">
            {isSearchBarVisible ? <SearchBar isInstant={false} buttonVariant="secondary" /> : null}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {session ? (
            <>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit">
                  <LogOut />
                  <span className="hidden sm:block">Wyloguj</span>
                </Button>
              </form>
              <Link href={`/u/${session.user?.name}`} className="inline-flex gap-2 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary">{session.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Button variant={"secondary"}>
                <Link href={"/rejestracja"} className="inline-flex gap-2 items-center">
                  <CirclePlus />
                  <span className="hidden sm:block">Dołącz</span>
                </Link>
              </Button>
              <Button>
                <Link href={"/login"} className="inline-flex gap-2 items-center">
                  <LogIn />
                  <span className="hidden sm:block">Zaloguj się</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
      <Separator orientation="horizontal" />
    </div>
  );
}

export default Navbar;

//TODO: Add sonners for auth actions
