import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReturnedTeacherProps } from "@/types";
import ProfileCards from "./ProfileCards";
import { Separator } from "./ui/separator";
import StarRatingDisplay from "./StarRatingDisplay";
import { User, BookOpenText, University, CalendarClock, Info } from "lucide-react";
import ReportTeacherDrawer from "./ReportTeacherDrawer";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Profile = ({ teacherData }: { teacherData: ReturnedTeacherProps }) => {
  const seperatedSubjects = teacherData.subjects.split(",");
  const seperatedUniversities = teacherData.universities.split(",");
  const date =
    new Date(teacherData.timestamp).getDate() +
    "." +
    (new Date(teacherData.timestamp).getMonth() + 1) +
    "." +
    new Date(teacherData.timestamp).getFullYear();

  const handleUnhide = async () => {
    "use server";
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/unhide-teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId: teacherData.id }),
    });
    if (!response.ok) {
      throw new Error("Failed to unhide teacher");
    }
    const data = await response.json();
    console.log("Unhide response:", data.message);
  };

  const handleDelete = async () => {
    "use server";
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-teacher`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId: teacherData.id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete teacher");
    }
    const data = await response.json();
    console.log("Delete response:", data.message);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 w-full lg:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center py-10 -mt-5 gap-5 lg:max-w-lg lg:w-min xl:px-6">
        <Avatar className="uppercase w-40 h-40 text-4xl border mx-14">
          <AvatarFallback>{teacherData.name.split(" ")[0][0] ?? ""}</AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col gap-5 justify-center items-center lg:items-start">
          {teacherData.reason ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex gap-3 w-full justify-center items-center text-primary border border-primary rounded-md p-2 bg-primary/10"
                >
                  <span>Profil jest zgłoszony</span>
                  <Info />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Wiadomość</AlertDialogTitle>
                  <AlertDialogDescription>
                    <q>{teacherData.reason}</q>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Anuluj</AlertDialogCancel>
                  <AlertDialogAction className="!bg-destructive" asChild>
                    <Button onClick={handleDelete}>Usuń z bazy</Button>
                  </AlertDialogAction>
                  <AlertDialogAction onClick={handleUnhide}>Przywróć konto</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}
          <h2 className="scroll-m-20 mt-5 text-3xl font-semibold tracking-tight transition-colors capitalize inline-flex justify-center w-full gap-10 lg:justify-between">
            <div className="inline-flex gap-3 items-center">
              <User size={30} />
              {teacherData.name}
            </div>
            <ReportTeacherDrawer teacherId={teacherData.id} />
          </h2>
          <StarRatingDisplay totalValue={teacherData.totalRatingValue} numberOfVotes={teacherData.numberOfVotes} />
          <Separator orientation="horizontal" />
          <div className="grid gap-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-1">
            <div className="flex gap-3 flex-col">
              <span className="inline-flex items-center gap-3">
                <BookOpenText size={24} />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Przedmioty</h3>
              </span>
              <ul className="list-disc">
                {seperatedSubjects.map((subject, index) => (
                  <li key={index} className="ml-6">
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="inline-flex items-center gap-3">
                <University size={24} />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Uczelnie</h3>
              </span>
              <ul className="list-disc space-y-3">
                {seperatedUniversities.map((subject, index) => (
                  <li key={index} className="ml-6">
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="inline-flex items-center gap-3">
                <CalendarClock size={24} />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Data dodania</h3>
              </span>
              <ul className="list-disc">
                <li className="ml-6">{date}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ProfileCards teacherData={teacherData} />
    </div>
  );
};

export default Profile;
