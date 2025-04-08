import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import SearchBar from "./SearchBar";
import Logo from "../../public/Logo.svg";
import Image from "next/image";
import { Suspense } from "react";

export function Navbar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="fixed top-0 left-0 z-50 w-full bg-card">
        <nav className="py-3 flex justify-between items-center px-default  w-full gap-5">
          <Link href={"/"} className="inline-flex gap-3 items-center text-xl font-semibold">
            <Image src={Logo} alt="absolwent-uczelni" width={32} className="foreground-filter" />
            <span className="hidden md:block">Studenckie oceny</span>
          </Link>
          <div className="inline-flex gap-3 flex-grow max-w-md justify-end">
            <SearchBar isFull={false} isInstant={false} />
          </div>
        </nav>
        <Separator orientation="horizontal" />
      </div>
    </Suspense>
  );
}

export default Navbar;
