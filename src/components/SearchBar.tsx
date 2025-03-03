"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Combobox from "./Combobox";

const subjects = [
  "Analiza Matematyczna",
  "Fizyka",
  "Informatyka",
  "Podstawy Elektroniki",
  "Podstawy Programowania",
  "Systemy Operacyjne",
  "Technologie Sieciowe",
  "Teoria Obwodów",
  "Teoria Sygnałów",
];

const universities = [
  "Politechnika Wrocławska",
  "Uniwersytet Wrocławski",
  "Uniwersytet Przyrodniczy we Wrocławiu",
  "Uniwersytet Ekonomiczny we Wrocławiu",
  "Uniwersytet Medyczny we Wrocławiu",
  "Uniwersytet Muzyczny we Wrocławiu",
  "Politechnika Poznańska",
];

const SearchBar = () => {
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
    <div className="flex gap-5 flex-col md:flex-row items-center">
      <div className="flex gap-3 flex-col md:flex-row items-center">
        <Input
          type="search"
          placeholder="Wyszukaj prowadzącego"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Combobox data={subjects} title="przedmiot" />
        <Combobox data={universities} title="uczelnie" />
      </div>
      <Button type="button" onClick={handleSearch}>
        <SearchIcon />
        Szukaj
      </Button>
    </div>
  );
};

export default SearchBar;
