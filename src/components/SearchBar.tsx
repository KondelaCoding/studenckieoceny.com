"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Suspense } from "react";
import Search from "@/components/Search";

const SearchBar = ({ isInstant }: { isInstant: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string, subject: string, university: string) => {
    setIsLoading(true);
    console.log("Search triggered with:", { query, subject, university });
    // Perform additional logic here if needed
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading
  };

  return (
    <div className="inline-flex gap-3 w-full max-w-lg">
      <Suspense fallback={<div>Loading...</div>}>
        <Search isInstant={isInstant} onSearch={handleSearch} />
      </Suspense>
      {isInstant ? null : isLoading ? (
        <Button type="button" disabled>
          <Loader2 className="animate-spin" />
          <span className="hidden sm:block">Szukaj</span>
        </Button>
      ) : (
        <Button type="button" onClick={() => handleSearch("", "", "")}>
          <SearchIcon />
          <span className="hidden sm:block">Szukaj</span>
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
