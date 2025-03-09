import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import Profile from "@/components/Profile";
import { ReturnedTeacherProps } from "@/types";

const TeacherProfilePage = async ({ params }: { params: Promise<{ teacher: string }> }) => {
  try {
    const { teacher } = await params;
    const response = await fetch(`http://localhost:3000/api/teacher-profile?name=${teacher}`);
    if (!response.ok) {
      throw new Error("Failed to fetch teacher");
    }
    const teacherData: ReturnedTeacherProps = await response.json();
    if (!teacherData) {
      notFound();
    }
    return (
      <>
        <Navbar />
        <div className="w-full bg-card p-2 -mt-5 flex-grow flex-column flex justify-center">
          <Profile teacherData={teacherData} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching teacher:", error);
    notFound();
  }
};

export default TeacherProfilePage;
