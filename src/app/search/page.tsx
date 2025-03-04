import SearchBar from "@/components/SearchBar";
import SearchList from "@/components/SearchList";
import { Separator } from "@/components/ui/separator";

const Page = ({
  searchParams,
}: {
  searchParams: {
    query?: string;
  };
}) => {
  const query = searchParams.query?.toString() ?? "";
  return (
    <div className="px-default w-full flex flex-col gap-10 pt-12 pb-20">
      <div>
        <h1 className="text-xl mb-5">Szukaj wybranego prowadzącego</h1>
        <SearchBar isFull={true} isInstant={true} />
      </div>
      <Separator orientation="horizontal" />
      <div>
        <h1 className="text-xl mb-5">Wyniki wyszukiwania: {query ? <q className="text-primary">{query}</q> : null}</h1>
        <SearchList query={query} />
      </div>
    </div>
  );
};

export default Page;
