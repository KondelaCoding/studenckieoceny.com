import { notFound } from 'next/navigation';
import Profile from '@/components/Profile';
import { ReturnedTeacherProps, User } from '@/types/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Undo2 } from 'lucide-react';
import { auth } from '@/auth';
import { hasPermission } from '@/lib/permissions';
import { prisma } from '@/lib/prisma';

const TeacherReportedMessage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 grow px-default h-full">
      <div className="text-center">
        <h1 className="text-2xl mb-2">Profil, który próbujesz wyszukać jest niedostępny.</h1>
        <p className="text-muted-foreground">
          Najprawdopodobniej został on zgłoszony i oczekuje na weryfikację od administratora.
        </p>
      </div>
      <Link href="/">
        <Button>
          <Undo2 />
          Strona główna
        </Button>
      </Link>
    </div>
  );
};

const TeacherProfilePage = async ({ params }: { params: Promise<{ teacher: string }> }) => {
  const { teacher: teacherId } = await params;

  const session = await auth();
  const role = session?.user?.role as User['role'] | undefined;

  // Apparently in server components its best to use prisma directly ¯\_(ツ)_/¯
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
  });

  if (!teacher) notFound();

  // teacher is reported → only admins can see
  if (teacher.reason && !hasPermission(role, 'teacher:read_reported')) {
    return <TeacherReportedMessage />;
  }

  //TODO: this will be fixed by deleting the teacher-uni table
  const teacherData: ReturnedTeacherProps = {
    ...teacher,
    timestamp: teacher.timestamp.getTime(),
    universities: '',
  };

  return (
    <div className="w-full bg-card p-2 grow flex justify-center min-h-[calc(100vh-213px)]">
      <Profile teacherData={teacherData} />
    </div>
  );
};

export default TeacherProfilePage;
