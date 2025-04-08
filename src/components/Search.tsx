"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Combobox from "@/components/Combobox";

const Search = ({
  isInstant,
  onSearch,
}: {
  isInstant: boolean;
  onSearch: (query: string, subject: string, university: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [university, setUniversity] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setSelectedQuery = (value: string) => {
    setSearchQuery(value);
    if (isInstant) handleInstantSearch(value, subject, university);
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
    setSearchQuery("");

    // Call the parent-provided onSearch callback
    onSearch(searchQuery, subject, university);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const setSelectedSubject = (value: { id: string; name: string }) => {
    setSubject(value.name);
    if (isInstant) handleInstantSearch(searchQuery, value.name, university);
  };

  const setSelectedUniversity = (value: { id: string; name: string }) => {
    setUniversity(value.name);
    if (isInstant) handleInstantSearch(searchQuery, subject, value.name);
  };

  return (
    <>
      <Input
        type="search"
        placeholder="Wyszukaj prowadzącego zajęcia"
        value={isInstant ? undefined : searchQuery}
        onChange={(e) => {
          setSelectedQuery(e.target.value);
        }}
        onKeyDown={isInstant ? undefined : handleKeyDown}
      />
      {false /* TODO: v1.1 - Implement filtering, change "false" to isFull */ ? (
        <>
          <Combobox data="subjects" title="przedmiot" onChange={setSelectedSubject} />
          <Combobox data="universities" title="uczelnie" onChange={setSelectedUniversity} />
        </>
      ) : null}
    </>
  );
};

export default Search;
