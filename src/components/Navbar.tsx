"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-card">
      <nav className="py-3 flex justify-between items-center px-default  w-full gap-5">
        <Link href={"/"} className="inline-flex gap-3 items-center text-xl font-semibold">
          <GraduationCap size={32} />
          <span className="hidden md:block">Ranking prowadzących</span>
        </Link>
        <div className="inline-flex gap-3 flex-grow max-w-md justify-end">
          <Input
            type="search"
            placeholder="Wyszukaj prowadzącego"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="hidden sm:block"
          />
          <Button type="button" onClick={handleSearch}>
            <SearchIcon />
            Szukaj
          </Button>
        </div>
      </nav>
      <Separator orientation="horizontal" />
    </div>
  );
}

export default Navbar;
