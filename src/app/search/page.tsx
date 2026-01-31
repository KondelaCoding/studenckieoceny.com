import SearchBar from '@/components/SearchBar';
import SearchList from '@/components/SearchList';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const { query } = await searchParams;
  const teachers = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teachers`);

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
        <SearchList teachers={teachers.data} query={query} />
      </div>
    </div>
  );
};

export default Page;
