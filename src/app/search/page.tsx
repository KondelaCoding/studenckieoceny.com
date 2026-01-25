import SearchBar from '@/components/SearchBar';
import SearchList from '@/components/SearchList';
import { Separator } from '@/components/ui/separator';

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const { query } = await searchParams;
  const teachers = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teachers`).then((res) =>
    res.json(),
  );

  return (
    <div className="w-full flex flex-col gap-10 pt-12 pb-20 px-default">
      <div>
        <h1 className="text-xl mb-5">Szukaj wybranego prowadzącego</h1>
        <SearchBar isInstant={true} />
      </div>
      <Separator orientation="horizontal" />
      <div>
        <h1 className="text-xl mb-5">
          Wyniki wyszukiwania: {query ? <q className="text-primary">{query}</q> : null}
        </h1>
        <SearchList teachers={teachers} query={query} />
      </div>
    </div>
  );
};

export default Page;
