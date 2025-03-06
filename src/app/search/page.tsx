import SearchBar from "@/components/SearchBar";
import SearchList from "@/components/SearchList";
import { Separator } from "@/components/ui/separator";

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const { query } = await searchParams;
  const teachers = await fetch("http://localhost:3000/api/teachers").then((res) => res.json());
  return (
    <div className="px-default w-full flex flex-col gap-10 pt-12 pb-20">
      <div>
        <h1 className="text-xl mb-5">Szukaj wybranego prowadzącego</h1>
        <SearchBar isFull={true} isInstant={true} />
      </div>
      <Separator orientation="horizontal" />
      <div>
        <h1 className="text-xl mb-5">Wyniki wyszukiwania: {query ? <q className="text-primary">{query}</q> : null}</h1>
        <SearchList teachers={teachers} query={query} />
      </div>
    </div>
  );
};

export default Page;
