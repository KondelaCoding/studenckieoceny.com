import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import Profile from "@/components/Profile";
import { ReturnedTeacherProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { auth } from "@/auth";

const TeacherProfilePage = async ({ params }: { params: Promise<{ teacher: string }> }) => {
  try {
    const session = await auth();
    const { teacher } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teacher-profile?id=${teacher}`);
    if (!response.ok) {
      throw new Error("Failed to fetch teacher");
    }
    const teacherData: ReturnedTeacherProps = await response.json();
    if (!teacherData) {
      notFound();
    }

    if (teacherData.reason && session?.user?.role === "user") {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-5 flex-grow">
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
    } else {
      return (
        <>
          {/* <div className="w-screen bg-card p-2 flex-grow flex-column flex justify-center -ml-5 md:-ml-10 lg:-ml-20 xl:-ml-40"> */}
          <Profile teacherData={teacherData} />
          {/* </div> */}
        </>
      );
    }
  } catch (error) {
    console.error("Error fetching teacher:", error);
    notFound();
  }
};

export default TeacherProfilePage;
