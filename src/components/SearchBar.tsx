'use client';

import { Loader2, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { Suspense } from 'react';
import Search from '@/components/Search';

const SearchBar = ({
  isInstant,
  buttonVariant = 'default',
}: {
  isInstant: boolean;
  buttonVariant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Ref to access the handleSearch function from the Search component
  const searchRef = useRef<{ handleSearch: () => void } | null>(null);

  const handleSearch = (query: string, subject: string, university: string) => {
    setIsLoading(true);
    console.log('Search triggered with:', { query, subject, university });
    // Perform additional logic here if needed
    setTimeout(() => setIsLoading(false), 5000); // Simulate loading
  };

  return (
    <div className="inline-flex gap-3 w-full max-w-lg">
      <Suspense fallback={<div>Loading...</div>}>
        <Search ref={searchRef} isInstant={isInstant} onSearch={handleSearch} />
      </Suspense>
      {isInstant ? null : isLoading ? (
        <Button variant={buttonVariant} type="button" disabled>
          <Loader2 className="animate-spin" />
          <span className="hidden sm:block">Szukaj</span>
        </Button>
      ) : (
        <Button
          variant={buttonVariant}
          type="button"
          onClick={() => searchRef.current?.handleSearch()}
        >
          <SearchIcon />
          <span className="hidden sm:block">Szukaj</span>
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
