"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { subjects, universities } from "@/services/data";
import Combobox from "@/components/Combobox";
import { useState } from "react";

const SearchBar = ({ isFull, isInstant }: { isFull: boolean; isInstant: boolean }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleInstantSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="inline-flex gap-3 w-full">
      <Input
        type="search"
        placeholder="Wyszukaj prowadzące"
        value={isInstant ? undefined : searchQuery}
        onChange={(e) => {
          if (isInstant) handleInstantSearch(e.target.value);
          else setSearchQuery(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {isFull ? (
        <>
          <Combobox data={subjects} title="przedmiot" />
          <Combobox data={universities} title="uczelnie" />{" "}
        </>
      ) : null}
      {isInstant ? null : (
        <Button type="button" onClick={handleSearch}>
          <SearchIcon />
          Szukaj
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
