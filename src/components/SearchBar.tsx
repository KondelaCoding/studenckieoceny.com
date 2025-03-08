"use client";

import { Input } from "@/components/ui/input";
import { Loader2, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { subjects, universities } from "@/services/data";
import Combobox from "@/components/Combobox";
import { useState, useEffect } from "react";

const SearchBar = ({ isFull, isInstant }: { isFull: boolean; isInstant: boolean }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [university, setUniversity] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [searchParams]);

  const setSelectedQuery = (value: string) => {
    setSearchQuery(value);
    if (isInstant) handleInstantSearch(value, subject, university);
  };

  const setSelectedSubject = (value: string) => {
    setSubject(value);
    if (isInstant) handleInstantSearch(searchQuery, value, university);
  };

  const setSelectedUniversity = (value: string) => {
    setUniversity(value);
    if (isInstant) handleInstantSearch(searchQuery, subject, value);
  };

  const handleInstantSearch = (query: string, subject: string, university: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (query) {
      params.set("query", query.toLowerCase());
    } else {
      params.delete("query");
    }
    if (subject) {
      params.set("subject", subject.toLowerCase());
    } else {
      params.delete("subject");
    }
    if (university) {
      params.set("university", university.toLowerCase());
    } else {
      params.delete("university");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("query", searchQuery.toLowerCase());
    }
    if (subject && subject !== "") {
      params.set("subject", subject.toLowerCase());
    }
    if (university && university !== "") {
      params.set("university", university.toLowerCase());
    }
    router.push(`/search?${params.toString()}`);
    setIsLoading(true);
    setSearchQuery("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="inline-flex gap-3 w-full max-w-lg">
      <Input
        type="search"
        placeholder="Wyszukaj prowadzącego"
        value={isInstant ? undefined : searchQuery}
        onChange={(e) => {
          setSelectedQuery(e.target.value);
        }}
        onKeyDown={isInstant ? undefined : handleKeyDown}
      />
      {false /* TODO: v1.1 - Implement filtering, change "false" to isFull */ ? (
        <>
          <Combobox data={subjects} title="przedmiot" onChange={setSelectedSubject} />
          <Combobox data={universities} title="uczelnie" onChange={setSelectedUniversity} />
        </>
      ) : null}
      {isInstant ? null : isLoading ? (
        <Button type="button" disabled>
          <Loader2 className="animate-spin" />
          Szukaj
        </Button>
      ) : (
        <Button type="button" onClick={handleSearch}>
          <SearchIcon />
          Szukaj
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
