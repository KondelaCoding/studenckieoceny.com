import SearchBar from '@/components/SearchBar';
import SearchList from '@/components/SearchList';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { hasPermission } from '@/lib/permissions';
import type { User } from '@/types/types';
import { getRoleName } from '@/lib/utils';

async function getTeachers(role: User['role'] | undefined, query?: string) {
  const canSeeReported = hasPermission(role, 'teacher:read_reported');

  return prisma.teacher.findMany({
    where: {
      ...(query && {
        name: { contains: query, mode: 'insensitive' },
      }),
      ...(canSeeReported
        ? {}
        : {
            reason: null,
          }),
    },
    orderBy: { name: 'asc' },
  });
}

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const params = await searchParams;
  const query = params.query;
  const session = await auth();
  const role = getRoleName(session);

  const returnedTeachers = await getTeachers(role, query);

  const teachers = returnedTeachers.map((teacher) => ({
    ...teacher,
    timestamp: teacher.timestamp.getTime(),
    universities: '', //TODO: this will be fixed by deleting the teacher-uni table
  }));

  return (
    <div className="w-full flex flex-col gap-10 pt-12 pb-20 px-default">
      <div>
        <h1 className="text-xl mb-5">Szukaj wybranego prowadzącego</h1>
        <SearchBar isInstant />
      </div>
      <Separator orientation="horizontal" />
      <div>
        <h1 className="text-xl mb-5">
          Wyniki wyszukiwania: {query ? <q className="text-primary">{query}</q> : null}
        </h1>
        <SearchList teachers={teachers} />
      </div>
    </div>
  );
};

export default Page;
